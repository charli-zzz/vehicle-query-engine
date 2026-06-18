import type { SortOption, VehicleTab } from "@/lib/vehicleOptions";
import { vehicles } from "@/lib/vehicles";
import type { Vehicle } from "@/types/vehicle";

export type VehicleQueryConstraints = {
  selectedTab: VehicleTab;
  searchQuery: string;
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

  return Object.values(vehicle).some((value) =>
    String(value).toLowerCase().includes(normalizedSearchQuery),
  );
}

function sortVehicles(vehiclesToSort: Vehicle[], sortOption: SortOption) {
  return [...vehiclesToSort].sort((firstVehicle, secondVehicle) => {
    if (sortOption === "year-desc") {
      return secondVehicle.year - firstVehicle.year;
    }

    if (sortOption === "year-asc") {
      return firstVehicle.year - secondVehicle.year;
    }

    return firstVehicle.model.localeCompare(secondVehicle.model);
  });
}

export function getVisibleVehicles({
  selectedTab,
  searchQuery,
  sortOption,
}: VehicleQueryConstraints) {
  const matchingVehicles = vehicles.filter(
    (vehicle) =>
      matchesVehicleType(vehicle, selectedTab) && matchesSearchQuery(vehicle, searchQuery),
  );

  return sortVehicles(matchingVehicles, sortOption);
}
