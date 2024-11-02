import React from "react";
import SubTitle from "../Snippets/SubTitle";
import { PiBriefcaseFill } from "react-icons/pi";
import { IoLinkOutline } from "react-icons/io5";
import { ChipLikeInbody } from "../Snippets/ButtonC";

export default function Work({ work }) {
  return (
    <div className="work-exp topic-sections" id="workExp">
      <SubTitle
        icon={<PiBriefcaseFill className="Sub-icon" />}
        title="Work Experience"
        subhead={""}
      />
      <div className="places-list">
        {work.map((place) =>
          place.current ? (
            <div className="place-entry">
              <div className="track">
                <div className="time-dot" />
              </div>
              <div className="work-card">
                <h3>
                  <b>{place.Role}</b>
                </h3>
                <h3
                  className="Lighter-text clickabkelink"
                  onClick={() => window.open(place.webLink)}
                >
                  {place.Dep + ", " + place.Name} <IoLinkOutline />
                </h3>
                <h3 className="Lighter-text">{place.since}</h3>
                <div className="details">{place.work}</div>
                <div className="details">
                  <ChipLikeInbody buttonText="Advising" Hlink="#Advising" />
                  <ChipLikeInbody buttonText="Courses" Hlink="#Teaching" />
                </div>
              </div>
            </div>
          ) : (
            <div className="place-entry">
              <div className="track">
                <div className="time-dot" />
              </div>
              <div className="work-card">
                <h3>
                  <b>{place.Role}</b>
                </h3>
                <h3 className="Lighter-text">{place.Name}</h3>
                <h3 className="Lighter-text">{place.since}</h3>
                <div className="details">{place.work}</div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
