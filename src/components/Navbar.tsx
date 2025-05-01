import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* <div className="navbar-logo">NeuroFit</div> */}
      {/* <Link to="/"><div className="navbar-logo">NeuroFit</div></Link> */}
      <Link to="/" style={{ textDecoration: "none" }}>
  <div className="navbar-logo">NeuroFit</div>
</Link>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/workouts">Workouts</Link></li>
      <li><Link to="/feedback">Feedback</Link></li>
      </ul>

      <div className={`navbar-buttons ${menuOpen ? "open" : ""}`}>
        <Link to="/login"><button className="login-btn">Login</button></Link>
        <Link to="/signup"><button className="signup-btn">Sign Up</button></Link>
      </div>

    </nav>
  );
};

export default Navbar;
