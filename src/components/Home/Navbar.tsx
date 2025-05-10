// import React from 'react';
import { Home, User, Users, ActivityIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="navbar-container">
          <div className="flex">
            <Link to="/" className="navbar-brand navbar-link">
              <Home className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-semibold">NeuroFit</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="btn btn-ghost navbar-link">
              <ActivityIcon className="mr-2 h-4 w-4" />
              Dashboard
            </Link>

            <div className="dropdown">
              <button className="btn btn-ghost navbar-link">Services</button>
              <div className="dropdown-content">
                <a href="#" className="dropdown-item">Personal Training</a>
                <Link to="/workouts" className="dropdown-item">Workouts</Link>
                <Link to="/dashboard" className="dropdown-item">Nutrition Plans</Link>
              </div>
            </div>

            <div className="dropdown">
              <button className="btn btn-ghost navbar-link">
                <Users className="mr-2 h-4 w-4" />
                Community
              </button>
              <div className="dropdown-content">
                <Link to="/feedback" className="dropdown-item">Feedback</Link>
                <a href="#" className="dropdown-item">Events</a>
                <a href="#" className="dropdown-item">Challenges</a>
              </div>
            </div>

            <div className="dropdown">
              <button className="btn btn-ghost navbar-link">
                <User className="mr-2 h-4 w-4" />
                Profile
              </button>
              <div className="dropdown-content">
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <Link to="/profile?tab=settings" className="dropdown-item">Settings</Link>
                <Link to="/workouts" className="dropdown-item">Workouts</Link>
                <a href="/login" className="dropdown-item">Sign Out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};