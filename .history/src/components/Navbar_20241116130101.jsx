import React, { useState } from "react";
import "./navbar.css";
import image from '../assets/image.png';

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCertificateClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src={image} alt="Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#certificate" onClick={handleCertificateClick}>Certificate</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </nav>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>Download Certificate</h2>
            <form>
              <label>Student ID:</label>
              <input type="text" name="studentId" placeholder="Enter Student ID" required />
              <button type="submit">Download Certificate</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
