import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import styles from './WorkoutDetail.module.css';
import { workouts } from '../../data/workoutsData';
import Button from '../../components/Button/Button';
import Toast from '../../components/Toast/Toast';
import { useWorkoutPlan } from '../../context/WorkoutPlanContext';
const WorkoutDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const { addToPlan, isInPlan } = useWorkoutPlan();
    const workout = workouts.find(w => w.id === id);
    if (!workout) {
        return (_jsx(Layout, { children: _jsxs("div", { className: styles.container, children: [_jsx("h1", { children: "Workout Not Found" }), _jsx(Button, { onClick: () => navigate('/workouts'), children: "Back to Workouts" })] }) }));
    }
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };
    const handleAddToPlan = () => {
        addToPlan(workout);
        setShowToast(true);
    };
    const handleStartWorkout = () => {
        navigate(`/start-workout/${id}`);
    };
    return (_jsx(Layout, { children: _jsxs("div", { className: styles.container, children: [_jsx(Button, { variant: "outline", onClick: () => navigate('/workouts'), className: styles.backButton, children: "\u2190 Back to Workouts" }), _jsxs("div", { className: styles.header, children: [_jsxs("div", { className: styles.titleSection, children: [_jsx("h1", { className: styles.title, children: workout.title }), _jsx("button", { className: `${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`, onClick: toggleFavorite, children: isFavorite ? '❤️' : '🤍' })] }), _jsxs("div", { className: styles.meta, children: [_jsxs("span", { className: styles.duration, children: [workout.duration, " min"] }), _jsx("span", { className: styles.difficulty, children: workout.difficulty }), _jsx("span", { className: styles.type, children: workout.type }), _jsxs("span", { className: styles.intensity, children: [workout.intensity, " intensity"] })] })] }), _jsx("div", { className: styles.workoutImageContainer, children: _jsx("img", { src: workout.thumbnail, alt: workout.title, className: styles.workoutImage }) }), _jsxs("div", { className: styles.exercises, children: [_jsx("h2", { children: "Exercises" }), workout.exercises.map((exercise, index) => (_jsxs("div", { className: styles.exerciseCard, children: [_jsx("div", { className: styles.exerciseImage, children: _jsx("img", { src: exercise.image, alt: exercise.name }) }), _jsxs("div", { className: styles.exerciseContent, children: [_jsx("h3", { children: exercise.name }), _jsx("div", { className: styles.exerciseMeta, children: _jsx("span", { className: styles.timeOrReps, children: exercise.timeOrReps }) }), _jsx("p", { className: styles.exerciseDescription, children: exercise.description })] })] }, index)))] }), _jsxs("div", { className: styles.actions, children: [_jsx(Button, { variant: "primary", onClick: handleStartWorkout, className: styles.startButton, children: "Start Workout" }), _jsx(Button, { variant: "secondary", onClick: handleAddToPlan, disabled: isInPlan(workout.id), className: styles.addButton, children: isInPlan(workout.id) ? 'Added to Plan' : 'Add to Plan' })] }), showToast && (_jsx(Toast, { message: "Added to your weekly plan!", onClose: () => setShowToast(false) }))] }) }));
};
export default WorkoutDetail;
