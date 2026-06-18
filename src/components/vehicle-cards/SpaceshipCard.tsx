import Image from "next/image";
import type { Spaceship } from "@/types/vehicle";

type SpaceshipCardProps = {
  spaceship: Spaceship;
};

export function SpaceshipCard({ spaceship }: SpaceshipCardProps) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:border-zinc-300">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Spaceship</p>
            <h3 className="mt-1 text-lg font-semibold text-zinc-950">{spaceship.model}</h3>
          </div>
          <Image
            alt="Spaceship"
            className="shrink-0 rounded-md object-contain"
            height={28}
            src="/vehicles/spaceship.png"
            width={28}
          />
        </div>
        <p className="mt-1 text-sm text-zinc-600">
          {spaceship.manufacturer} · {spaceship.year}
        </p>
        <p className="mt-4 text-sm font-medium text-zinc-700">
          {spaceship.max_crew} crew · {spaceship.top_speed}c top speed
        </p>
      </div>
    </article>
  );
}
