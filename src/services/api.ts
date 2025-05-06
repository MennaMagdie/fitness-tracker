import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to check if token exists and is valid
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    // Basic JWT validation - check if token is expired
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

// Progress API calls
export const getProgress = async () => {
  const response = await api.get('/progress');
  return response.data;
};

export const addProgress = async (data: {
  type: 'workout' | 'bmi' | 'weight' | 'measurement';
  value: number;
  date: string;
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
}) => {
  const response = await api.post('/progress', data);
  return response.data;
};

// Nutrition API calls
export const getNutrition = async () => {
  const response = await api.get('/nutrition');
  return response.data;
};

export const getTodayNutrition = async () => {
  try {
    const [intakeResponse, goalsResponse] = await Promise.all([
      api.get('/nutrition/today'),
      api.get('/users/profile')
    ]);

    return {
      totals: intakeResponse.data.totals || {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      },
      goals: goalsResponse.data.dailyNutritionGoals || {
        calories: 2000,
        protein: 150,
        carbs: 250,
        fat: 70
      }
    };
  } catch (error) {
    console.error('Error fetching nutrition data:', error);
    return {
      totals: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      },
      goals: {
        calories: 2000,
        protein: 150,
        carbs: 250,
        fat: 70
      }
    };
  }
};

export const addNutrition = async (data: {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  time: string;
  date: string;
  dayOfWeek?: string;
}) => {
  const payload = {
    ...data,
    dayOfWeek: data.dayOfWeek || new Date(data.date).toLocaleDateString('en-US', { weekday: 'long' })
  };
  const response = await api.post('/nutrition', payload);
  return response.data;
};

export const deleteNutrition = async (id: string) => {
  const response = await api.delete(`/nutrition/${id}`);
  return response.data;
};

export const getNutritionByDayOfWeek = async () => {
  const response = await api.get('/nutrition/by-day');
  return response.data;
};

// Streak API calls
export const getStreak = async () => {
  const response = await api.get('/users/streak');
  return response.data;
};

export const updateStreak = async () => {
  const response = await api.patch('/users/streak');
  return response.data;
};

// User API calls
export const getUserProfile = async () => {
  try {
    if (!isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
    throw error;
  }
};

export const updateUserProfile = async (data: {
  name?: string;
  email?: string;
  height?: number;
  weight?: number;
  age?: number;
  gender?: string;
  activityLevel?: string;
  goals?: string[];
  dailyNutritionGoals?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}) => {
  try {
    if (!isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    const response = await api.put('/users/profile', data);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw new Error(error.response?.data?.message || 'Failed to update user profile');
    }
    throw error;
  }
};

// Auth API calls
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw error;
  }
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
  activityLevel: string;
  goals: string[];
}) => {
  try {
    const response = await api.post('/auth/register', data);
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export default api; 