import React from "react";
import board from "../assets/board.png";
import "./landing.css";
import { useNavigate } from "react-router-dom";
import { PlayButton } from "../Components/PlayButton";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="store">
    <div className="landing-container">
      <div className="grid-container">
        <div className="grid-item">
          <img src={board} alt="Chess Board" />
        </div>
        <div className="grid-item">
          <div className="sec">
            <h1>Play Akul's Chess Online without any ads</h1>
          </div>
          <div className="button-container">
            <PlayButton onClick={()=>{
              navigate("/game")
            }}><h1>Play Online</h1></PlayButton>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Landing;
