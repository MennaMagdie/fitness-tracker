const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createPaymentIntent,
  handleWebhook,
  getPaymentStatus
} = require('../controllers/payments');

// Create payment intent
router.post('/create-intent', protect, createPaymentIntent);

// Handle Stripe webhook
router.post('/webhook', handleWebhook);

// Get payment status
router.get('/:sessionId/status', protect, getPaymentStatus);

module.exports = router; 