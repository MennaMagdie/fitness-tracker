import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getWorkouts, addProgress } from '../services/api';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
}

interface Workout {
  _id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'strength' | 'cardio' | 'flexibility' | 'other';
  scheduledFor?: string;
  totalCaloriesBurned: number;
  intensity: string;
  type: string;
}

const Workout: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completingWorkout, setCompletingWorkout] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      if (!user) {
        navigate('/login');
        return;
      }
      const data = await getWorkouts();
      setWorkouts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch workouts');
      console.error('Error fetching workouts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteWorkout = async (workout: Workout) => {
    try {
      setCompletingWorkout(workout._id);
      await addProgress({
        type: 'workout',
        workout: {
          id: workout._id,
          name: workout.name,
          exercises: workout.exercises.map(ex => ({
            name: ex.name,
            sets: 1,
            reps: 1,
            duration: ex.duration
          })),
          duration: workout.duration,
          caloriesBurned: workout.totalCaloriesBurned
        },
        notes: `Completed ${workout.name} workout with intensity: ${workout.intensity}`
      });
      // Refresh workouts after completion
      await fetchWorkouts();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to complete workout';
      setError(errorMessage);
      console.error('Error completing workout:', err);
      
      // If the error is about session expiration, redirect to login
      if (errorMessage.includes('Session expired') || errorMessage.includes('Not authenticated')) {
        navigate('/login');
      }
    } finally {
      setCompletingWorkout(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Workouts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <div key={workout._id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{workout.name}</h2>
            <p className="text-gray-600 mb-4">{workout.description}</p>
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mr-2">
                {workout.difficulty}
              </span>
              <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                {workout.category}
              </span>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Exercises:</h3>
              <ul className="space-y-2">
                {workout.exercises.map((exercise, index) => (
                  <li key={index} className="text-sm">
                    {exercise.name} - {exercise.sets} sets × {exercise.reps} reps
                    {exercise.weight && ` @ ${exercise.weight}kg`}
                    {exercise.duration && ` (${exercise.duration}min)`}
                  </li>
                ))}
              </ul>
            </div>
            {workout.scheduledFor && (
              <div className="mb-4 text-sm text-gray-600">
                Scheduled for: {new Date(workout.scheduledFor).toLocaleDateString()}
              </div>
            )}
            <button
              onClick={() => handleCompleteWorkout(workout)}
              disabled={completingWorkout === workout._id}
              className={`w-full py-2 px-4 rounded ${
                completingWorkout === workout._id
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {completingWorkout === workout._id ? 'Completing...' : 'Mark as Done'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workout; 