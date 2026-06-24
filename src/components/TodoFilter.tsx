import { FilterType } from '@/types/todo';

interface Props {
  filter: FilterType;
  onFilter: (f: FilterType) => void;
  activeCount: number;
  completedCount: number;
  totalCount: number;
  onClearCompleted: () => void;
  dark?: boolean;
}

const TABS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
];

export default function TodoFilter({ filter, onFilter, activeCount, completedCount, totalCount, onClearCompleted, dark = false }: Props) {
  const counts: Record<FilterType, number> = { all: totalCount, active: activeCount, completed: completedCount };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className={`flex gap-1 p-1 rounded-xl ${dark ? 'bg-gray-700' : 'bg-red-50'}`}>
        {TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => onFilter(tab.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === tab.value
                ? dark ? 'bg-gray-600 text-white shadow-sm' : 'bg-white text-red-600 shadow-sm'
                : dark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-red-500'
            }`}
          >
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              filter === tab.value
                ? 'bg-red-100 text-red-600'
                : dark ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-400'
            }`}>{counts[tab.value]}</span>
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-xs text-gray-400 hover:text-red-500 transition-colors whitespace-nowrap"
        >Clear done</button>
      )}
    </div>
  );
}
