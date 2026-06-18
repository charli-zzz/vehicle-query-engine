import Image from "next/image";
import type { Bike } from "@/types/vehicle";

type BikeCardProps = {
  bike: Bike;
};

export function BikeCard({ bike }: BikeCardProps) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:border-zinc-300">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Bike</p>
            <h3 className="mt-1 text-lg font-semibold text-zinc-950">{bike.model}</h3>
          </div>
          <Image
            alt="Bike"
            className="shrink-0 rounded-md object-contain"
            height={28}
            src="/vehicles/bike.jpg"
            width={28}
          />
        </div>
        <p className="mt-1 text-sm text-zinc-600">
          {bike.brand} · {bike.year}
        </p>
        <p className="mt-4 text-sm font-medium text-zinc-700">
          {bike.type} · {bike.gears} gears
        </p>
        <p className="mt-2 text-sm text-zinc-500">{bike.wheel_size} in wheels</p>
      </div>
    </article>
  );
}
