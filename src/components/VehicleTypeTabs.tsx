import { vehicleTabs, type VehicleTab } from "@/lib/filterConfig";

type VehicleTypeTabsProps = {
  selectedTab: VehicleTab;
  onSelectTab: (vehicleTab: VehicleTab) => void;
};

export function VehicleTypeTabs({ selectedTab, onSelectTab }: VehicleTypeTabsProps) {
  return (
    <div className="flex shrink-0 flex-wrap gap-2">
      {vehicleTabs.map((vehicleTab) => {
        const isActive = selectedTab === vehicleTab.value;

        return (
          <button
            className={
              isActive
                ? "rounded-full border border-zinc-950 bg-zinc-950 px-4 py-2 text-sm font-medium text-white"
                : "rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-950"
            }
            key={vehicleTab.value}
            type="button"
            onClick={() => onSelectTab(vehicleTab.value)}
          >
            {vehicleTab.label}
          </button>
        );
      })}
    </div>
  );
}
