import React from "react";
import pic from "../Assets/Images/PI.png";
import ButtonC from "./Snippets/ButtonC";

export default function Intro() {
  return (
    <div className="intro-page">
      <div className="hero-image">
        <img src={pic} alt="Portrait of Iftekharul Abedeen" fetchpriority="high" />
      </div>
      <div className="intro-details Font-300">
        <h1 className="Font-500 chroma">IFTEKHARUL ABEDEEN</h1>
        <div>Lecturer</div>
        <div>Department of Computer Science</div>
        <div>United International University</div>
        <div>Dhaka, Bangladesh</div>
        <ButtonC
          className="cv-button"
          buttonText={<b>CV</b>}
          Type={"b-secondary"}
          Link={
            "https://drive.google.com/file/d/1Ea0pYBz9QjPpwv0XGzD644i9RSBCfNGm/view?usp=sharing"
          }
          hLink={true}
        />
      </div>
    </div>
  );
}