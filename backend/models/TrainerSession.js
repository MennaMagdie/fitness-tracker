const mongoose = require('mongoose');

const trainerSessionSchema = new mongoose.Schema({
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionType: {
    type: String,
    enum: ['consultation', 'workout', 'nutrition', 'assessment'],
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
    min: [15, 'Session must be at least 15 minutes'],
    max: [180, 'Session cannot exceed 3 hours']
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  meetingLink: {
    type: String,
    default: null
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  feedback: {
    type: String,
    maxlength: [500, 'Feedback cannot exceed 500 characters']
  },
  payment: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'refunded'],
      default: 'pending'
    },
    stripePaymentId: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for better query performance
trainerSessionSchema.index({ trainer: 1, startTime: 1 });
trainerSessionSchema.index({ client: 1, startTime: 1 });
trainerSessionSchema.index({ status: 1 });

// Method to check if session is upcoming
trainerSessionSchema.methods.isUpcoming = function() {
  return this.status === 'scheduled' && this.startTime > new Date();
};

// Method to check if session can be cancelled
trainerSessionSchema.methods.canBeCancelled = function() {
  const hoursUntilSession = (this.startTime - new Date()) / (1000 * 60 * 60);
  return this.status === 'scheduled' && hoursUntilSession >= 24;
};

// Method to calculate session end time
trainerSessionSchema.virtual('endTime').get(function() {
  return new Date(this.startTime.getTime() + this.duration * 60000);
});

// Ensure virtuals are included in JSON output
trainerSessionSchema.set('toJSON', { virtuals: true });
trainerSessionSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('TrainerSession', trainerSessionSchema); 