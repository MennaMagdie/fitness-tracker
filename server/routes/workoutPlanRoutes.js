const express = require('express');
const router = express.Router();

// In-memory storage for workout plans (replace with database in production)
let workoutPlans = new Map();

// Get workout plan
router.get('/', (req, res) => {
  try {
    // Use a default user ID for now
    const userId = 'default';
    const userPlan = workoutPlans.get(userId) || [];
    
    res.json({
      success: true,
      data: {
        workouts: userPlan
      }
    });
  } catch (error) {
    console.error('Error fetching workout plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch workout plan',
      error: error.message
    });
  }
});

// Add workout to plan
router.post('/', (req, res) => {
  try {
    // Use a default user ID for now
    const userId = 'default';
    const { workout } = req.body;

    if (!workout || !workout.id) {
      return res.status(400).json({
        success: false,
        message: 'Invalid workout data'
      });
    }

    const userPlan = workoutPlans.get(userId) || [];
    
    // Check if workout already exists in plan
    if (userPlan.some(w => w.id === workout.id)) {
      return res.status(400).json({
        success: false,
        message: 'Workout already in plan'
      });
    }

    userPlan.push(workout);
    workoutPlans.set(userId, userPlan);

    res.json({
      success: true,
      data: {
        workouts: userPlan
      }
    });
  } catch (error) {
    console.error('Error adding workout to plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add workout to plan',
      error: error.message
    });
  }
});

// Remove workout from plan
router.delete('/:workoutId', (req, res) => {
  try {
    // Use a default user ID for now
    const userId = 'default';
    const { workoutId } = req.params;

    if (!workoutId) {
      return res.status(400).json({
        success: false,
        message: 'Workout ID is required'
      });
    }

    const userPlan = workoutPlans.get(userId) || [];
    const updatedPlan = userPlan.filter(w => w.id !== workoutId);
    
    workoutPlans.set(userId, updatedPlan);

    res.json({
      success: true,
      data: {
        workouts: updatedPlan
      }
    });
  } catch (error) {
    console.error('Error removing workout from plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove workout from plan',
      error: error.message
    });
  }
});

module.exports = router; 