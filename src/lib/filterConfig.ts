import { bikes, cars, spaceships } from "@/data/loadVehicles";
import type { Bike, Car, Spaceship, Vehicle, VehicleKind } from "@/types/vehicle";

/**
 * Field names that can participate in configured select or range filters.
 * The config below decides which fields are actually available per kind.
 */
export type FilterField = keyof Car | keyof Bike | keyof Spaceship;

/** Primitive values supported by select filters and generic vehicle lookups. */
export type FilterValue = string | number;

/** Discrete option filter derived from a configured field. */
export type SelectFilter = {
  type: "select";
  field: FilterField;
  label: string;
  options: FilterValue[];
};

/** Numeric range filter derived from a configured field. */
export type RangeFilter = {
  type: "range";
  field: FilterField;
  label: string;
  min: number;
  max: number;
  step: number;
};

/** Filter definitions rendered by the filter panel for the selected kind. */
export type AvailableFilter = SelectFilter | RangeFilter;

/** User-selected select and range constraints keyed by vehicle field. */
export type SelectedFilters = {
  select: Partial<Record<FilterField, FilterValue[]>>;
  range: Partial<Record<FilterField, { min?: number; max?: number }>>;
};

const vehicleFilterConfig = {
  car: {
    select: ["make", "seats"],
    range: ["year", "horsepower", "top_speed", "engine_size"],
  },
  bike: {
    select: ["type", "brand", "gears", "wheel_size"],
    range: ["year"],
  },
  spaceship: {
    select: ["manufacturer", "max_crew"],
    range: ["top_speed", "year"],
  },
} satisfies Record<VehicleKind, { select: FilterField[]; range: FilterField[] }>;

// Keep filter derivation tied to the original datasets instead of filtering the
// combined All list. This preserves type-specific filter behavior.
const vehiclesByKind = {
  car: cars,
  bike: bikes,
  spaceship: spaceships,
} satisfies Record<VehicleKind, Vehicle[]>;

const filterLabels: Partial<Record<FilterField, string>> = {
  brand: "Brand",
  engine_size: "Engine size",
  gears: "Gears",
  horsepower: "Horsepower",
  make: "Make",
  manufacturer: "Manufacturer",
  max_crew: "Max crew",
  seats: "Seats",
  top_speed: "Top speed",
  type: "Type",
  wheel_size: "Wheel size",
  year: "Year",
};

/**
 * Creates the empty selected-filter state used by the page and clear action.
 */
export function createEmptySelectedFilters(): SelectedFilters {
  return {
    select: {},
    range: {},
  };
}

function getFilterLabel(field: FilterField) {
  return filterLabels[field] ?? String(field);
}

/**
 * Reads a configured field from a vehicle in the mixed union.
 */
export function getVehicleValue(vehicle: Vehicle, field: FilterField) {
  return (vehicle as unknown as Record<FilterField, FilterValue>)[field];
}

function compareFilterValues(firstValue: FilterValue, secondValue: FilterValue) {
  if (typeof firstValue === "number" && typeof secondValue === "number") {
    return firstValue - secondValue;
  }

  return String(firstValue).localeCompare(String(secondValue));
}

function getSelectOptions(vehiclesForType: Vehicle[], field: FilterField) {
  return Array.from(
    new Set(vehiclesForType.map((vehicle) => getVehicleValue(vehicle, field))),
  ).sort(compareFilterValues);
}

function getDecimalPlaceCount(value: number) {
  const decimalValue = value.toString().split(".")[1];

  return decimalValue?.length ?? 0;
}

/**
 * Rounds slider values to the precision implied by the configured step.
 */
export function normalizeFilterRangeValue(value: number, step: number) {
  return Number(value.toFixed(getDecimalPlaceCount(step)));
}

function getRangeBounds(vehiclesForType: Vehicle[], field: FilterField) {
  const values = vehiclesForType.map((vehicle) => Number(getVehicleValue(vehicle, field)));
  const maxDecimalPlaces = Math.max(...values.map(getDecimalPlaceCount));
  const step = maxDecimalPlaces === 0 ? 1 : 1 / 10 ** maxDecimalPlaces;

  return {
    min: Math.min(...values),
    max: Math.max(...values),
    step,
  };
}

/**
 * Returns filter definitions for a real vehicle kind. Passing undefined means
 * the All view is active, so no type-specific filters are available.
 */
export function getAvailableFilters(selectedVehicleKind?: VehicleKind): AvailableFilter[] {
  if (selectedVehicleKind === undefined) {
    return [];
  }

  const config = vehicleFilterConfig[selectedVehicleKind];
  const vehiclesForType = vehiclesByKind[selectedVehicleKind];

  const selectFilters = config.select.map((field) => ({
    type: "select" as const,
    field,
    label: getFilterLabel(field),
    options: getSelectOptions(vehiclesForType, field),
  }));

  const rangeFilters = config.range.map((field) => ({
    type: "range" as const,
    field,
    label: getFilterLabel(field),
    ...getRangeBounds(vehiclesForType, field),
  }));

  return [...selectFilters, ...rangeFilters];
}
