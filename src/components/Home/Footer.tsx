
// import React from "react";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">About NeuroFit</h3>
            <p className="text-gray-600">
              Empowering your fitness journey with personalized workouts, challenges, and a supportive community.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
            <div className="space-y-2">
              <a href="#about" className="footer-link">About Us</a>
              <a href="#contact" className="footer-link">Contact</a>
              <a href="#privacy" className="footer-link">Privacy Policy</a>
              <a href="#terms" className="footer-link">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="footer-border">
          <p className="text-center text-gray-500">© 2025 NeuroFit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};