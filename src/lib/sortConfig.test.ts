import { describe, expect, it } from "@jest/globals";
import { sortVehicles } from "@/lib/sortConfig";
import type { Vehicle } from "@/types/vehicle";

const vehiclesToSort: Vehicle[] = [
  {
    kind: "car",
    colour: "red",
    engine_size: 2,
    horsepower: 250,
    make: "Acme",
    model: "Zephyr",
    seats: 4,
    top_speed: 220,
    year: 2020,
  },
  {
    kind: "bike",
    brand: "Orbit",
    gears: 10,
    model: "Atlas",
    type: "Road",
    wheel_size: 28,
    year: 2024,
  },
  {
    kind: "spaceship",
    manufacturer: "Nova Works",
    max_crew: 12,
    model: "Comet",
    top_speed: 0.45,
    year: 1999,
  },
];

describe("sortVehicles", () => {
  it("sorts by model name from A to Z", () => {
    const sortedVehicles = sortVehicles(vehiclesToSort, "model-asc");

    expect(sortedVehicles.map((vehicle) => vehicle.model)).toEqual([
      "Atlas",
      "Comet",
      "Zephyr",
    ]);
  });

  it("sorts by newest year first", () => {
    const sortedVehicles = sortVehicles(vehiclesToSort, "year-desc");

    expect(sortedVehicles.map((vehicle) => vehicle.year)).toEqual([2024, 2020, 1999]);
  });

  it("sorts by oldest year first", () => {
    const sortedVehicles = sortVehicles(vehiclesToSort, "year-asc");

    expect(sortedVehicles.map((vehicle) => vehicle.year)).toEqual([1999, 2020, 2024]);
  });

  it("does not mutate the input array", () => {
    const originalOrder = vehiclesToSort.map((vehicle) => vehicle.model);

    sortVehicles(vehiclesToSort, "model-asc");

    expect(vehiclesToSort.map((vehicle) => vehicle.model)).toEqual(originalOrder);
  });
});
