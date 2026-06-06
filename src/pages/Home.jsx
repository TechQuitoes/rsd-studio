import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Footer from '../components/Footer';

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

  // Preloader removal
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  // Slide interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // GSAP entrance animations
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
    gsap.from('.rsd-monogram', {
      opacity: 0,
      x: -40,
      duration: 2,
      delay: 0.4,
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
    <div ref={containerRef}>
      {/* PRELOADER */}
      <div className={`preloader ${loaded ? 'hide' : ''}`}>
        <h1
          className="font-serif text-white font-normal uppercase"
          style={{ fontSize: '42px', letterSpacing: '18px' }}
        >
          Rakesh Sharma Design
        </h1>
        <p className="mt-[18px] text-white/40 text-[11px] uppercase" style={{ letterSpacing: '8px' }}>
          Architectural Elegance
        </p>
      </div>

      {/* HERO SLIDER */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        {/* Slide images */}
        {SLIDES.map((slide, i) => (
          <img
            key={i}
            src={slide.img}
            alt={slide.heading}
            className={`hero-slide ${i === current ? 'active' : ''}`}
          />
        ))}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.68), rgba(0,0,0,0.2), rgba(0,0,0,0.84))',
          }}
        />

        {/* Film grain */}
        <div className="film-grain" />

        {/* Light leaks */}
        <div
          className="light-leak-1 absolute -top-[250px] -left-[200px] w-[700px] h-[700px] rounded-full pointer-events-none animate-float1"
          style={{
            background: 'radial-gradient(circle, rgba(255,180,120,0.16), transparent 70%)',
            filter: 'blur(80px)',
            zIndex: 2,
          }}
        />
        <div
          className="light-leak-2 absolute -right-[250px] -bottom-[250px] w-[700px] h-[700px] rounded-full pointer-events-none animate-float2"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)',
            filter: 'blur(80px)',
            zIndex: 2,
          }}
        />

        {/* Big RSD watermark */}
        <div
          className="rsd-watermark absolute right-[40px] top-1/2 -translate-y-1/2 z-[5] font-sans font-extrabold leading-[0.8] select-none pointer-events-none text-white/[0.06]"
          style={{ fontSize: '340px', letterSpacing: '-22px' }}
        >
          RSD
        </div>

        {/* Slide text */}
        <div className="hero-overlay-text absolute left-[90px] bottom-[90px] z-[10] text-white max-lg:left-[30px] max-lg:bottom-[60px]">
          {SLIDES.map((slide, i) => (
            <div key={i} className={`text-slide ${i === current ? 'active' : ''}`}>
              <h2
                className="font-serif font-normal uppercase leading-[1.05] max-w-[950px]"
                style={{
                  fontSize: 'clamp(48px, 6vw, 88px)',
                  letterSpacing: '2px',
                }}
              >
                {slide.heading}
              </h2>
              <p
                className="mt-[26px] text-[12px] uppercase opacity-85"
                style={{ letterSpacing: '8px' }}
              >
                {slide.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-[90px] right-[90px] z-[10] flex gap-3 max-lg:right-[30px]">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-[6px] h-[6px] rounded-full transition-all duration-500 cursor-pointer border-none ${
                i === current ? 'bg-white scale-125' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="quote-section min-h-[45vh] bg-travertine-100 flex items-center px-[90px] py-[120px] max-lg:px-[30px] max-lg:py-[80px]">
        <p
          className="quote-text font-serif text-onyx-soft leading-[1.5] max-w-[1000px]"
          style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
        >
          "Simplicity is the ultimate expression of structural sophistication."
        </p>
      </section>

      {/* FOOTER */}
      <Footer theme="light" />
    </div>
  );
}
