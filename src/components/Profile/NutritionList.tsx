import React from 'react';
import '../../pages/Profile.css';

const NutritionList = ({ nutrition }: { nutrition: any[] }) => {
  // Group nutrition by day
  const nutritionByDay = nutrition.reduce((acc: any, entry: any) => {
    const day = new Date(entry.date).toLocaleDateString();
    if (!acc[day]) acc[day] = [];
    acc[day].push(entry);
    return acc;
  }, {});

  return (
    <div className="card nutrition-card">
      <h3>Nutrition Log</h3>
      {Object.keys(nutritionByDay).length === 0 ? (
        <p>No meals logged yet.</p>
      ) : (
        Object.entries(nutritionByDay).map(([day, meals]: any) => (
          <div key={day} className="nutrition-day">
            <h4>{day}</h4>
            <ul>
              {meals.map((meal: any) => (
                <li key={meal._id} className={meal.totalCalories > 800 ? 'high-calorie' : ''}>
                  {meal.mealType}: {meal.totalCalories} kcal
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default NutritionList; 