const express = require('express');
const {
  createReminder,
  getReminders,
  getReminder,
  updateReminder,
  deleteReminder,
  completeReminder
} = require('../controllers/reminders');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getReminders)
  .post(protect, createReminder);

router.route('/:id')
  .get(protect, getReminder)
  .put(protect, updateReminder)
  .delete(protect, deleteReminder);

router.route('/:id/complete')
  .put(protect, completeReminder);

module.exports = router; 