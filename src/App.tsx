import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
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


const App: React.FC = () => {
  return (
    <WorkoutPlanProvider>
      <AppProvider>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/:id" element={<WorkoutDetail />} />
          <Route path="/start-workout/:id" element={<StartWorkout />} />
          <Route path="/weekly-plan" element={<WeeklyPlan />} />
        </Routes>
      </AppProvider>
    </WorkoutPlanProvider>
  );
};

export default App;

