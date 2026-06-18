export const vehicleTabs = [
  { label: "All", value: "all" },
  { label: "Cars", value: "car" },
  { label: "Bikes", value: "bike" },
  { label: "Spaceships", value: "spaceship" },
] as const;

export type VehicleTab = (typeof vehicleTabs)[number]["value"];

export const sortOptions = [
  { label: "Model A-Z", value: "model-asc" },
  { label: "Newest first", value: "year-desc" },
  { label: "Oldest first", value: "year-asc" },
] as const;

export type SortOption = (typeof sortOptions)[number]["value"];
