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
import type { VehicleView } from "@/types/vehicle";
import Image from "next/image";
import { useState } from "react";

/**
 * Owns the vehicle query UI state and coordinates search, sort, kind selection,
 * filter selection, and result rendering.
 */
export function VehicleSearchPage() {
  const [selectedView, setSelectedView] = useState<VehicleView>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState(createEmptySelectedFilters);
  const [sortOption, setSortOption] = useState<SortOption>("model-asc");

  const selectedVehicleKind = selectedView === "all" ? undefined : selectedView;
  const availableFilters = getAvailableFilters(selectedVehicleKind);
  const visibleVehicles = getVisibleVehicles({
    selectedVehicleKind,
    searchQuery,
    selectedFilters,
    sortOption,
  });

  function handleSelectView(vehicleView: VehicleView) {
    setSelectedView(vehicleView);
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
    <main className="min-h-screen bg-zinc-50 px-4 py-5 text-zinc-950 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-5">
        <header className="space-y-2">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-3">
              <Image
                alt=""
                aria-hidden="true"
                className="h-12 w-12 rounded-lg object-cover sm:h-14 sm:w-14"
                height={56}
                src="/icon.png"
                width={56}
              />
              <h1 className="text-2xl font-semibold tracking-normal text-zinc-950 sm:text-3xl">
                Vehicle Query Engine
              </h1>
            </div>
            <p className="text-sm leading-6 text-zinc-600 sm:text-base">
              Search across cars, bikes, and spaceships, then narrow results with filters
              that adapt to each vehicle type.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-3 shadow-sm sm:flex-row sm:p-4">
          <SearchControl
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
          />
          <SortControl sortOption={sortOption} onSortOptionChange={setSortOption} />
        </div>
        <VehicleTypeTabs selectedView={selectedView} onSelectView={handleSelectView} />

        <div className="grid gap-5 lg:grid-cols-[280px_1fr] lg:items-start">
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
