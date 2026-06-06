import React from "react";
import { QUOTE } from "../data/siteData";

/**
 * QuoteSection — editorial italic quote on warm background.
 */
const QuoteSection = () => {
  return (
    <section
      style={{
        minHeight: "45vh",
        background: "#f7f4ef",
        display: "flex",
        alignItems: "center",
        padding: "clamp(80px, 10vh, 120px) clamp(30px, 8vw, 90px)",
      }}
    >
      <p
        style={{
          fontFamily: "'Tenor Sans', serif",
          fontSize: "clamp(26px, 4vw, 52px)",
          lineHeight: 1.5,
          color: "#111",
          maxWidth: "1000px",
          fontStyle: "italic",
        }}
      >
        {QUOTE}
      </p>
    </section>
  );
};

export default QuoteSection;
