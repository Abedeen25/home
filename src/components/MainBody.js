import React, { useState } from "react"
import { Toolbar } from './Toolbar'
import ContentBody from './ContentBody'

function MainBody(){

    const [darkTheme, setDarkTheme] = useState(true);

  function changeTheme(theme) {
    if (theme === "dark") {
      document.querySelector("body").setAttribute("App-theme", "light");
      setDarkTheme(true);
      console.log(1)
    } else {
      document.querySelector("body").setAttribute("App-theme", "dark");
      setDarkTheme(false);
      console.log(2)
    }
  }

    return (
        <div className='mainBody'>
            <Toolbar darkTheme={darkTheme} changeTheme={changeTheme}/>
            <ContentBody isDarkTheme={darkTheme}/>
        </div>
    )
}

export default MainBody