const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  profile: {
    height: Number,
    weight: Number,
    age: Number,
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    fitnessGoals: [String],
    activityLevel: {
      type: String,
      enum: ['sedentary', 'light', 'moderate', 'active', 'very_active']
    }
  },
  dailyNutritionGoals: {
    calories: {
      type: Number,
      default: 2000
    },
    protein: {
      type: Number,
      default: 150
    },
    carbs: {
      type: Number,
      default: 250
    },
    fat: {
      type: Number,
      default: 70
    }
  },
  bmi: {
    type: Number,
    default: 0
  },
  streak: {
    current: {
      type: Number,
      default: 0
    },
    longest: {
      type: Number,
      default: 0
    },
    lastWorkoutDate: Date
  },
  role: {
    type: String,
    enum: ['user', 'trainer', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  profileImage: {
    type: String,
    default: ''
  },
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Calculate BMI
userSchema.methods.calculateBMI = function() {
  if (this.profile.height && this.profile.weight) {
    const heightInMeters = this.profile.height / 100;
    this.bmi = (this.profile.weight / (heightInMeters * heightInMeters)).toFixed(1);
  }
};

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Update streak
userSchema.methods.updateStreak = function() {
  const today = new Date();
  const lastWorkout = this.streak.lastWorkoutDate;
  
  if (!lastWorkout) {
    this.streak.current = 1;
  } else {
    const daysSinceLastWorkout = Math.floor((today - lastWorkout) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastWorkout === 1) {
      this.streak.current += 1;
    } else if (daysSinceLastWorkout > 1) {
      this.streak.current = 1;
    }
  }
  
  if (this.streak.current > this.streak.longest) {
    this.streak.longest = this.streak.current;
  }
  
  this.streak.lastWorkoutDate = today;
};

module.exports = mongoose.model('User', userSchema); 