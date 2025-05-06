const express = require('express');
const {
  createSession,
  getSessions,
  getSession,
  cancelSession,
  completeSession,
  rateSession
} = require('../controllers/trainers');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/sessions')
  .get(protect, getSessions)
  .post(protect, createSession);

router.route('/sessions/:id')
  .get(protect, getSession);

router.route('/sessions/:id/cancel')
  .put(protect, cancelSession);

router.route('/sessions/:id/complete')
  .put(protect, completeSession);

router.route('/sessions/:id/rate')
  .put(protect, rateSession);

module.exports = router; 