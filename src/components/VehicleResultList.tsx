import type { Vehicle } from "@/types/vehicle";
import { BikeCard } from "@/components/BikeCard";
import { CarCard } from "@/components/CarCard";
import { SpaceshipCard } from "@/components/SpaceshipCard";

type VehicleResultListProps = {
  vehicles: Vehicle[];
};

export function VehicleResultList({ vehicles }: VehicleResultListProps) {
  return (
    <section className="flex min-h-0 flex-col gap-4">
      <div className="shrink-0 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-950">
            {vehicles.length} vehicles found
          </h2>
          <p className="text-sm text-zinc-500">Showing vehicles from the provided dataset.</p>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 pb-2">
          {vehicles.map((vehicle) => (
            <div key={`${vehicle.kind}-${vehicle.model}`}>
              {vehicle.kind === "car" && <CarCard car={vehicle} />}
              {vehicle.kind === "bike" && <BikeCard bike={vehicle} />}
              {vehicle.kind === "spaceship" && <SpaceshipCard spaceship={vehicle} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
