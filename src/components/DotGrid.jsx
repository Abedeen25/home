import React, { useEffect, useRef } from "react";

// Procedural replacement for the old tiled BG.png dot background.
// Dots near the cursor split into red/blue fringes (chromatic aberration),
// strongest at the cursor and easing off with distance. The rAF loop fully
// stops whenever the pointer settles, so idle cost is zero.

const SPACING = 15;
const DOT_RADIUS = 1.8;
const INFLUENCE = 150;
const MAX_SHIFT = 5;
const PAD = MAX_SHIFT + DOT_RADIUS + 1;

export default function DotGrid({ dark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const base = dark ? [255, 255, 255] : [0, 0, 0];
    const baseAlpha = dark ? 0.14 : 0.12;
    const RED = [255, 60, 90];
    const BLUE = [60, 120, 255];

    let width = 0;
    let height = 0;
    let off = null;

    function buildStatic() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      off = document.createElement("canvas");
      off.width = canvas.width;
      off.height = canvas.height;
      const octx = off.getContext("2d");
      octx.scale(dpr, dpr);
      octx.fillStyle = `rgba(${base[0]},${base[1]},${base[2]},${baseAlpha})`;
      for (let y = SPACING / 2; y < height + SPACING; y += SPACING) {
        for (let x = SPACING / 2; x < width + SPACING; x += SPACING) {
          octx.beginPath();
          octx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
          octx.fill();
        }
      }
      paintStatic();
    }

    function paintStatic() {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(off, 0, 0);
    }

    buildStatic();

    const onResize = () => buildStatic();
    window.addEventListener("resize", onResize);

    if (reduced) {
      return () => window.removeEventListener("resize", onResize);
    }

    let raf = 0;
    let running = false;
    let inside = false;
    const target = { x: -9999, y: -9999 };
    const cur = { x: -9999, y: -9999 };
    let envelope = 0;

    function dot(x, y, rgb, alpha) {
      ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }

    function draw() {
      paintStatic();
      if (envelope <= 0.005) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Clear + redraw a grid-cell-aligned region around the cursor so no
      // dot is ever half-erased or double-painted.
      const cx0 = Math.max(0, Math.floor((cur.x - INFLUENCE - PAD) / SPACING));
      const cy0 = Math.max(0, Math.floor((cur.y - INFLUENCE - PAD) / SPACING));
      const cx1 = Math.min(
        Math.ceil((width + SPACING) / SPACING),
        Math.ceil((cur.x + INFLUENCE + PAD) / SPACING),
      );
      const cy1 = Math.min(
        Math.ceil((height + SPACING) / SPACING),
        Math.ceil((cur.y + INFLUENCE + PAD) / SPACING),
      );
      ctx.clearRect(
        cx0 * SPACING,
        cy0 * SPACING,
        (cx1 - cx0) * SPACING,
        (cy1 - cy0) * SPACING,
      );

      for (let ky = cy0; ky < cy1; ky++) {
        const y = SPACING / 2 + ky * SPACING;
        for (let kx = cx0; kx < cx1; kx++) {
          const x = SPACING / 2 + kx * SPACING;
          const dx = x - cur.x;
          const dy = y - cur.y;
          const d = Math.hypot(dx, dy);
          let t = 1 - d / INFLUENCE;

          if (t <= 0) {
            dot(x, y, base, baseAlpha);
            continue;
          }

          t = t * t * (3 - 2 * t); // smoothstep falloff
          const k = t * envelope;
          const s = MAX_SHIFT * k;
          const ux = d > 0.0001 ? dx / d : 1;
          const uy = d > 0.0001 ? dy / d : 0;

          // Base dot dims as its color channels "separate"
          dot(x, y, base, baseAlpha * (1 - 0.55 * k));
          // Red fringe drifts outward, blue inward (lens-like CA)
          const fringe = Math.min(0.5, baseAlpha * 2.4 * k);
          dot(x + ux * s, y + uy * s, RED, fringe);
          dot(x - ux * s, y - uy * s, BLUE, fringe);
        }
      }
    }

    function frame() {
      cur.x += (target.x - cur.x) * 0.18;
      cur.y += (target.y - cur.y) * 0.18;
      const goal = inside ? 1 : 0;
      envelope += (goal - envelope) * 0.12;

      const settled =
        Math.abs(target.x - cur.x) < 0.5 &&
        Math.abs(target.y - cur.y) < 0.5 &&
        Math.abs(goal - envelope) < 0.005;

      if (settled) {
        envelope = goal;
        draw();
        running = false;
        return;
      }

      draw();
      raf = requestAnimationFrame(frame);
    }

    function wake() {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    }

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      inside = true;
      wake();
    };
    const onLeave = () => {
      inside = false;
      wake();
    };
    const onUp = (e) => {
      // Touch has no hover: let the effect fade after the finger lifts
      if (e.pointerType !== "mouse") onLeave();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("blur", onLeave);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [dark]);

  return <canvas ref={canvasRef} className="dotgrid" aria-hidden="true" />;
}
