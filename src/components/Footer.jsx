import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <h3>About Us</h3>
            <p>
              We provide excellent training services and certifications. Our goal is to help you grow professionally and achieve your career goals.
            </p>
          </div>
          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>New Delhi, India</p>
            <p>Phone: 009900990099</p>
            <p>Email: info@example.com</p>
          </div>
        </div>
        {/* Social Media */}
        <div className="footer-social">
          <a href="#" className="social-icon">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© 2024 Your Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
