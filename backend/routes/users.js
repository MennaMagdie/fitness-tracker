const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { validate, profileUpdateRules, progressRules, nutritionRules } = require('../middleware/validator');
const {
  getProfile,
  updateProfile,
  getStreak,
  updateStreak,
  getSettings,
  updateSettings
} = require('../controllers/users');
const {
  getProgress,
  addProgress
} = require('../controllers/progress');
const {
  getNutrition,
  addNutrition,
  deleteNutrition
} = require('../controllers/nutrition');

// Profile routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, profileUpdateRules, validate, updateProfile);
router.patch('/profile', protect, profileUpdateRules, validate, updateProfile);

// Streak routes
router.get('/streak', protect, getStreak);
router.patch('/streak', protect, updateStreak);

// Progress routes
router.get('/progress', protect, getProgress);
router.post('/progress', protect, progressRules, validate, addProgress);

// Nutrition routes
router.get('/nutrition', protect, getNutrition);
router.post('/nutrition', protect, nutritionRules, validate, addNutrition);
router.delete('/nutrition/:id', protect, deleteNutrition);

// Settings routes
router.get('/settings', protect, getSettings);
router.put('/settings', protect, updateSettings);

module.exports = router; 