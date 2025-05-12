import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './Filters.module.css';
const Filters = ({ filters, onFilterChange }) => {
    const durationOptions = [
        { value: 'all', label: 'All Durations', icon: '⏱️' },
        { value: 'short', label: 'Short (≤15 min)', icon: '⚡' },
        { value: 'medium', label: 'Medium (15-30 min)', icon: '⏳' },
        { value: 'long', label: 'Long (>30 min)', icon: '⌛' }
    ];
    const typeOptions = [
        { value: 'all', label: 'All Types', icon: '🏋️' },
        { value: 'strength', label: 'Strength', icon: '💪' },
        { value: 'cardio', label: 'Cardio', icon: '🏃' },
        { value: 'flexibility', label: 'Flexibility', icon: '🧘' }
    ];
    const difficultyOptions = [
        { value: 'all', label: 'All Levels', icon: '🌟' },
        { value: 'beginner', label: 'Beginner', icon: '🌱' },
        { value: 'intermediate', label: 'Intermediate', icon: '🔥' },
        { value: 'advanced', label: 'Advanced', icon: '💫' }
    ];
    const renderFilterGroup = (title, options, currentValue, filterType) => (_jsxs("div", { className: styles.filterGroup, children: [_jsx("h3", { className: styles.filterTitle, children: title }), _jsx("div", { className: styles.filterOptions, children: options.map(option => (_jsxs("button", { className: `${styles.filterButton} ${currentValue === option.value ? styles.active : ''}`, onClick: () => onFilterChange(filterType, option.value), children: [option.icon && _jsx("span", { className: styles.filterIcon, children: option.icon }), option.label] }, option.value))) })] }));
    return (_jsxs("div", { className: styles.filtersContainer, children: [_jsx("h2", { className: styles.filtersTitle, children: "Filters" }), renderFilterGroup('Duration', durationOptions, filters.duration, 'duration'), renderFilterGroup('Type', typeOptions, filters.type, 'type'), renderFilterGroup('Difficulty', difficultyOptions, filters.difficulty, 'difficulty')] }));
};
export default Filters;
