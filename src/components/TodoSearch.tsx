interface Props {
  search: string;
  onSearch: (v: string) => void;
  sortBy: 'date' | 'due' | 'priority';
  onSort: (v: 'date' | 'due' | 'priority') => void;
}

export default function TodoSearch({ search, onSearch, sortBy, onSort }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm">🔍</span>
        <input
          type="text"
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search tasks…"
          className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:border-red-400 focus:outline-none bg-gray-50 text-gray-700 placeholder-gray-300"
        />
        {search && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 text-xs"
          >✕</button>
        )}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 flex-shrink-0">Sort by</span>
        <div className="flex gap-1">
          {(['date', 'due', 'priority'] as const).map(opt => (
            <button
              key={opt}
              onClick={() => onSort(opt)}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors capitalize ${
                sortBy === opt ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-red-500'
              }`}
            >
              {opt === 'date' ? 'Added' : opt === 'due' ? 'Due date' : 'Priority'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
