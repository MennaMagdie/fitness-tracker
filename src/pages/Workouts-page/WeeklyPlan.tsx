import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useWorkoutPlan } from '../../context/WorkoutPlanContext';
import styles from './WeeklyPlan.module.css';
import WorkoutCard from './components/WorkoutCard';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import type { ProgressEntry } from '../../context/AppContext';
import { addProgress } from '../../services/api';

const WeeklyPlan: React.FC = () => {
  const { plan, removeFromPlan } = useWorkoutPlan();
  const navigate = useNavigate();
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([]);
  const { dispatch } = useAppContext();

  const handleMarkAsDone = async (workoutId: string) => {
    const workout = plan.find(w => w.id === workoutId);
    if (workout) {
      try {
        console.log('Marking workout as done:', workout);

        // Build the correct progress data structure
        const progressData = {
          type: 'workout' as const,
          workout: {
            id: workout.id,
            name: workout.title,
            exercises: workout.exercises.map(ex => ({
              name: ex.name,
              sets: 1,
              reps: 1,
              duration: ex.duration || 0
            })),
            duration: workout.duration || 0,
            caloriesBurned: workout.totalCaloriesBurned || 0
          },
          notes: `Completed ${workout.title} workout with intensity: ${workout.intensity}`,
          photos: []
        };

        console.log('Sending progress data to backend:', JSON.stringify(progressData, null, 2));
        try {
          const progressResponse = await addProgress(progressData);
          console.log('Backend response:', progressResponse);

          if (!progressResponse || !progressResponse._id) {
            throw new Error('Invalid response from server');
          }

          // Then update the local state with the response from the backend
          const progressEntry = {
            id: progressResponse._id,
            type: 'workout' as const,
            value: workout.totalCaloriesBurned || 0,
            duration: workout.duration || 0,
            workoutType: (workout.type === 'hiit' ? 'cardio' : (workout.type as 'cardio' | 'strength' | 'flexibility' | 'other')),
            date: new Date().toISOString(),
            done: true,
            notes: `Completed ${workout.title} workout with intensity: ${workout.intensity}`
          };

          console.log('Updating local state with:', progressEntry);
          dispatch({
            type: 'ADD_PROGRESS',
            payload: progressEntry
          });

          // Remove from plan
          await removeFromPlan(workoutId);
          
          // Update local state
          setCompletedWorkouts(prev => [...prev, workoutId]);
          console.log('Workout marked as done successfully');
        } catch (error: any) {
          console.error('Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            data: error.response?.data,
            request: error.config?.data
          });
          throw error;
        }
      } catch (error) {
        console.error('Error completing workout:', error);
        // You might want to show an error message to the user here
      }
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Weekly Workout Plan</h1>
          <Button onClick={() => navigate('/workouts')}>Add More Workouts</Button>
        </div>

        {plan.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No workouts added to your plan yet.</p>
            <Button onClick={() => navigate('/workouts')}>Browse Workouts</Button>
          </div>
        ) : (
          <div className={styles.workoutGrid}>
            {plan.map(workout => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                isCompleted={completedWorkouts.includes(workout.id)}
                onMarkAsDone={() => handleMarkAsDone(workout.id)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WeeklyPlan; 