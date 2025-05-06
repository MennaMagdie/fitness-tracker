
import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface MealEntry {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

export const NutritionTracker = () => {
  const [meals, setMeals] = useState<MealEntry[]>([
    {
      id: 1,
      name: "Breakfast - Avocado Toast",
      calories: 350,
      protein: 15,
      carbs: 30,
      fat: 20,
      time: "8:00 AM"
    },
    {
      id: 2,
      name: "Lunch - Chicken Salad",
      calories: 450,
      protein: 35,
      carbs: 25,
      fat: 15,
      time: "12:30 PM"
    },
    {
      id: 3,
      name: "Snack - Protein Shake",
      calories: 200,
      protein: 20,
      carbs: 15,
      fat: 5,
      time: "3:00 PM"
    }
  ]);

  const [newMeal, setNewMeal] = useState<Omit<MealEntry, 'id'>>({
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    time: ""
  });

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);
  
  const macroData = [
    { name: "Protein", value: totalProtein, color: "#FF8042" },
    { name: "Carbs", value: totalCarbs, color: "#FFBB28" },
    { name: "Fat", value: totalFat, color: "#FF4560" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMeal({
      ...newMeal,
      [name]: name === "name" || name === "time" ? value : Number(value)
    });
  };

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMeal.name && newMeal.calories > 0) {
      setMeals([
        ...meals,
        {
          id: Date.now(),
          ...newMeal
        }
      ]);
      
      // Reset form
      setNewMeal({
        name: "",
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        time: ""
      });
    }
  };

  const deleteMeal = (id: number) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  return (
    <div className="nutrition-tracker">
      <div className="nutrition-summary">
        <div className="macro-chart">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={macroData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1000}
              >
                {macroData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="nutrition-totals">
          <div className="total-item">
            <span className="total-label">Total Calories</span>
            <span className="total-value">{totalCalories}</span>
          </div>
          <div className="total-item">
            <span className="total-label">Protein</span>
            <span className="total-value">{totalProtein}g</span>
          </div>
          <div className="total-item">
            <span className="total-label">Carbs</span>
            <span className="total-value">{totalCarbs}g</span>
          </div>
          <div className="total-item">
            <span className="total-label">Fat</span>
            <span className="total-value">{totalFat}g</span>
          </div>
        </div>
      </div>

      <div className="meal-log">
        <h3 className="subsection-title">Today's Meals</h3>
        
        <ul className="meal-list">
          {meals.map(meal => (
            <li key={meal.id} className="meal-item">
              <div className="meal-details">
                <h4 className="meal-name">{meal.name}</h4>
                <div className="meal-macros">
                  <span>{meal.calories} cal</span>
                  <span>{meal.protein}g protein</span>
                  <span>{meal.carbs}g carbs</span>
                  <span>{meal.fat}g fat</span>
                </div>
                <div className="meal-time">{meal.time}</div>
              </div>
              <button 
                className="delete-meal-btn"
                onClick={() => deleteMeal(meal.id)}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
        
        <form className="add-meal-form" onSubmit={handleAddMeal}>
          <h4 className="form-title">Add New Meal</h4>
          
          <div className="form-group">
            <label>Meal Name</label>
            <input
              type="text"
              name="name"
              value={newMeal.name}
              onChange={handleInputChange}
              placeholder="e.g. Chicken Salad"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Calories</label>
              <input
                type="number"
                name="calories"
                value={newMeal.calories || ""}
                onChange={handleInputChange}
                placeholder="kcal"
                min="0"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Time</label>
              <input
                type="text"
                name="time"
                value={newMeal.time}
                onChange={handleInputChange}
                placeholder="e.g. 8:00 AM"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Protein (g)</label>
              <input
                type="number"
                name="protein"
                value={newMeal.protein || ""}
                onChange={handleInputChange}
                placeholder="g"
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label>Carbs (g)</label>
              <input
                type="number"
                name="carbs"
                value={newMeal.carbs || ""}
                onChange={handleInputChange}
                placeholder="g"
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label>Fat (g)</label>
              <input
                type="number"
                name="fat"
                value={newMeal.fat || ""}
                onChange={handleInputChange}
                placeholder="g"
                min="0"
              />
            </div>
          </div>
          
          <button type="submit" className="add-meal-submit">Add Meal</button>
        </form>
      </div>
    </div>
  );
};