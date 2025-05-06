const Progress = require('../models/Progress');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get user progress
// @route   GET /api/users/progress
// @access  Private
exports.getProgress = async (req, res, next) => {
  try {
    const { type, startDate, endDate } = req.query;
    const query = { user: req.user.id };

    // Add type filter if provided
    if (type) {
      query.type = type;
    }

    // Add date range if provided
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const progress = await Progress.find(query)
      .sort('-date');

    // Calculate statistics
    const stats = {
      totalWorkouts: await Progress.countDocuments({ ...query, type: 'workout' }),
      averageBMI: await Progress.aggregate([
        { $match: { ...query, type: 'bmi' } },
        { $group: { _id: null, avgBMI: { $avg: '$value' } } }
      ]),
      latestWeight: await Progress.findOne({ ...query, type: 'weight' })
        .sort('-date')
        .select('value date'),
      latestMeasurements: await Progress.findOne({ ...query, type: 'measurement' })
        .sort('-date')
        .select('measurements date')
    };

    res.status(200).json({
      success: true,
      count: progress.length,
      data: progress,
      stats
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add progress entry
// @route   POST /api/users/progress
// @access  Private
exports.addProgress = async (req, res, next) => {
  try {
    const { type, value, notes, workoutType, duration, measurements } = req.body;

    // Create progress entry
    const progress = await Progress.create({
      user: req.user.id,
      type,
      value,
      notes,
      workoutType,
      duration,
      measurements
    });

    // If it's a BMI entry, update user's BMI
    if (type === 'bmi') {
      await User.findByIdAndUpdate(req.user.id, {
        'profile.bmi': value
      });
    }

    // If it's a weight entry, update user's weight
    if (type === 'weight') {
      await User.findByIdAndUpdate(req.user.id, {
        'profile.weight': value
      });
    }

    res.status(201).json({
      success: true,
      data: progress
    });
  } catch (err) {
    next(err);
  }
}; 