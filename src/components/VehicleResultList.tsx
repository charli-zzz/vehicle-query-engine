const sampleVehicles = [
  {
    type: "Car",
    model: "EcoNova",
    maker: "Astoria Automotive",
    year: 2020,
    details: "5 seats · 214 hp · 253.6 km/h",
  },
  {
    type: "Bike",
    model: "Urbanite",
    maker: "EraCraft",
    year: 2014,
    details: "Road · 3 gears · 29 in wheels",
  },
  {
    type: "Spaceship",
    model: "Star Wanderer",
    maker: "Titan Galactic",
    year: 2021,
    details: "400 crew · 0.7098c top speed",
  },
];

export function VehicleResultList() {
  return (
    <section className="flex min-h-0 flex-col gap-4">
      <div className="shrink-0 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-950">120 vehicles found</h2>
          <p className="text-sm text-zinc-500">Showing a preview of the result card layout.</p>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-2">
        <div className="grid gap-4 pb-2">
        {sampleVehicles.map((vehicle) => (
          <article
            className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300"
            key={`${vehicle.type}-${vehicle.model}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {vehicle.type}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-zinc-950">{vehicle.model}</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  {vehicle.maker} · {vehicle.year}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-zinc-700">{vehicle.details}</p>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}
