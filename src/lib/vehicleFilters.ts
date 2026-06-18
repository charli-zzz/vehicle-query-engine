import type { VehicleTab } from "@/lib/vehicleOptions";
import { vehicles } from "@/lib/vehicles";
import type { Bike, Car, Spaceship, Vehicle } from "@/types/vehicle";

type VehicleKind = Exclude<VehicleTab, "all">;
export type FilterField = keyof Car | keyof Bike | keyof Spaceship;
export type FilterValue = string | number;

export type SelectFilter = {
  type: "select";
  field: FilterField;
  label: string;
  options: FilterValue[];
};

export type RangeFilter = {
  type: "range";
  field: FilterField;
  label: string;
  min: number;
  max: number;
  step: number;
};

export type AvailableFilter = SelectFilter | RangeFilter;

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

export function createEmptySelectedFilters(): SelectedFilters {
  return {
    select: {},
    range: {},
  };
}

function getFilterLabel(field: FilterField) {
  return filterLabels[field] ?? String(field);
}

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

export function getAvailableFilters(selectedTab: VehicleTab): AvailableFilter[] {
  if (selectedTab === "all") {
    return [];
  }

  const config = vehicleFilterConfig[selectedTab];
  const vehiclesForType = vehicles.filter((vehicle) => vehicle.kind === selectedTab);

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
