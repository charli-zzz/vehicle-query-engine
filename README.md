# Vehicle Query Engine

Vehicle Query Engine is a Next.js app for browsing a mixed dataset of cars,
bikes, and spaceships. It focuses on frontend state modeling and query
behavior: vehicle type tabs, search, sorting, and type-specific custom filters.

## Features

- Browse cars, bikes, and spaceships in one result view.
- Filter by vehicle type with `All`, `Cars`, `Bikes`, and `Spaceships` tabs.
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

## Project Structure

- `src/types/vehicle.ts`: domain types for `Car`, `Bike`, `Spaceship`, and the `Vehicle` union.
- `src/lib/vehicles.ts`: loads the JSON datasets and combines them into one `vehicles` array.
- `src/lib/vehicleOptions.ts`: UI option lists for vehicle tabs and sorting.
- `src/lib/vehicleFilters.ts`: developer-controlled filter configuration and derived filter options.
- `src/lib/vehicleQuery.ts`: applies vehicle type, search, custom filters, and sorting.
- `src/components/VehicleSearchPage.tsx`: page-level state and orchestration.
- `src/components/FilterPanel.tsx`: custom filter UI.
- `src/components/VehicleResultList.tsx`: result rendering.

## Architecture Notes

The app intentionally combines all vehicle records into a single discriminated
union:

```ts
type Vehicle = Car | Bike | Spaceship;
```

Each record has a `kind` field, so shared UI can work with one result list while
type-specific rendering and filters still stay explicit.

The page owns UI state:

- selected vehicle type
- search query
- selected filters
- sort option

The query logic lives in `src/lib/vehicleQuery.ts`. Every time state changes,
the app recalculates visible vehicles from the full dataset instead of layering
stateful intermediate result lists.

Conceptually:

```ts
getVisibleVehicles({
  selectedTab,
  searchQuery,
  selectedFilters,
  sortOption,
});
```

This keeps the frontend behavior predictable and makes the query layer easy to
replace later if the data source changes.

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

This project keeps filtering, searching, and sorting in the frontend because the
dataset is local and small. That is intentional: it showcases frontend skills
such as controlled inputs, derived state, type-specific UI, discriminated unions,
and reusable query logic.

At production scale, the same constraints would usually move to the backend.
The frontend would still own UI state, but it would send those constraints to an
API:

```txt
GET /api/vehicles?type=car&search=astro&yearMin=2020&sort=year-desc&page=1
```

The backend would then handle:

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
