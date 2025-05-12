import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Enable sending cookies
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
      // Clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Only redirect if not already on login page and not in the middle of an API call
      if (!window.location.pathname.includes('/login') && !error.config._retry) {
        window.location.href = '/login';
      }
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
    const isExpired = payload.exp * 1000 < Date.now();
    
    if (isExpired) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
    
    return true;
  } catch {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return false;
  }
};

// Workout API calls
export const getWorkouts = async () => {
  if (!isAuthenticated()) {
    throw new Error('Not authenticated');
  }
  // Use the correct endpoint for workout logs
  const response = await api.get('/progress', { params: { type: 'workout' } });
  return response.data;
};

// Progress API calls
export const getProgress = async () => {
  if (!isAuthenticated()) {
    throw new Error('Not authenticated');
  }
  const response = await api.get('/progress');
  return response.data;
};

export const getWorkoutProgress = async () => {
  if (!isAuthenticated()) {
    throw new Error('Not authenticated');
  }
  const response = await api.get('/progress/workouts');
  return response.data;
};

export const addProgress = async (data: {
  type: 'workout' | 'weight' | 'measurement';
  workout?: {
    id: string;
    name: string;
    exercises: Array<{
      name: string;
      sets: number;
      reps: number;
      weight?: number;
      duration?: number;
      caloriesBurned?: number;
      intensity?: number;
    }>;
    duration?: number;
    caloriesBurned?: number;
    totalDuration?: number;
    totalCaloriesBurned?: number;
    averageIntensity?: number;
  };
  weight?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
  notes?: string;
  photos?: string[];
}) => {
  try {
    if (!isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    // Calculate workout metrics if it's a workout type
    if (data.type === 'workout' && data.workout) {
      // Calculate total duration from exercises
      const totalDuration = data.workout.exercises.reduce((sum: number, exercise) => 
        sum + (exercise.duration || 0), 0);
      
      // Calculate total calories burned from exercises
      const totalCaloriesBurned = data.workout.exercises.reduce((sum: number, exercise) => 
        sum + (exercise.caloriesBurned || 0), 0);
      
      // Calculate average intensity from exercises
      const intensities = data.workout.exercises
        .filter(exercise => exercise.intensity !== undefined)
        .map(exercise => exercise.intensity as number);
      const averageIntensity = intensities.length > 0 
        ? intensities.reduce((sum: number, intensity: number) => sum + intensity, 0) / intensities.length 
        : 5; // Default to middle intensity if none specified

      // Update workout object with calculated metrics
      data.workout.totalDuration = totalDuration;
      data.workout.totalCaloriesBurned = totalCaloriesBurned;
      data.workout.averageIntensity = Math.round(averageIntensity * 10) / 10; // Round to 1 decimal place
    }

    console.log('Sending progress request:', {
      url: '/progress',
      method: 'POST',
      data: JSON.stringify(data, null, 2),
      headers: api.defaults.headers
    });
    const response = await api.post('/progress', data);
    return response.data;
  } catch (error) {
    console.error('Error adding progress:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error response:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
        request: {
          data: error.config?.data,
          headers: error.config?.headers
        }
      });
      if (error.response?.status === 401) {
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to add progress');
    }
    throw error;
  }
};

// Nutrition API calls
export const getNutrition = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    const response = await api.get('/nutrition');
    return response.data;
  } catch (error) {
    console.error('Error fetching nutrition data:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch nutrition data');
    }
    throw error;
  }
};

export const getTodayNutrition = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    const [intakeResponse, goalsResponse] = await Promise.all([
      api.get('/nutrition/today'),
      api.get('/users/profile')
    ]);

    return {
      meals: intakeResponse.data.meals || [],
      waterIntake: intakeResponse.data.waterIntake || 0,
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
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch nutrition data');
    }
    return {
      meals: [],
      waterIntake: 0,
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

// Helper to get unique workout days from workout logs
export const getWorkoutDays = async () => {
  const workouts = await getWorkouts();
  // Assume each workout has a date field (ISO string)
  const daysSet = new Set(
    workouts
      .map((w: any) => w.date && w.date.split('T')[0])
      .filter(Boolean)
  );
  return Array.from(daysSet).sort(); // sorted array of unique days
};

// Streak API calls
export const updateStreak = async (workoutData: {
  type: string;
  duration: number;
  caloriesBurned: number;
}) => {
  try {
    if (!isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    const response = await api.post('/users/streak', {
      ...workoutData,
      date: new Date().toISOString()
    });

    return response.data;
  } catch (error) {
    console.error('Error updating streak:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to update streak');
    }
    throw error;
  }
};

// User API calls
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
    throw error;
  }
};

export const uploadProfilePhoto = async (file: File) => {
  try {
    if (!isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    const formData = new FormData();
    formData.append('profilePhoto', file);

    // Use PUT /users/profile for uploading profile photo
    const response = await api.put('/users/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Ensure we have a photoUrl in the response
    if (!response.data || !response.data.profilePhoto) {
      throw new Error('No photo URL in response');
    }

    return {
      photoUrl: response.data.profilePhoto
    };
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to upload profile photo');
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
  profilePhoto?: string;
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

    // Filter out undefined values
    const updateData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    console.log('Sending profile update:', updateData);

    const response = await api.put('/users/profile', updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
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

export const logout = async () => {
  try {
    // Call the backend logout endpoint
    await api.get('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear all auth-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Only redirect if not already on login page
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }
};

export const deleteMeal = async (nutritionId: string, mealId: string) => {
  const response = await api.delete(`/nutrition/${nutritionId}/meals/${mealId}`);
  return response.data;
};

// BMI API calls
export const logBMI = async (data: {
  bmi: number;
  weight: number;
  height: number;
}) => {
  try {
    if (!isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    // Use 'weight' as the type for BMI logs
    const progressData = {
      type: 'weight',
      bmi: data.bmi,
      weight: data.weight,
      height: data.height,
      date: new Date().toISOString(),
      notes: `BMI: ${data.bmi.toFixed(1)}`
    };

    console.log('Sending BMI data:', progressData);

    const response = await api.post('/progress', progressData);
    console.log('BMI log response:', response.data);

    if (!response.data) {
      throw new Error('No data received from server');
    }

    return response.data;
  } catch (error) {
    console.error('Error logging BMI:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Session expired. Please login again.');
      }
      // Log the actual error response for debugging
      console.error('Server error response:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to log BMI');
    }
    throw error;
  }
};

export const getBMILogs = async () => {
  try {
    if (!isAuthenticated()) {
      throw new Error('Not authenticated');
    }
    // Fetch all weight logs (which include BMI)
    const response = await api.get('/progress', {
      params: { type: 'weight' }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching BMI logs:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch BMI logs');
    }
    throw error;
  }
}; 