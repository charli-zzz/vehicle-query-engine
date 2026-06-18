import { sortOptions, type SortOption } from "@/lib/sortConfig";

type SortControlProps = {
  sortOption: SortOption;
  onSortOptionChange: (sortOption: SortOption) => void;
};

export function SortControl({
  sortOption,
  onSortOptionChange,
}: SortControlProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 sm:w-56">
      Sort
      <select
        className="h-11 rounded-md border border-zinc-300 bg-white px-3 text-base text-zinc-950 outline-none transition focus:border-zinc-950"
        value={sortOption}
        onChange={(event) => onSortOptionChange(event.target.value as SortOption)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
