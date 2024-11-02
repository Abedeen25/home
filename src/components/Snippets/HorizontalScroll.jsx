import React, { useRef } from "react";

export default function HorizontalScroll({ TS }) {
  const scrollContentRef = useRef(null);

  return (
    <div className="Scrolling-banner">
      <div ref={scrollContentRef} className="scrollable-content">
        {TS.map((scrollItem, index) => (
          <div key={index} className="logo">
            {scrollItem.logo}
          </div>
        ))}
      </div>
    </div>
  );
}
