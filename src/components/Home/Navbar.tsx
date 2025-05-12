import { NavLink } from 'react-router-dom';
import { Home, User, Users, ActivityIcon } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="navbar-container">
          <div className="flex">
            <NavLink to="/" className={({ isActive }) => `navbar-brand navbar-link ${isActive ? 'active' : ''}`}>
              <Home className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-semibold">NeuroFit</span>
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `btn btn-ghost navbar-link ${isActive ? 'active' : ''}`}
            >
              <ActivityIcon className="mr-2 h-4 w-4" />
              Dashboard
            </NavLink>

            <div className="dropdown">
              <button className="btn btn-ghost navbar-link">Services</button>
              <div className="dropdown-content">
                <NavLink
                  to="/trainers"
                  className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                >
                  Meet Trainers
                </NavLink>
                <NavLink
                  to="/workouts"
                  className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                >
                  Workouts
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                >
                  Nutrition Plans
                </NavLink>
              </div>
            </div>

            <div className="dropdown">
              <button className="btn btn-ghost navbar-link">
                <Users className="mr-2 h-4 w-4" />
                Community
              </button>
              <div className="dropdown-content">
                <NavLink
                  to="/feedback"
                  className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                >
                  Feedback
                </NavLink>
                <a href="#" className="dropdown-item">
                  Events
                </a>
                <NavLink
                  to="/challenges"
                  className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                >
                  Challenges
                </NavLink>
              </div>
            </div>

            <div className="dropdown">
              <button className="btn btn-ghost navbar-link">
                <User className="mr-2 h-4 w-4" />
                Profile
              </button>
              <div className="dropdown-content">
                <NavLink
                  to="/profile"
                  className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/profile?tab=settings"
                  className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                >
                  Settings
                </NavLink>
                <NavLink
                  to="/workouts"
                  className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                >
                  Workouts
                </NavLink>
                <a href="/login" className="dropdown-item">
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};