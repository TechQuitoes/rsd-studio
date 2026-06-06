import React, { useEffect, useState } from "react";

/**
 * Preloader
 * Shows on mount, fades out after `delay` ms.
 * Calls `onDone` when fully hidden so the app can start animations.
 */
const Preloader = ({ delay = 2800, onDone }) => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setHide(true);
      // Give the CSS transition time to finish before calling onDone
      setTimeout(() => onDone?.(), 1200);
    }, delay);
    return () => clearTimeout(t);
  }, [delay, onDone]);

  return (
    <div className={`preloader${hide ? " hide" : ""}`}>
      <h1
        style={{
          fontFamily: "'Tenor Sans', serif",
          fontSize: "clamp(24px, 4vw, 42px)",
          fontWeight: 400,
          letterSpacing: "18px",
          textTransform: "uppercase",
          color: "#fff",
        }}
      >
        Rakesh Sharma Design
      </h1>
      <p
        style={{
          marginTop: "18px",
          color: "#777",
          letterSpacing: "8px",
          fontSize: "11px",
          textTransform: "uppercase",
        }}
      >
        Architectural Elegance
      </p>
    </div>
  );
};

export default Preloader;
