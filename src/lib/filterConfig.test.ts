import { describe, expect, it } from "@jest/globals";
import { bikes, cars, spaceships } from "@/data/loadVehicles";
import {
  createEmptySelectedFilters,
  getAvailableFilters,
  getVehicleValue,
  normalizeFilterRangeValue,
  type AvailableFilter,
  type FilterField,
  type RangeFilter,
  type SelectFilter,
} from "@/lib/filterConfig";

function selectFilters(filters: AvailableFilter[]) {
  return filters.filter((filter): filter is SelectFilter => filter.type === "select");
}

function rangeFilters(filters: AvailableFilter[]) {
  return filters.filter((filter): filter is RangeFilter => filter.type === "range");
}

function getDecimalPlaceCount(value: number) {
  return value.toString().split(".")[1]?.length ?? 0;
}

function expectedStep(values: number[]) {
  const maxDecimalPlaces = Math.max(...values.map(getDecimalPlaceCount));

  return maxDecimalPlaces === 0 ? 1 : 1 / 10 ** maxDecimalPlaces;
}

describe("filterConfig", () => {
  it("creates empty selected filter state", () => {
    expect(createEmptySelectedFilters()).toEqual({
      select: {},
      range: {},
    });
  });

  it("returns no filters when no vehicle kind is selected", () => {
    expect(getAvailableFilters()).toEqual([]);
  });

  it("returns the configured car filters", () => {
    const filters = getAvailableFilters("car");

    expect(selectFilters(filters).map((filter) => filter.field)).toEqual(["make", "seats"]);
    expect(rangeFilters(filters).map((filter) => filter.field)).toEqual([
      "year",
      "horsepower",
      "top_speed",
      "engine_size",
    ]);
  });

  it("returns the configured bike filters", () => {
    const filters = getAvailableFilters("bike");

    expect(selectFilters(filters).map((filter) => filter.field)).toEqual([
      "type",
      "brand",
      "gears",
      "wheel_size",
    ]);
    expect(rangeFilters(filters).map((filter) => filter.field)).toEqual(["year"]);
  });

  it("returns the configured spaceship filters", () => {
    const filters = getAvailableFilters("spaceship");

    expect(selectFilters(filters).map((filter) => filter.field)).toEqual([
      "manufacturer",
      "max_crew",
    ]);
    expect(rangeFilters(filters).map((filter) => filter.field)).toEqual([
      "top_speed",
      "year",
    ]);
  });

  it("derives unique sorted select options from the selected kind dataset", () => {
    const brandFilter = selectFilters(getAvailableFilters("bike")).find(
      (filter) => filter.field === "brand",
    );
    const expectedBrands = Array.from(new Set(bikes.map((bike) => bike.brand))).sort((a, b) =>
      a.localeCompare(b),
    );

    expect(brandFilter?.options).toEqual(expectedBrands);
  });

  it("derives integer range steps for integer-only fields", () => {
    const yearFilter = rangeFilters(getAvailableFilters("car")).find(
      (filter) => filter.field === "year",
    );

    expect(yearFilter).toMatchObject({
      min: Math.min(...cars.map((car) => car.year)),
      max: Math.max(...cars.map((car) => car.year)),
      step: 1,
    });
  });

  it("derives decimal range steps for fractional fields", () => {
    const topSpeedValues = spaceships.map((spaceship) => spaceship.top_speed);
    const topSpeedFilter = rangeFilters(getAvailableFilters("spaceship")).find(
      (filter) => filter.field === "top_speed",
    );

    expect(topSpeedFilter).toMatchObject({
      min: Math.min(...topSpeedValues),
      max: Math.max(...topSpeedValues),
      step: expectedStep(topSpeedValues),
    });
  });

  it("normalizes slider values to the configured range precision", () => {
    expect(normalizeFilterRangeValue(1.234567, 0.01)).toBe(1.23);
    expect(normalizeFilterRangeValue(2021.49, 1)).toBe(2021);
  });

  it("reads configured fields from mixed vehicle records", () => {
    expect(getVehicleValue(cars[0], "make")).toBe(cars[0].make);
    expect(getVehicleValue(spaceships[0], "manufacturer" as FilterField)).toBe(
      spaceships[0].manufacturer,
    );
  });
});
