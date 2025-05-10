import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useWorkoutPlan } from '../../context/WorkoutPlanContext';
import styles from './WeeklyPlan.module.css';
import WorkoutCard from './components/WorkoutCard';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const WeeklyPlan: React.FC = () => {
  const { plan } = useWorkoutPlan();
  const navigate = useNavigate();
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([]);
  const { dispatch, state } = useAppContext();

  const handleMarkAsDone = (workoutId: string) => {
    const workout = plan.find(w => w.id === workoutId);
    if (workout) {
      setCompletedWorkouts(prev => [...prev, workoutId]);
      const today = new Date().toISOString().split('T')[0];
      const existingEntry = state.progress.find(entry => entry.date.startsWith(today) && entry.type === 'workout');
      const newDuration = existingEntry && existingEntry.duration ? existingEntry.duration + workout.duration : workout.duration;
      dispatch({
        type: 'ADD_PROGRESS',
        payload: {
          id: workoutId,
          type: 'workout',
          value: 0, // Assuming no calorie tracking here
          duration: newDuration,
          workoutType: 'other', // Use a valid workout type
          date: new Date().toISOString(),
          done: true
        }
      });
    }
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
        <h1>Your Weekly Plan</h1>
        {plan.length === 0 ? (
          <p>No workouts added to your plan yet.</p>
        ) : (
          <ul className={styles.planList}>
            {plan
              .filter(workout => !completedWorkouts.includes(workout.id))
              .map((workout, index) => (
                <WorkoutCard
                  key={index}
                  workout={workout}
                  isFavorite={false}
                  onToggleFavorite={() => {}}
                  onClick={() => navigate(`/workouts/${workout.id}`)}
                >
                  <Button
                    variant="secondary"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleMarkAsDone(workout.id);
                    }}
                    className={styles.doneButton}
                  >
                    Mark as Done
                  </Button>
                </WorkoutCard>
              ))}
            {plan
              .filter(workout => completedWorkouts.includes(workout.id))
              .map((workout, index) => (
                <div key={index} className={styles.done}>
                  <WorkoutCard
                    workout={workout}
                    isFavorite={false}
                    onToggleFavorite={() => {}}
                    onClick={() => navigate(`/workouts/${workout.id}`)}
                  />
                </div>
              ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default WeeklyPlan; 