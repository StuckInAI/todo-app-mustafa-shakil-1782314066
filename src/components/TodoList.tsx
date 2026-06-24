import { Todo } from '@/types/todo';
import { FilterType } from '@/types/todo';
import TodoItem from '@/components/TodoItem';

type Props = {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

const emptyMessages: Record<FilterType, { icon: string; text: string }> = {
  all: { icon: '✅', text: 'No tasks yet — add one above!' },
  active: { icon: '🎉', text: 'Nothing left to do. You\'re all caught up!' },
  completed: { icon: '📋', text: 'No completed tasks yet.' },
};

export default function TodoList({ todos, filter, onToggle, onDelete, onEdit }: Props) {
  if (todos.length === 0) {
    const { icon, text } = emptyMessages[filter];
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
        <span className="text-4xl">{icon}</span>
        <p className="text-gray-400 text-sm">{text}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
