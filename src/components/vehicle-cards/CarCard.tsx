import Image from "next/image";
import type { Car } from "@/types/vehicle";

type CarCardProps = {
  car: Car;
};

export function CarCard({ car }: CarCardProps) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:border-zinc-300">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Car</p>
            <h3 className="mt-1 text-lg font-semibold text-zinc-950">{car.model}</h3>
          </div>
          <Image
            alt="Car"
            className="shrink-0 rounded-md object-contain"
            height={28}
            src="/vehicles/car.png"
            width={28}
          />
        </div>
        <p className="mt-1 text-sm text-zinc-600">
          {car.make} · {car.year}
        </p>
        <p className="mt-4 text-sm font-medium text-zinc-700">
          {car.seats} seats · {car.horsepower} hp · {car.top_speed} km/h
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          {car.engine_size}L engine · {car.colour}
        </p>
      </div>
    </article>
  );
}
