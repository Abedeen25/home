import React from "react";
import Clock from "./Snippets/Clock";
import { Mydata } from "./Data/Datapoints";

export default function Footer() {
  let contact = Mydata.Connect;
  return (
    <div className="wrapper">
      <div className="footer">
        <div className="content">
          <div className="col links">
            <div className="Font-600">Contact</div>
            {contact.map((ring) => (
              <a href={ring.link} target="_blank" rel="noopener noreferrer">
                {ring.icon} <div>{ring.text}</div>
              </a>
            ))}
          </div>
          <div className="colspace"></div>
          <div className="col">
            <Clock />
          </div>
        </div>
        <p>
          Designed and developed by
          <b> Iftekharul Abedeen</b>. All rights reserved.
        </p>
      </div>
    </div>
  );
}
