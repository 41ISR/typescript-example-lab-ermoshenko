import type { MouseEvent } from 'react';

export type Filter = 'all' | 'active' | 'completed';

interface FiltersProps {
  current: Filter;
  onChange: (filter: Filter) => void;
  activeCount: number;
}

export default function Filters({ current, onChange, activeCount }: FiltersProps) {
  const handleClick = (f: Filter) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onChange(f);
  };

  return (
    <div className="filter-buttons">
      <button
        className={`btn btn-filter${current === 'all' ? ' active' : ''}`}
        onClick={handleClick('all')}
      >
        Все
      </button>
      <button
        className={`btn btn-filter${current === 'active' ? ' active' : ''}`}
        onClick={handleClick('active')}
      >
        Активные
      </button>
      <button
        className={`btn btn-filter${current === 'completed' ? ' active' : ''}`}
        onClick={handleClick('completed')}
      >
        Завершённые
      </button>
      <span className="task-counter">Активных: {activeCount}</span>
    </div>
  );
}
