import type { SortOption, VehicleTab } from "@/lib/vehicleOptions";
import { vehicles } from "@/lib/vehicles";
import type { Vehicle } from "@/types/vehicle";

export type VehicleQueryConstraints = {
  selectedTab: VehicleTab;
  sortOption: SortOption;
};

function matchesVehicleType(vehicle: Vehicle, selectedTab: VehicleTab) {
  return selectedTab === "all" || vehicle.kind === selectedTab;
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
  sortOption,
}: VehicleQueryConstraints) {
  const matchingVehicles = vehicles.filter((vehicle) => matchesVehicleType(vehicle, selectedTab));

  return sortVehicles(matchingVehicles, sortOption);
}
