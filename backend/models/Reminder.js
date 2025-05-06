const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a reminder title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  type: {
    type: String,
    enum: ['workout', 'nutrition', 'water', 'meditation', 'other'],
    required: true
  },
  scheduledFor: {
    type: Date,
    required: true
  },
  frequency: {
    type: String,
    enum: ['once', 'daily', 'weekly', 'monthly'],
    default: 'once'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'missed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  notificationSent: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for better query performance
reminderSchema.index({ user: 1, scheduledFor: 1 });
reminderSchema.index({ status: 1 });

// Method to check if reminder is overdue
reminderSchema.methods.isOverdue = function() {
  return this.status === 'pending' && this.scheduledFor < new Date();
};

// Method to mark reminder as completed
reminderSchema.methods.markAsCompleted = function() {
  this.status = 'completed';
  return this.save();
};

module.exports = mongoose.model('Reminder', reminderSchema); 