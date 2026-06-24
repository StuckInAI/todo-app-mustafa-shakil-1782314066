import { useState, useRef, useEffect } from 'react';

type Props = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="flex gap-2">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none bg-white text-gray-700 placeholder-gray-400 text-sm transition-colors"
      />
      <button
        onClick={handleAdd}
        disabled={!value.trim()}
        className="px-5 py-3 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-200 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm"
      >
        Add
      </button>
    </div>
  );
}
