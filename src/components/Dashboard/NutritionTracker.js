import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
export const NutritionTracker = () => {
    const [meals, setMeals] = useState([
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
    const [newMeal, setNewMeal] = useState({
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMeal({
            ...newMeal,
            [name]: name === "name" || name === "time" ? value : Number(value)
        });
    };
    const handleAddMeal = (e) => {
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
    const deleteMeal = (id) => {
        setMeals(meals.filter(meal => meal.id !== id));
    };
    return (_jsxs("div", { className: "nutrition-tracker", children: [_jsxs("div", { className: "nutrition-summary", children: [_jsx("div", { className: "macro-chart", children: _jsx(ResponsiveContainer, { width: "100%", height: 200, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: macroData, cx: "50%", cy: "50%", labelLine: false, outerRadius: 80, fill: "#8884d8", dataKey: "value", animationDuration: 1000, children: macroData.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, {}), _jsx(Legend, {})] }) }) }), _jsxs("div", { className: "nutrition-totals", children: [_jsxs("div", { className: "total-item", children: [_jsx("span", { className: "total-label", children: "Total Calories" }), _jsx("span", { className: "total-value", children: totalCalories })] }), _jsxs("div", { className: "total-item", children: [_jsx("span", { className: "total-label", children: "Protein" }), _jsxs("span", { className: "total-value", children: [totalProtein, "g"] })] }), _jsxs("div", { className: "total-item", children: [_jsx("span", { className: "total-label", children: "Carbs" }), _jsxs("span", { className: "total-value", children: [totalCarbs, "g"] })] }), _jsxs("div", { className: "total-item", children: [_jsx("span", { className: "total-label", children: "Fat" }), _jsxs("span", { className: "total-value", children: [totalFat, "g"] })] })] })] }), _jsxs("div", { className: "meal-log", children: [_jsx("h3", { className: "subsection-title", children: "Today's Meals" }), _jsx("ul", { className: "meal-list", children: meals.map(meal => (_jsxs("li", { className: "meal-item", children: [_jsxs("div", { className: "meal-details", children: [_jsx("h4", { className: "meal-name", children: meal.name }), _jsxs("div", { className: "meal-macros", children: [_jsxs("span", { children: [meal.calories, " cal"] }), _jsxs("span", { children: [meal.protein, "g protein"] }), _jsxs("span", { children: [meal.carbs, "g carbs"] }), _jsxs("span", { children: [meal.fat, "g fat"] })] }), _jsx("div", { className: "meal-time", children: meal.time })] }), _jsx("button", { className: "delete-meal-btn", onClick: () => deleteMeal(meal.id), children: "\u00D7" })] }, meal.id))) }), _jsxs("form", { className: "add-meal-form", onSubmit: handleAddMeal, children: [_jsx("h4", { className: "form-title", children: "Add New Meal" }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Meal Name" }), _jsx("input", { type: "text", name: "name", value: newMeal.name, onChange: handleInputChange, placeholder: "e.g. Chicken Salad", required: true })] }), _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Calories" }), _jsx("input", { type: "number", name: "calories", value: newMeal.calories || "", onChange: handleInputChange, placeholder: "kcal", min: "0", required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Time" }), _jsx("input", { type: "text", name: "time", value: newMeal.time, onChange: handleInputChange, placeholder: "e.g. 8:00 AM" })] })] }), _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Protein (g)" }), _jsx("input", { type: "number", name: "protein", value: newMeal.protein || "", onChange: handleInputChange, placeholder: "g", min: "0" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Carbs (g)" }), _jsx("input", { type: "number", name: "carbs", value: newMeal.carbs || "", onChange: handleInputChange, placeholder: "g", min: "0" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Fat (g)" }), _jsx("input", { type: "number", name: "fat", value: newMeal.fat || "", onChange: handleInputChange, placeholder: "g", min: "0" })] })] }), _jsx("button", { type: "submit", className: "add-meal-submit", children: "Add Meal" })] })] })] }));
};
