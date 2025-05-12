import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { workouts } from '../../data/workoutsData';
import Layout from '../../components/Layout/Layout';
import WorkoutCard from './components/WorkoutCard';
import Filters from './components/Filters';
import styles from './Workouts.module.css';
import Button from '../../components/Button/Button';
import { useWorkoutPlan } from '../../context/WorkoutPlanContext';

const Workouts: React.FC = () => {
  const navigate = useNavigate();
  const { addToPlan, isInPlan } = useWorkoutPlan();
  const [filters, setFilters] = useState({
    duration: 'all',
    type: 'all',
    difficulty: 'all'
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredWorkouts = workouts.filter(workout => {
    const matchesDuration = filters.duration === 'all' || 
      (filters.duration === 'short' && workout.duration <= 15) ||
      (filters.duration === 'medium' && workout.duration > 15 && workout.duration <= 30) ||
      (filters.duration === 'long' && workout.duration > 30);
    
    const matchesType = filters.type === 'all' || workout.type === filters.type;
    const matchesDifficulty = filters.difficulty === 'all' || workout.difficulty === filters.difficulty;
    
    return matchesDuration && matchesType && matchesDifficulty;
  });

  const handleToggleFavorite = (workoutId: string) => {
    // Implement favorite toggle logic
    console.log('Toggle favorite:', workoutId);
  };

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <aside className={styles.sidebar}>
          <Button
            variant="primary"
            onClick={() => navigate('/weekly-plan')}
            className={styles.planButton}
          >
            View Weekly Plan
          </Button>
          <Filters 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>
        <section className={styles.cardGrid}>
          {filteredWorkouts.map(workout => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              isInPlan={isInPlan(workout.id)}
              onAddToPlan={() => addToPlan(workout)}
            />
          ))}
        </section>
      </div>
    </Layout>
  );
};

export default Workouts;