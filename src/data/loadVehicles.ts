import bikesRawData from "../../data/bikes.json";
import carsRawData from "../../data/cars.json";
import spaceshipsRawData from "../../data/spaceships.json";
import type { Bike, Car, Spaceship, Vehicle } from "@/types/vehicle";

/**
 * Cars loaded from local JSON with a discriminating kind added for the shared
 * result list.
 */
export const cars = carsRawData.slice(1).map((car) => ({
  ...car,
  kind: "car" as const,
})) as Car[];

/** Bikes loaded from local JSON with a discriminating kind added. */
export const bikes = bikesRawData.slice(1).map((bike) => ({
  ...bike,
  kind: "bike" as const,
})) as Bike[];

/** Spaceships loaded from local JSON with a discriminating kind added. */
export const spaceships = spaceshipsRawData.slice(1).map((spaceship) => ({
  ...spaceship,
  kind: "spaceship" as const,
})) as Spaceship[];

/** Combined local dataset used by the query pipeline and mixed All view. */
export const vehicles: Vehicle[] = [
  ...cars,
  ...bikes,
  ...spaceships,
];
