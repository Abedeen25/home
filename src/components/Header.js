import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { masterLogoDark, masterLogoLight } from "../ThemeControlers";
import { PiGraduationCapFill } from "react-icons/pi";
import { FaLinkedin, FaOrcid } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";

export default function Header({ isDarkTheme }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function goHome() {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  }

  return (
    <div className="Header">
      <img
        className="logo"
        onClick={goHome}
        src={isDarkTheme ? masterLogoLight : masterLogoDark}
        alt="Go to home page"
      />

      <div className="seperators" />
      <PiGraduationCapFill
        className="SMlinks"
        onClick={() =>
          window.open(
            "https://scholar.google.com/citations?user=T-zYiH8AAAAJ&hl=en"
          )
        }
      />
      <FaLinkedin
        className="SMlinks"
        onClick={() =>
          window.open("https://www.linkedin.com/in/iftekharul-abedeen")
        }
      />
      <VscGithub
        className="SMlinks"
        onClick={() => window.open("https://github.com/abedeen25")}
      />
      <FaOrcid
        className="SMlinks"
        onClick={() => window.open("https://orcid.org/0009-0003-7986-5954")}
      />
      <div
        className="UIU-prof"
        onClick={() => window.open("https://cse.uiu.ac.bd/abedeen-iftekharul")}
      >
        UIU
      </div>
    </div>
  );
}
