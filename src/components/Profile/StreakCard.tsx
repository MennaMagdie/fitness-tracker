import React from 'react';
import { FaFire } from 'react-icons/fa';
import '../../pages/Profile.css';

const StreakCard = ({ streak }: { streak: { currentStreak: number; longestStreak: number; lastWorkoutDate: string } }) => (
  <div className="card streak-card">
    <div className="streak-icon"><FaFire color="orange" size={32} /></div>
    <div>
      <h3>Current Streak: <span className="streak-highlight">{streak.currentStreak}</span> days</h3>
      <p>Longest: {streak.longestStreak} days</p>
      <p>Last Workout: {streak.lastWorkoutDate ? new Date(streak.lastWorkoutDate).toLocaleDateString() : 'Never'}</p>
    </div>
  </div>
);

export default StreakCard; 