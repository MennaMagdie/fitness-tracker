const express = require('express');
const Nutrition = require('../models/Nutrition');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all nutrition entries for a user
router.get('/', auth, async (req, res) => {
  try {
    const nutrition = await Nutrition.find({ userId: req.user._id })
      .sort({ date: -1 });
    res.json(nutrition);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching nutrition data', error: error.message });
  }
});

// Get today's nutrition entry
router.get('/today', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nutrition = await Nutrition.findOne({
      userId: req.user._id,
      date: {
        $gte: today,
        $lt: tomorrow
      }
    });
    
    res.json(nutrition || { meals: [], waterIntake: 0, totalCalories: 0 });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching today\'s nutrition', error: error.message });
  }
});

// Add new meal to today's nutrition entry
router.post('/', auth, async (req, res) => {
  console.log('Received nutrition POST:', req.body);
  try {
    const { name, calories, protein, carbs, fat, mealType, time, date } = req.body;

    // Validation
    if (
      !name ||
      calories == null ||
      protein == null ||
      carbs == null ||
      fat == null
    ) {
      return res.status(400).json({ message: 'Missing required nutrition fields.' });
    }

    // Find or create today's nutrition entry
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);

    let nutrition = await Nutrition.findOne({
      userId: req.user._id,
      date: dateOnly
    });

    // Build the meal object
    const meal = {
      name,
      time: new Date(time || Date.now()),
      foods: [{
        name,
        quantity: 1,
        unit: 'serving',
        calories,
        protein,
        carbs,
        fat
      }]
    };

    if (!nutrition) {
      nutrition = new Nutrition({
        userId: req.user._id,
        date: dateOnly,
        meals: [meal],
        totalCalories: calories,
        totalProtein: protein,
        totalCarbs: carbs,
        totalFat: fat
      });
    } else {
      nutrition.meals.push(meal);
      nutrition.totalCalories += calories;
      nutrition.totalProtein += protein;
      nutrition.totalCarbs += carbs;
      nutrition.totalFat += fat;
    }

    await nutrition.save();
    res.status(201).json(nutrition);
  } catch (error) {
    res.status(400).json({ message: 'Error adding nutrition entry', error: error.message });
  }
});

// Update nutrition entry
router.put('/:id', auth, async (req, res) => {
  try {
    const nutrition = await Nutrition.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    
    if (!nutrition) {
      return res.status(404).json({ message: 'Nutrition entry not found' });
    }
    
    res.json(nutrition);
  } catch (error) {
    res.status(400).json({ message: 'Error updating nutrition entry', error: error.message });
  }
});

// Delete nutrition entry
router.delete('/:id', auth, async (req, res) => {
  try {
    const nutrition = await Nutrition.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!nutrition) {
      return res.status(404).json({ message: 'Nutrition entry not found' });
    }
    
    res.json({ message: 'Nutrition entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting nutrition entry', error: error.message });
  }
});

// Delete a meal from a nutrition entry
router.delete('/:nutritionId/meals/:mealId', auth, async (req, res) => {
  try {
    const { nutritionId, mealId } = req.params;
    const nutrition = await Nutrition.findOne({ _id: nutritionId, userId: req.user._id });
    if (!nutrition) {
      return res.status(404).json({ message: 'Nutrition entry not found' });
    }
    const mealIndex = nutrition.meals.findIndex(m => m._id.toString() === mealId);
    if (mealIndex === -1) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    // Subtract macros from totals
    const meal = nutrition.meals[mealIndex];
    const food = meal.foods[0] || {};
    nutrition.totalCalories -= food.calories || 0;
    nutrition.totalProtein -= food.protein || 0;
    nutrition.totalCarbs -= food.carbs || 0;
    nutrition.totalFat -= food.fat || 0;
    // Remove the meal
    nutrition.meals.splice(mealIndex, 1);
    await nutrition.save();
    res.json(nutrition);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meal', error: error.message });
  }
});

module.exports = router; 