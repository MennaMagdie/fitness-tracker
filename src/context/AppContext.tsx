import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProgress, getNutrition, getTodayNutrition, addProgress as apiAddProgress } from '../services/api';
import { useAuth } from './AuthContext';
import styles from '../../pages/Profile.module.css';

interface UserData {
  name: string;
  email: string;
  profilePhoto: string;
  height: number;
  weight: number;
  bmi: number;
  bmiCategory: string;
  streak: number;
  progress: number;
  age: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  dailyNutritionGoals?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface ProgressEntry {
  id: string;
  type: 'workout' | 'bmi' | 'weight' | 'measurement';
  value: number;
  notes?: string;
  workoutType?: 'cardio' | 'strength' | 'flexibility' | 'other';
  duration?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
  date: string;
  done: boolean;
}

interface NutritionEntry {
  id: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: Array<{
    name: string;
    quantity: number;
    unit: string;
    calories: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  }>;
  totalCalories: number;
  notes?: string;
  waterIntake?: number;
  date: string;
}

interface AppState {
  userData: UserData | null;
  progress: ProgressEntry[];
  nutrition: NutritionEntry[];
  loading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_USER_DATA'; payload: UserData }
  | { type: 'SET_PROGRESS'; payload: ProgressEntry[] }
  | { type: 'ADD_PROGRESS'; payload: ProgressEntry }
  | { type: 'SET_NUTRITION'; payload: NutritionEntry[] }
  | { type: 'ADD_NUTRITION'; payload: NutritionEntry }
  | { type: 'UPDATE_TODAY_NUTRITION'; payload: { calories: number; protein: number; carbs: number; fat: number } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: AppState = {
  userData: null,
  progress: [],
  nutrition: [],
  loading: false,
  error: null
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return { ...state, userData: action.payload };
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    case 'ADD_PROGRESS':
      return { ...state, progress: [...state.progress, action.payload] };
    case 'SET_NUTRITION':
      return { ...state, nutrition: action.payload };
    case 'ADD_NUTRITION':
      return { ...state, nutrition: [...state.nutrition, action.payload] };
    case 'UPDATE_TODAY_NUTRITION':
      return {
        ...state,
        userData: state.userData ? {
          ...state.userData,
          nutrition: action.payload
        } : null
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const calculateDailyNutritionTotals = (nutrition: NutritionEntry[]) => {
  const today = new Date().toISOString().split('T')[0];
  const todayEntries = nutrition.filter(entry => entry.date.startsWith(today));
  
  return todayEntries.reduce((totals, entry) => ({
    calories: totals.calories + entry.totalCalories,
    protein: totals.protein + (entry.foods.reduce((sum, food) => sum + (food.protein || 0), 0)),
    carbs: totals.carbs + (entry.foods.reduce((sum, food) => sum + (food.carbs || 0), 0)),
    fat: totals.fat + (entry.foods.reduce((sum, food) => sum + (food.fat || 0), 0))
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const [progressData, nutritionData, todayNutrition] = await Promise.all([
          getProgress(),
          getNutrition(),
          getTodayNutrition()
        ]);
        const progress = Array.isArray(progressData.data) ? progressData.data : progressData;
        dispatch({ type: 'SET_PROGRESS', payload: progress });
        dispatch({ type: 'SET_NUTRITION', payload: nutritionData });
        dispatch({ type: 'UPDATE_TODAY_NUTRITION', payload: todayNutrition.totals });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
        
        if (errorMessage.includes('Not authenticated') || errorMessage.includes('Session expired')) {
          navigate('/login');
        }
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchData();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const updateTodayNutrition = async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        const todayNutrition = await getTodayNutrition();
        dispatch({ type: 'UPDATE_TODAY_NUTRITION', payload: todayNutrition.totals });
      } catch (error) {
        console.error('Failed to update today\'s nutrition:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to update nutrition';
        if (errorMessage.includes('Not authenticated') || errorMessage.includes('Session expired')) {
          navigate('/login');
        }
      }
    };

    if (state.nutrition.length > 0) {
      updateTodayNutrition();
    }
  }, [state.nutrition, isAuthenticated, navigate]);

  const customDispatch = async (action: AppAction) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (action.type === 'ADD_PROGRESS') {
      try {
        let backendEntry = null;
        if (
          action.payload.type === 'workout' ||
          action.payload.type === 'weight' ||
          action.payload.type === 'measurement'
        ) {
          let backendPayload: any = action.payload;
          if (action.payload.type === 'workout') {
            backendPayload = {
              type: 'workout',
              workout: {
                id: action.payload.id,
                name: action.payload.notes?.replace('Completed ', '').replace(/ workout.*/i, ''),
                exercises: [],
                duration: action.payload.duration || 0,
                caloriesBurned: action.payload.value || 0
              },
              notes: action.payload.notes || '',
              photos: []
            };
          }
          backendEntry = await apiAddProgress(backendPayload);
          dispatch({ type: 'ADD_PROGRESS', payload: backendEntry });
        } else {
          // For unsupported types, just update local state
          dispatch(action);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to save progress';
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
        
        if (errorMessage.includes('Not authenticated') || errorMessage.includes('Session expired')) {
          navigate('/login');
        }
      }
    } else {
      dispatch(action);
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch: customDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};