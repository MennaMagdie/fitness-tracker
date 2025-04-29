
import React from 'react';
import { Home, User, Users } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="navbar-container">
          <div className="flex">
            <a href="/" className="navbar-brand navbar-link">
              <Home className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-semibold">NeuroFit</span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <div className="dropdown">
              <button className="btn btn-ghost navbar-link">Services</button>
              <div className="dropdown-content">
                <a href="#" className="dropdown-item">Personal Training</a>
                <a href="#" className="dropdown-item">Group Classes</a>
                <a href="#" className="dropdown-item">Nutrition Plans</a>
              </div>
            </div>

            <div className="dropdown">
              <button className="btn btn-ghost navbar-link">
                <Users className="mr-2 h-4 w-4" />
                Community
              </button>
              <div className="dropdown-content">
                <a href="#" className="dropdown-item">Forums</a>
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
                <a href="#" className="dropdown-item">Settings</a>
                <a href="#" className="dropdown-item">My Workouts</a>
                <a href="#" className="dropdown-item">Sign Out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
