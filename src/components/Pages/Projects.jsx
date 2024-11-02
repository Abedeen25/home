import React from "react";
import SubTitle from "../Snippets/SubTitle";
import { SiBetterstack } from "react-icons/si";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import HorizontalScroll from "../Snippets/HorizontalScroll";

export default function Projects({ ProjectList, TS }) {
  const [projectID, setProjectID] = React.useState(0);

  let project = ProjectList[projectID];

  function nextProject() {
    if (projectID === ProjectList.length - 1) {
      setProjectID(0);
    } else {
      setProjectID(projectID + 1);
    }
  }

  function previousProject() {
    if (projectID === 0) {
      setProjectID(ProjectList.length - 1);
    } else {
      setProjectID(projectID - 1);
    }
  }

  return (
    <div className="topic-sections" id="project">
      <SubTitle
        icon={<SiBetterstack className="Sub-icon" />}
        title="Projects"
        subhead={""}
      />
      <div className="display-project">
        <div
          className="wrapper-bg"
          style={{ backgroundImage: `url(${project.bgim})` }}
        >
          <div className="project-card grid-child">
            <div className="navigators">
              <div className="prev" onClick={() => previousProject()}>
                <FaAngleDoubleLeft />
              </div>
              <div className="indicators">
                {ProjectList.map((_, index) => (
                  <div className={index === projectID ? "active" : ""}></div>
                ))}
              </div>
              <div className="next" onClick={() => nextProject()}>
                <FaAngleDoubleRight />
              </div>
            </div>
            <div className="title Font-600">{project.title}</div>
            <div className="spacer" />
            <div className="item-no Font-800">
              {projectID + 1 + " / " + ProjectList.length}
            </div>
          </div>
        </div>
        <div className="details-of-item">
          <div className="project-description grid-child">
            {project.Description}
          </div>
          <div className="detail-extras">
            <div className="project-features grid-child">
              <div className="heading Font-800">Objectives</div>
              {project.FeatureList.map((item) => (
                <li>{item}</li>
              ))}
            </div>
            <div className="project-tech grid-child">
              <div className="links">
                <div className="heading Font-800">More on</div>
                {project.Links.map((a) => (
                  <a href={a.link} target="_blank" rel="noopener noreferrer">
                    {a.site}
                  </a>
                ))}
              </div>
              <div className="tools">
                <div className="heading Font-800">Tools</div>
                {project.TS.map((ico) => (
                  <div className="ico">{ico}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <HorizontalScroll TS={TS} /> */}
    </div>
  );
}
