import { useState, useRef, useEffect } from 'react';
import { Priority } from '@/types/todo';

interface Props {
  onAdd: (text: string, priority: Priority, dueDate?: string) => void;
  dark?: boolean;
}

const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-green-500' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-500' },
  { value: 'high', label: 'High', color: 'text-red-500' },
];

export default function TodoInput({ onAdd, dark = false }: Props) {
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value.trim(), priority, dueDate || undefined);
    setValue('');
    setDueDate('');
    setShowOptions(false);
    inputRef.current?.focus();
  };

  const inp = dark
    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-400'
    : 'bg-white border-red-200 text-gray-700 placeholder-gray-400 focus:border-red-400';

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="What needs to be done?"
          className={`flex-1 px-4 py-3 rounded-xl border-2 focus:outline-none text-sm transition-colors ${inp}`}
        />
        <button
          onClick={() => setShowOptions(o => !o)}
          title="Options"
          className={`px-3 py-3 rounded-xl border-2 transition-colors text-base ${
            dark ? 'border-gray-600 bg-gray-700 text-gray-300 hover:border-red-400' : 'border-red-200 bg-white text-gray-400 hover:border-red-400'
          }`}
        >⚙️</button>
        <button
          onClick={handleAdd}
          disabled={!value.trim()}
          className="px-5 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-200 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm"
        >Add</button>
      </div>

      {showOptions && (
        <div className={`flex flex-wrap gap-3 px-3 py-3 rounded-xl border ${dark ? 'border-gray-600 bg-gray-700' : 'border-red-100 bg-red-50'}`}>
          {/* Priority */}
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium ${dark ? 'text-gray-300' : 'text-gray-500'}`}>Priority:</span>
            <div className="flex gap-1">
              {PRIORITY_OPTIONS.map(p => (
                <button
                  key={p.value}
                  onClick={() => setPriority(p.value)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                    priority === p.value
                      ? 'bg-red-500 text-white'
                      : dark ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-white text-gray-500 hover:bg-gray-100'
                  }`}
                >{p.label}</button>
              ))}
            </div>
          </div>
          {/* Due date */}
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium ${dark ? 'text-gray-300' : 'text-gray-500'}`}>Due:</span>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className={`text-xs px-2 py-1 rounded-lg border focus:outline-none transition-colors ${
                dark ? 'bg-gray-600 border-gray-500 text-gray-200 focus:border-red-400' : 'bg-white border-gray-200 text-gray-600 focus:border-red-400'
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
