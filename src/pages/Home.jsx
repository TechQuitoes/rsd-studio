import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    img: '/assets/arc.jpeg',
    heading: 'Architectural ',
    sub: 'Selected Portfolio Space — 2026',
  },
  {
    img: '/assets/project1.jpeg',
    heading: 'Minimal ',
    sub: 'Private Residence Collection — 2026',
  },
  {
    img: '/assets/luxury.jpeg',
    heading: 'Luxury ',
    sub: 'Editorial Interior Experience — 2026',
  },
  {
    img: '/assets/timeless.jpeg',
    heading: 'Timeless ',
    sub: 'Editorial Interior Experience — 2026',
  },
  {
    img: '/assets/elev.jpeg',
    heading: 'Elevating ',
    sub: 'Editorial Interior Experience — 2026',
  },
];

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [current, setCurrent] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (!loaded) return;
    gsap.from('.rsd-header', {
      y: -100,
      opacity: 0,
      duration: 1.8,
      delay: 0.2,
      ease: 'power4.out',
    });
    gsap.from('.hero-overlay-text', {
      y: 80,
      opacity: 0,
      duration: 2,
      delay: 0.5,
      ease: 'power4.out',
    });
    gsap.from('.rsd-watermark', {
      opacity: 0,
      scale: 0.8,
      duration: 3,
      delay: 0.3,
      ease: 'power4.out',
    });
    gsap.from('.light-leak-1', { opacity: 0, scale: 0.7, duration: 3 });
    gsap.from('.light-leak-2', { opacity: 0, scale: 0.7, duration: 3, delay: 0.3 });
    gsap.from('.quote-text', {
      opacity: 0,
      y: 40,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.quote-section',
        start: 'top 80%',
      },
    });
  }, { dependencies: [loaded], scope: containerRef });

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* PRELOADER */}
     {/* PRELOADER */}
<div
  className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-all duration-1000 ${
    loaded ? "opacity-0 pointer-events-none" : "opacity-100"
  }`}
>
  <h1
    className="preloader-title text-white uppercase font-serif text-center px-6"
    style={{
      fontSize: "clamp(18px, 5vw, 42px)",
      letterSpacing: "0.3em",
    }}
  >
    Rakesh Sharma Designs
  </h1>

  <p
    className="preloader-subtitle mt-4 text-white/40 uppercase text-center"
    style={{
      fontSize: "clamp(9px, 2vw, 11px)",
      letterSpacing: "0.4em",
    }}
  >
    Architectural Elegance
  </p>
</div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-black" style={{ height: '100dvh', minHeight: '600px' }}>
        {/* Slides */}
        {SLIDES.map((slide, i) => (
          <img
            key={i}
            src={slide.img}
            alt={slide.heading}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-[1800ms] ease-out ${
              i === current ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          />
        ))}

        {/* Overlay */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,.65), rgba(0,0,0,.15), rgba(0,0,0,.88))',
          }}
        />

        {/* Film Grain */}
        <div className="film-grain absolute inset-0 z-[3]" />

        {/* Light leaks */}
        <div
          className="light-leak-1 absolute -top-40 -left-40 rounded-full z-[3] pointer-events-none"
          style={{
            width: 'clamp(200px, 40vw, 700px)',
            height: 'clamp(200px, 40vw, 700px)',
            background: 'radial-gradient(circle, rgba(255,180,120,.15), transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="light-leak-2 absolute -right-40 -bottom-40 rounded-full z-[3] pointer-events-none"
          style={{
            width: 'clamp(200px, 40vw, 700px)',
            height: 'clamp(200px, 40vw, 700px)',
            background: 'radial-gradient(circle, rgba(255,255,255,.08), transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* WATERMARK — hidden on very small screens */}
        <div
          className="rsd-watermark absolute right-2 top-1/2 -translate-y-1/2 z-[4] font-black select-none pointer-events-none text-white/[0.05] leading-none hidden sm:block"
          style={{ fontSize: 'clamp(80px, 18vw, 340px)', letterSpacing: '-0.08em' }}
        >
          RSD
        </div>

        {/* TEXT */}
        <div
          className="hero-overlay-text absolute z-10 bottom-24 text-white"
          style={{
            left: 'clamp(20px, 5vw, 80px)',
            right: 'clamp(20px, 5vw, 80px)',
            maxWidth: '1000px',
          }}
        >
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${
                i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute'
              }`}
            >
              <h2
                className="uppercase leading-[1.05] font-serif"
                style={{ fontSize: 'clamp(30px, 9vw, 88px)' }}
              >
                {slide.heading}
              </h2>
              <p
                className="mt-4 uppercase text-white/80"
                style={{ fontSize: 'clamp(9px, 1.8vw, 12px)', letterSpacing: '0.3em' }}
              >
                {slide.sub}
              </p>
            </div>
          ))}
        </div>

       
      </section>

      {/* QUOTE */}
      <section
        className="quote-section bg-travertine-100 min-h-[35vh] flex items-center py-16"
        style={{ padding: 'clamp(48px, 8vw, 128px) clamp(20px, 6vw, 96px)' }}
      >
        <p
          className="quote-text font-serif text-onyx-soft leading-[1.5] max-w-[1100px]"
          style={{ fontSize: 'clamp(20px, 4.5vw, 52px)' }}
        >
          "For over two decades, we&#39;ve been creating interiors that blend
elegance, functionality, and timeless designs – Rakesh Sharma"
        </p>
      </section>

      <Footer theme="light" />
    </div>
  );
}