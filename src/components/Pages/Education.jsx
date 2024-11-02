import React from "react";
import { IoLinkOutline } from "react-icons/io5";
import SubTitle from "../Snippets/SubTitle";
import { PiStudentBold } from "react-icons/pi";

export default function Education({ edu }) {
  return (
    <div className="edu topic-sections" id="education">
      <SubTitle
        icon={<PiStudentBold className="Sub-icon" />}
        title="Education"
        subhead=""
      />
      <div className="edu-list">
        {edu.map((inst) => (
          <div className="edu-entry">
            <div className="track">
              <div className="time-dot" />
            </div>
            <div className="edu-card">
              <h3>
                <b
                  className="clickabkelink"
                  onClick={() => window.open(inst.webLink)}
                >
                  {inst.Name} <IoLinkOutline />
                </b>{" "}
                ({inst.Time})
              </h3>
              <div>{inst.Cert}</div>
              <div>
                <b>{inst.GPType} : </b>
                {inst.GP}
              </div>
              {inst.Thesis && (
                <div className="Edu-details">
                  <b>Thesis: </b> {inst.Thesis_title}
                </div>
              )}
              {inst.Thesis && (
                <div>
                  <b>Thesis Supervisor: </b> {inst.Thesis_supervisor}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
