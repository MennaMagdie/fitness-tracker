const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      id: '1',
      type: 'workout',
      value: 45,
      date: '2024-02-20',
      notes: 'Morning cardio',
      workoutType: 'cardio',
      duration: 45
    },
    {
      id: '2',
      type: 'weight',
      value: 75,
      date: '2024-02-20',
      notes: 'Morning weigh-in'
    }
  ]);
});

router.post('/', (req, res) => {
  const { type, value, date, notes, workoutType, duration, measurements } = req.body;
  const newEntry = {
    id: Date.now().toString(),
    type,
    value,
    date,
    notes,
    workoutType,
    duration,
    measurements
  };
  res.status(201).json(newEntry);
});

router.delete('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: `Progress entry ${req.params.id} deleted successfully` 
  });
});

module.exports = router; 