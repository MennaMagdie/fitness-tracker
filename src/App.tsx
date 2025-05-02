import './App.css'
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import Settings from './pages/Settings';

function App() {
  return (
<Routes>
  <Route index element={<Landing />} /> 
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  <Route path="/home" element={<Home />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/workouts" element={<Workouts />} />
  <Route path="/settings" element={<Settings />} />
</Routes>
  );
}

export default App;

