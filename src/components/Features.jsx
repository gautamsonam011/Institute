import React from "react";
import "./features.css";
import feature from '../assets/feature.jpeg'

const FeaturesPage = () => {
  const featuresLeft = [
    {
      title: "Fast Processing",
      description:
        "It is very important to take care of the patient, to follow the growth of the patient, but it is done in the same way as the work.",
      icon: "⚡",
    },
    {
      title: "Low Power Consuming",
      description:
        "It is very important to take care of the patient, to follow the growth of the patient, but it is done in the same way as the work.",
      icon: "🔋",
    },
  ];

  const featuresRight = [
    {
      title: "Regular Updates",
      description:
        "It is very important to take care of the patient, to follow the growth of the patient, but it is done in the same way as the work.",
      icon: "✔️",
    },
    {
      title: "Save Money",
      description:
        "It is very important to take care of the patient, to follow the growth of the patient, but it is done in the same way as the work.",
      icon: "💲",
    },
  ];

  return (
    <div className="features-section" id="features">
      <div className="features-container">
        <h2 className="features-title">Features</h2>
        <div className="features-divider"></div>
        <p className="features-description">
          But who is it? For this purpose, the porttitor dui should be a lot of
          cartoons. It should be a lot of fun, a vestibule before in, a quiver
          before.
        </p>

        <div className="features-content">
          <div className="features-column">
            {featuresLeft.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="features-image">
            <img src={feature} alt="Mobile" />
          </div>

          <div className="features-column">
            {featuresRight.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
