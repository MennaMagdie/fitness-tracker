const { validationResult, body } = require('express-validator');

// Middleware to handle validation errors
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// Validation rules for user registration
exports.registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// Validation rules for user login
exports.loginRules = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').exists().withMessage('Password is required')
];

// Validation rules for profile update
exports.profileUpdateRules = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Please include a valid email'),
  body('age').optional().isInt({ min: 13 }).withMessage('Age must be at least 13'),
  body('height').optional().isFloat({ min: 0 }).withMessage('Height must be a positive number'),
  body('weight').optional().isFloat({ min: 0 }).withMessage('Weight must be a positive number'),
  body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
  body('fitnessGoals').optional().isArray().withMessage('Fitness goals must be an array'),
  body('activityLevel').optional().isIn(['sedentary', 'light', 'moderate', 'active', 'very_active'])
    .withMessage('Invalid activity level'),
  body('dailyNutritionGoals.calories').optional().isInt({ min: 0 }).withMessage('Calories must be a positive number'),
  body('dailyNutritionGoals.protein').optional().isInt({ min: 0 }).withMessage('Protein must be a positive number'),
  body('dailyNutritionGoals.carbs').optional().isInt({ min: 0 }).withMessage('Carbs must be a positive number'),
  body('dailyNutritionGoals.fat').optional().isInt({ min: 0 }).withMessage('Fat must be a positive number')
];

// Validation rules for progress entry
exports.progressRules = [
  body('type').isIn(['workout', 'bmi', 'weight', 'measurement'])
    .withMessage('Invalid progress type'),
  body('value').isFloat({ min: 0 }).withMessage('Value must be a positive number'),
  body('notes').optional().trim(),
  body('workoutType').optional().isIn(['cardio', 'strength', 'flexibility', 'other'])
    .withMessage('Invalid workout type'),
  body('duration').optional().isInt({ min: 1 })
    .withMessage('Duration must be a positive number'),
  body('measurements').optional().isObject()
    .withMessage('Measurements must be an object'),
  body('measurements.chest').optional().isFloat({ min: 0 }),
  body('measurements.waist').optional().isFloat({ min: 0 }),
  body('measurements.hips').optional().isFloat({ min: 0 }),
  body('measurements.arms').optional().isFloat({ min: 0 }),
  body('measurements.thighs').optional().isFloat({ min: 0 })
];

// Validation rules for nutrition entry
exports.nutritionRules = [
  body('mealType').isIn(['breakfast', 'lunch', 'dinner', 'snack'])
    .withMessage('Invalid meal type'),
  body('foods').isArray().withMessage('Foods must be an array'),
  body('foods.*.name').trim().notEmpty().withMessage('Food name is required'),
  body('foods.*.quantity').isFloat({ min: 0 }).withMessage('Quantity must be a positive number'),
  body('foods.*.unit').trim().notEmpty().withMessage('Unit is required'),
  body('foods.*.calories').isFloat({ min: 0 }).withMessage('Calories must be a positive number'),
  body('foods.*.protein').optional().isFloat({ min: 0 }),
  body('foods.*.carbs').optional().isFloat({ min: 0 }),
  body('foods.*.fat').optional().isFloat({ min: 0 }),
  body('totalCalories').isFloat({ min: 0 }).withMessage('Total calories must be a positive number'),
  body('notes').optional().trim(),
  body('waterIntake').optional().isFloat({ min: 0 })
    .withMessage('Water intake must be a positive number')
];

// Validation rules for post creation
exports.postRules = [
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('type').isIn(['text', 'image', 'video']).withMessage('Invalid post type'),
  body('tags').optional().isArray().withMessage('Tags must be an array')
];

// Validation rules for reminder creation/update
exports.reminderRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('type').isIn(['workout', 'nutrition']).withMessage('Invalid reminder type'),
  body('scheduledFor').isISO8601().withMessage('Invalid date format'),
  body('frequency').optional().isIn(['once', 'daily', 'weekly', 'monthly'])
    .withMessage('Invalid frequency'),
  body('priority').optional().isIn(['low', 'medium', 'high'])
    .withMessage('Invalid priority level')
];

// Validation rules for trainer session creation
exports.sessionRules = [
  body('trainerId').isMongoId().withMessage('Invalid trainer ID'),
  body('startTime').isISO8601().withMessage('Invalid start time'),
  body('duration').isInt({ min: 30, max: 180 }).withMessage('Duration must be between 30 and 180 minutes'),
  body('type').isIn(['video', 'chat']).withMessage('Invalid session type'),
  body('notes').optional().trim()
];

// Validation rules for comments
exports.commentRules = [
  body('content').trim().notEmpty().withMessage('Comment content is required')
];

// Validation rules for session rating
exports.ratingRules = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('feedback').optional().trim()
]; 