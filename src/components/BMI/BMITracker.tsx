import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import styles from './BMITracker.module.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BMILog {
  date: string;
  bmi: number;
  weight: number;
  height: number;
}

interface BMITrackerProps {
  onLogBMI: (bmi: number, weight: number, height: number) => Promise<void>;
  bmiLogs: BMILog[];
}

const BMITracker: React.FC<BMITrackerProps> = ({ onLogBMI, bmiLogs }) => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');
  const [error, setError] = useState<string>('');

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const handleCalculate = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      setError('Please enter valid weight and height values');
      return;
    }

    const calculatedBMI = calculateBMI(weightNum, heightNum);
    setBmi(calculatedBMI);
    setBmiCategory(getBMICategory(calculatedBMI));
    setError('');
  };

  const handleLogBMI = async () => {
    if (!bmi) {
      setError('Please calculate BMI first');
      return;
    }

    try {
      await onLogBMI(bmi, parseFloat(weight), parseFloat(height));
      setWeight('');
      setHeight('');
      setBmi(null);
      setBmiCategory('');
      setError('');
    } catch (err) {
      setError('Failed to log BMI. Please try again.');
    }
  };

  // Helper to extract BMI from log
  function extractBMI(log: any): number | null {
    if (typeof log.bmi === 'number' && !isNaN(log.bmi)) return log.bmi;
    if (typeof log.notes === 'string') {
      const match = log.notes.match(/BMI:\s*([\d.]+)/i);
      if (match) return parseFloat(match[1]);
    }
    return null;
  }

  // Only use logs that have a valid BMI value
  const bmiHistory = bmiLogs
    .map(log => ({ ...log, bmi: extractBMI(log) }))
    .filter(log => typeof log.bmi === 'number' && !isNaN(log.bmi));

  const chartData = {
    labels: bmiHistory.map(log => new Date(log.date).toLocaleDateString()),
    datasets: [
      {
        label: 'BMI',
        data: bmiHistory.map(log => log.bmi as number),
        borderColor: '#FF6B35',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'BMI History'
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        suggestedMin: bmiHistory.length > 0 ? Math.min(...bmiHistory.map(log => log.bmi as number)) - 1 : 0,
        suggestedMax: bmiHistory.length > 0 ? Math.max(...bmiHistory.map(log => log.bmi as number)) + 1 : 10
      }
    }
  };

  return (
    <div className={styles.bmiTracker}>
      <div className={styles.bmiCalculator}>
        <h2>BMI Calculator</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="weight">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
            min="0"
            step="0.1"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="height">Height (cm)</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height"
            min="0"
            step="0.1"
          />
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={handleCalculate} className={styles.calculateButton}>
            Calculate BMI
          </button>
          {bmi && (
            <button onClick={handleLogBMI} className={styles.logButton}>
              Log BMI
            </button>
          )}
        </div>
        {error && <div className={styles.error}>{error}</div>}
        {bmi && (
          <div className={styles.bmiResult}>
            <h3>Your BMI: {bmi.toFixed(1)}</h3>
            <p>Category: {bmiCategory}</p>
          </div>
        )}
      </div>
      <div className={styles.bmiChart}>
        <h2>BMI History</h2>
        {bmiHistory.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <p className={styles.noData}>No BMI data available</p>
        )}
      </div>
    </div>
  );
};

export default BMITracker; 