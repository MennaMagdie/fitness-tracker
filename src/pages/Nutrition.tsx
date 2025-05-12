import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNutrition, getTodayNutrition, addNutrition } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface NutritionData {
  meals: Array<{
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
  waterIntake: number;
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  goals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const Nutrition: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isAuthenticated) {
          navigate('/login');
          return;
        }
        const data = await getTodayNutrition();
        setNutritionData({
          meals: data.meals || [],
          waterIntake: data.waterIntake || 0,
          totals: data.totals,
          goals: data.goals
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch nutrition data';
        setError(errorMessage);
        if (errorMessage.includes('Session expired') || errorMessage.includes('Not authenticated')) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Today's Nutrition</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-600">Calories</h3>
          <p className="text-2xl font-bold">{nutritionData?.totals.calories || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-600">Protein</h3>
          <p className="text-2xl font-bold">{nutritionData?.totals.protein || 0}g</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-600">Carbs</h3>
          <p className="text-2xl font-bold">{nutritionData?.totals.carbs || 0}g</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-600">Fat</h3>
          <p className="text-2xl font-bold">{nutritionData?.totals.fat || 0}g</p>
        </div>
      </div>

      {/* Meals List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Meals</h2>
        </div>
        <div className="divide-y">
          {nutritionData?.meals.map((meal, index) => (
            <div key={index} className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">{meal.name}</h3>
                <span className="text-gray-500">{new Date(meal.time).toLocaleTimeString()}</span>
              </div>
              <div className="space-y-2">
                {meal.foods.map((food, foodIndex) => (
                  <div key={foodIndex} className="flex justify-between items-center text-sm">
                    <span>{food.name} ({food.quantity} {food.unit})</span>
                    <span className="text-gray-600">
                      {food.calories} cal | P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Water Intake */}
      <div className="mt-8 bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Water Intake</h2>
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${(nutritionData?.waterIntake || 0) / 8 * 100}%` }}
            ></div>
          </div>
          <span className="ml-4 text-gray-600">
            {nutritionData?.waterIntake || 0} / 8 glasses
          </span>
        </div>
      </div>
    </div>
  );
};

export default Nutrition; 