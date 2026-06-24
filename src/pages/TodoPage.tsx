import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput';
import TodoFilter from '@/components/TodoFilter';
import TodoList from '@/components/TodoList';

export default function TodoPage() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
    totalCount,
  } = useTodos();

  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-md flex flex-col gap-5">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent tracking-tight">
            My To-Do List
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {totalCount === 0
              ? 'Start by adding a task below'
              : `${activeCount} task${activeCount !== 1 ? 's' : ''} remaining`}
          </p>
        </div>

        {/* Progress bar */}
        {totalCount > 0 && (
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{progress}% complete</span>
              <span>{completedCount}/{totalCount} done</span>
            </div>
            <div className="w-full bg-pink-100 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-pink-400 to-rose-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-5 flex flex-col gap-4">
          <TodoInput onAdd={addTodo} />

          {totalCount > 0 && (
            <TodoFilter
              filter={filter}
              onFilter={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              totalCount={totalCount}
              onClearCompleted={clearCompleted}
            />
          )}

          <TodoList
            todos={todos}
            filter={filter}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>

        <p className="text-center text-xs text-gray-300">
          Double-click a task to edit it
        </p>
      </div>
    </div>
  );
}
