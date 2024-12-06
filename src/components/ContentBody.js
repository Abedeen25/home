import React from "react";
import Header from "./Header";
import Intro from "./Intro";
import About from "./Pages/About";
import Education from "./Pages/Education";
import Research from "./Pages/Research";
import { Mydata } from "./Data/Datapoints";
import Work from "./Pages/Work";
import Projects from "./Pages/Projects";
import Accolades from "./Pages/Accolades";
import Teaching from "./Pages/Teaching";
import Advising from "./Pages/Advising";
import ExtraCurri from "./Pages/ExtraCurri";
import { Writeups } from "./Pages/Writeups";

export default function ContentBody({ isDarkTheme, showBlog }) {
  return (
    <div className="ContentBody">
      <Header isDarkTheme={isDarkTheme} />
      <Intro />
      <About />
      <Work work={Mydata.Works} />
      <Research researchDetails={Mydata.ResearchDetails} />
      <Education edu={Mydata.edu} />
      <Projects ProjectList={Mydata.Projects} TS={Mydata.TechStack} />
      <Accolades data={Mydata.Awards} />
      <ExtraCurri data={Mydata.ECAs} />
      <Teaching
        Semesters={Mydata.TeachingSemesters}
        Courses={Mydata.TaughtCourses}
      />
      <Advising studentList={Mydata.Advising} />
      <Writeups showBlog={showBlog} />
    </div>
  );
}
