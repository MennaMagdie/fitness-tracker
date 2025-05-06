const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const TrainerSession = require('../models/TrainerSession');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create payment intent for trainer session
// @route   POST /api/payments/create-intent
// @access  Private
exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { sessionId } = req.body;

    const session = await TrainerSession.findById(sessionId);

    if (!session) {
      return next(new ErrorResponse('Session not found', 404));
    }

    // Check if user is the client
    if (session.client.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to make this payment', 401));
    }

    // Check if payment is already completed
    if (session.payment.status === 'completed') {
      return next(new ErrorResponse('Payment already completed', 400));
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: session.payment.amount * 100, // Convert to cents
      currency: session.payment.currency,
      metadata: {
        sessionId: session._id.toString(),
        clientId: req.user.id,
        trainerId: session.trainer.toString()
      }
    });

    res.status(200).json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Handle Stripe webhook
// @route   POST /api/payments/webhook
// @access  Public
exports.handleWebhook = async (req, res, next) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      
      // Update session payment status
      await TrainerSession.findByIdAndUpdate(
        paymentIntent.metadata.sessionId,
        {
          'payment.status': 'completed',
          'payment.stripePaymentId': paymentIntent.id
        }
      );
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      
      // Update session payment status
      await TrainerSession.findByIdAndUpdate(
        failedPayment.metadata.sessionId,
        {
          'payment.status': 'failed'
        }
      );
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

// @desc    Get payment status
// @route   GET /api/payments/:sessionId/status
// @access  Private
exports.getPaymentStatus = async (req, res, next) => {
  try {
    const session = await TrainerSession.findById(req.params.sessionId);

    if (!session) {
      return next(new ErrorResponse('Session not found', 404));
    }

    // Check if user is either client or trainer
    if (session.client.toString() !== req.user.id && session.trainer.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to view this payment', 401));
    }

    res.status(200).json({
      success: true,
      data: {
        status: session.payment.status,
        amount: session.payment.amount,
        currency: session.payment.currency
      }
    });
  } catch (err) {
    next(err);
  }
}; 