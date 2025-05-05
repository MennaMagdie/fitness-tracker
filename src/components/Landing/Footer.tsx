import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3 className="footer-title">NeuroFit</h3>
          <p className="footer-description">
            Track your daily fitness progress and achieve your goals with our
            comprehensive fitness tracking solution.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Our Story</h4>
          <ul className="footer-links">
            <li>
              <a href="#" className="footer-link">
                Learn more about us
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Manage your membership
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Get Support</h4>
          <ul className="footer-links">
            <li>
              <a href="#" className="footer-link">
                Contact us
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Join our fitness</h4>
          <ul className="footer-links">
            <li>
              <a href="#" className="footer-link">
                Connect with us on LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Follow us on Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
