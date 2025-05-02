
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample workout data for the chart
const workoutData = [
  { day: "Mon", calories: 320, duration: 30, intensity: 7 },
  { day: "Tue", calories: 450, duration: 45, intensity: 8 },
  { day: "Wed", calories: 280, duration: 25, intensity: 6 },
  { day: "Thu", calories: 520, duration: 50, intensity: 9 },
  { day: "Fri", calories: 400, duration: 40, intensity: 7 },
  { day: "Sat", calories: 600, duration: 60, intensity: 8 },
  { day: "Sun", calories: 350, duration: 35, intensity: 7 },
];

export const ProgressChart = () => {
  const [activeMetric, setActiveMetric] = useState<"calories" | "duration" | "intensity">("calories");

  const handleMetricChange = (metric: "calories" | "duration" | "intensity") => {
    setActiveMetric(metric);
  };

  const getChartColor = () => {
    switch (activeMetric) {
      case "calories":
        return "#ff7e42";
      case "duration":
        return "#55a0d3";
      case "intensity":
        return "#6ab04c";
      default:
        return "#ff7e42";
    }
  };

  const getYAxisLabel = () => {
    switch (activeMetric) {
      case "calories":
        return "Calories Burned";
      case "duration":
        return "Minutes";
      case "intensity":
        return "Intensity (1-10)";
      default:
        return "";
    }
  };

  return (
    <div className="progress-chart-container">
      <div className="chart-filters">
        <button 
          className={`chart-filter-btn ${activeMetric === "calories" ? "active" : ""}`}
          onClick={() => handleMetricChange("calories")}
        >
          Calories
        </button>
        <button 
          className={`chart-filter-btn ${activeMetric === "duration" ? "active" : ""}`}
          onClick={() => handleMetricChange("duration")}
        >
          Duration
        </button>
        <button 
          className={`chart-filter-btn ${activeMetric === "intensity" ? "active" : ""}`}
          onClick={() => handleMetricChange("intensity")}
        >
          Intensity
        </button>
      </div>
      
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={workoutData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="day" stroke="#555" />
            <YAxis stroke="#555" label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ddd',
                borderRadius: '8px' 
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={activeMetric}
              stroke={getChartColor()}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6, fill: getChartColor(), stroke: "#fff", strokeWidth: 2 }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};