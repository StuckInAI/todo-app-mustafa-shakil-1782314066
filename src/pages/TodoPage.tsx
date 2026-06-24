import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { useAuth } from '@/contexts/AuthContext';
import TodoInput from '@/components/TodoInput';
import TodoFilter from '@/components/TodoFilter';
import TodoList from '@/components/TodoList';
import TodoSearch from '@/components/TodoSearch';
import TodoStats from '@/components/TodoStats';
import FAQModal from '@/components/FAQModal';

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

  const { user, logout } = useAuth();
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'due' | 'priority'>('date');
  const [showFAQ, setShowFAQ] = useState(false);

  const now = new Date();
  const overdueCount = todos.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < now).length;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const bg = dark ? 'bg-gray-900' : 'bg-gradient-to-br from-red-50 via-white to-red-100';
  const card = dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-red-100';
  const heading = dark ? 'text-white' : 'text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text';
  const sub = dark ? 'text-gray-400' : 'text-gray-400';

  return (
    <div className={`min-h-screen ${bg} flex items-start justify-center px-4 py-10 transition-colors duration-300`}>
      <div className="w-full max-w-md flex flex-col gap-5">

        {/* Header row */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-extrabold tracking-tight ${heading}`}>
              My To-Do List
            </h1>
            <p className={`text-xs mt-0.5 ${sub}`}>
              {totalCount === 0 ? 'Start by adding a task below' : `${activeCount} task${activeCount !== 1 ? 's' : ''} remaining`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* FAQ */}
            <button
              onClick={() => setShowFAQ(true)}
              title="FAQ"
              className="w-9 h-9 rounded-full bg-red-100 hover:bg-red-200 text-red-600 font-bold text-sm flex items-center justify-center transition-colors"
            >?</button>
            {/* Dark mode */}
            <button
              onClick={() => setDark(d => !d)}
              title="Toggle dark mode"
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors text-base"
            >{dark ? '☀️' : '🌙'}</button>
            {/* User avatar */}
            {user && (
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-red-500 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {user.avatar}
                </div>
                <button
                  onClick={logout}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors hidden sm:block"
                >Sign out</button>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <TodoStats total={totalCount} active={activeCount} completed={completedCount} overdue={overdueCount} />

        {/* Progress bar */}
        {totalCount > 0 && (
          <div>
            <div className={`flex justify-between text-xs mb-1 ${sub}`}>
              <span>{progress}% complete</span>
              <span>{completedCount}/{totalCount} done</span>
            </div>
            <div className={`w-full ${dark ? 'bg-gray-700' : 'bg-red-100'} rounded-full h-2.5`}>
              <div
                className="bg-gradient-to-r from-red-400 to-red-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Main card */}
        <div className={`rounded-2xl shadow-md border ${card} p-5 flex flex-col gap-4`}>
          <TodoInput onAdd={addTodo} dark={dark} />

          <TodoSearch search={search} onSearch={setSearch} sortBy={sortBy} onSort={setSortBy} />

          {totalCount > 0 && (
            <TodoFilter
              filter={filter}
              onFilter={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              totalCount={totalCount}
              onClearCompleted={clearCompleted}
              dark={dark}
            />
          )}

          <TodoList
            todos={todos}
            filter={filter}
            search={search}
            sortBy={sortBy}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            dark={dark}
          />
        </div>

        <p className={`text-center text-xs ${sub}`}>Double-click a task to edit · Tasks auto-saved</p>
      </div>

      {showFAQ && <FAQModal onClose={() => setShowFAQ(false)} />}
    </div>
  );
}
