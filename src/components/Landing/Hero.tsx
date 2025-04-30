import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-icon">
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8
                 8-8 8 3.59 8 8-3.59 8-8 8z"
            />
            <path fill="currentColor" d="M12 6l-4 4h3v4h2v-4h3z" />
          </svg>
        </div>
        <h1>Track your activities<br />and goals</h1>
        <Link to="/login"><button className="btn-lg">Get Started</button></Link>
      </div>
    </section>
  );
};

export default Hero;
