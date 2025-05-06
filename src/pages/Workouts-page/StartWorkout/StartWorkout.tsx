import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workouts } from '../../../data/workoutsData';
import Button from '../../../components/Button/Button';
import styles from './StartWorkout.module.css';

const StartWorkout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const workout = workouts.find(w => w.id === id);

  if (!workout) {
    return (
      <div className={styles.container}>
        <h1>Workout Not Found</h1>
        <Button onClick={() => navigate('/workouts')}>Back to Workouts</Button>
      </div>
    );
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
    } else {
      setCurrentExerciseIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{workout.title}</h1>
        <div className={styles.progress}>
          Exercise {currentExerciseIndex + 1} of {workout.exercises.length}
        </div>
      </div>

      <div className={styles.exerciseContainer}>
        <div className={styles.exerciseImage}>
          <img src={currentExercise.image} alt={currentExercise.name} />
        </div>
        <div className={styles.exerciseInfo}>
          <h2>{currentExercise.name}</h2>
          <div className={styles.timeOrReps}>
            {currentExercise.timeOrReps.includes('sec') ? (
              <div className={styles.timer}>
                {timeLeft} seconds
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => setIsPaused(!isPaused)}
                >
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
              </div>
            ) : (
              <span>{currentExercise.timeOrReps}</span>
            )}
          </div>
          <p className={styles.description}>{currentExercise.description}</p>
        </div>
      </div>

      <div className={styles.controls}>
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={currentExerciseIndex === 0}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={handleNext}
        >
          {isLastExercise ? 'Finish Workout' : 'Next Exercise'}
        </Button>
      </div>
    </div>
  );
};

export default StartWorkout; 