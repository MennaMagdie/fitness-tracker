import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useAppContext } from "../../context/AppContext";
import { addNutrition, deleteNutrition } from "../../services/api";

interface NutritionEntry {
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

  const totalCalories = state.nutrition?.reduce((sum, meal) => sum + meal.totalCalories, 0) || 0;
  const totalProtein = state.nutrition?.reduce((sum, meal) => 
    sum + (meal.foods?.reduce((foodSum, food) => foodSum + (food.protein || 0), 0) || 0), 0) || 0;
  const totalCarbs = state.nutrition?.reduce((sum, meal) => 
    sum + (meal.foods?.reduce((foodSum, food) => foodSum + (food.carbs || 0), 0) || 0), 0) || 0;
  const totalFat = state.nutrition?.reduce((sum, meal) => 
    sum + (meal.foods?.reduce((foodSum, food) => foodSum + (food.fat || 0), 0) || 0), 0) || 0;

  const macroData: MacroData[] = [
    { name: "Protein", value: totalProtein, color: "#FF8042" },
    { name: "Carbs", value: totalCarbs, color: "#FFBB28" },
    { name: "Fat", value: totalFat, color: "#FF4560" }
  ];

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
          time: new Date().toLocaleTimeString(),
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

  const handleDeleteMeal = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await deleteNutrition(id);
      dispatch({ 
        type: 'SET_NUTRITION', 
        payload: state.nutrition.filter(meal => meal.id !== id) 
      });
    } catch (err) {
      setError('Failed to delete meal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nutrition-tracker">
      {error && <div className="error-message">{error}</div>}
      
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
                  className="progress-fill" 
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
                  className="progress-fill" 
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
                  className="progress-fill" 
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
        {state.nutrition?.map(meal => (
          <li key={meal.id} className="meal-item">
            <div className="meal-details">
              <h4 className="meal-name">{meal.foods?.[0]?.name || 'Unnamed Meal'}</h4>
              <div className="meal-macros">
                <span>{meal.totalCalories} cal</span>
                <span>{meal.foods?.[0]?.protein || 0}g protein</span>
                <span>{meal.foods?.[0]?.carbs || 0}g carbs</span>
                <span>{meal.foods?.[0]?.fat || 0}g fat</span>
              </div>
              <div className="meal-time">{new Date(meal.date).toLocaleTimeString()}</div>
            </div>
            <button 
              className="delete-meal-btn"
              onClick={() => handleDeleteMeal(meal.id)}
              disabled={loading}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
      
      <form onSubmit={handleAddMeal} className="add-meal-form">
        <h4 className="form-title">Add New Meal</h4>
        
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
        
        <div className="form-row">
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
        
        <div className="form-row form-row-3">
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
  .orange-button {
    background-color: #FF8042;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s ease;
  }

  .orange-button:hover {
    background-color: #FF6B2B;
  }

  .orange-button:disabled {
    background-color: #FFB088;
    cursor: not-allowed;
  }

  .progress-container {
    width: 100%;
    margin-top: 5px;
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background-color: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background-color: #FF8042;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: #666;
    margin-top: 2px;
    display: block;
  }
`;

// Add style tag to the component
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);