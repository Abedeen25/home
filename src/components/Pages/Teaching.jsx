import React from "react";
import SubTitle from "../Snippets/SubTitle";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function Teaching({ Semesters, Groups }) {
  return (
    <div className="topic-sections" id="teach">
      <SubTitle
        icon={<FaChalkboardTeacher className="Sub-icon" id="Teaching" />}
        title="Teaching"
        subhead={""}
      />
      {Groups.map((group) => (
        <div className="course-group" key={group.institution}>
          <h3 className="course-group-title">
            {group.role}
            <span className="course-group-inst"> · {group.institution}</span>
          </h3>
          <div className="course-list">
            {group.courses.map((course) => (
              <div className="course" key={course.courseTitle}>
                <div className="title">{course.courseTitle}</div>
                <div className="sems">
                  {course.semesters.map((i) => (
                    <div className="semester" key={i}>
                      {Semesters[i]}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
