import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Workout } from '../data/workoutsData';

interface WorkoutPlanContextType {
  plan: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (workoutId: string) => void;
  isInPlan: (workoutId: string) => boolean;
}

const WorkoutPlanContext = createContext<WorkoutPlanContextType | undefined>(undefined);

export const WorkoutPlanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plan, setPlan] = useState<Workout[]>([]);

  const addToPlan = (workout: Workout) => {
    setPlan(prev => {
      if (prev.some(w => w.id === workout.id)) {
        return prev;
      }
      return [...prev, workout];
    });
  };

  const removeFromPlan = (workoutId: string) => {
    setPlan(prev => prev.filter(w => w.id !== workoutId));
  };

  const isInPlan = (workoutId: string) => {
    return plan.some(w => w.id === workoutId);
  };

  return (
    <WorkoutPlanContext.Provider value={{ plan, addToPlan, removeFromPlan, isInPlan }}>
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