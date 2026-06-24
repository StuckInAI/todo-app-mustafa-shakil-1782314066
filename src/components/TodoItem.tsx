import { useState, useRef, useEffect } from 'react';
import { Todo } from '@/types/todo';

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const startEdit = () => {
    setEditValue(todo.text);
    setEditing(true);
  };

  const commitEdit = () => {
    onEdit(todo.id, editValue);
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditValue(todo.text);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-pink-100 shadow-sm group hover:border-pink-200 transition-colors">
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as active' : 'Mark as complete'}
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-pink-500 border-pink-500'
            : 'border-pink-300 hover:border-pink-500'
        }`}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Text / Edit input */}
      {editing ? (
        <input
          ref={inputRef}
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitEdit}
          className="flex-1 text-sm text-gray-700 bg-pink-50 border border-pink-300 rounded-lg px-2 py-1 focus:outline-none focus:border-pink-500"
        />
      ) : (
        <span
          onDoubleClick={startEdit}
          title="Double-click to edit"
          className={`flex-1 text-sm select-none cursor-pointer ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
          }`}
        >
          {todo.text}
        </span>
      )}

      {/* Action buttons */}
      {!editing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Edit button */}
          <button
            onClick={startEdit}
            aria-label="Edit task"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Delete button */}
          <button
            onClick={() => onDelete(todo.id)}
            aria-label="Delete task"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 4h10M6 4V3a1 1 0 011-1h2a1 1 0 011 1v1M6 7v5M10 7v5M5 4l.5 9h5l.5-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Edit confirm/cancel */}
      {editing && (
        <div className="flex items-center gap-1">
          <button
            onClick={commitEdit}
            aria-label="Save"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-green-500 hover:bg-green-50 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={cancelEdit}
            aria-label="Cancel"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
