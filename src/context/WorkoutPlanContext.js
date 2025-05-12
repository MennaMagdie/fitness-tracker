import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const WorkoutPlanContext = createContext(undefined);
export const WorkoutPlanProvider = ({ children }) => {
    const [plan, setPlan] = useState([]);
    const addToPlan = (workout) => {
        setPlan(prev => {
            if (prev.some(w => w.id === workout.id)) {
                return prev;
            }
            return [...prev, workout];
        });
    };
    const removeFromPlan = (workoutId) => {
        setPlan(prev => prev.filter(w => w.id !== workoutId));
    };
    const isInPlan = (workoutId) => {
        return plan.some(w => w.id === workoutId);
    };
    return (_jsx(WorkoutPlanContext.Provider, { value: { plan, addToPlan, removeFromPlan, isInPlan }, children: children }));
};
export const useWorkoutPlan = () => {
    const context = useContext(WorkoutPlanContext);
    if (context === undefined) {
        throw new Error('useWorkoutPlan must be used within a WorkoutPlanProvider');
    }
    return context;
};
