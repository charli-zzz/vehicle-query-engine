import { describe, expect, it } from "@jest/globals";
import { bikes, cars, spaceships, vehicles } from "@/data/loadVehicles";
import { createEmptySelectedFilters, type SelectedFilters } from "@/lib/filterConfig";
import { getVisibleVehicles } from "@/lib/getVisibleVehicles";
import type { Vehicle, VehicleKind } from "@/types/vehicle";

function expectSortedByModel(visibleVehicles: Vehicle[]) {
  expect(visibleVehicles.map((vehicle) => vehicle.model)).toEqual(
    [...visibleVehicles].sort((firstVehicle, secondVehicle) =>
      firstVehicle.model.localeCompare(secondVehicle.model),
    ).map((vehicle) => vehicle.model),
  );
}

function queryVehicles({
  selectedVehicleKind,
  searchQuery = "",
  selectedFilters = createEmptySelectedFilters(),
  sortOption = "model-asc",
}: {
  selectedVehicleKind?: VehicleKind;
  searchQuery?: string;
  selectedFilters?: SelectedFilters;
  sortOption?: "model-asc" | "year-desc" | "year-asc";
} = {}) {
  return getVisibleVehicles({
    selectedVehicleKind,
    searchQuery,
    selectedFilters,
    sortOption,
  });
}

describe("getVisibleVehicles", () => {
  it("includes all vehicle kinds when no kind is selected", () => {
    const visibleVehicles = queryVehicles();

    expect(visibleVehicles).toHaveLength(vehicles.length);
    expect(new Set(visibleVehicles.map((vehicle) => vehicle.kind))).toEqual(
      new Set(["car", "bike", "spaceship"]),
    );
    expectSortedByModel(visibleVehicles);
  });

  it("narrows results to the selected vehicle kind", () => {
    const visibleVehicles = queryVehicles({ selectedVehicleKind: "bike" });

    expect(visibleVehicles).toHaveLength(bikes.length);
    expect(visibleVehicles.every((vehicle) => vehicle.kind === "bike")).toBe(true);
  });

  it("treats whitespace-only search as no search constraint", () => {
    expect(queryVehicles({ searchQuery: "   " })).toHaveLength(vehicles.length);
  });

  it("searches across attributes beyond model", () => {
    const manufacturer = spaceships[0].manufacturer;
    const visibleVehicles = queryVehicles({ searchQuery: manufacturer.toUpperCase() });

    expect(visibleVehicles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: "spaceship",
          manufacturer,
        }),
      ]),
    );
  });

  it("applies selected discrete filters", () => {
    const selectedMake = cars[0].make;
    const visibleVehicles = queryVehicles({
      selectedVehicleKind: "car",
      selectedFilters: {
        select: { make: [selectedMake] },
        range: {},
      },
    });

    expect(visibleVehicles.length).toBeGreaterThan(0);
    expect(visibleVehicles.every((vehicle) => vehicle.kind === "car")).toBe(true);
    expect(visibleVehicles.every((vehicle) => vehicle.kind === "car" && vehicle.make === selectedMake)).toBe(
      true,
    );
  });

  it("applies selected range filters inclusively", () => {
    const targetYear = spaceships[0].year;
    const visibleVehicles = queryVehicles({
      selectedVehicleKind: "spaceship",
      selectedFilters: {
        select: {},
        range: { year: { min: targetYear, max: targetYear } },
      },
    });

    expect(visibleVehicles.length).toBeGreaterThan(0);
    expect(
      visibleVehicles.every(
        (vehicle) => vehicle.kind === "spaceship" && vehicle.year === targetYear,
      ),
    ).toBe(true);
  });

  it("combines kind, search, selected filters, and sort constraints", () => {
    const targetCar = cars[0];
    const visibleVehicles = queryVehicles({
      selectedVehicleKind: "car",
      searchQuery: targetCar.model,
      selectedFilters: {
        select: { make: [targetCar.make] },
        range: { year: { min: targetCar.year, max: targetCar.year } },
      },
      sortOption: "year-desc",
    });

    expect(visibleVehicles.length).toBeGreaterThan(0);
    expect(
      visibleVehicles.every(
        (vehicle) =>
          vehicle.kind === "car" &&
          vehicle.make === targetCar.make &&
          vehicle.year === targetCar.year &&
          vehicle.model.toLowerCase().includes(targetCar.model.toLowerCase()),
      ),
    ).toBe(true);
  });

  it("sorts after filtering", () => {
    const visibleVehicles = queryVehicles({
      selectedVehicleKind: "spaceship",
      sortOption: "year-desc",
    });

    expect(visibleVehicles.map((vehicle) => vehicle.year)).toEqual(
      [...visibleVehicles].sort((firstVehicle, secondVehicle) =>
        secondVehicle.year - firstVehicle.year,
      ).map((vehicle) => vehicle.year),
    );
  });
});
