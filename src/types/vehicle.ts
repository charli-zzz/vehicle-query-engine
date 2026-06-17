export type Car = {
  kind: "car";
  colour: string;
  engine_size: number;
  horsepower: number;
  make: string;
  model: string;
  seats: number;
  top_speed: number;
  year: number;
};

export type Bike = {
  kind: "bike";
  brand: string;
  gears: number;
  model: string;
  type: string;
  wheel_size: number;
  year: number;
};

export type Spaceship = {
  kind: "spaceship";
  manufacturer: string;
  max_crew: number;
  model: string;
  top_speed: number;
  year: number;
};

export type Vehicle = Car | Bike | Spaceship;

export const vehicleTabs = [
  { label: "All", value: "all" },
  { label: "Cars", value: "car" },
  { label: "Bikes", value: "bike" },
  { label: "Spaceships", value: "spaceship" },
] as const;

export type VehicleTab = (typeof vehicleTabs)[number]["value"];
