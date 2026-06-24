import { useState, useEffect } from 'react';
import { Todo, FilterType } from '@/types/todo';

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const stored = localStorage.getItem('todos');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos(prev => [
      { id: generateId(), text: trimmed, completed: false, createdAt: Date.now() },
      ...prev,
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    const trimmed = newText.trim();
    if (!trimmed) {
      deleteTodo(id);
      return;
    }
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, text: trimmed } : t))
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed));
  };

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  return {
    todos: filteredTodos,
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
  };
}
