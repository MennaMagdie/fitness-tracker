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
    default: Date.now
  },
  meals: [{
    name: {
      type: String,
      required: true
    },
    time: {
      type: Date,
      required: true
    },
    foods: [{
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      unit: {
        type: String,
        required: true
      },
      calories: {
        type: Number,
        required: true
      },
      protein: {
        type: Number,
        required: true
      },
      carbs: {
        type: Number,
        required: true
      },
      fat: {
        type: Number,
        required: true
      }
    }]
  }],
  waterIntake: {
    type: Number,
    default: 0,
    min: 0
  },
  totalCalories: {
    type: Number,
    default: 0
  },
  totalProtein: {
    type: Number,
    default: 0
  },
  totalCarbs: {
    type: Number,
    default: 0
  },
  totalFat: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient querying
nutritionSchema.index({ userId: 1, date: -1 });

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

module.exports = Nutrition; 