import React, { useEffect, useState } from "react";
import { Toolbar } from "./Snippets/Toolbar";
import ContentBody from "./ContentBody";
import Footer from "./Footer";

function MainBody() {
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    let theme = localStorage.getItem("App-theme");
    if (theme === "dark") {
      changeThemeFrom("light");
    } else {
      changeThemeFrom("dark");
    }
  });

  function changeThemeFrom(theme) {
    if (theme === "dark") {
      document.querySelector("body").setAttribute("App-theme", "light");
      setDarkTheme(true);
      localStorage.setItem("App-theme", "light");
    } else {
      document.querySelector("body").setAttribute("App-theme", "dark");
      setDarkTheme(false);
      localStorage.setItem("App-theme", "dark");
    }
  }

  return (
    <div className="mainBody">
      <Toolbar darkTheme={darkTheme} changeTheme={changeThemeFrom} />
      <ContentBody isDarkTheme={darkTheme} />
      <Footer />
    </div>
  );
}

export default MainBody;
