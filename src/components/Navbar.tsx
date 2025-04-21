import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">NeuroFit</div>

      <ul className="navbar-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Workouts</a></li>
        <li><a href="#">Feedback</a></li>
      </ul>

      <div className="navbar-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
}
