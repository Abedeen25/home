import React from "react";
import SubTitle from "../Snippets/SubTitle";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function Teaching({ Semesters, Courses }) {
  return (
    <div className="topic-sections" id="teach">
      <SubTitle
        icon={<FaChalkboardTeacher className="Sub-icon" id="Teaching" />}
        title="Teaching"
        subhead={""}
      />
      <div className="course-list">
        {Courses.map((course) => (
          <div className="course">
            <div className="title">{course.courseTitle}</div>
            <div className="sems">
              {course.semesters.map((i) => (
                <div className="semester">{Semesters[i]}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
