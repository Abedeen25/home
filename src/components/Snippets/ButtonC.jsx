import React from "react";

export default function ButtonC({ buttonText, Type, Link, hLink, action }) {
  return hLink ? (
    <div className={"button " + Type} onClick={() => window.open(Link)}>
      {buttonText}
    </div>
  ) : (
    <div className={"button " + Type} onClick={action}>
      {buttonText}
    </div>
  );
}

function ChipLikeInbody({ buttonText, Hlink }) {
  return (
    <div className="bg-grad">
      <div className="chip-button">
        <a href={Hlink}>{buttonText}</a>
      </div>
    </div>
  );
}

export { ChipLikeInbody };
