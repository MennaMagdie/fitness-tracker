import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts-page/Workouts';
import WorkoutDetail from './pages/Workouts-page/WorkoutDetail';
import { WorkoutPlanProvider } from './context/WorkoutPlanContext';
import StartWorkout from './pages/Workouts-page/StartWorkout/StartWorkout';
import { AppProvider } from './context/AppContext';
import WeeklyPlan from './pages/Workouts-page/WeeklyPlan';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Register from './pages/Register';
import Nutrition from './pages/Nutrition';
import Progress from './pages/Progress';

const App: React.FC = () => {
  return (
    <AuthProvider>
    <WorkoutPlanProvider>
      <AppProvider>
        <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/nutrition" element={
              <ProtectedRoute>
                <Nutrition />
              </ProtectedRoute>
            } />
            <Route path="/progress" element={
              <ProtectedRoute>
                <Progress />
              </ProtectedRoute>
            } />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/:id" element={<WorkoutDetail />} />
          <Route path="/start-workout/:id" element={<StartWorkout />} />
          <Route path="/weekly-plan" element={<WeeklyPlan />} />
            
            {/* Redirect root to dashboard if authenticated, otherwise to login */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AppProvider>
    </WorkoutPlanProvider>
    </AuthProvider>
  );
};

export default App;

