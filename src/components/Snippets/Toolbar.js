import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { VscActivateBreakpoints } from "react-icons/vsc";

export function Toolbar({ darkTheme, changeTheme, onHome = true }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const toggleVisible = () =>
      setVisible(document.documentElement.scrollTop > 300);
    window.addEventListener("scroll", toggleVisible, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goTo = (id) => {
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 350);
    }
  };

  return (
    <div className="Tools">
      <div className="Actions theme-button" onClick={() => changeTheme()}>
        <img
          src={darkTheme ? lightlogo : darklogo}
          alt={darkTheme ? "Switch to light theme" : "Switch to dark theme"}
        />
      </div>
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
        <PiBriefcaseFill
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Navigate to Work Experience"
          className="Nav-icons award-a"
          onClick={() => goTo("workExp")}
        />
        <LuBrainCircuit
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Navigate to Research Works"
          className="Nav-icons award-a"
          onClick={() => goTo("research")}
        />
        <PiStudentBold
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Navigate to Education"
          className="Nav-icons award-a"
          onClick={() => goTo("education")}
        />
        <SiBetterstack
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Navigate to Projects"
          className="Nav-icons award-a"
          onClick={() => goTo("project")}
        />
        <FaAward
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Navigate to Awards"
          className="Nav-icons award-a"
          onClick={() => goTo("Awards")}
        />
        <VscActivateBreakpoints
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Navigate to Extra Curricular Activities"
          className="Nav-icons award-a"
          onClick={() => goTo("extraC")}
        />
        <FaChalkboardTeacher
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Navigate to Teaching Experience"
          className="Nav-icons award-a"
          onClick={() => goTo("teach")}
        />
        <ImBubbles3
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Navigate to Advising"
          className="Nav-icons award-a"
          onClick={() => goTo("Advising")}
        />
        <TbNavigationTop
          className="Nav-icons"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Scroll to top"
          onClick={scrollToTop}
          style={{ display: visible ? "inline" : "none" }}
        />
      </div>
    </div>
  );
}