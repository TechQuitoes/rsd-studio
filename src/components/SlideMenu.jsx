import React from "react";
import { NAV_LINKS } from "../data/siteData";

/**
 * SlideMenu — right-side drawer with backdrop.
 * Props:
 *   isOpen  {boolean}
 *   onClose {function}
 */
const SlideMenu = ({ isOpen, onClose }) => {
  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.45)",
          backdropFilter: "blur(8px)",
          zIndex: 8000,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          transition: ".8s ease",
        }}
      />

      {/* ── Drawer ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "clamp(320px, 40vw, 520px)",
          height: "100vh",
          background: "#f7f4ef",
          zIndex: 9000,
          padding: "140px 70px",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 1.2s cubic-bezier(.19,1,.22,1)",
          overflow: "hidden",
        }}
      >
        {/* Grid texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            opacity: 0.45,
            pointerEvents: "none",
          }}
        />

        {/* Corner decoration */}
        <div
          style={{
            position: "absolute",
            left: "60px",
            top: "40px",
            width: "120px",
            height: "120px",
            borderTop: "1px solid rgba(0,0,0,.08)",
            borderLeft: "1px solid rgba(0,0,0,.08)",
            opacity: 0.6,
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close Menu"
          style={{
            position: "absolute",
            top: "38px",
            right: "42px",
            width: "54px",
            height: "54px",
            border: "none",
            background: "#111",
            color: "#fff",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            transition: ".7s cubic-bezier(.19,1,.22,1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "rotate(180deg) scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "rotate(0deg) scale(1)";
          }}
        >
          ×
        </button>

        {/* Nav Links */}
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label} style={{ overflow: "hidden" }}>
              <a
                href={href}
                className="menu-link"
                onClick={onClose}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Footer meta */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "70px",
            fontSize: "11px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#777",
            lineHeight: 2,
            zIndex: 2,
          }}
        >
          studio@rakeshsharmadesigns.com
          <br />
          Indore — India
        </div>
      </nav>
    </>
  );
};

export default SlideMenu;
