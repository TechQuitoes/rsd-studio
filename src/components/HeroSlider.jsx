import React from "react";
import useSlider from "../hooks/useSlider";
import { HERO_SLIDES } from "../data/siteData";

/**
 * HeroSlider — Tailwind Version
 */
const HeroSlider = ({ ready }) => {
  const [current] = useSlider(HERO_SLIDES.length, 6000);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* ── Slide Images ── */}
      {HERO_SLIDES.map((slide, i) => (
        <img
          key={slide.image}
          src={slide.image}
          alt={slide.title}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-[6000ms] ease-out ${
            i === current
              ? "scale-110 opacity-100"
              : "scale-100 opacity-0"
          }`}
        />
      ))}

      {/* ── Dark Gradient Overlay ── */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/70 via-black/20 to-black/85" />

      {/* ── Light Leak 1 ── */}
      <div
        className={`animate-float1 pointer-events-none absolute left-[-200px] top-[-250px] z-[2] h-[700px] w-[700px] rounded-full blur-[80px] transition-opacity duration-[3000ms] ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(255,180,120,.16), transparent 70%)",
        }}
      />

      {/* ── Light Leak 2 ── */}
      <div
        className={`animate-float2 pointer-events-none absolute bottom-[-250px] right-[-250px] z-[2] h-[700px] w-[700px] rounded-full blur-[80px] transition-opacity delay-300 duration-[3000ms] ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,.08), transparent 70%)",
        }}
      />

      {/* ── Film Grain ── */}
      <div className="film-grain absolute inset-0 z-[3]" />

      {/* ── Watermark ── */}
      <div
        className={`pointer-events-none absolute right-[40px] top-1/2 z-[5] select-none -translate-y-1/2 font-extrabold leading-[0.8] tracking-[-22px] text-white/5 transition-all duration-[3000ms] ${
          ready ? "translate-y-[-50%] opacity-100" : "opacity-0"
        }`}
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "clamp(120px,22vw,340px)",
        }}
      >
        RSD
      </div>

      {/* ── Text Content ── */}
      <div
        className={`absolute bottom-[clamp(50px,8vh,90px)] left-[clamp(30px,6vw,90px)] z-10 text-white transition-opacity duration-[2000ms] delay-[2200ms] ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.title}
            className={`absolute transition-all duration-700 ${
              i === current
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2
              className="max-w-[950px] uppercase tracking-[2px]"
              style={{
                fontFamily: "'Tenor Sans', serif",
                fontSize: "clamp(32px,6vw,88px)",
                fontWeight: 400,
                lineHeight: 1.05,
              }}
            >
              {slide.title}
            </h2>

            <p className="mt-[26px] text-[12px] uppercase tracking-[8px] opacity-85">
              {slide.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;