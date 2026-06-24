import { useState, useRef, useEffect } from 'react';
import { Todo } from '@/types/todo';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  dark?: boolean;
}

const PRIORITY_BADGE: Record<string, string> = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-yellow-100 text-yellow-600',
  low: 'bg-green-100 text-green-600',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit, dark = false }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const saveEdit = () => {
    onEdit(todo.id, draft);
    setEditing(false);
  };

  const cancelEdit = () => {
    setDraft(todo.text);
    setEditing(false);
  };

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const isOverdue = !todo.completed && todo.dueDate && new Date(todo.dueDate) < now;

  const row = dark
    ? 'bg-gray-700 border-gray-600 hover:border-gray-500'
    : `bg-white border-gray-100 hover:border-red-200 ${isOverdue ? 'border-l-4 border-l-orange-400' : ''}`;

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-sm group transition-colors ${row}`}>
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-red-500 border-red-500 text-white'
            : dark ? 'border-gray-400 hover:border-red-400' : 'border-red-300 hover:border-red-500'
        }`}
      >
        {todo.completed && (
          <svg viewBox="0 0 12 12" className="w-3 h-3 fill-white">
            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Text */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') cancelEdit(); }}
            onBlur={saveEdit}
            className={`flex-1 text-sm rounded-lg px-2 py-1 focus:outline-none border transition-colors ${
              dark ? 'bg-gray-600 border-gray-500 text-white focus:border-red-400' : 'bg-red-50 border-red-300 text-gray-700 focus:border-red-500'
            }`}
          />
        ) : (
          <span
            onDoubleClick={() => setEditing(true)}
            className={`text-sm select-none ${
              todo.completed
                ? dark ? 'line-through text-gray-500' : 'line-through text-gray-400'
                : dark ? 'text-gray-100' : 'text-gray-700'
            }`}
          >{todo.text}</span>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${PRIORITY_BADGE[todo.priority]}`}>
            {todo.priority}
          </span>
          {todo.dueDate && (
            <span className={`text-xs ${isOverdue ? 'text-orange-500 font-semibold' : dark ? 'text-gray-400' : 'text-gray-400'}`}>
              {isOverdue ? '⚠️ ' : '📅 '}{todo.dueDate}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${
              dark ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-600' : 'text-gray-300 hover:text-blue-500 hover:bg-blue-50'
            }`}
            title="Edit"
          >✏️</button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${
            dark ? 'text-gray-400 hover:text-red-400 hover:bg-gray-600' : 'text-gray-300 hover:text-red-500 hover:bg-red-50'
          }`}
          title="Delete"
        >🗑️</button>
      </div>
    </div>
  );
}
