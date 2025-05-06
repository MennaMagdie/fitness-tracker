import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import '../../pages/Profile.css';

const ProgressChart = ({ data }: { data: { date: string; value: number }[] }) => (
  <div className="card progress-card">
    <h3>Progress Overview (BMI)</h3>
    {data.length === 0 ? (
      <p>No BMI data yet.</p>
    ) : (
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#007bff" />
        </LineChart>
      </ResponsiveContainer>
    )}
  </div>
);

export default ProgressChart; 