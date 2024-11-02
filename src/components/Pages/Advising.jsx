import React from "react";
import SubTitle from "../Snippets/SubTitle";
import { ImBubbles3 } from "react-icons/im";
import { BsPlayFill } from "react-icons/bs";

export default function Advising({ studentList }) {
  return (
    <div className="topic-sections" id="Advising">
      <SubTitle
        icon={<ImBubbles3 className="Sub-icon" />}
        title="Advising"
        subhead={""}
      />
      <div className="majorList">
        <h3>Undergraduate</h3>
        <div className="studentList">
          {studentList.UnderGrad.map((student) => (
            <p>
              {" "}
              <BsPlayFill className="playIco" />
              {" " + student}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
