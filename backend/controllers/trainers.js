const TrainerSession = require('../models/TrainerSession');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create trainer session
// @route   POST /api/trainers/sessions
// @access  Private
exports.createSession = async (req, res, next) => {
  try {
    const { trainerId, sessionType, startTime, duration, notes } = req.body;

    // Check if trainer exists and is actually a trainer
    const trainer = await User.findOne({ _id: trainerId, role: 'trainer' });
    if (!trainer) {
      return next(new ErrorResponse('Trainer not found', 404));
    }

    // Check if trainer is available at the requested time
    const existingSession = await TrainerSession.findOne({
      trainer: trainerId,
      startTime: {
        $lte: new Date(startTime),
        $gte: new Date(new Date(startTime).getTime() - duration * 60000)
      },
      status: 'scheduled'
    });

    if (existingSession) {
      return next(new ErrorResponse('Trainer is not available at this time', 400));
    }

    const session = await TrainerSession.create({
      trainer: trainerId,
      client: req.user.id,
      sessionType,
      startTime,
      duration,
      notes,
      payment: {
        amount: trainer.hourlyRate * (duration / 60),
        currency: 'USD'
      }
    });

    res.status(201).json({
      success: true,
      data: session
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all sessions for a user (as client or trainer)
// @route   GET /api/trainers/sessions
// @access  Private
exports.getSessions = async (req, res, next) => {
  try {
    const sessions = await TrainerSession.find({
      $or: [
        { client: req.user.id },
        { trainer: req.user.id }
      ]
    })
    .populate('trainer', 'name profilePhoto')
    .populate('client', 'name profilePhoto')
    .sort('startTime');

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single session
// @route   GET /api/trainers/sessions/:id
// @access  Private
exports.getSession = async (req, res, next) => {
  try {
    const session = await TrainerSession.findById(req.params.id)
      .populate('trainer', 'name profilePhoto')
      .populate('client', 'name profilePhoto');

    if (!session) {
      return next(new ErrorResponse('Session not found', 404));
    }

    // Check if user is either the client or trainer
    if (session.client.toString() !== req.user.id && session.trainer.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to access this session', 401));
    }

    res.status(200).json({
      success: true,
      data: session
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Cancel session
// @route   PUT /api/trainers/sessions/:id/cancel
// @access  Private
exports.cancelSession = async (req, res, next) => {
  try {
    const session = await TrainerSession.findById(req.params.id);

    if (!session) {
      return next(new ErrorResponse('Session not found', 404));
    }

    // Check if user is either the client or trainer
    if (session.client.toString() !== req.user.id && session.trainer.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to cancel this session', 401));
    }

    // Check if session can be cancelled
    if (!session.canBeCancelled()) {
      return next(new ErrorResponse('Session cannot be cancelled less than 24 hours before start time', 400));
    }

    session.status = 'cancelled';
    await session.save();

    res.status(200).json({
      success: true,
      data: session
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Complete session
// @route   PUT /api/trainers/sessions/:id/complete
// @access  Private
exports.completeSession = async (req, res, next) => {
  try {
    const session = await TrainerSession.findById(req.params.id);

    if (!session) {
      return next(new ErrorResponse('Session not found', 404));
    }

    // Only trainer can mark session as completed
    if (session.trainer.toString() !== req.user.id) {
      return next(new ErrorResponse('Only trainer can mark session as completed', 401));
    }

    session.status = 'completed';
    await session.save();

    res.status(200).json({
      success: true,
      data: session
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Rate session
// @route   PUT /api/trainers/sessions/:id/rate
// @access  Private
exports.rateSession = async (req, res, next) => {
  try {
    const { rating, feedback } = req.body;

    const session = await TrainerSession.findById(req.params.id);

    if (!session) {
      return next(new ErrorResponse('Session not found', 404));
    }

    // Only client can rate the session
    if (session.client.toString() !== req.user.id) {
      return next(new ErrorResponse('Only client can rate the session', 401));
    }

    // Session must be completed to be rated
    if (session.status !== 'completed') {
      return next(new ErrorResponse('Can only rate completed sessions', 400));
    }

    session.rating = rating;
    session.feedback = feedback;
    await session.save();

    res.status(200).json({
      success: true,
      data: session
    });
  } catch (err) {
    next(err);
  }
}; 