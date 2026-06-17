import bikesRawData from "../../data/bikes.json";
import carsRawData from "../../data/cars.json";
import spaceshipsRawData from "../../data/spaceships.json";
import type { Bike, Car, Spaceship, Vehicle } from "@/types/vehicle";

const cars = carsRawData.slice(1).map((car) => ({
  ...car,
  kind: "car" as const,
})) as Car[];

const bikes = bikesRawData.slice(1).map((bike) => ({
  ...bike,
  kind: "bike" as const,
})) as Bike[];

const spaceships = spaceshipsRawData.slice(1).map((spaceship) => ({
  ...spaceship,
  kind: "spaceship" as const,
})) as Spaceship[];

export const vehicles: Vehicle[] = [
  ...cars,
  ...bikes,
  ...spaceships,
];