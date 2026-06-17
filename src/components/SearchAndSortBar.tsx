export function SearchAndSortBar() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row">
      <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-zinc-700">
        Search
        <input
          className="h-11 rounded-md border border-zinc-300 px-3 text-base text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950"
          placeholder="Search model or maker"
          type="search"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 sm:w-56">
        Sort
        <select className="h-11 rounded-md border border-zinc-300 bg-white px-3 text-base text-zinc-950 outline-none transition focus:border-zinc-950">
          <option>Model A-Z</option>
          <option>Newest first</option>
          <option>Oldest first</option>
        </select>
      </label>
    </div>
  );
}
