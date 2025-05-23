import React from "react";
import "./main.css";

const AboutSection = () => {
  return (
    <div className="about-section">
      <div className="about-content">
        <h3 className="about-heading">About Us</h3>
        <h2 className="about-title">
          We Learn Smart Way To Build Bright Future For Your Children
        </h2>
        <p className="about-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
        </p>
        <ul className="about-list">
          <li>Sport Activities</li>
          <li>Outdoor Games</li>
          <li>Nutritious Foods</li>
          <li>Highly Secured</li>
          <li>Friendly Environment</li>
          <li>Qualified Teacher</li>
        </ul>
        <button className="about-button">More Details</button>
      </div>
      <div className="about-image-container">
        <img
          src="https://via.placeholder.com/600x400" /* Replace with actual image URL */
          alt="Children learning"
          className="about-image"
        />
        <div className="play-button">
          <span>▶</span>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
