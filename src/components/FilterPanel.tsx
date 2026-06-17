export function FilterPanel() {
  return (
    <aside className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-zinc-950">Filters</h2>
        <button className="text-sm font-medium text-zinc-500 hover:text-zinc-950" type="button">
          Clear
        </button>
      </div>

      <div className="mt-5 space-y-6">
        <section>
          <h3 className="text-sm font-semibold text-zinc-800">Year</h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <input
              className="h-10 rounded-md border border-zinc-300 px-3 text-sm text-zinc-950"
              defaultValue="1951"
              aria-label="Minimum year"
            />
            <input
              className="h-10 rounded-md border border-zinc-300 px-3 text-sm text-zinc-950"
              defaultValue="2024"
              aria-label="Maximum year"
            />
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-zinc-800">Type-specific filters</h3>
          <div className="mt-3 space-y-2 text-sm text-zinc-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Example option
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Another option
            </label>
          </div>
        </section>
      </div>
    </aside>
  );
}
