const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['workout', 'bmi', 'weight', 'measurement'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  value: {
    type: Number,
    required: true
  },
  notes: {
    type: String
  },
  workoutType: {
    type: String,
    enum: ['cardio', 'strength', 'flexibility', 'other']
  },
  duration: {
    type: Number // in minutes
  },
  measurements: {
    chest: Number,
    waist: Number,
    hips: Number,
    arms: Number,
    thighs: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Progress', ProgressSchema); 