const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      id: '1',
      name: 'Breakfast',
      calories: 500,
      protein: 20,
      carbs: 60,
      fat: 15,
      mealType: 'breakfast',
      time: '08:00',
      date: '2024-02-20',
      dayOfWeek: 'Monday'
    }
  ]);
});

router.post('/', (req, res) => {
  const { name, calories, protein, carbs, fat, mealType, time, date } = req.body;
  const newEntry = {
    id: Date.now().toString(),
    name,
    calories,
    protein,
    carbs,
    fat,
    mealType,
    time,
    date,
    dayOfWeek: new Date(date).toLocaleDateString('en-US', { weekday: 'long' })
  };
  res.status(201).json(newEntry);
});

router.delete('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: `Nutrition entry ${req.params.id} deleted successfully` 
  });
});

router.get('/by-day', (req, res) => {
  res.json({
    Monday: { totalCalories: 2000, meals: [] },
    Tuesday: { totalCalories: 1800, meals: [] },
    Wednesday: { totalCalories: 2100, meals: [] },
    Thursday: { totalCalories: 1900, meals: [] },
    Friday: { totalCalories: 2000, meals: [] },
    Saturday: { totalCalories: 2200, meals: [] },
    Sunday: { totalCalories: 1900, meals: [] }
  });
});

module.exports = router; 