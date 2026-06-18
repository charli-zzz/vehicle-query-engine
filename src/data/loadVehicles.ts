import bikesRawData from "../../data/bikes.json";
import carsRawData from "../../data/cars.json";
import spaceshipsRawData from "../../data/spaceships.json";
import type { Bike, Car, Spaceship, Vehicle } from "@/types/vehicle";

// Loads the static JSON datasets and adds a discriminating `kind` field so the
// UI can render one mixed result list without losing type-specific behavior.
export const cars = carsRawData.slice(1).map((car) => ({
  ...car,
  kind: "car" as const,
})) as Car[];

export const bikes = bikesRawData.slice(1).map((bike) => ({
  ...bike,
  kind: "bike" as const,
})) as Bike[];

export const spaceships = spaceshipsRawData.slice(1).map((spaceship) => ({
  ...spaceship,
  kind: "spaceship" as const,
})) as Spaceship[];

export const vehicles: Vehicle[] = [
  ...cars,
  ...bikes,
  ...spaceships,
];
