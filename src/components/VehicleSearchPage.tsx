import { FilterPanel } from "@/components/FilterPanel";
import { SearchAndSortBar } from "@/components/SearchAndSortBar";
import { VehicleResultList } from "@/components/VehicleResultList";
import { VehicleTypeTabs } from "@/components/VehicleTypeTabs";
import { vehicles } from "@/lib/vehicles";

export function VehicleSearchPage() {
  return (
    <main className="h-screen overflow-hidden bg-zinc-50 px-5 py-6 text-zinc-950 sm:px-8 lg:px-10">
      <div className="mx-auto flex h-full max-w-6xl flex-col gap-6">
        <header className="shrink-0 space-y-3">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl font-semibold tracking-normal text-zinc-950">
              Vehicle Query Engine
            </h1>
            <p className="text-base leading-7 text-zinc-600">
              Search across cars, bikes, and spaceships, then narrow results with filters
              that adapt to each vehicle type.
            </p>
          </div>
        </header>

        <SearchAndSortBar />
        <VehicleTypeTabs />

        <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[280px_1fr]">
          <FilterPanel />
          <VehicleResultList vehicles={vehicles} />
        </div>
      </div>
    </main>
  );
}
