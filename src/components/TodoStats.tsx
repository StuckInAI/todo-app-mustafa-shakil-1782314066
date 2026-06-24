interface Props {
  total: number;
  active: number;
  completed: number;
  overdue: number;
}

const cards = [
  { label: 'Total', key: 'total', color: 'bg-gray-50 text-gray-600', dot: 'bg-gray-400' },
  { label: 'Active', key: 'active', color: 'bg-red-50 text-red-600', dot: 'bg-red-400' },
  { label: 'Done', key: 'completed', color: 'bg-green-50 text-green-600', dot: 'bg-green-400' },
  { label: 'Overdue', key: 'overdue', color: 'bg-orange-50 text-orange-600', dot: 'bg-orange-400' },
] as const;

export default function TodoStats({ total, active, completed, overdue }: Props) {
  const values: Record<string, number> = { total, active, completed, overdue };
  return (
    <div className="grid grid-cols-4 gap-2">
      {cards.map(c => (
        <div key={c.key} className={`rounded-xl p-2 text-center ${c.color}`}>
          <div className="text-lg font-bold leading-none">{values[c.key]}</div>
          <div className="text-xs mt-1 opacity-70">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
