import type { Vehicle } from "@/types/vehicle";

/**
 * Sort choices shared by every result view after filtering/searching.
 */
export const sortOptions = [
  { label: "Model A-Z", value: "model-asc" },
  { label: "Newest first", value: "year-desc" },
  { label: "Oldest first", value: "year-asc" },
] as const;

/** Supported sort option values derived from the rendered sort choices. */
export type SortOption = (typeof sortOptions)[number]["value"];

/**
 * Sorts a copy of the provided vehicles so callers never have their source
 * array order mutated.
 */
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
