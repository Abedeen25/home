import React from "react";
import Header from "./Header";
import Intro from "./Intro";
import About from "./About";
import Education from "./Education";
import Research from "./Research";
import { Mydata } from "./Datapoints";

export default function ContentBody({ isDarkTheme }) {
  return (
    <div className="ContentBody">
      <Header isDarkTheme={isDarkTheme} />
      <Intro />
      <About />
      <Research researchDetails={Mydata.ResearchDetails} />
      <Education edu={Mydata.edu} />
    </div>
  );
}
