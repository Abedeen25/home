import React, { useState } from "react";
import { darklogo, lightlogo } from "../../ThemeControlers";
import { MdAttachEmail } from "react-icons/md";
import { TbNavigationTop } from "react-icons/tb";
import { Tooltip } from "react-tooltip";
import { FaAward } from "react-icons/fa";
import { PiBriefcaseFill } from "react-icons/pi";
import { LuBrainCircuit } from "react-icons/lu";
import { PiStudentBold } from "react-icons/pi";
import { ImBubbles3 } from "react-icons/im";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiBetterstack } from "react-icons/si";
// import { SiHelpscout } from "react-icons/si";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { Link } from "react-router-dom";

export function Toolbar({ darkTheme, changeTheme }) {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div className="Tools">
      {darkTheme ? (
        <div
          className="Actions theme-button"
          onClick={() => changeTheme("light")}
        >
          <img src={darklogo} alt="logo" />
        </div>
      ) : (
        <div
          className="Actions theme-button"
          onClick={() => changeTheme("dark")}
        >
          <img src={lightlogo} alt="logo" />
        </div>
      )}
      <div className="Actions">
        <Tooltip className="tool-tip" id="my-tooltip" />
        <MdAttachEmail
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Click to copy email"
          className="Copy-Actions Nav-icons"
          onClick={() =>
            navigator.clipboard.writeText("iftekharul@iut-dhaka.edu")
          }
        />
        <a href="#workExp">
          <PiBriefcaseFill
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Navigate to Work Experience"
            className="Nav-icons award-a"
          />
        </a>
        <a href="#research">
          <LuBrainCircuit
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Navigate to Research Works"
            className="Nav-icons award-a"
          />
        </a>
        <a href="#education">
          <PiStudentBold
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Navigate to Education"
            className="Nav-icons award-a"
          />
        </a>
        <a href="#project">
          <SiBetterstack
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Navigate to Projects"
            className="Nav-icons award-a"
          />
        </a>
        <a href="#Awards">
          <FaAward
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Navigate to Awards"
            className="Nav-icons award-a"
          />
        </a>
        <a href="#extraC">
          <VscActivateBreakpoints
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Navigate to Extra Curricular Activities"
            className="Nav-icons award-a"
          />
        </a>
        <a href="#teach">
          <FaChalkboardTeacher
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Navigate to Teaching Experience"
            className="Nav-icons award-a"
          />
        </a>
        <a href="#Advising">
          <ImBubbles3
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Navigate to Advising"
            className="Nav-icons award-a"
          />
        </a>
        <TbNavigationTop
          className="Nav-icons"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Scroll to top"
          onClick={scrollToTop}
          style={{ display: visible ? "inline" : "none" }}
        />
        {/* Go to top of the page */}
      </div>
    </div>
  );
}
