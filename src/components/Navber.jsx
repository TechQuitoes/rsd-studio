import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTheme } from "../context/ThemeContext";

const NAV_LINKS = [
  { label: "Projects", to: "/project" },
  { label: "Studio", to: "/studio" },
  { label: "Journal", to: "/journal" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const backdropRef = useRef(null);
  const linksRef = useRef(null);
  

const { theme, setTheme } = useTheme();
const location = useLocation();

const THEME_COLORS = {
  green: "#0a1f16",
  purple: "#1a0f2b",
  black: "#080808",
};

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useGSAP(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.to(backdropRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(linksRef.current?.querySelectorAll("li"), {
        x: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2,
      });
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 1,
        ease: "power4.inOut",
      });

      gsap.to(backdropRef.current, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.6,
        ease: "power2.inOut",
      });
    }
  }, [menuOpen]);

  return (
    <>
      {/* BACKDROP */}
      <div
        ref={backdropRef}
        onClick={toggleMenu}
        style={{
          opacity: 0,
          visibility: "hidden",
        }}
        className="fixed inset-0 bg-black/45 backdrop-blur-[8px] z-[8000] cursor-pointer"
      />

      {/* SIDE MENU */}
      <nav
        ref={menuRef}
        style={{
          transform: "translateX(100%)",
        }}
        className="fixed top-0 right-0 w-[520px] max-w-full h-screen bg-[#f2efe8] z-[9000] px-8 md:px-[70px] py-[120px] md:py-[140px] overflow-hidden"
      >
        {/* Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.45] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        {/* Glow */}
        <div
          className="absolute -top-[120px] -right-[120px] w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,.05), transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* Corner Decoration */}
        <div className="absolute left-[60px] top-[40px] w-[120px] h-[120px] border-t border-l border-black/[0.08] opacity-60" />

        {/* CLOSE BUTTON */}
        <button
          onClick={toggleMenu}
          className="absolute top-[38px] right-[42px] w-[54px] h-[54px] bg-black text-white rounded-full text-2xl flex items-center justify-center z-10 hover:scale-105 transition-transform duration-700"
        >
          ×
        </button>

        {/* NAVIGATION LINKS */}
        <ul
          ref={linksRef}
          className="relative z-10 flex flex-col gap-[24px] md:gap-[30px]"
        >
          {NAV_LINKS.map(({ label, to }) => (
            <li key={label} className="overflow-hidden">
              <Link
                to={to}
                onClick={toggleMenu}
                className="font-serif text-black uppercase tracking-[2px] no-underline"
                style={{
                  fontSize: "clamp(34px,5vw,52px)",
                  fontWeight: 400,
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* FOOTER */}
        <div className="absolute bottom-[60px] left-8 md:left-[70px] text-[11px] tracking-[4px] uppercase text-black/50 leading-[2]">
          studio@rakeshsharmadesign.com
          <br />
          Indore — India
        </div>
      </nav>

      {/* MAIN FLOATING HEADER FOR ALL PAGES */}
      <header
        className="
          fixed
          top-3
          md:top-6
          left-1/2
          -translate-x-1/2
          w-[95%]
          md:w-[94%]
          h-[72px]
          md:h-[92px]
          z-[5000]
          grid
          grid-cols-[auto_1fr_auto]
          items-center
          px-4
          md:px-8
          rounded-[20px]
          md:rounded-[30px]
          overflow-hidden
        "
        style={{
          background: "rgba(0,0,0,0.38)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* LEFT LOGO */}
        <div className="flex items-center">
          <div className="flex items-center font-extrabold uppercase leading-none">
            {["R", "S", "D"].map((letter, i) => (
              <span
                key={i}
                className="
                  text-[32px]
                  sm:text-[40px]
                  md:text-[62px]
                  select-none
                "
                style={{
                  background:
                    "linear-gradient(to bottom,#ffffff,#d8d8d8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginLeft: i > 0 ? "-6px" : 0,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* CENTER TITLE */}
        <div className="text-center px-2 overflow-hidden">
          <Link
            to="/"
            className="
              text-white
              uppercase
              whitespace-nowrap
              block
              truncate
            "
            style={{
              fontSize: "clamp(10px,2vw,28px)",
              letterSpacing: "clamp(1px,1vw,10px)",
            }}
          >
            Rakesh Sharma Design
          </Link>
        </div>

        {/* MENU BUTTON */}
        <div className="flex justify-end gap-6">
          <button
            onClick={toggleMenu}
            className="
              w-[48px]
              h-[48px]
              md:w-[62px]
              md:h-[62px]
              rounded-full
              flex
              items-center
              justify-center
            "
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <div className="flex flex-col gap-[4px]">
              <span className="block w-[20px] h-px bg-white" />
              <span className="block w-[20px] h-px bg-white" />
            </div>
          </button>

           {(location.pathname === "/studio" ||
  location.pathname === "/contact") && (
  <div className="flex items-center gap-2 mr-4">
    {Object.entries(THEME_COLORS).map(([key, color]) => (
      <button
        key={key}
        onClick={() => setTheme(color)}
        className={`
          w-[14px]
          h-[14px]
          rounded-full
          transition-all
          duration-300
          ${
            theme === color
              ? "scale-125 ring-2 ring-white"
              : "scale-100"
          }
        `}
        style={{
          backgroundColor: color,
        }}
      />
    ))}
  </div>
)}
        </div>

       
      </header>
    </>
  );
}