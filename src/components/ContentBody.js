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
import Reveal from "./Snippets/Reveal";

export default function ContentBody({ isDarkTheme }) {
  return (
    <div className="ContentBody">
      <Header isDarkTheme={isDarkTheme} />
      <Intro />
      <Reveal>
        <About />
      </Reveal>
      <Reveal>
        <Work work={Mydata.Works} />
      </Reveal>
      <Reveal>
        <Research researchDetails={Mydata.ResearchDetails} />
      </Reveal>
      <Reveal>
        <Education edu={Mydata.edu} />
      </Reveal>
      <Reveal>
        <Projects ProjectList={Mydata.Projects} TS={Mydata.TechStack} />
      </Reveal>
      <Reveal>
        <Accolades data={Mydata.Awards} />
      </Reveal>
      <Reveal>
        <ExtraCurri data={Mydata.ECAs} />
      </Reveal>
      <Reveal>
        <Teaching
          Semesters={Mydata.TeachingSemesters}
          Courses={Mydata.TaughtCourses}
        />
      </Reveal>
      <Reveal>
        <Advising studentList={Mydata.Advising} />
      </Reveal>
      <Reveal>
        <Writeups />
      </Reveal>
    </div>
  );
}