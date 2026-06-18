import * as Slider from "@radix-ui/react-slider";
import {
  normalizeFilterRangeValue,
  type AvailableFilter,
  type FilterField,
  type FilterValue,
  type SelectedFilters,
} from "@/lib/filterConfig";

type FilterPanelProps = {
  availableFilters: AvailableFilter[];
  selectedFilters: SelectedFilters;
  onClearFilters: () => void;
  onRangeFilterChange: (field: FilterField, range: { min: number; max: number }) => void;
  onSelectFilterChange: (field: FilterField, value: FilterValue) => void;
};

/**
 * Renders the type-specific filter controls derived from the selected vehicle
 * kind and reports user selections back to the page state.
 */
export function FilterPanel({
  availableFilters,
  selectedFilters,
  onClearFilters,
  onRangeFilterChange,
  onSelectFilterChange,
}: FilterPanelProps) {
  const selectFilters = availableFilters.filter((filter) => filter.type === "select");
  const rangeFilters = availableFilters.filter((filter) => filter.type === "range");

  return (
    <aside className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-zinc-100 bg-white p-4">
        <h2 className="text-base font-semibold text-zinc-950">Filters</h2>
        <button
          className="text-sm font-medium text-zinc-500 hover:text-zinc-950"
          type="button"
          onClick={onClearFilters}
        >
          Clear
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-4">
        {availableFilters.length === 0 && (
          <p className="text-sm leading-6 text-zinc-500">
            Select a vehicle type to see filters for that category.
          </p>
        )}

        {selectFilters.map((filter) => {
          const selectedValues = selectedFilters.select[filter.field] ?? [];

          return (
            <section key={filter.field}>
              <h3 className="text-sm font-semibold text-zinc-800">{filter.label}</h3>
              <div className="mt-3 space-y-2 text-sm text-zinc-600">
                {filter.options.map((option) => (
                  <label className="flex items-center gap-2" key={`${filter.field}-${option}`}>
                    <input
                      checked={selectedValues.includes(option)}
                      type="checkbox"
                      onChange={() => onSelectFilterChange(filter.field, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </section>
          );
        })}

        {rangeFilters.map((filter) => {
          const selectedRange = selectedFilters.range[filter.field];
          const selectedMin = selectedRange?.min ?? filter.min;
          const selectedMax = selectedRange?.max ?? filter.max;

          return (
            <section key={filter.field}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-zinc-800">{filter.label}</h3>
                <span className="text-xs font-medium text-zinc-500">
                  {selectedMin} - {selectedMax}
                </span>
              </div>
              <Slider.Root
                className="relative mt-4 flex h-5 w-full touch-none select-none items-center"
                max={filter.max}
                min={filter.min}
                minStepsBetweenThumbs={1}
                step={filter.step}
                value={[selectedMin, selectedMax]}
                onValueChange={([nextMin, nextMax]) =>
                  onRangeFilterChange(filter.field, {
                    min: normalizeFilterRangeValue(nextMin, filter.step),
                    max: normalizeFilterRangeValue(nextMax, filter.step),
                  })
                }
              >
                <Slider.Track className="relative h-1 grow rounded-full bg-zinc-200">
                  <Slider.Range className="absolute h-full rounded-full bg-zinc-950" />
                </Slider.Track>
                <Slider.Thumb
                  aria-label={`Minimum ${filter.label.toLowerCase()}`}
                  className="block h-4 w-4 rounded-full border-2 border-zinc-950 bg-white shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
                />
                <Slider.Thumb
                  aria-label={`Maximum ${filter.label.toLowerCase()}`}
                  className="block h-4 w-4 rounded-full border-2 border-zinc-950 bg-white shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
                />
              </Slider.Root>
            </section>
          );
        })}
      </div>
    </aside>
  );
}
