const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'height', 'weight', 'age', 'profilePicture'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ message: 'Invalid updates' });
  }

  try {
    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating profile', error: error.message });
  }
});

// Add or update goal
router.post('/goals', auth, async (req, res) => {
  try {
    const { type, target, deadline } = req.body;
    req.user.goals.push({ type, target, deadline });
    await req.user.save();
    res.status(201).json(req.user.goals);
  } catch (error) {
    res.status(400).json({ message: 'Error adding goal', error: error.message });
  }
});

// Update goal status
router.put('/goals/:goalId', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const goal = req.user.goals.id(req.params.goalId);
    
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    goal.status = status;
    await req.user.save();
    res.json(goal);
  } catch (error) {
    res.status(400).json({ message: 'Error updating goal', error: error.message });
  }
});

// Delete goal
router.delete('/goals/:goalId', auth, async (req, res) => {
  try {
    req.user.goals = req.user.goals.filter(goal => goal._id.toString() !== req.params.goalId);
    await req.user.save();
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting goal', error: error.message });
  }
});

module.exports = router; 