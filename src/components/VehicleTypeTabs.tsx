const vehicleTypes = ["All", "Cars", "Bikes", "Spaceships"];

export function VehicleTypeTabs() {
  return (
    <div className="flex shrink-0 flex-wrap gap-2">
      {vehicleTypes.map((vehicleType) => (
        <button
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-950 first:border-zinc-950 first:bg-zinc-950 first:text-white"
          key={vehicleType}
          type="button"
        >
          {vehicleType}
        </button>
      ))}
    </div>
  );
}
