const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: () => new Date().toISOString().split('T')[0] // Store as YYYY-MM-DD
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true
  },
  foodName: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true,
    min: 0
  },
  protein: {
    type: Number,
    required: true,
    min: 0
  },
  carbs: {
    type: Number,
    required: true,
    min: 0
  },
  fat: {
    type: Number,
    required: true,
    min: 0
  },
  servingSize: {
    type: Number,
    required: true,
    min: 0
  },
  servingUnit: {
    type: String,
    required: true
  },
  totalCalories: {
    type: Number,
    required: true
  },
  notes: String,
  waterIntake: {
    type: Number, // in ml
    default: 0
  }
}, {
  timestamps: true
});

// Add index for efficient date-based queries
nutritionSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('Nutrition', nutritionSchema); 