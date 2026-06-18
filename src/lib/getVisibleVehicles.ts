import { vehicles } from "@/data/loadVehicles";
import {
  getVehicleValue,
  type FilterField,
  type SelectedFilters,
} from "@/lib/filterConfig";
import { sortVehicles, type SortOption } from "@/lib/sortConfig";
import type { Vehicle, VehicleTab } from "@/types/vehicle";

// Query pipeline for the visible result list. Every state change re-runs this
// against the full local dataset so the UI never layers stale intermediate
// result sets.
export type VehicleQueryConstraints = {
  selectedTab: VehicleTab;
  searchQuery: string;
  selectedFilters: SelectedFilters;
  sortOption: SortOption;
};

function matchesVehicleType(vehicle: Vehicle, selectedTab: VehicleTab) {
  return selectedTab === "all" || vehicle.kind === selectedTab;
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

export function getVisibleVehicles({
  selectedTab,
  searchQuery,
  selectedFilters,
  sortOption,
}: VehicleQueryConstraints) {
  const matchingVehicles = vehicles.filter(
    (vehicle) =>
      matchesVehicleType(vehicle, selectedTab) &&
      matchesSearchQuery(vehicle, searchQuery) &&
      matchesSelectedFilters(vehicle, selectedFilters),
  );

  return sortVehicles(matchingVehicles, sortOption);
}
