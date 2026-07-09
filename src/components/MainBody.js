import React, { lazy, Suspense } from "react";
import { Toolbar } from "./Snippets/Toolbar";
import ContentBody from "./ContentBody";
import Footer from "./Footer";
import DotGrid from "./DotGrid";

const Hero3D = lazy(() => import("./Hero3D"));

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function MainBody({ darkTheme, toggleTheme }) {
  const show3D = !prefersReducedMotion() && supportsWebGL();

  return (
    <div className="mainBody">
      <DotGrid dark={darkTheme} />
      {show3D && (
        <Suspense fallback={null}>
          <Hero3D dark={darkTheme} />
        </Suspense>
      )}
      <div className="MB">
        <Toolbar darkTheme={darkTheme} changeTheme={toggleTheme} onHome={true} />
        <ContentBody isDarkTheme={darkTheme} />
      </div>
      <Footer />
    </div>
  );
}

export default MainBody;