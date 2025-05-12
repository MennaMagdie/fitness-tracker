import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Workout } from '../data/workoutsData';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { api } from '../services/api';

interface WorkoutPlanContextType {
  plan: Workout[];
  addToPlan: (workout: Workout) => Promise<void>;
  removeFromPlan: (workoutId: string) => Promise<void>;
  isInPlan: (workoutId: string | undefined | null) => boolean;
  loading: boolean;
  error: string | null;
}

const WorkoutPlanContext = createContext<WorkoutPlanContextType | undefined>(undefined);

export const WorkoutPlanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load saved plan from localStorage on initial load
  useEffect(() => {
    const savedPlan = localStorage.getItem('workoutPlan');
    if (savedPlan) {
      try {
        const parsedPlan = JSON.parse(savedPlan);
        if (Array.isArray(parsedPlan)) {
          setPlan(parsedPlan);
        }
      } catch (err) {
        console.error('Error parsing saved workout plan:', err);
      }
    }
  }, []);

  // Save plan to localStorage whenever it changes
  useEffect(() => {
    if (plan.length > 0) {
      localStorage.setItem('workoutPlan', JSON.stringify(plan));
    }
  }, [plan]);

  useEffect(() => {
    fetchWorkoutPlan();
  }, []);

  const fetchWorkoutPlan = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/workout-plan');
      if (response.data?.data?.workouts) {
        // Filter out any invalid workouts
        const validWorkouts = response.data.data.workouts.filter(
          (workout: Workout) => workout && workout.id
        );
        setPlan(validWorkouts);
      } else {
        setPlan([]);
      }
    } catch (err) {
      console.error('Error fetching workout plan:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to fetch workout plan');
      } else {
        setError('Failed to fetch workout plan');
      }
      setPlan([]);
    } finally {
      setLoading(false);
    }
  };

  const addToPlan = async (workout: Workout) => {
    try {
      if (!workout || !workout.id) {
        setError('Invalid workout data');
        return;
      }

      setLoading(true);
      setError(null);
      // Wrap the workout in a workout property to match the backend expectation
      const response = await api.post('/workout-plan', { workout });
      if (response.data?.data?.workouts) {
        const validWorkouts = response.data.data.workouts.filter(
          (w: Workout) => w && w.id
        );
        setPlan(validWorkouts);
      }
    } catch (err) {
      console.error('Error adding workout to plan:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to add workout to plan');
      } else {
        setError('Failed to add workout to plan');
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFromPlan = async (workoutId: string) => {
    try {
      if (!workoutId) {
        setError('Invalid workout ID');
        return;
      }

      setLoading(true);
      setError(null);
      const response = await api.delete(`/workout-plan/${workoutId}`);
      if (response.data?.data?.workouts) {
        const validWorkouts = response.data.data.workouts.filter(
          (w: Workout) => w && w.id
        );
        setPlan(validWorkouts);
      }
    } catch (err) {
      console.error('Error removing workout from plan:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to remove workout from plan');
      } else {
        setError('Failed to remove workout from plan');
      }
    } finally {
      setLoading(false);
    }
  };

  const isInPlan = (workoutId: string | undefined | null) => {
    if (!workoutId || !plan) return false;
    return plan.some(w => w && w.id === workoutId);
  };

  return (
    <WorkoutPlanContext.Provider value={{ plan, addToPlan, removeFromPlan, isInPlan, loading, error }}>
      {children}
    </WorkoutPlanContext.Provider>
  );
};

export const useWorkoutPlan = () => {
  const context = useContext(WorkoutPlanContext);
  if (context === undefined) {
    throw new Error('useWorkoutPlan must be used within a WorkoutPlanProvider');
  }
  return context;
}; 