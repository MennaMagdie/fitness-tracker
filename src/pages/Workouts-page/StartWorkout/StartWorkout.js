import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workouts } from '../../../data/workoutsData';
import Button from '../../../components/Button/Button';
import styles from './StartWorkout.module.css';
const StartWorkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const workout = workouts.find(w => w.id === id);
    if (!workout) {
        return (_jsxs("div", { className: styles.container, children: [_jsx("h1", { children: "Workout Not Found" }), _jsx(Button, { onClick: () => navigate('/workouts'), children: "Back to Workouts" })] }));
    }
    const currentExercise = workout.exercises[currentExerciseIndex];
    const isLastExercise = currentExerciseIndex === workout.exercises.length - 1;
    useEffect(() => {
        if (currentExercise.timeOrReps.includes('sec')) {
            const seconds = parseInt(currentExercise.timeOrReps);
            setTimeLeft(seconds);
        }
    }, [currentExerciseIndex]);
    useEffect(() => {
        if (timeLeft > 0 && !isPaused) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft, isPaused]);
    const handleNext = () => {
        if (isLastExercise) {
            navigate('/workouts');
        }
        else {
            setCurrentExerciseIndex(prev => prev + 1);
        }
    };
    const handlePrevious = () => {
        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(prev => prev - 1);
        }
    };
    return (_jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.header, children: [_jsx("h1", { children: workout.title }), _jsxs("div", { className: styles.progress, children: ["Exercise ", currentExerciseIndex + 1, " of ", workout.exercises.length] })] }), _jsxs("div", { className: styles.exerciseContainer, children: [_jsx("div", { className: styles.exerciseImage, children: _jsx("img", { src: currentExercise.image, alt: currentExercise.name }) }), _jsxs("div", { className: styles.exerciseInfo, children: [_jsx("h2", { children: currentExercise.name }), _jsx("div", { className: styles.timeOrReps, children: currentExercise.timeOrReps.includes('sec') ? (_jsxs("div", { className: styles.timer, children: [timeLeft, " seconds", _jsx(Button, { variant: "outline", size: "small", onClick: () => setIsPaused(!isPaused), children: isPaused ? 'Resume' : 'Pause' })] })) : (_jsx("span", { children: currentExercise.timeOrReps })) }), _jsx("p", { className: styles.description, children: currentExercise.description })] })] }), _jsxs("div", { className: styles.controls, children: [_jsx(Button, { variant: "secondary", onClick: handlePrevious, disabled: currentExerciseIndex === 0, children: "Previous" }), _jsx(Button, { variant: "primary", onClick: handleNext, children: isLastExercise ? 'Finish Workout' : 'Next Exercise' })] })] }));
};
export default StartWorkout;
