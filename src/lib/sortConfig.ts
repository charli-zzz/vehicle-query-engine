import type { Vehicle } from "@/types/vehicle";

// Sorting is shared by all tabs, including All.
export const sortOptions = [
  { label: "Model A-Z", value: "model-asc" },
  { label: "Newest first", value: "year-desc" },
  { label: "Oldest first", value: "year-asc" },
] as const;

export type SortOption = (typeof sortOptions)[number]["value"];

export function sortVehicles(vehiclesToSort: Vehicle[], sortOption: SortOption) {
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
