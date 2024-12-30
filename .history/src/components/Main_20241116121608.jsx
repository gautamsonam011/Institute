import React from "react";
import "./main.css";
import mainbg2 from '../assets/mainbg2.jpg'

const MainPage = () => {
  return (
    <div className="main-containerr">
      <section className="hero">
        <h1>Best App Website Template</h1>
        <p className="subtitle">This awesome template designed by W3 Template.</p>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          hendrerit neque massa, sit amet tristique ante porta ut. In sodales
          et justo vel vulputate. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.
        </p>
        <div className="download-buttons">
          <button className="app-store">Download on the App Store</button>
          <button className="google-play">Get it on Google Play</button>
        </div>
      </section>
      <section className="phone-mockup">
        <img src={mainbg2} alt="App Mockup" />
      </section>
    </div>
  );
};

export default MainPage;
