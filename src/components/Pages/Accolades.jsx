import React from "react";
import SubTitle from "../Snippets/SubTitle";
import { FaAward } from "react-icons/fa";

export default function Accolades({ data }) {
  return (
    <div className="topic-sections" id="Awards">
      <SubTitle
        icon={<FaAward className="Sub-icon" />}
        title="Honors and Awards"
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
      </div>
    </div>
  );
}
