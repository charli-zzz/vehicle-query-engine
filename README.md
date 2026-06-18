# Vehicle Query Engine

Vehicle Query Engine is a Next.js app for browsing a mixed dataset of cars,
bikes, and spaceships. It focuses on frontend state modeling and query
behavior: vehicle type tabs, search, sorting, and type-specific custom filters.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Run checks:

```bash
npm run lint
npm run build
```

## Features

- Browse cars, bikes, and spaceships in one result view.
- Switch between `All`, `Cars`, `Bikes`, and `Spaceships` result views.
- Search across all attributes of each vehicle.
- Sort by model name, newest year, or oldest year.
- Show custom filters based on the selected vehicle type.
- Use select filters for discrete values and range sliders for numeric ranges.
- Keep the filter panel and results list independently scrollable.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Radix UI Slider

## Project Structure

- `src/types/vehicle.ts`: domain types for `Car`, `Bike`, `Spaceship`, and the `Vehicle` union.
- `src/data/loadVehicles.ts`: loads local JSON data and exports `cars`, `bikes`, `spaceships`, and a combined `vehicles` list.
- `src/lib/filterConfig.ts`: developer-controlled filter configuration and derived filter options.
- `src/lib/sortConfig.ts`: sort options and sorting behavior.
- `src/lib/getVisibleVehicles.ts`: applies vehicle type, search, custom filters, and sorting.
- `src/components/VehicleSearchPage.tsx`: page-level state and orchestration.
- `src/components/FilterPanel.tsx`: custom filter UI.
- `src/components/VehicleResultList.tsx`: result rendering.

## Architecture Notes

The app keeps the source datasets available separately as `cars`, `bikes`, and
`spaceships`. Because the provided datasets are small and local, it also exposes
a combined `vehicles` list for querying and rendering the shared All view. That
keeps the current implementation straightforward without giving up type-specific
behavior. The combined list is typed as a discriminated union:

```ts
type Vehicle = Car | Bike | Spaceship;
```

Each record has a `kind` field, so shared UI can work with one result list while
type-specific rendering and filters still stay explicit. The app models this
separately from the selected result view:

```ts
type VehicleKind = Vehicle["kind"];
type VehicleView = "all" | VehicleKind;
```

`VehicleKind` represents real data categories: cars, bikes, and spaceships.
`VehicleView` represents the UI-level result view. The `all` view is not treated
as a vehicle type; it means the user has not narrowed the results to one
vehicle kind.

The page owns UI state:

- selected vehicle view
- search query
- selected filters
- sort option

The query logic lives in `src/lib/getVisibleVehicles.ts`. Every time state
changes, the app recalculates visible vehicles from the full local dataset
instead of layering stateful intermediate result lists. This keeps
`VehicleSearchPage` focused on UI state while the query layer decides how the
result list is built.

Conceptually:

```ts
getVisibleVehicles({
  selectedVehicleKind,
  searchQuery,
  selectedFilters,
  sortOption,
});
```

This keeps the frontend behavior predictable and leaves room to scale the data
access later. For example, if the app eventually used separate local lists or
separate backend endpoints for cars, bikes, and spaceships, that change could be
handled behind the query layer without making the page component responsible for
those data-source details.

## Card Design

The result list uses type-specific cards for cars, bikes, and spaceships instead
of a single generic card. The datasets share a few fields, but their meaningful
details differ: cars show attributes like seats, horsepower, and km/h top speed;
bikes show type, gears, and wheel size; spaceships show crew capacity and format
top speed as a percentage of light speed.

This keeps the UI readable without forcing all vehicle types into one universal
display schema, and gives developers freedom to customize the layout,
formatting, and interactions for each vehicle type independently.

## Filter Design

Filters are developer-controlled rather than automatically generated from every
attribute. This avoids noisy or awkward filters, such as filtering by `model`
when search is a better fit.

The filter config decides which fields are filterable and which control type
they use:

- Select filters for discrete values like make, brand, seats, gears, and wheel size.
- Range filters for numeric ranges like year, horsepower, top speed, and engine size.

The config is explicit, but the available options and min/max values are derived
from the dataset.

## Frontend vs Backend Querying

This project intentionally uses local JSON data only. Filtering, searching, and
sorting stay in the frontend because the dataset is static and small. That
showcases frontend skills such as controlled inputs, derived state,
type-specific UI, discriminated unions, and reusable query logic without adding
unnecessary backend complexity.

At production scale, the same constraints could move to a backend or search
service. That is not part of this implementation, but the frontend state shape
would map naturally to an API request:

```txt
GET /api/vehicles?type=car&search=astro&yearMin=2020&sort=year-desc&page=1
```

In that production-style version, the backend would handle:

- filtering
- searching
- sorting
- pagination
- database indexes

The frontend would render the returned page of results instead of filtering the
entire dataset locally.

Doing filtering and sorting on both frontend and backend is usually avoided for
the main result list because it can create mismatched totals, broken pagination,
or inconsistent sort order. A common split is:

- Backend owns global result querying for large datasets.
- Frontend owns UI state and small presentation-only interactions.

For this project, the frontend query engine is the right tradeoff because the
goal is to demonstrate client-side application architecture rather than backend
API design.
