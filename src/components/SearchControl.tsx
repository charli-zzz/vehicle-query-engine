type SearchControlProps = {
  searchQuery: string;
  onSearchQueryChange: (searchQuery: string) => void;
};

export function SearchControl({
  searchQuery,
  onSearchQueryChange,
}: SearchControlProps) {
  return (
    <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-zinc-700">
      Search
      <input
        className="h-11 rounded-md border border-zinc-300 px-3 text-base text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950"
        placeholder="Search any vehicle attribute"
        type="search"
        value={searchQuery}
        onChange={(event) => onSearchQueryChange(event.target.value)}
      />
    </label>
  );
}
