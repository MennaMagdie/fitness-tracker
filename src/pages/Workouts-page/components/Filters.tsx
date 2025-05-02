import React from 'react';
import styles from './Filters.module.css';

interface FilterOption {
  value: string;
  label: string;
  icon?: string;
}

interface FiltersProps {
  filters: {
    duration: string;
    type: string;
    difficulty: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const durationOptions: FilterOption[] = [
    { value: 'all', label: 'All Durations', icon: '⏱️' },
    { value: 'short', label: 'Short (≤15 min)', icon: '⚡' },
    { value: 'medium', label: 'Medium (15-30 min)', icon: '⏳' },
    { value: 'long', label: 'Long (>30 min)', icon: '⌛' }
  ];

  const typeOptions: FilterOption[] = [
    { value: 'all', label: 'All Types', icon: '🏋️' },
    { value: 'strength', label: 'Strength', icon: '💪' },
    { value: 'cardio', label: 'Cardio', icon: '🏃' },
    { value: 'flexibility', label: 'Flexibility', icon: '🧘' }
  ];

  const difficultyOptions: FilterOption[] = [
    { value: 'all', label: 'All Levels', icon: '🌟' },
    { value: 'beginner', label: 'Beginner', icon: '🌱' },
    { value: 'intermediate', label: 'Intermediate', icon: '🔥' },
    { value: 'advanced', label: 'Advanced', icon: '💫' }
  ];

  const renderFilterGroup = (
    title: string,
    options: FilterOption[],
    currentValue: string,
    filterType: string
  ) => (
    <div className={styles.filterGroup}>
      <h3 className={styles.filterTitle}>{title}</h3>
      <div className={styles.filterOptions}>
        {options.map(option => (
          <button
            key={option.value}
            className={`${styles.filterButton} ${currentValue === option.value ? styles.active : ''}`}
            onClick={() => onFilterChange(filterType, option.value)}
          >
            {option.icon && <span className={styles.filterIcon}>{option.icon}</span>}
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.filtersContainer}>
      <h2 className={styles.filtersTitle}>Filters</h2>
      {renderFilterGroup('Duration', durationOptions, filters.duration, 'duration')}
      {renderFilterGroup('Type', typeOptions, filters.type, 'type')}
      {renderFilterGroup('Difficulty', difficultyOptions, filters.difficulty, 'difficulty')}
    </div>
  );
};

export default Filters; 