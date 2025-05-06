import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { workouts } from '../../data/workoutsData';
import styles from './WorkoutSession.module.css';

const WorkoutSession: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const workout = workouts.find(w => w.id === id);

  useEffect(() => {
    if (!workout) return;

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
    return (
      <Layout>
        <div className={styles.container}>
          <h1>Workout Not Found</h1>
          <button 
            className={styles.backButton}
            onClick={() => navigate('/workouts')}
          >
            Back to Workouts
          </button>
        </div>
      </Layout>
    );
  }

  const currentExercise = workout.exercises[currentExerciseIndex];

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.workoutTitle}>{workout.title}</h1>
          <div className={styles.progress}>
            Exercise {currentExerciseIndex + 1} of {workout.exercises.length}
          </div>
        </div>

        <div className={styles.exerciseContainer}>
          <div className={styles.exerciseImageContainer}>
            <img 
              src={currentExercise.image} 
              alt={currentExercise.name}
              className={styles.exerciseImage}
            />
          </div>

          <div className={styles.exerciseContent}>
            <h2 className={styles.exerciseName}>{currentExercise.name}</h2>
            <div className={styles.exerciseMeta}>
              <span className={styles.timeOrReps}>{currentExercise.timeOrReps}</span>
            </div>
            <p className={styles.exerciseDescription}>{currentExercise.description}</p>
          </div>
        </div>

        <div className={styles.timerContainer}>
          <div className={styles.timer}>
            {isResting ? 'Rest Time' : 'Time Remaining'}
          </div>
          <div className={styles.timeLeft}>
            {timeLeft}s
          </div>
        </div>

        <div className={styles.controls}>
          <button 
            className={styles.controlButton}
            onClick={() => navigate('/workouts')}
          >
            Exit Workout
          </button>
          <button 
            className={styles.controlButton}
            onClick={() => {
              if (currentExerciseIndex < workout.exercises.length - 1) {
                setCurrentExerciseIndex(prev => prev + 1);
                setTimeLeft(workout.exercises[currentExerciseIndex + 1].duration || 30);
              } else {
                navigate('/workouts');
              }
            }}
          >
            {currentExerciseIndex < workout.exercises.length - 1 ? 'Next Exercise' : 'Finish Workout'}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default WorkoutSession; 