import type { MouseEvent } from 'react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const handleCheckboxClick = () => {
    onToggle(todo.id);
  };

  const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onDelete(todo.id);
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={handleCheckboxClick}
      />
      <span className={`todo-text${todo.completed ? ' completed' : ''}`}>
        {todo.text}
      </span>
      <button className="btn btn-delete" onClick={handleDeleteClick}>
        Удалить
      </button>
    </li>
  );
}
