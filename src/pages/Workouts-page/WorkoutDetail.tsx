import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import styles from './WorkoutDetail.module.css';
import { workouts } from '../../data/workoutsData';
import Button from '../../components/Button/Button';
import Toast from '../../components/Toast/Toast';
import { useWorkoutPlan } from '../../context/WorkoutPlanContext';

const WorkoutDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { addToPlan, isInPlan } = useWorkoutPlan();
  const workout = workouts.find(w => w.id === id);

  if (!workout) {
    return (
      <Layout>
        <div className={styles.container}>
          <h1>Workout Not Found</h1>
          <Button onClick={() => navigate('/workouts')}>Back to Workouts</Button>
        </div>
      </Layout>
    );
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

  return (
    <Layout>
      <div className={styles.container}>
        <Button
          variant="outline"
          onClick={() => navigate('/workouts')}
          className={styles.backButton}
        >
          ← Back to Workouts
        </Button>

        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{workout.title}</h1>
            <button
              className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
              onClick={toggleFavorite}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
          <div className={styles.meta}>
            <span className={styles.duration}>{workout.duration} min</span>
            <span className={styles.difficulty}>{workout.difficulty}</span>
            <span className={styles.type}>{workout.type}</span>
            <span className={styles.intensity}>{workout.intensity} intensity</span>
          </div>
        </div>

        <div className={styles.workoutImageContainer}>
          <img
            src={workout.thumbnail}
            alt={workout.title}
            className={styles.workoutImage}
          />
        </div>

        <div className={styles.exercises}>
          <h2>Exercises</h2>
          {workout.exercises.map((exercise, index) => (
            <div key={index} className={styles.exerciseCard}>
              <div className={styles.exerciseImage}>
                <img src={exercise.image} alt={exercise.name} />
              </div>
              <div className={styles.exerciseContent}>
                <h3>{exercise.name}</h3>
                <div className={styles.exerciseMeta}>
                  <span className={styles.timeOrReps}>{exercise.timeOrReps}</span>
                </div>
                <p className={styles.exerciseDescription}>{exercise.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Button
            variant="primary"
            onClick={handleStartWorkout}
            className={styles.startButton}
          >
            Start Workout
          </Button>
          <Button
            variant="secondary"
            onClick={handleAddToPlan}
            disabled={isInPlan(workout.id)}
            className={styles.addButton}
          >
            {isInPlan(workout.id) ? 'Added to Plan' : 'Add to Plan'}
          </Button>
        </div>

        {showToast && (
          <Toast
            message="Added to your weekly plan!"
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default WorkoutDetail; 