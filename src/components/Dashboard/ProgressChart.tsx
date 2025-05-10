import React, { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useAppContext } from "../../context/AppContext";
import { addProgress } from "../../services/api";

type MetricType = "calories" | "duration" | "intensity";

type ProgressEntry = {
  type: 'workout';
  value: number;
  duration: number;
  workoutType: 'cardio' | 'strength' | 'flexibility' | 'other';
  date: string;
  done: boolean;
};

export const ProgressChart = () => {
  const { state, dispatch } = useAppContext();
  const [activeMetric, setActiveMetric] = useState<MetricType>("calories");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMetricChange = (metric: MetricType) => {
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

  // Transform progress data for the chart
  const chartData = useMemo(() => {
    const workoutEntries = state.progress.filter(entry => entry.type === 'workout');
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return days.map(day => {
      const dayEntries = workoutEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.toLocaleDateString('en-US', { weekday: 'short' }) === day;
      });

      const totalDuration = dayEntries.reduce((sum, entry) => sum + (entry.duration || 0), 0);

      console.log('Day Entries:', dayEntries);
      console.log('Total Duration:', totalDuration);

      return {
        day,
        calories: dayEntries.reduce((sum, entry) => sum + entry.value, 0),
        duration: totalDuration,
        intensity: dayEntries.length > 0 ? Math.round(dayEntries.reduce((sum, entry) => sum + (entry.workoutType === 'cardio' ? 8 : entry.workoutType === 'strength' ? 7 : entry.workoutType === 'flexibility' ? 5 : 6), 0) / dayEntries.length) : 0,
        done: dayEntries.some(entry => entry.done)
      };
    });
  }, [state.progress]);

  const handleAddWorkout = async (data: {
    type: 'workout';
    value: number;
    duration: number;
    workoutType: 'cardio' | 'strength' | 'flexibility' | 'other';
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await addProgress({
        ...data,
        date: new Date().toISOString()
      });
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