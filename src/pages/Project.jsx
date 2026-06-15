import { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import { PROJECTS } from "../data/projectData";
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600&family=Space+Grotesk:wght@300;400;500&display=swap');

    :root {
      --color-bg: #EAEAEA;
      --color-surface: #FFFFFF;
      --color-accent: #B0936F;
      --color-text-main: #1C1D1F;
      --color-text-muted: #7A7D81;
    }

    html, body {
      margin: 0; padding: 0;
      width: 100%; height: 100%;
      overflow: hidden;
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: var(--color-bg);
      -webkit-font-smoothing: antialiased;
      box-sizing: border-box;
    }

    *, *::before, *::after { box-sizing: border-box; }

    @media (max-width: 1100px) {
      html, body { overflow-y: auto; overflow-x: hidden; }
    }

    @keyframes assembleStudioDraft {
      to { stroke-dashoffset: 0; }
    }
    @keyframes scanPageLayout {
      0%   { transform: translateY(0); }
      100% { transform: translateY(70vh); }
    }

    .bp-main-wall {
      stroke: rgba(28,29,31,0.12); stroke-width: 1.5px; fill: none;
      stroke-dasharray: 1000; stroke-dashoffset: 1000;
      animation: assembleStudioDraft 4s cubic-bezier(0.16,1,0.3,1) forwards;
    }
    .bp-fine-details {
      stroke: rgba(28,29,31,0.06); stroke-width: 1px; fill: none;
      stroke-dasharray: 800; stroke-dashoffset: 800;
      animation: assembleStudioDraft 3.5s cubic-bezier(0.16,1,0.3,1) forwards 0.4s;
    }
    .bp-dimension-strings {
      stroke: rgba(176,147,111,0.28); stroke-width: 1.25px; fill: none;
      stroke-dasharray: 500; stroke-dashoffset: 500;
      animation: assembleStudioDraft 3s cubic-bezier(0.16,1,0.3,1) forwards 0.8s;
    }
    .ambient-laser-tracker {
      stroke: #B0936F; stroke-width: 0.75px; opacity: 0.15;
      stroke-dasharray: 8,4;
      animation: scanPageLayout 8s linear infinite;
    }

    /* Hide scrollbar but keep scroll functionality */
    .filmstrip {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      /* Full viewport width — no parent clipping */
      width: 100vw;
      /* Explicit height so overflow-x triggers */
      height: 54vh;
      min-height: 420px;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding-left: 12vw;
      gap: 50px;
    }
    .filmstrip::-webkit-scrollbar { display: none; }

    .filmstrip-fade {
      opacity: 0.15;
      transform: translateY(8px);
      transition: opacity 0.4s cubic-bezier(0.16,1,0.3,1),
                  transform 0.4s cubic-bezier(0.16,1,0.3,1);
    }
    .filmstrip-show {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 0.4s cubic-bezier(0.16,1,0.3,1),
                  transform 0.4s cubic-bezier(0.16,1,0.3,1);
    }

    /* Cards */
    .pcard {
      flex-shrink: 0;
      width: clamp(380px, 32vw, 580px);
      height: 100%;
      background: var(--color-surface);
      border-radius: 32px;
      padding: 24px;
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 30px 60px rgba(0,0,0,0.03);
      transition: transform 0.8s cubic-bezier(0.16,1,0.3,1),
                  box-shadow 0.8s cubic-bezier(0.16,1,0.3,1);
      will-change: transform;
    }
    .pcard:hover {
      transform: translateY(-12px) scale(1.01);
      box-shadow: 0 40px 80px rgba(0,0,0,0.08);
    }
    .pcard:hover .cimg  { transform: scale(1) !important; }
    .pcard:hover .ctitle { color: var(--color-accent) !important; }
    .pcard:hover .clabel { background: rgba(0,0,0,0.06); color: var(--color-text-main); }
    .pcard:hover .carrow { background: #1C1D1F; border-color: #1C1D1F; transform: rotate(-45deg); }
    .pcard:hover .carrow path { stroke: #fff !important; }

    .cimg {
      transform: scale(1.05);
      transition: transform 1.5s cubic-bezier(0.16,1,0.3,1);
      width: 100%; height: 100%; object-fit: cover;
    }
    .ctitle {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 1.5rem; font-weight: 400;
      letter-spacing: -0.5px; margin-bottom: 2px;
      color: var(--color-text-main);
      transition: color 0.8s cubic-bezier(0.16,1,0.3,1);
    }
    .clabel {
      font-size: 0.8rem; color: var(--color-text-muted);
      background: rgba(0,0,0,0.03); padding: 4px 14px;
      border-radius: 12px; display: inline-block; margin-top: 10px;
      transition: all 0.8s cubic-bezier(0.16,1,0.3,1);
    }
    .carrow {
      width: 44px; height: 44px; flex-shrink: 0;
      border: 1px solid rgba(0,0,0,0.08);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.8s cubic-bezier(0.16,1,0.3,1);
    }
    .carrow path { transition: stroke 0.8s cubic-bezier(0.16,1,0.3,1); }

    /* Tab pins */
    .tabwrap { position: relative; }
    .tabwrap::before, .tabwrap::after {
      content: ''; position: absolute;
      width: 0; height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      transition: left 0.6s cubic-bezier(0.16,1,0.3,1);
    }
    .tabwrap::before { top: -6px;    border-bottom: 6px solid #B0936F; }
    .tabwrap::after  { bottom: -6px; border-top:    6px solid #B0936F; }

    /* Mobile */
    @media (max-width: 1100px) {
      .filmstrip {
        flex-direction: column;
        width: 100%;
        height: auto;
        min-height: unset;
        overflow-x: visible;
        overflow-y: visible;
        padding: 0;
        gap: 32px;
      }
      .pcard {
        width: 100% !important;
        height: 520px !important;
      }
    }
  `}</style>
);



const TABS = [
  { label: "All Architecture", value: "all" },
  { label: "Residential",      value: "residential" },
  { label: "Commercial",       value: "commercial" },
  { label: "Minimalist",       value: "minimalist" },
];

const BlueprintCanvas = () => (
  <div style={{
    position: "absolute", bottom: 0, left: 0,
    width: "100vw", height: "70vh",
    pointerEvents: "none", zIndex: 1, opacity: 0.9,
  }}>
    <svg viewBox="0 0 1200 600" fill="none" style={{ width: "100%", height: "100%" }}>
      <line className="ambient-laser-tracker" x1="0" y1="0" x2="1200" y2="0" />
      <line className="bp-main-wall" x1="30" y1="540" x2="1170" y2="540" />
      <rect className="bp-main-wall" x="80"  y="380" width="300" height="160" />
      <rect className="bp-main-wall" x="65"  y="220" width="250" height="160" />
      <rect className="bp-main-wall" x="125" y="100" width="160" height="120" />
      <rect className="bp-fine-details" x="100" y="415" width="95"  height="125" />
      <rect className="bp-fine-details" x="240" y="415" width="110" height="125" />
      <rect className="bp-fine-details" x="85"  y="245" width="140" height="105" />
      <circle className="bp-fine-details" cx="270" cy="295" r="16" />
      <rect className="bp-fine-details" x="150" y="125" width="110" height="70" />
      <line className="bp-fine-details" x1="205" y1="125" x2="205" y2="195" />
      <line className="bp-dimension-strings" x1="420" y1="100" x2="420" y2="540" />
      <line className="bp-dimension-strings" x1="412" y1="100" x2="428" y2="100" />
      <line className="bp-dimension-strings" x1="412" y1="220" x2="428" y2="220" />
      <line className="bp-dimension-strings" x1="412" y1="380" x2="428" y2="380" />
      <line className="bp-dimension-strings" x1="412" y1="540" x2="428" y2="540" />
      <rect className="bp-main-wall" x="680" y="300" width="380" height="240" />
      <rect className="bp-main-wall" x="740" y="120" width="260" height="180" />
      <line className="bp-fine-details" x1="680" y1="420" x2="1060" y2="420" />
      <line className="bp-fine-details" x1="780" y1="300" x2="780"  y2="540" />
      <line className="bp-fine-details" x1="880" y1="300" x2="880"  y2="540" />
      <line className="bp-fine-details" x1="980" y1="300" x2="980"  y2="540" />
      <rect className="bp-fine-details" x="765" y="150" width="80"  height="110" />
      <rect className="bp-fine-details" x="880" y="150" width="100" height="110" />
      <line className="bp-fine-details" x1="930" y1="150" x2="930"  y2="260" />
      <line className="bp-dimension-strings" x1="1100" y1="120" x2="1100" y2="540" />
      <line className="bp-dimension-strings" x1="1092" y1="120" x2="1108" y2="120" />
      <line className="bp-dimension-strings" x1="1092" y1="300" x2="1108" y2="300" />
      <line className="bp-dimension-strings" x1="1092" y1="540" x2="1108" y2="540" />
      <line className="bp-dimension-strings" x1="65"   y1="565" x2="1060" y2="565" />
      <line className="bp-dimension-strings" x1="65"   y1="557" x2="65"   y2="573" />
      <line className="bp-dimension-strings" x1="380"  y1="557" x2="380"  y2="573" />
      <line className="bp-dimension-strings" x1="680"  y1="557" x2="680"  y2="573" />
      <line className="bp-dimension-strings" x1="1060" y1="557" x2="1060" y2="573" />
    </svg>
  </div>
);



const Card = ({ p }) => (
  <div className="pcard">
    <div
      style={{
        width: "100%",
        height: "70%",
        borderRadius: 20,
        overflow: "hidden",
        background: "#E2E2E2",
      }}
    >
      <img
        className="cimg"
        src={p.img}
        alt={p.title}
      />
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingTop: 14,
      }}
    >
      <div>
        <h3 className="ctitle">{p.title}</h3>

        <p
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: "0.8rem",
            color: "var(--color-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
          }}
        >
          {p.subtitle}
        </p>

        <span className="clabel">
          View Case Study
        </span>
      </div>

      <div className="carrow">
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          strokeWidth="1.5"
        >
          <path
            d="M5 12h14M12 5l7 7-7 7"
            stroke="var(--color-text-main)"
          />
        </svg>
      </div>
    </div>
  </div>

);

export default function Project() {
  const [active, setActive]       = useState("all");
  const [pinLeft, setPinLeft]     = useState(45);
  const [fading, setFading]       = useState(false);
  const [cards, setCards]         = useState(PROJECTS);
  const [isMobile, setIsMobile]   = useState(false);

  const tabRefs  = useRef([]);
  const trackRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1100);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Attach wheel handler once — use ref so it's never stale
  const mobileRef = useRef(false);
  useEffect(() => { mobileRef.current = isMobile; }, [isMobile]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const handler = (e) => {
      if (mobileRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      el.scrollLeft += e.deltaY * 1.2;
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  // Initial pin
  useEffect(() => {
    const el = tabRefs.current[0];
    if (el) setPinLeft(el.offsetLeft + el.offsetWidth / 2 - 5);
  }, []);

  const clickTab = (val, idx) => {
    const el = tabRefs.current[idx];
    if (el) setPinLeft(el.offsetLeft + el.offsetWidth / 2 - 5);
    setFading(true);
    setTimeout(() => {
      setActive(val);
      setCards(val === "all" ? PROJECTS : PROJECTS.filter(p => p.category === val));
      if (trackRef.current) trackRef.current.scrollLeft = 0;
      setFading(false);
    }, 400);
  };

  return (
    <>
      <GlobalStyles />

      {/*
        ROOT: position:relative, overflow:visible so the filmstrip (100vw wide)
        can escape without being clipped. Body overflow:hidden handles the page.
      */}
      <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "visible", background: "var(--color-bg)" }}>

        {/* Blueprint */}
        {!isMobile && <BlueprintCanvas />}

      
        

        {/*
          LAYOUT SHELL: column flex, full viewport, no overflow clip.
          Top section = headline + tabs (padded)
          Bottom section = filmstrip (full-width, no padding wrapper around it)
        */}
        <div style={{
          display: "flex", flexDirection: "column",
          height: "100vh", width: "100vw",
          paddingTop: 140, paddingBottom: 60,
          position: "relative", zIndex: 5,
        }}>

          {/* Headline + Tabs */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            padding: "0 6%", marginBottom: "auto",
            flexWrap: isMobile ? "wrap" : "nowrap", gap: isMobile ? 24 : 0,
          }}>
            <div>
              <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(2.5rem,4vw,4rem)", fontWeight: 300, lineHeight: 1.05, letterSpacing: "-2px" }}>
                spatial purism. executed.
              </h1>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.85rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "2px", marginTop: 8 }}>
                 Selected Projects Lookbook Module
              </p>
            </div>

            <div className="tabwrap" style={{ background: "rgba(225,225,225,0.85)", backdropFilter: "blur(25px)", padding: 6, borderRadius: 20, display: "flex", gap: 2, border: "1px solid rgba(0,0,0,0.03)", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
              <style>{`.tabwrap::before{left:${pinLeft}px!important}.tabwrap::after{left:${pinLeft}px!important}`}</style>
              {TABS.map((t, i) => (
                <button key={t.value} ref={el => (tabRefs.current[i] = el)} onClick={() => clickTab(t.value, i)}
                  style={{
                    background: active === t.value ? "var(--color-surface)" : "transparent",
                    border: "none", padding: "8px 18px",
                    fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.85rem",
                    fontWeight: active === t.value ? 500 : 400,
                    color: active === t.value ? "var(--color-text-main)" : "var(--color-text-muted)",
                    cursor: "pointer", borderRadius: 14,
                    transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
                  }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/*
            FILMSTRIP — sits at the bottom of the column.
            width:100vw with no parent overflow:hidden = scrolls freely.
            marginLeft:0, NOT inside any padded wrapper.
          */}
          <div
            ref={trackRef}
            className={`filmstrip ${fading ? "filmstrip-fade" : "filmstrip-show"}`}
          >
            {cards.map(p => <Card  p={p} />)}

            {/* End block */}
            <div style={{ flexShrink: 0, width: 360, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "24px 40px 24px 0" }}>
              <div>
                <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1.6rem", fontWeight: 300, letterSpacing: "-0.5px", marginBottom: 12, lineHeight: 1.3 }}>Rakesh Sharma Designs</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                  A rigorous creative collective coordinating high-fashion residential interiors, clean structural plan envelopes, and tactile spatial material layers globally.
                </p>
              </div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.8rem", color: "var(--color-text-muted)", letterSpacing: "0.5px", lineHeight: 1.5 }}>
                <p>© 2026 RSD Practice Studio Portfolio.</p>
                <p style={{ opacity: 0.5, fontSize: "0.75rem", marginTop: 4 }}>All draft line blueprint geometries and concept files are reserved.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}