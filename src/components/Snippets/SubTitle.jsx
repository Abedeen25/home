import * as React from "react";

export default function SubTitle({ icon, title, subhead }) {
  return (
    <div className="page-heading">
      <div className="sperator"></div>
      {icon}
      <h2>{title}</h2>
      {subhead !== "" && <p>{subhead}</p>}
    </div>
  );
}
