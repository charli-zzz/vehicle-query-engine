"use client";

import { FilterPanel } from "@/components/FilterPanel";
import { SearchControl } from "@/components/SearchControl";
import { SortControl } from "@/components/SortControl";
import { VehicleResultList } from "@/components/VehicleResultList";
import { VehicleTypeTabs } from "@/components/VehicleTypeTabs";
import {
  createEmptySelectedFilters,
  getAvailableFilters,
  type FilterField,
  type FilterValue,
} from "@/lib/filterConfig";
import { getVisibleVehicles } from "@/lib/getVisibleVehicles";
import type { SortOption } from "@/lib/sortConfig";
import type { VehicleTab } from "@/types/vehicle";
import Image from "next/image";
import { useState } from "react";

export function VehicleSearchPage() {
  const [selectedTab, setSelectedTab] = useState<VehicleTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState(createEmptySelectedFilters);
  const [sortOption, setSortOption] = useState<SortOption>("model-asc");

  const availableFilters = getAvailableFilters(selectedTab);
  const visibleVehicles = getVisibleVehicles({
    selectedTab,
    searchQuery,
    selectedFilters,
    sortOption,
  });

  function handleSelectTab(vehicleTab: VehicleTab) {
    setSelectedTab(vehicleTab);
    setSelectedFilters(createEmptySelectedFilters());
  }

  function handleSelectFilterChange(field: FilterField, value: FilterValue) {
    setSelectedFilters((currentFilters) => {
      const currentValues = currentFilters.select[field] ?? [];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((currentValue) => currentValue !== value)
        : [...currentValues, value];

      return {
        ...currentFilters,
        select: {
          ...currentFilters.select,
          [field]: nextValues,
        },
      };
    });
  }

  function handleRangeFilterChange(field: FilterField, range: { min: number; max: number }) {
    setSelectedFilters((currentFilters) => ({
      ...currentFilters,
      range: {
        ...currentFilters.range,
        [field]: range,
      },
    }));
  }

  return (
    <main className="h-screen overflow-hidden bg-zinc-50 px-5 py-6 text-zinc-950 sm:px-8 lg:px-10">
      <div className="mx-auto flex h-full max-w-6xl flex-col gap-6">
        <header className="shrink-0 space-y-3">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-3">
              <Image
                alt=""
                aria-hidden="true"
                className="h-[72px] w-[72px] rounded-lg object-cover"
                height={72}
                src="/icon.png"
                width={72}
              />
              <h1 className="text-4xl font-semibold tracking-normal text-zinc-950">
                Vehicle Query Engine
              </h1>
            </div>
            <p className="text-base leading-7 text-zinc-600">
              Search across cars, bikes, and spaceships, then narrow results with filters
              that adapt to each vehicle type.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row">
          <SearchControl
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
          />
          <SortControl sortOption={sortOption} onSortOptionChange={setSortOption} />
        </div>
        <VehicleTypeTabs selectedTab={selectedTab} onSelectTab={handleSelectTab} />

        <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[280px_1fr]">
          <FilterPanel
            availableFilters={availableFilters}
            selectedFilters={selectedFilters}
            onClearFilters={() => setSelectedFilters(createEmptySelectedFilters())}
            onRangeFilterChange={handleRangeFilterChange}
            onSelectFilterChange={handleSelectFilterChange}
          />
          <VehicleResultList vehicles={visibleVehicles} />
        </div>
      </div>
    </main>
  );
}
