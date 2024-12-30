import React from "react";
import "./main.css";
import maingbg2 from '../assets/mainbg2.jpg'

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <p className="subtitle">We Care Your Baby</p>
        <h1 className="title">The Best Play Area For Your Kids</h1>
        <div className="hero-buttons">
          <button className="btn btn-pink">Get Started</button>
          <button className="btn btn-outline">Learn More</button>
        </div>
      </div>
      <div className="hero-image">
        <img
          src={maingbg2} /* Replace with your actual image URL */
          alt="Kids playing"
        />
      </div>
    </div>
  );
};

export default HeroSection;
