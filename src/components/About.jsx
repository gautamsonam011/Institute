import React from "react";
import "./about.css";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <h2 className="about-title">About</h2>
        <hr className="about-divider" />
        <p className="about-description">
          Sed quis nisi nisi. Proin consectetur porttitor dui sit amet viverra.
          Fusce sit amet lorem faucibus, vestibulum ante in, pharetra ante.
        </p>
        <div className="about-features">
          <div className="feature">
            <div className="feature-icon support-icon"></div>
            <h3>Support</h3>
            <p>
              Phasellus lobortis justo a magna facilisis, in commodo tellus
              rutrum. Sed vitae condimentum nulla.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon cross-platform-icon"></div>
            <h3>Cross Platform</h3>
            <p>
              Phasellus lobortis justo a magna facilisis, in commodo tellus
              rutrum. Sed vitae condimentum nulla.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon fast-icon"></div>
            <h3>Fast</h3>
            <p>
              Phasellus lobortis justo a magna facilisis, in commodo tellus
              rutrum. Sed vitae condimentum nulla.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
