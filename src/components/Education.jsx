import React from "react";

export default function Education({ edu }) {
  return (
    <div className="edu topic-sections">
      <div className="titlePortion">
        <h2># EDUCATION</h2>
        <div className="line"></div>
      </div>
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
                  {inst.Name}
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
