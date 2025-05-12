import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useAppContext } from "../../context/AppContext";
import { addNutrition, deleteMeal } from "../../services/api";

interface NutritionEntry {
  _id?: string;
  id: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: Array<{
    name: string;
    quantity: number;
    unit: string;
    calories: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  }>;
  totalCalories: number;
  notes?: string;
  waterIntake?: number;
  date: string;
  meals?: Array<{
    _id?: string;
    name: string;
    time: string;
    foods: Array<{
      name: string;
      quantity: number;
      unit: string;
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    }>;
  }>;
}

interface MacroData {
  name: string;
  value: number;
  color: string;
}

interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const NutritionTracker = () => {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newMeal, setNewMeal] = useState<Omit<NutritionEntry, 'id'>>({
    mealType: 'breakfast',
    foods: [{
      name: "",
      quantity: 1,
      unit: 'serving',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    }],
    totalCalories: 0,
    date: new Date().toISOString()
  });

  // Get user's nutrition goals from state
  const nutritionGoals: NutritionGoals = state.userData?.dailyNutritionGoals || {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 70
  };

  // Find today's nutrition entry (fallback to most recent with meals if not found)
  const today = new Date().toISOString().split('T')[0];
  let todayEntry = state.nutrition.find(entry =>
    entry.date && entry.date.startsWith(today)
  ) as NutritionEntry & { meals?: any[] };
  if (!todayEntry && state.nutrition.length > 0) {
    todayEntry = state.nutrition.find(entry => Array.isArray((entry as any).meals) && (entry as any).meals.length > 0) as NutritionEntry & { meals?: any[] };
  }
  const meals = todayEntry?.meals || [];
  console.log('DEBUG NutritionTracker todayEntry:', todayEntry);
  console.log('DEBUG NutritionTracker meals:', meals);

  // Gather all foods from today's meals
  const allFoods = meals.flatMap(meal => meal.foods || []);

  // Calculate macros from all foods in today's meals
  const totalCalories = allFoods.reduce((sum, food) => sum + (food.calories || 0), 0);
  const totalProtein = allFoods.reduce((sum, food) => sum + (food.protein || 0), 0);
  const totalCarbs = allFoods.reduce((sum, food) => sum + (food.carbs || 0), 0);
  const totalFat = allFoods.reduce((sum, food) => sum + (food.fat || 0), 0);

  // Calculate total macros
  const totalMacros = totalProtein + totalCarbs + totalFat;

  // Macro data with percentage of total macros
  const macroData: MacroData[] = [
    { name: "Protein", value: totalProtein, color: "#FF8042" },
    { name: "Carbs", value: totalCarbs, color: "#FFBB28" },
    { name: "Fat", value: totalFat, color: "#FF4560" }
  ];

  // Macro data with percentage for labels
  const macroDataWithPercent = macroData.map(macro => ({
    ...macro,
    percent: totalMacros > 0 ? Math.round((macro.value / totalMacros) * 100) : 0
  }));

  // Calculate progress percentages
  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min(100, Math.round((current / goal) * 100));
  };

  const caloriesProgress = getProgressPercentage(totalCalories, nutritionGoals.calories);
  const proteinProgress = getProgressPercentage(totalProtein, nutritionGoals.protein);
  const carbsProgress = getProgressPercentage(totalCarbs, nutritionGoals.carbs);
  const fatProgress = getProgressPercentage(totalFat, nutritionGoals.fat);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'mealType') {
      setNewMeal(prev => ({
        ...prev,
        mealType: value as 'breakfast' | 'lunch' | 'dinner' | 'snack'
      }));
    } else {
      setNewMeal(prev => ({
        ...prev,
        foods: [{
          ...prev.foods[0],
          [name]: name === 'name' ? value : Number(value)
        }],
        totalCalories: name === 'calories' ? Number(value) : prev.totalCalories
      }));
    }
  };

  const handleAddMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMeal.foods[0].name && newMeal.foods[0].calories > 0) {
      try {
        setLoading(true);
        setError(null);
        
        const apiNutritionEntry = {
          name: newMeal.foods[0].name,
          calories: newMeal.foods[0].calories,
          protein: newMeal.foods[0].protein || 0,
          carbs: newMeal.foods[0].carbs || 0,
          fat: newMeal.foods[0].fat || 0,
          mealType: newMeal.mealType,
          time: new Date().toISOString(),
          date: newMeal.date
        };

        const response = await addNutrition(apiNutritionEntry);
        
        // Transform the response back to the AppContext format
        const contextNutritionEntry: NutritionEntry = {
          id: response.id,
          mealType: response.mealType,
          foods: [{
            name: response.name,
            quantity: 1,
            unit: 'serving',
            calories: response.calories,
            protein: response.protein,
            carbs: response.carbs,
            fat: response.fat
          }],
          totalCalories: response.calories,
          date: response.date
        };

        dispatch({ type: 'ADD_NUTRITION', payload: contextNutritionEntry });
        
        // Reset form
        setNewMeal({
          mealType: 'breakfast',
          foods: [{
            name: "",
            quantity: 1,
            unit: 'serving',
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0
          }],
          totalCalories: 0,
          date: new Date().toISOString()
        });
      } catch (err) {
        setError('Failed to add meal. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteMeal = async (mealId: string) => {
    try {
      setLoading(true);
      setError(null);
      if (!todayEntry || typeof todayEntry._id !== 'string') throw new Error('No nutrition entry found for today');
      await deleteMeal(todayEntry._id, mealId);
      dispatch({ 
        type: 'SET_NUTRITION', 
        payload: state.nutrition.map(entry => {
          const e = entry as NutritionEntry & { _id?: string };
          return (typeof e._id === 'string' && e._id === todayEntry._id)
            ? { ...todayEntry, meals: meals.filter((m: any) => m._id !== mealId) }
            : entry;
        })
      });
    } catch (err) {
      setError('Failed to delete meal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nutrition-tracker enhanced-nutrition-tracker">
      {error && <div className="error-message">{error}</div>}
      <div className="nutrition-summary nutrition-card nutrition-flex-col">
        <h2 className="section-title">Today's Nutrition Breakdown</h2>
        <div className="macro-chart chart-center">
          <ResponsiveContainer width={320} height={220}>
            <PieChart>
              <Pie
                data={macroDataWithPercent}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${percent}%`}
                stroke="#fff"
                strokeWidth={2}
              >
                {macroData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, fontSize: 14 }} />
              <Legend
                iconType="circle"
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                wrapperStyle={{ marginTop: 10 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="nutrition-totals">
          <div className="total-item">
            <span className="total-label">Calories</span>
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${caloriesProgress}%` }}
                />
              </div>
              <span className="progress-text">
                {totalCalories} / {nutritionGoals.calories} kcal ({caloriesProgress}%)
              </span>
            </div>
          </div>
          <div className="total-item">
            <span className="total-label">Protein</span>
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill protein" 
                  style={{ width: `${proteinProgress}%` }}
                />
              </div>
              <span className="progress-text">
                {totalProtein}g / {nutritionGoals.protein}g ({proteinProgress}%)
              </span>
            </div>
          </div>
          <div className="total-item">
            <span className="total-label">Carbs</span>
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill carbs" 
                  style={{ width: `${carbsProgress}%` }}
                />
              </div>
              <span className="progress-text">
                {totalCarbs}g / {nutritionGoals.carbs}g ({carbsProgress}%)
              </span>
            </div>
          </div>
          <div className="total-item">
            <span className="total-label">Fat</span>
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill fat" 
                  style={{ width: `${fatProgress}%` }}
                />
              </div>
              <span className="progress-text">
                {totalFat}g / {nutritionGoals.fat}g ({fatProgress}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      <h3 className="subsection-title">Today's Meals</h3>
      <ul className="meal-list">
        {meals.map((meal: any, idx: number) => (
          <li key={meal._id || meal.name + meal.time + idx} className="meal-item meal-card">
            <div className="meal-details">
              <h4 className="meal-name">{meal.name || 'Unnamed Meal'}</h4>
              <div className="meal-macros">
                <span>{meal.foods?.[0]?.calories || 0} cal</span>
                <span>{meal.foods?.[0]?.protein || 0}g protein</span>
                <span>{meal.foods?.[0]?.carbs || 0}g carbs</span>
                <span>{meal.foods?.[0]?.fat || 0}g fat</span>
              </div>
              <div className="meal-time">{meal.time ? new Date(meal.time).toLocaleTimeString() : ''}</div>
            </div>
            <button 
              className="delete-meal-btn"
              onClick={() => handleDeleteMeal(meal._id)}
              disabled={loading}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddMeal} className="add-meal-form nutrition-card">
        <h4 className="form-title">Add New Meal</h4>
        <div className="form-row form-row-2">
          <div className="form-group">
            <label>Meal Name</label>
            <input
              type="text"
              name="name"
              value={newMeal.foods[0].name}
              onChange={handleInputChange}
              placeholder="e.g. Chicken Salad"
              required
            />
          </div>
          <div className="form-group">
            <label>Meal Type</label>
            <select
              name="mealType"
              value={newMeal.mealType}
              onChange={handleInputChange}
              required
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
        </div>
        <div className="form-row form-row-4">
          <div className="form-group">
            <label>Calories</label>
            <input
              type="number"
              name="calories"
              value={newMeal.foods[0].calories || ""}
              onChange={handleInputChange}
              placeholder="kcal"
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label>Protein (g)</label>
            <input
              type="number"
              name="protein"
              value={newMeal.foods[0].protein || ""}
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
              value={newMeal.foods[0].carbs || ""}
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
              value={newMeal.foods[0].fat || ""}
              onChange={handleInputChange}
              placeholder="g"
              min="0"
            />
          </div>
        </div>
        <button type="submit" className="submit-btn orange-button" disabled={loading}>
          {loading ? 'Adding...' : 'Add Meal'}
        </button>
      </form>
    </div>
  );
};

// Add styles at the end of the file
const styles = `
  .enhanced-nutrition-tracker {
    background: #f8f9fb;
    padding: 32px 0 32px 0;
    border-radius: 18px;
    max-width: 700px;
    margin: 0 auto;
  }
  .nutrition-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.07);
    padding: 24px 28px 28px 28px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .nutrition-flex-col {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .section-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 18px;
    color: #333;
    text-align: center;
  }
  .macro-chart {
    margin-bottom: 24px;
    background: #f6f7fa;
    border-radius: 12px;
    padding: 16px 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .nutrition-totals {
    margin-top: 18px;
    width: 100%;
  }
  .total-item {
    margin-bottom: 16px;
  }
  .total-label {
    font-weight: 600;
    color: #555;
    margin-bottom: 4px;
    display: block;
  }
  .progress-container {
    width: 100%;
    margin-top: 5px;
  }
  .progress-bar {
    width: 100%;
    height: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background-color: #FF8042;
    transition: width 0.3s ease;
    border-radius: 5px;
  }
  .progress-fill.protein {
    background-color: #FF8042;
  }
  .progress-fill.carbs {
    background-color: #FFBB28;
  }
  .progress-fill.fat {
    background-color: #FF4560;
  }
  .progress-text {
    font-size: 0.95rem;
    color: #666;
    margin-top: 2px;
    display: block;
    font-weight: 500;
  }
  .meal-list {
    margin: 0 0 32px 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
    justify-content: center;
  }
  .meal-item.meal-card {
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 1px 6px 0 rgba(0,0,0,0.06);
    padding: 18px 22px 18px 22px;
    min-width: 220px;
    flex: 1 1 220px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: box-shadow 0.2s;
  }
  .meal-item.meal-card:hover {
    box-shadow: 0 4px 16px 0 rgba(0,0,0,0.10);
  }
  .meal-details {
    flex: 1;
  }
  .meal-name {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 6px;
    color: #333;
  }
  .meal-macros {
    font-size: 0.98rem;
    color: #666;
    margin-bottom: 4px;
    display: flex;
    gap: 10px;
  }
  .meal-time {
    font-size: 0.92rem;
    color: #aaa;
  }
  .delete-meal-btn {
    background: none;
    border: none;
    color: #FF4560;
    font-size: 1.5rem;
    cursor: pointer;
    margin-left: 12px;
    transition: color 0.2s;
  }
  .delete-meal-btn:hover {
    color: #d7263d;
  }
  .add-meal-form {
    margin-top: 18px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.07);
    padding: 24px 28px 28px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .form-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 18px;
    color: #333;
    text-align: center;
  }
  .form-row {
    display: flex;
    gap: 18px;
    margin-bottom: 14px;
    width: 100%;
  }
  .form-row-2 > .form-group {
    flex: 1 1 50%;
  }
  .form-row-3 > .form-group {
    flex: 1 1 33%;
  }
  .form-row-4 > .form-group {
    flex: 1 1 25%;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
  }
  .form-group label {
    font-size: 0.98rem;
    font-weight: 500;
    color: #555;
    margin-bottom: 4px;
  }
  .form-group input,
  .form-group select {
    padding: 7px 10px;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    font-size: 1rem;
    margin-bottom: 0;
    background: #f9f9f9;
    transition: border-color 0.2s;
  }
  .form-group input:focus,
  .form-group select:focus {
    border-color: #FF8042;
    outline: none;
  }
  .orange-button {
    background-color: #FF8042;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s ease;
    margin-top: 10px;
  }
  .orange-button:hover {
    background-color: #FF6B2B;
  }
  .orange-button:disabled {
    background-color: #FFB088;
    cursor: not-allowed;
  }
`;

// Add style tag to the component
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);