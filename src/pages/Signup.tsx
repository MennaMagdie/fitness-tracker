import { useState } from "react";
import Navbar from "../components/Navbar";
import "../components/Registration/Signup.css";
import React from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    fitnessGoal: "",
    currentWeight: "",
    targetWeight: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // will send data to API here
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="signup">
      <div className="signup-container">
        <h2 className="text-center">Become a NeuroFitter</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleSelectChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fitnessGoal">Fitness Goal</label>
            <select
              id="fitnessGoal"
              name="fitnessGoal"
              value={formData.fitnessGoal}
              onChange={handleSelectChange}
              required
            >
              <option value="">Select Goal</option>
              <option value="loseWeight">Lose Weight</option>
              <option value="buildMuscle">Build Muscle</option>
              <option value="maintainFitness">Maintain Fitness</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="currentWeight">Current Weight (kg)</label>
            <input
              type="number"
              id="currentWeight"
              name="currentWeight"
              value={formData.currentWeight}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="targetWeight">Target Weight (kg)</label>
            <input
              type="number"
              id="targetWeight"
              name="targetWeight"
              value={formData.targetWeight}
              onChange={handleChange}
              required
            />
          </div>
      
          <button type="submit" className="btn btn-light w-100">
            Create Account
          </button>
        </form>
      </div>
    </div>
    </>
  );
  
};

export default Signup;
