import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { workouts } from '../../data/workoutsData';
import Layout from '../../components/Layout/Layout';
import WorkoutCard from './components/WorkoutCard';
import Filters from './components/Filters';
import styles from './Workouts.module.css';
const Workouts = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        duration: 'all',
        type: 'all',
        difficulty: 'all'
    });
    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };
    const filteredWorkouts = workouts.filter(workout => {
        const matchesDuration = filters.duration === 'all' ||
            (filters.duration === 'short' && workout.duration <= 15) ||
            (filters.duration === 'medium' && workout.duration > 15 && workout.duration <= 30) ||
            (filters.duration === 'long' && workout.duration > 30);
        const matchesType = filters.type === 'all' || workout.type === filters.type;
        const matchesDifficulty = filters.difficulty === 'all' || workout.difficulty === filters.difficulty;
        return matchesDuration && matchesType && matchesDifficulty;
    });
    const handleToggleFavorite = (workoutId) => {
        // Implement favorite toggle logic
        console.log('Toggle favorite:', workoutId);
    };
    return (_jsx(Layout, { children: _jsxs("div", { className: styles.pageContainer, children: [_jsx("aside", { className: styles.sidebar, children: _jsx(Filters, { filters: filters, onFilterChange: handleFilterChange }) }), _jsx("section", { className: styles.cardGrid, children: filteredWorkouts.map(workout => (_jsx(WorkoutCard, { workout: workout, isFavorite: workout.isFavorited, onToggleFavorite: () => handleToggleFavorite(workout.id), onClick: () => navigate(`/workouts/${workout.id}`) }, workout.id))) })] }) }));
};
export default Workouts;
