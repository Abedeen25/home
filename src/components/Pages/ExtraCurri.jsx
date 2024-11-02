import React from "react";
import SubTitle from "../Snippets/SubTitle";
// import { SiHelpscout } from "react-icons/si";
import { VscActivateBreakpoints } from "react-icons/vsc";

export default function ExtraCurri({ data }) {
  return (
    <div className="topic-sections" id="extraC">
      <SubTitle
        icon={<VscActivateBreakpoints className="Sub-icon" />}
        title="Extra Curricular Activities"
        subhead={""}
      />
      <div className="list">
        {data.map((item) => (
          <div className="List-items">
            <div className="item-title Font-500">{item.Topic}</div>
            <div className="item-description">
              {item.Desc.map((d) => (
                <div className="details">{d}</div>
              ))}
            </div>
          </div>
        ))}
        <h3>Selected Invited Talks/Panels</h3>
        <div className="talk-panel">
          Invited by IUTCS to talk about UX and Web-development. (2021)
        </div>
      </div>
    </div>
  );
}
