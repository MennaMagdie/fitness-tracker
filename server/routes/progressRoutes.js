const express = require('express');
const Progress = require('../models/Progress');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all progress entries for a user
router.get('/', auth, async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user._id })
      .sort({ date: -1 });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress', error: error.message });
  }
});

// Get latest progress entry
router.get('/latest', auth, async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.user._id })
      .sort({ date: -1 });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching latest progress', error: error.message });
  }
});

// Add new progress entry
router.post('/', auth, async (req, res) => {
  try {
    const { type, workout, weight, measurements, notes, photos } = req.body;

    // Validate required fields based on type
    if (type === 'workout' && (!workout || !workout.id || !workout.name)) {
      return res.status(400).json({ message: 'Workout details are required for workout progress' });
    }

    if (type === 'weight' && !weight) {
      return res.status(400).json({ message: 'Weight is required for weight progress' });
    }

    // Calculate workout metrics if it's a workout type
    if (type === 'workout' && workout) {
      // Calculate total duration from exercises
      const totalDuration = workout.exercises.reduce((sum, exercise) => sum + (exercise.duration || 0), 0);
      
      // Calculate total calories burned from exercises
      const totalCaloriesBurned = workout.exercises.reduce((sum, exercise) => sum + (exercise.caloriesBurned || 0), 0);
      
      // Calculate average intensity from exercises
      const intensities = workout.exercises
        .filter(exercise => exercise.intensity)
        .map(exercise => exercise.intensity);
      const averageIntensity = intensities.length > 0 
        ? intensities.reduce((sum, intensity) => sum + intensity, 0) / intensities.length 
        : 5; // Default to middle intensity if none specified

      // Update workout object with calculated metrics
      workout.totalDuration = totalDuration;
      workout.totalCaloriesBurned = totalCaloriesBurned;
      workout.averageIntensity = Math.round(averageIntensity * 10) / 10; // Round to 1 decimal place
      workout.duration = req.body.workout.duration || 0; // Save planned duration
      workout.caloriesBurned = req.body.workout.caloriesBurned || 0; // Save planned calories
    }

    const progress = new Progress({
      userId: req.user._id,
      type,
      workout: type === 'workout' ? workout : undefined,
      weight: type === 'weight' ? weight : undefined,
      measurements: type === 'measurement' ? measurements : undefined,
      notes,
      photos,
      done: type === 'workout' ? true : false
    });

    await progress.save();
    res.status(201).json(progress);
  } catch (error) {
    res.status(400).json({ message: 'Error adding progress', error: error.message });
  }
});

// Get workout progress entries
router.get('/workouts', auth, async (req, res) => {
  try {
    const progress = await Progress.find({
      userId: req.user._id,
      type: 'workout'
    })
    .sort({ date: -1 });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workout progress', error: error.message });
  }
});

// Update progress entry
router.put('/:id', auth, async (req, res) => {
  try {
    const progress = await Progress.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }
    
    res.json(progress);
  } catch (error) {
    res.status(400).json({ message: 'Error updating progress', error: error.message });
  }
});

// Delete progress entry
router.delete('/:id', auth, async (req, res) => {
  try {
    const progress = await Progress.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }
    
    res.json({ message: 'Progress entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting progress', error: error.message });
  }
});

module.exports = router; 