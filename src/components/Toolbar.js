import React from "react";
import { 
  darklogo,
  lightlogo } from "../ThemeControlers";
import { MdAttachEmail } from "react-icons/md";
import { Tooltip } from 'react-tooltip'

export function Toolbar({darkTheme, changeTheme}) {

  
  return (
    <div className="Tools">
      {darkTheme ? (
        <div className="theme-button" onClick={() => changeTheme("light")}>
          <img src={darklogo} width="30" alt="logo" />
        </div>
      ) : (
        <div className="Actions theme-button" onClick={() => changeTheme("dark")}>
          <img src={lightlogo} width="30" alt="logo" />
        </div>
      )}
      <div className="Actions">
      <Tooltip className="tool-tip" id="my-tooltip" />
        <MdAttachEmail 
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Click to copy email"
        className="Copy-Actions" 
        onClick={() => navigator.clipboard.writeText("iftekharul@cse.uiu.ac.bd")}/>
      </div>
    </div>
  );
}
