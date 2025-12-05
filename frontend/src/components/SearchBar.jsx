import useDebounce from "../hooks/useDebounce";

export default function SearchBar({ query, setQuery, filter, setFilter }) {
  const debounced = useDebounce(query, 400);

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3">
      <input
        className="flex-1 border px-3 py-2 rounded"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex gap-2">
        {["all", "pending", "completed"].map((f) => (
          <button
            key={f}
            className={`px-3 py-2 rounded border ${
              filter === f ? "bg-gray-200" : ""
            }`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
