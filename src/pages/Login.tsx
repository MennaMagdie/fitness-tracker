import { useState } from "react";
import Navbar from "../components/Navbar";
import "../components/Registration/registration.css";
import React from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <h2 className="text-center">Ready for today's workout?</h2>
        <form onSubmit={handleSubmit}>
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
      
          <button type="submit" className="btn btn-light w-100">
            Sign In
          </button>
        </form>
      </div>
    </div>
    </>
  );
  
};

export default Login;
