import { vehicles } from "@/data/loadVehicles";
import {
  getVehicleValue,
  type FilterField,
  type SelectedFilters,
} from "@/lib/filterConfig";
import { sortVehicles, type SortOption } from "@/lib/sortConfig";
import type { Vehicle, VehicleKind } from "@/types/vehicle";

/**
 * Constraints applied to the full local dataset to produce the visible results.
 * Callers pass query constraints, not UI view names; undefined
 * selectedVehicleKind means no kind restriction.
 */
export type VehicleQueryConstraints = {
  selectedVehicleKind?: VehicleKind;
  searchQuery: string;
  selectedFilters: SelectedFilters;
  sortOption: SortOption;
};

function matchesVehicleKind(vehicle: Vehicle, selectedVehicleKind?: VehicleKind) {
  return selectedVehicleKind === undefined || vehicle.kind === selectedVehicleKind;
}

function matchesSearchQuery(vehicle: Vehicle, searchQuery: string) {
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  if (normalizedSearchQuery === "") {
    return true;
  }

  // Search is intentionally generic rather than config-driven: the contract
  // requires searching across every attribute for each vehicle.
  return Object.values(vehicle).some((value) =>
    String(value).toLowerCase().includes(normalizedSearchQuery),
  );
}

function matchesSelectFilters(vehicle: Vehicle, selectedFilters: SelectedFilters) {
  return Object.entries(selectedFilters.select).every(([field, selectedValues]) => {
    if (selectedValues === undefined || selectedValues.length === 0) {
      return true;
    }

    return selectedValues.includes(getVehicleValue(vehicle, field as FilterField));
  });
}

function matchesRangeFilters(vehicle: Vehicle, selectedFilters: SelectedFilters) {
  return Object.entries(selectedFilters.range).every(([field, selectedRange]) => {
    if (selectedRange === undefined) {
      return true;
    }

    const vehicleValue = Number(getVehicleValue(vehicle, field as FilterField));
    const isAboveMinimum = selectedRange.min === undefined || vehicleValue >= selectedRange.min;
    const isBelowMaximum = selectedRange.max === undefined || vehicleValue <= selectedRange.max;

    return isAboveMinimum && isBelowMaximum;
  });
}

function matchesSelectedFilters(vehicle: Vehicle, selectedFilters: SelectedFilters) {
  return (
    matchesSelectFilters(vehicle, selectedFilters) &&
    matchesRangeFilters(vehicle, selectedFilters)
  );
}

/**
 * Applies kind, search, custom filters, and sort to the full local dataset.
 * This avoids layering stale intermediate result arrays in React state.
 */
export function getVisibleVehicles({
  selectedVehicleKind,
  searchQuery,
  selectedFilters,
  sortOption,
}: VehicleQueryConstraints) {
  const matchingVehicles = vehicles.filter(
    (vehicle) =>
      matchesVehicleKind(vehicle, selectedVehicleKind) &&
      matchesSearchQuery(vehicle, searchQuery) &&
      matchesSelectedFilters(vehicle, selectedFilters),
  );

  return sortVehicles(matchingVehicles, sortOption);
}
