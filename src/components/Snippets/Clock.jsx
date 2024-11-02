import React, { useState, useEffect } from "react";

function getCurrentTimeInDhaka() {
  let date = new Date();
  let formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formatter.format(date);
}

export default function Clock() {
  const [time, setTime] = useState(getCurrentTimeInDhaka());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTimeInDhaka());
    }, 60000); // Update every 60000 milliseconds (1 minute)

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="note">My Local Time</div>
      <div className="time-display Font-800">{time}</div>
    </div>
  );
}
