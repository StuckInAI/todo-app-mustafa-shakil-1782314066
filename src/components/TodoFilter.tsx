import { FilterType } from '@/types/todo';

type Props = {
  filter: FilterType;
  onFilter: (f: FilterType) => void;
  activeCount: number;
  completedCount: number;
  totalCount: number;
  onClearCompleted: () => void;
};

const tabs: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function TodoFilter({
  filter,
  onFilter,
  activeCount,
  completedCount,
  totalCount,
  onClearCompleted,
}: Props) {
  const countFor = (f: FilterType) => {
    if (f === 'all') return totalCount;
    if (f === 'active') return activeCount;
    return completedCount;
  };

  return (
    <div className="flex items-center justify-between gap-2 flex-wrap">
      <div className="flex gap-1 bg-pink-50 p-1 rounded-xl">
        {tabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => onFilter(tab.value)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === tab.value
                ? 'bg-white text-pink-600 shadow-sm'
                : 'text-gray-500 hover:text-pink-500'
            }`}
          >
            {tab.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                filter === tab.value
                  ? 'bg-pink-100 text-pink-600'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {countFor(tab.value)}
            </span>
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
        >
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}
