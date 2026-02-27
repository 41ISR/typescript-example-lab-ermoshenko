import { useState, useEffect, useMemo } from 'react';
import './App.css';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';
import Filters, { type Filter } from './components/Filters';
import type { Todo } from './components/TodoItem';

const STORAGE_KEY = 'todos';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) as Todo[] : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState<Filter>('all');

  // persist todos whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // ignore write errors
    }
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const activeCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos]
  );

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div className="app-container">
      <h1 className="app-title">📝 Мои задачи</h1>

      <NewTodoForm onAdd={addTodo} />
      <Filters
        current={filter}
        onChange={setFilter}
        activeCount={activeCount}
      />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default App;
