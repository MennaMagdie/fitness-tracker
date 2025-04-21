import "./Footer.css"
const Footer = () => {
    return (
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-5 mb-4 mb-md-0">
              <h3 className="h4 fw-bold mb-4">FitTrack</h3>
              <p className="text-muted mb-4">
                Track your daily fitness progress and achieve your goals with our comprehensive fitness tracking solution.
              </p>
              <p className="text-muted mb-4">
                Contact Us
              </p>
            </div>
            
            <div className="col-md-2 mb-4 mb-md-0">
              <h4 className="h6 fw-semibold mb-3">Our Story</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="footer-link">Learn more about us</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link">Manage your membership</a>
                </li>
              </ul>
            </div>
  
            <div className="col-md-2 mb-4 mb-md-0">
              <h4 className="h6 fw-semibold mb-3">Get Support</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="footer-link">Contact us</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link">FAQ</a>
                </li>
              </ul>
            </div>
  
            <div className="col-md-3">
              <h4 className="h6 fw-semibold mb-3">Join our fitness</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="footer-link">Connect with us on LinkedIn</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link">Follow us on Instagram</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;