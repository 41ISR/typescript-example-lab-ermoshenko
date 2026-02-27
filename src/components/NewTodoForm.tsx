import { useState, ChangeEvent, FormEvent } from 'react';

interface NewTodoFormProps {
  onAdd: (text: string) => void;
}

export default function NewTodoForm({ onAdd }: NewTodoFormProps) {
  const [text, setText] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setText('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Введите новую задачу..."
        value={text}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn-add">
        Добавить
      </button>
    </form>
  );
}
