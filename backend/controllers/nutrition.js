const Nutrition = require('../models/Nutrition');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @desc    Get user nutrition logs
// @route   GET /api/users/nutrition
// @access  Private
exports.getNutrition = async (req, res, next) => {
  try {
    const { startDate, endDate, mealType } = req.query;
    const query = { user: req.user.id };

    // Add date range if provided
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Add meal type filter if provided
    if (mealType) {
      query.mealType = mealType;
    }

    const nutrition = await Nutrition.find(query)
      .sort('-date');

    // Calculate daily totals
    const dailyTotals = await Nutrition.aggregate([
      { $match: query },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          totalCalories: { $sum: '$totalCalories' },
          totalProtein: { $sum: { $sum: '$foods.protein' } },
          totalCarbs: { $sum: { $sum: '$foods.carbs' } },
          totalFat: { $sum: { $sum: '$foods.fat' } },
          totalWater: { $sum: '$waterIntake' }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    res.status(200).json({
      success: true,
      count: nutrition.length,
      data: nutrition,
      dailyTotals
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add nutrition entry
// @route   POST /api/users/nutrition
// @access  Private
exports.addNutrition = async (req, res, next) => {
  try {
    const { mealType, foods, totalCalories, notes, waterIntake } = req.body;

    const nutrition = await Nutrition.create({
      user: req.user.id,
      mealType,
      foods,
      totalCalories,
      notes,
      waterIntake
    });

    res.status(201).json({
      success: true,
      data: nutrition
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete nutrition entry
// @route   DELETE /api/users/nutrition/:id
// @access  Private
exports.deleteNutrition = async (req, res, next) => {
  try {
    const nutrition = await Nutrition.findById(req.params.id);

    if (!nutrition) {
      return next(new ErrorResponse('Nutrition entry not found', 404));
    }

    // Make sure user owns nutrition entry
    if (nutrition.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to delete this entry', 401));
    }

    await nutrition.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// Get today's nutrition data
exports.getTodayNutrition = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Get all nutrition entries for today
    const todayEntries = await Nutrition.find({
      userId: req.user.id,
      date: today
    });

    // Calculate totals
    const totals = todayEntries.reduce((acc, entry) => ({
      calories: (acc.calories || 0) + entry.calories,
      protein: (acc.protein || 0) + entry.protein,
      carbs: (acc.carbs || 0) + entry.carbs,
      fat: (acc.fat || 0) + entry.fat
    }), {});

    // Get user's nutrition goals
    const user = await User.findById(req.user.id);
    const goals = user.dailyNutritionGoals || {
      calories: 2000,
      protein: 150,
      carbs: 250,
      fat: 70
    };

    // Log for debugging
    console.log('Today\'s nutrition data:', {
      date: today,
      entries: todayEntries.length,
      totals,
      goals
    });

    res.json({
      date: today,
      entries: todayEntries,
      totals,
      goals
    });
  } catch (error) {
    console.error('Error fetching today\'s nutrition:', error);
    res.status(500).json({ message: 'Error fetching nutrition data' });
  }
};

// Add nutrition entry
exports.addNutritionEntry = async (req, res) => {
  try {
    const {
      mealType,
      foodName,
      calories,
      protein,
      carbs,
      fat,
      servingSize,
      servingUnit
    } = req.body;

    const entry = new Nutrition({
      userId: req.user.id,
      date: new Date().toISOString().split('T')[0],
      mealType,
      foodName,
      calories,
      protein,
      carbs,
      fat,
      servingSize,
      servingUnit
    });

    await entry.save();

    // Log for debugging
    console.log('Added nutrition entry:', {
      date: entry.date,
      food: entry.foodName,
      calories: entry.calories
    });

    res.status(201).json(entry);
  } catch (error) {
    console.error('Error adding nutrition entry:', error);
    res.status(500).json({ message: 'Error adding nutrition entry' });
  }
}; 