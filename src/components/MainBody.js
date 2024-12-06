import React, { useEffect, useState } from "react";
import { Toolbar } from "./Snippets/Toolbar";
import ContentBody from "./ContentBody";
import Footer from "./Footer";
import Blog from "../pages/blog";

function MainBody() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [isBlogVisible, setBlogVisible] = useState(false);
  const [blogBody, setBlogBody] = useState("hi");

  useEffect(() => {
    let theme = localStorage.getItem("App-theme");
    if (theme === "dark") {
      changeThemeFrom("light");
    } else {
      changeThemeFrom("dark");
    }
  });

  function showBlog(BlogData) {
    console.log(BlogData);
    setBlogBody(BlogData);
    setBlogVisible(true);
  }

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
      {isBlogVisible ? (
        <Blog
          contents={blogBody}
          close={setBlogVisible}
          isDarkTheme={darkTheme}
        />
      ) : (
        <div className="MB">
          <Toolbar darkTheme={darkTheme} changeTheme={changeThemeFrom} />
          <ContentBody
            isDarkTheme={darkTheme}
            showBlog={showBlog}
            close={setBlogVisible}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default MainBody;
