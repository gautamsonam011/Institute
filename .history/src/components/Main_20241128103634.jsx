import React from "react";
import "./main.css";
import mainbg2 from '../assets/mainbg2.jpg'

const AppSection = () => {
  return (
    <div className="app-section">
      <div className="content">
        <h1>Best App Website Template</h1>
        <p>
          This awesome template designed by W3 Template.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit neque massa, sit amet tristique ante porta ut. In sodales et justo vel vulputate. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        </p>
        <div className="buttons">
          <button className="btn btn-black">Download on the App Store</button>
          <button className="btn btn-blue">Get it on Google Play</button>
        </div>
      </div>
      <div className="image">
        <img src={mainbg2} alt="App Illustration" />
      </div>
    </div>
  );
};

export default AppSection;
