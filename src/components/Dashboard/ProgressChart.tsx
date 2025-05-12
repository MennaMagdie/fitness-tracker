import React, { useState, useMemo, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useAppContext } from "../../context/AppContext";
import { addProgress } from "../../services/api";

type MetricType = "calories" | "duration" | "intensity";

interface WorkoutProgressEntry {
  id: string;
  type: 'workout';
  date: string;
  done: boolean;
  workout: {
    id: string;
    name: string;
    exercises: Array<{
      name: string;
      sets: number;
      reps: number;
      weight?: number;
      duration?: number;
      caloriesBurned?: number;
      intensity?: number;
    }>;
    totalDuration: number;
    totalCaloriesBurned: number;
    averageIntensity: number;
  };
}

export const ProgressChart = () => {
  const { state, dispatch } = useAppContext();
  const [activeMetric, setActiveMetric] = useState<MetricType>("calories");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debug logging for state changes
  useEffect(() => {
    console.log('Progress state updated:', {
      totalEntries: state.progress.length,
      workoutEntries: state.progress.filter(e => e.type === 'workout').length,
      doneEntries: state.progress.filter(e => e.done).length,
      sampleEntry: state.progress[0]
    });
  }, [state.progress]);

  const handleMetricChange = (metric: MetricType) => {
    setActiveMetric(metric);
  };

  const getMetricColor = (metric: MetricType) => {
    switch (metric) {
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
        return "Calories";
      case "duration":
        return "Minutes";
      case "intensity":
        return "Intensity (1-10)";
      default:
        return "";
    }
  };

  // Transform progress data for the chart
  const chartData = useMemo(() => {
    // Start week from Saturday
    const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    
    const dayDataArray = days.map(day => {
      const dayEntries = state.progress.filter(entry => {
        const entryDate = new Date(entry.date);
        const entryDay = entryDate.toLocaleDateString('en-US', { weekday: 'short' });
        const isWorkout = entry.type === 'workout';
        const isDone = entry.done;
        
        console.log(`Entry check for ${day}:`, {
          entryDate,
          entryDay,
          isWorkout,
          isDone,
          entry
        });
        
        return entryDay === day && isDone && isWorkout;
      }).map(entry => {
        const transformed = entry as unknown as WorkoutProgressEntry;
        console.log('Transformed entry:', {
          original: entry,
          transformed,
          workout: transformed.workout
        });
        return transformed;
      });

      // Sum up calories, duration, and intensity for the day
      const totalCalories = dayEntries.reduce((sum, entry) => {
        const calories = entry.workout?.caloriesBurned || 0;
        console.log(`Planned Calories for ${day}:`, { workout: entry.workout?.name, calories });
        return sum + calories;
      }, 0);

      const totalDuration = dayEntries.reduce((sum, entry) => {
        const duration = entry.workout?.duration || 0;
        console.log(`Planned Duration for ${day}:`, { workout: entry.workout?.name, duration });
        return sum + duration;
      }, 0);

      const totalIntensity = dayEntries.reduce((sum, entry) => {
        const intensity = entry.workout?.averageIntensity || 0;
        console.log(`Intensity for ${day}:`, { workout: entry.workout?.name, intensity });
        return sum + intensity;
      }, 0);

      const result = {
        day,
        calories: totalCalories,
        duration: totalDuration,
        intensity: dayEntries.length > 0 ? totalIntensity / dayEntries.length : 0,
        done: dayEntries.length > 0
      };

      console.log(`Day ${day} result:`, result);
      return result;
    });

    console.log('Final chart data:', dayDataArray);
    return dayDataArray;
  }, [state.progress]);

  const handleAddWorkout = async (data: {
    type: 'workout';
    workout: {
      id: string;
      name: string;
      exercises: Array<{
        name: string;
        sets: number;
        reps: number;
        duration?: number;
        caloriesBurned?: number;
        intensity?: number;
      }>;
    };
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await addProgress(data);
      dispatch({ type: 'ADD_PROGRESS', payload: response });
    } catch (err) {
      setError('Failed to add workout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const markAsDone = (workoutId: string) => {
    dispatch({
      type: 'SET_PROGRESS',
      payload: state.progress.map(entry =>
        entry.id === workoutId ? { ...entry, done: true } : entry
      ).sort((a, b) => a.done === b.done ? 0 : a.done ? 1 : -1)
    });
  };

  return (
    <div className="progress-chart-container">
      {error && <div className="error-message">{error}</div>}
      
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
            data={chartData}
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
              stroke={getMetricColor(activeMetric)} 
              name={getYAxisLabel()} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};