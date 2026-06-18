import { vehicles } from "@/data/loadVehicles";
import {
  getVehicleValue,
  type FilterField,
  type SelectedFilters,
} from "@/lib/filterConfig";
import { sortVehicles, type SortOption } from "@/lib/sortConfig";
import type { Vehicle, VehicleKind } from "@/types/vehicle";


export type VehicleQueryConstraints = {
  // `selectedVehicleKind` is optional because the All view does not select a
  //  specific vehicle kind.
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

  // Search is intentionally generic rather than config-driven
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
 * Builds the visible vehicles from the full local dataset every time query
 * state changes. Kind, search, and custom filters decide which vehicles are
 * included; sorting is then applied as the final ordering step.
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
