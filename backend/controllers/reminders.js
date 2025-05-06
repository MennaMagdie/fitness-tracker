const Reminder = require('../models/Reminder');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create reminder
// @route   POST /api/reminders
// @access  Private
exports.createReminder = async (req, res, next) => {
  try {
    const { title, description, type, scheduledFor, frequency, priority } = req.body;

    const reminder = await Reminder.create({
      user: req.user.id,
      title,
      description,
      type,
      scheduledFor,
      frequency,
      priority
    });

    res.status(201).json({
      success: true,
      data: reminder
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all reminders
// @route   GET /api/reminders
// @access  Private
exports.getReminders = async (req, res, next) => {
  try {
    const reminders = await Reminder.find({ user: req.user.id })
      .sort('scheduledFor');

    res.status(200).json({
      success: true,
      count: reminders.length,
      data: reminders
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single reminder
// @route   GET /api/reminders/:id
// @access  Private
exports.getReminder = async (req, res, next) => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (!reminder) {
      return next(new ErrorResponse('Reminder not found', 404));
    }

    // Make sure user owns reminder
    if (reminder.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to access this reminder', 401));
    }

    res.status(200).json({
      success: true,
      data: reminder
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update reminder
// @route   PUT /api/reminders/:id
// @access  Private
exports.updateReminder = async (req, res, next) => {
  try {
    let reminder = await Reminder.findById(req.params.id);

    if (!reminder) {
      return next(new ErrorResponse('Reminder not found', 404));
    }

    // Make sure user owns reminder
    if (reminder.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to update this reminder', 401));
    }

    reminder = await Reminder.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: reminder
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete reminder
// @route   DELETE /api/reminders/:id
// @access  Private
exports.deleteReminder = async (req, res, next) => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (!reminder) {
      return next(new ErrorResponse('Reminder not found', 404));
    }

    // Make sure user owns reminder
    if (reminder.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to delete this reminder', 401));
    }

    await reminder.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Mark reminder as completed
// @route   PUT /api/reminders/:id/complete
// @access  Private
exports.completeReminder = async (req, res, next) => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (!reminder) {
      return next(new ErrorResponse('Reminder not found', 404));
    }

    // Make sure user owns reminder
    if (reminder.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to update this reminder', 401));
    }

    await reminder.markAsCompleted();

    res.status(200).json({
      success: true,
      data: reminder
    });
  } catch (err) {
    next(err);
  }
}; 