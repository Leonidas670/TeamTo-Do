import useDebounce from "../hooks/useDebounce";

export default function SearchBar({ query, setQuery, filter, setFilter }) {
  const debounced = useDebounce(query, 400);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
      <input
        className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 transition"
        placeholder="Buscar por texto o autor..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-600">Filtrar:</span>
        {["all", "pending", "completed"].map((f) => (
          <button
            key={f}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors duration-200 ${
              filter === f
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
