
// import React from "react";

interface WorkoutCardProps {
  title: string;
  duration: string;
  difficulty: string;
  description: string;
  imageUrl: string;
}

export const WorkoutCard = ({ title, duration, difficulty, description, imageUrl }: WorkoutCardProps) => {
  return (
    <div className="workout-card">
      <div className="workout-image-container">
        <img src={imageUrl} alt={title} className="workout-image" />
      </div>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">
          {duration} • {difficulty}
        </p>
      </div>
      <div className="card-content">
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <button className="btn btn-primary btn-full">
          Start Workout
        </button>
      </div>
    </div>
  );
};