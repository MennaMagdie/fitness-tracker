import React, { useState, useEffect } from 'react';
import { getWorkoutDays } from '../../services/api';
import styles from './StreakTracker.module.css';

interface StreakDay {
  date: string;
  completed: boolean;
}

interface StreakTrackerProps {
  onStreakUpdate: (streak: number) => void;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ onStreakUpdate }) => {
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [streakHistory, setStreakHistory] = useState<StreakDay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStreakData = async () => {
      try {
        setLoading(true);
        const workoutDays = (await getWorkoutDays()) as string[]; // array of YYYY-MM-DD
        // Sort dates ascending
        const sortedDays = workoutDays.sort();
        // Calculate current streak (consecutive days up to today)
        let streak = 0;
        let dayCursor = new Date();
        dayCursor.setHours(0,0,0,0);
        while (workoutDays.includes(dayCursor.toISOString().split('T')[0])) {
          streak++;
          dayCursor.setDate(dayCursor.getDate() - 1);
        }
        setCurrentStreak(streak);
        onStreakUpdate(streak);
        // Build streakHistory for the last 7 days
        const weekDays: StreakDay[] = Array.from({length: 7}).map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (6 - i));
          const dateStr = d.toISOString().split('T')[0];
          return {
            date: dateStr,
            completed: workoutDays.includes(dateStr)
          };
        });
        setStreakHistory(weekDays);
      } catch (err) {
        console.error('Failed to fetch streak data:', err);
        setError('Failed to load streak data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchStreakData();
  }, [onStreakUpdate]);

  const getWeekDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    return days.map((day, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        day,
        date: date.toISOString().split('T')[0]
      };
    });
  };
  const weekDays = getWeekDays();

  if (loading) {
    return <div className={styles.loading}>Loading streak data...</div>;
  }
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.streakTracker}>
      <div className={styles.streakHeader}>
        <h2>Workout Streak</h2>
        <div className={styles.currentStreak}>
          <span className={styles.streakNumber}>{currentStreak}</span>
          <span className={styles.streakLabel}>days</span>
        </div>
      </div>
      <div className={styles.weekView}>
        {weekDays.map(({ day, date }) => {
          const streakDay = streakHistory.find(d => d.date === date);
          return (
            <div key={date} className={styles.dayContainer}>
              <div className={styles.dayLabel}>{day}</div>
              <div className={`${styles.dayIndicator} ${streakDay?.completed ? styles.completed : ''}`}>
                {streakDay?.completed ? '✓' : ''}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.streakStats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>This Week</span>
          <span className={styles.statValue}>
            {streakHistory.filter(d => d.completed).length}
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Days</span>
          <span className={styles.statValue}>
            {streakHistory.filter(d => d.completed).length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StreakTracker; 