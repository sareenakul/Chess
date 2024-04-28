import React from "react";
import board from "../assets/board.png";
import "./landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="grid-container">
        <div className="grid-item">
          <img src={board} alt="Chess Board" />
        </div>
        <div className="grid-item">
          <h1>Welcome to Akul's Chess</h1>
          <div className="button-container">
            <button className="play-button">Play Online</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
