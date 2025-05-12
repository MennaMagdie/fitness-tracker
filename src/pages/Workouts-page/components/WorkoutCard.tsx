import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Workout } from '../../../data/workoutsData';
import Button from '../../../components/Button/Button';
import styles from './WorkoutCard.module.css';

interface WorkoutCardProps {
  workout: Workout;
  isCompleted?: boolean;
  onMarkAsDone?: () => void;
  isInPlan?: boolean;
  onAddToPlan?: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, isCompleted, onMarkAsDone, isInPlan, onAddToPlan }) => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.card} ${isCompleted ? styles.completed : ''}`}>
      <div className={styles.imageContainer}>
        <img src={workout.image} alt={workout.title} />
        {isCompleted && <div className={styles.completedBadge}>✓ Completed</div>}
      </div>
      
      <div className={styles.content}>
        <h3>{workout.title}</h3>
        
        <div className={styles.metaInfo}>
          <span className={styles.duration}>{workout.duration} min</span>
          <span className={styles.difficulty}>{workout.difficulty}</span>
          <span className={styles.type}>{workout.type}</span>
          <span className={styles.calories}>🔥 {workout.totalCaloriesBurned} cal</span>
        </div>

        <div className={styles.actions}>
          <Button
            variant="primary"
            onClick={() => navigate(`/workouts/${workout.id}`)}
            className={styles.detailsButton}
          >
            View Details
          </Button>
          {onAddToPlan ? (
            <Button
              variant="secondary"
              onClick={onAddToPlan}
              className={styles.doneButton}
              disabled={isInPlan}
            >
              {isInPlan ? 'Added to Plan' : 'Add to Plan'}
            </Button>
          ) : (
            !isCompleted && onMarkAsDone && (
              <Button
                variant="secondary"
                onClick={onMarkAsDone}
                className={styles.doneButton}
              >
                Mark as Done
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard; 