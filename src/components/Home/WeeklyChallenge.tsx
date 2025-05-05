
import React from "react";

export const WeeklyChallenge = () => {
  return (
    <div className="challenge-card card">
      <div className="card-header">
        <h2 className="card-title text-2xl">Weekly Challenge 🏆</h2>
      </div>
      <div className="card-content">
        <p className="mb-4">Complete 5 workouts this week and earn 500 bonus points!</p>
        <div className="mb-4">
          <div className="progress-container">
            <div className="progress-bar" style={{ width: "40%" }} />
          </div>
          <p className="text-sm mt-2">2 of 5 workouts completed</p>
        </div>
        <button className="btn btn-secondary btn-full">Join Challenge</button>
      </div>
    </div>
  );
};
