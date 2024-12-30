import React, { useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src="/path-to-logo/logo.png" alt="Logo" />
      </div>

      {/* Links */}
      <ul className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={() => setIsMobile(false)}>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#certificate">Certificate</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#login">Login</a></li>
      </ul>

      {/* Hamburger Menu */}
      <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <>&#10005;</> : <>&#9776;</>}
      </button>
    </nav>
  );
};

export default Navbar;
