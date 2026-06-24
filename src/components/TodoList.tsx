import { Todo, FilterType } from '@/types/todo';
import TodoItem from '@/components/TodoItem';

interface Props {
  todos: Todo[];
  filter: FilterType;
  search: string;
  sortBy: 'date' | 'due' | 'priority';
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  dark?: boolean;
}

const PRIORITY_RANK = { high: 0, medium: 1, low: 2 };

export default function TodoList({ todos, filter, search, sortBy, onToggle, onDelete, onEdit, dark = false }: Props) {
  let visible = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  if (search.trim()) {
    const q = search.toLowerCase();
    visible = visible.filter(t => t.text.toLowerCase().includes(q));
  }

  visible = [...visible].sort((a, b) => {
    if (sortBy === 'priority') return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
    if (sortBy === 'due') {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    }
    return b.createdAt - a.createdAt;
  });

  if (visible.length === 0) {
    const msg =
      search ? `No tasks match "${search}"` :
      filter === 'active' ? 'No active tasks — all done! 🎉' :
      filter === 'completed' ? 'No completed tasks yet' :
      'No tasks yet — add one above!';
    return (
      <div className={`py-10 text-center text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
        {msg}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {visible.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          dark={dark}
        />
      ))}
    </div>
  );
}
