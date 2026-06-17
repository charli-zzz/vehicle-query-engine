const vehicleTypes = ["All", "Cars", "Bikes", "Spaceships"];

export function VehicleTypeTabs() {
  return (
    <div className="shrink-0 border-b border-zinc-300">
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
      {vehicleTypes.map((vehicleType) => (
        <button
          className="relative top-px min-h-12 rounded-t-lg border border-zinc-300 bg-zinc-100 px-4 py-3 text-center text-sm font-semibold text-zinc-600 transition hover:bg-white hover:text-zinc-950 first:border-b-white first:bg-white first:text-zinc-950 first:shadow-[0_-2px_0_0_#18181b_inset]"
          key={vehicleType}
          type="button"
        >
          {vehicleType}
        </button>
      ))}
      </div>
    </div>
  );
}
