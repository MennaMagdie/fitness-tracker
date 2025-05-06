const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const { 
      name, 
      email, 
      age, 
      height, 
      weight, 
      gender, 
      fitnessGoals, 
      activityLevel,
      dailyNutritionGoals 
    } = req.body;

    // Build update object
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (age) updateFields['profile.age'] = age;
    if (height) updateFields['profile.height'] = height;
    if (weight) updateFields['profile.weight'] = weight;
    if (gender) updateFields['profile.gender'] = gender;
    if (fitnessGoals) updateFields['profile.fitnessGoals'] = fitnessGoals;
    if (activityLevel) updateFields['profile.activityLevel'] = activityLevel;
    if (dailyNutritionGoals) {
      if (dailyNutritionGoals.calories) updateFields['dailyNutritionGoals.calories'] = dailyNutritionGoals.calories;
      if (dailyNutritionGoals.protein) updateFields['dailyNutritionGoals.protein'] = dailyNutritionGoals.protein;
      if (dailyNutritionGoals.carbs) updateFields['dailyNutritionGoals.carbs'] = dailyNutritionGoals.carbs;
      if (dailyNutritionGoals.fat) updateFields['dailyNutritionGoals.fat'] = dailyNutritionGoals.fat;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    // Calculate BMI if height and weight are provided
    if (height && weight) {
      user.calculateBMI();
      await user.save();
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user streak
// @route   GET /api/users/streak
// @access  Private
exports.getStreak = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('streak');
    
    res.status(200).json({
      success: true,
      data: {
        currentStreak: user.streak.current,
        longestStreak: user.streak.longest,
        lastWorkoutDate: user.streak.lastWorkoutDate
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user streak
// @route   PATCH /api/users/streak
// @access  Private
exports.updateStreak = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Update streak based on last workout date
    const today = new Date();
    const lastWorkout = user.streak.lastWorkoutDate;
    
    if (lastWorkout) {
      const daysSinceLastWorkout = Math.floor((today - lastWorkout) / (1000 * 60 * 60 * 24));
      
      if (daysSinceLastWorkout === 1) {
        // Consecutive day
        user.streak.current += 1;
        if (user.streak.current > user.streak.longest) {
          user.streak.longest = user.streak.current;
        }
      } else if (daysSinceLastWorkout > 1) {
        // Streak broken
        user.streak.current = 1;
      }
    } else {
      // First workout
      user.streak.current = 1;
      user.streak.longest = 1;
    }
    
    user.streak.lastWorkoutDate = today;
    await user.save();

    res.status(200).json({
      success: true,
      data: {
        currentStreak: user.streak.current,
        longestStreak: user.streak.longest,
        lastWorkoutDate: user.streak.lastWorkoutDate
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user settings
// @route   GET /api/users/settings
// @access  Private
exports.getSettings = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('settings');
    
    res.status(200).json({
      success: true,
      data: user.settings || {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user settings
// @route   PUT /api/users/settings
// @access  Private
exports.updateSettings = async (req, res, next) => {
  try {
    const { reminders, notifications, darkMode, emailUpdates } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          'settings.reminders': reminders,
          'settings.notifications': notifications,
          'settings.darkMode': darkMode,
          'settings.emailUpdates': emailUpdates
        }
      },
      { new: true, runValidators: true }
    ).select('settings');

    res.status(200).json({
      success: true,
      data: user.settings
    });
  } catch (err) {
    next(err);
  }
}; 