import type { VehicleView } from "@/types/vehicle";

const vehicleViewTabs = [
  { label: "All", value: "all" },
  { label: "Cars", value: "car" },
  { label: "Bikes", value: "bike" },
  { label: "Spaceships", value: "spaceship" },
] as const satisfies readonly { label: string; value: VehicleView }[];

type VehicleTypeTabsProps = {
  selectedView: VehicleView;
  onSelectView: (vehicleView: VehicleView) => void;
};

export function VehicleTypeTabs({ selectedView, onSelectView }: VehicleTypeTabsProps) {
  return (
    <div className="flex shrink-0 flex-wrap gap-2">
      {vehicleViewTabs.map((vehicleViewTab) => {
        const isActive = selectedView === vehicleViewTab.value;

        return (
          <button
            className={
              isActive
                ? "rounded-full border border-zinc-950 bg-zinc-950 px-4 py-2 text-sm font-medium text-white"
                : "rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-950"
            }
            key={vehicleViewTab.value}
            type="button"
            onClick={() => onSelectView(vehicleViewTab.value)}
          >
            {vehicleViewTab.label}
          </button>
        );
      })}
    </div>
  );
}
