import React from "react";
import pic from "../Assets/Images/PI.png";

export default function Intro() {
  return (
    <div className="intro-page">
      <dive className="hero-image">
        <img src={pic} alt="photo" />
      </dive>
      <dive className="intro-details">
        <h1>IFTEKHARUL ABEDEEN</h1>
        <div>Lecturer</div>
        <div>Department of Computer Science</div>
        <div>United International University</div>
        <div>Dhaka, Bangladesh</div>
      </dive>
    </div>
  );
}
