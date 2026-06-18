/** Vehicle shape loaded from the cars dataset. */
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

/** Vehicle shape loaded from the bikes dataset. */
export type Bike = {
  kind: "bike";
  brand: string;
  gears: number;
  model: string;
  type: string;
  wheel_size: number;
  year: number;
};

/** Vehicle shape loaded from the spaceships dataset. */
export type Spaceship = {
  kind: "spaceship";
  manufacturer: string;
  max_crew: number;
  model: string;
  top_speed: number;
  year: number;
};

/** Union type for rendering and querying the mixed result list. */
export type Vehicle = Car | Bike | Spaceship;

/** Real data category stored on each vehicle record. */
export type VehicleKind = Vehicle["kind"];

/** UI-level result view. "all" is a browsing mode, not a vehicle kind. */
export type VehicleView = "all" | VehicleKind;
