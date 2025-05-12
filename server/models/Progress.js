const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['workout', 'weight', 'measurement'],
    required: true
  },
  workout: {
    id: {
      type: String,
      required: function() { return this.type === 'workout'; }
    },
    name: {
      type: String,
      required: function() { return this.type === 'workout'; }
    },
    exercises: [{
      name: String,
      sets: Number,
      reps: Number,
      weight: Number,
      duration: Number,
      caloriesBurned: Number,
      intensity: {
        type: Number,
        min: 1,
        max: 10
      }
    }],
    duration: Number,
    caloriesBurned: Number,
    totalCaloriesBurned: Number,
    totalDuration: Number,
    averageIntensity: {
      type: Number,
      min: 1,
      max: 10
    }
  },
  weight: {
    type: Number,
    required: function() { return this.type === 'weight'; }
  },
  bodyFat: {
    type: Number,
    default: null
  },
  measurements: {
    chest: { type: Number, default: null },
    waist: { type: Number, default: null },
    hips: { type: Number, default: null },
    arms: { type: Number, default: null },
    thighs: { type: Number, default: null }
  },
  notes: {
    type: String,
    default: ''
  },
  photos: [{
    type: String,
    default: []
  }],
  done: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for efficient querying
progressSchema.index({ userId: 1, date: -1 });
progressSchema.index({ userId: 1, type: 1, date: -1 });

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress; 