import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../../components/Layout/Layout';
import { workouts } from '../../../data/workoutsData';
import styles from './WorkoutSession.module.css';
// Workout and Exercise interfaces already defined in workoutsData
const WorkoutSession = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [isResting, setIsResting] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const workout = workouts.find((w) => w.id === id);
    useEffect(() => {
        if (!workout)
            return;
        const currentExercise = workout.exercises[currentExerciseIndex];
        const duration = currentExercise.duration || 30; // Default to 30 seconds if no duration specified
        setTimeLeft(duration);
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    if (currentExerciseIndex < workout.exercises.length - 1) {
                        setIsResting(true);
                        setTimeLeft(15); // 15 second rest period
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [workout, currentExerciseIndex]);
    useEffect(() => {
        if (isResting && timeLeft === 0) {
            setIsResting(false);
            setCurrentExerciseIndex(prev => prev + 1);
        }
    }, [isResting, timeLeft]);
    if (!workout) {
        return (_jsx(Layout, { children: _jsxs("div", { className: styles.container, children: [_jsx("h1", { children: "Workout Not Found" }), _jsx("button", { className: styles.backButton, onClick: () => navigate('/workouts'), children: "Back to Workouts" })] }) }));
    }
    const currentExercise = workout.exercises[currentExerciseIndex];
    return (_jsx(Layout, { children: _jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.header, children: [_jsx("h1", { className: styles.workoutTitle, children: workout.title }), _jsxs("div", { className: styles.progress, children: ["Exercise ", currentExerciseIndex + 1, " of ", workout.exercises.length] })] }), _jsxs("div", { className: styles.exerciseContainer, children: [_jsx("div", { className: styles.exerciseImageContainer, children: _jsx("img", { src: currentExercise.image, alt: currentExercise.name, className: styles.exerciseImage }) }), _jsxs("div", { className: styles.exerciseContent, children: [_jsx("h2", { className: styles.exerciseName, children: currentExercise.name }), _jsx("div", { className: styles.exerciseMeta, children: _jsx("span", { className: styles.timeOrReps, children: currentExercise.timeOrReps }) }), _jsx("p", { className: styles.exerciseDescription, children: currentExercise.description })] })] }), _jsxs("div", { className: styles.timerContainer, children: [_jsx("div", { className: styles.timer, children: isResting ? 'Rest Time' : 'Time Remaining' }), _jsxs("div", { className: styles.timeLeft, children: [timeLeft, "s"] })] }), _jsxs("div", { className: styles.controls, children: [_jsx("button", { className: styles.controlButton, onClick: () => navigate('/workouts'), children: "Exit Workout" }), _jsx("button", { className: styles.controlButton, onClick: () => {
                                if (currentExerciseIndex < workout.exercises.length - 1) {
                                    setCurrentExerciseIndex(prev => prev + 1);
                                    setTimeLeft(workout.exercises[currentExerciseIndex + 1].duration || 30);
                                }
                                else {
                                    navigate('/workouts');
                                }
                            }, children: currentExerciseIndex < workout.exercises.length - 1 ? 'Next Exercise' : 'Finish Workout' })] })] }) }));
};
export default WorkoutSession;
