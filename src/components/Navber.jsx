import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const NAV_LINKS = [
  { label: 'Projects', to: '/project' },
  { label: 'Studio', to: '/studio' },
  { label: 'Journal', to: '/journal' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar({ variant = 'home' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const backdropRef = useRef(null);
  const linksRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const toggleMenu = () => setMenuOpen(prev => !prev);

  useGSAP(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 1.2,
        ease: 'power4.out',
      });
      gsap.to(backdropRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.8,
        ease: 'power2.out',
      });
      gsap.from(linksRef.current?.querySelectorAll('li'), {
        x: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2,
      });
    } else {
      gsap.to(menuRef.current, {
        x: '100%',
        duration: 1,
        ease: 'power4.inOut',
      });
      gsap.to(backdropRef.current, {
        opacity: 0,
        visibility: 'hidden',
        duration: 0.6,
        ease: 'power2.inOut',
      });
    }
  }, [menuOpen]);

  return (
    <>
      {/* BACKDROP */}
      <div
        ref={backdropRef}
        onClick={toggleMenu}
        style={{ opacity: 0, visibility: 'hidden' }}
        className="fixed inset-0 bg-black/45 backdrop-blur-[8px] z-[8000] cursor-pointer"
      />

      {/* RIGHT SLIDE MENU */}
      <nav
        ref={menuRef}
        style={{ transform: 'translateX(100%)' }}
        className="fixed top-0 right-0 w-[520px] max-w-full h-screen bg-travertine-100 z-[9000] px-[70px] py-[140px] overflow-hidden"
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.45] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute -top-[120px] -right-[120px] w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,.05), transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
        {/* Corner decor */}
        <div className="absolute left-[60px] top-[40px] w-[120px] h-[120px] border-t border-l border-black/[0.08] opacity-60" />

        {/* Close button */}
        <button
          onClick={toggleMenu}
          className="absolute top-[38px] right-[42px] w-[54px] h-[54px] bg-onyx-soft text-white rounded-full text-2xl flex items-center justify-center z-10 hover:scale-105 transition-transform duration-700"
          style={{ transition: 'transform 0.7s cubic-bezier(0.19,1,0.22,1)' }}
        >
          ×
        </button>

        {/* Nav links */}
        <ul ref={linksRef} className="relative z-10 flex flex-col gap-[30px] list-none">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={label} className="overflow-hidden">
              <Link
                to={to}
                onClick={toggleMenu}
                className="menu-link font-serif text-onyx-soft no-underline uppercase tracking-[2px]"
                style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 400 }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Menu footer */}
        <div className="absolute bottom-[60px] left-[70px] text-[11px] tracking-[4px] uppercase text-muted-cool leading-[2]">
          studio@rakeshsharmadesign.com<br />
          Indore — India
        </div>
      </nav>

      {/* MAIN HEADER */}
      {isHome ? (
        /* Home page: glass pill header */
        <header
          className="rsd-header-shimmer fixed top-6 left-1/2 -translate-x-1/2 w-[94%] h-[92px] z-[5000] grid grid-cols-[auto_1fr_auto] items-center px-9 rounded-[30px] overflow-hidden"
          style={{
            background: 'rgba(0,0,0,0.38)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Left: RSD monogram */}
          <div className="flex items-center">
            <div
              className="flex items-center gap-0 font-sans font-extrabold uppercase text-white leading-none"
              style={{ letterSpacing: '-2px' }}
            >
              {['R', 'S', 'D'].map((letter, i) => (
                <span
                  key={i}
                  className="text-[62px] select-none"
                  style={{
                    background: 'linear-gradient(to bottom, #ffffff, #d8d8d8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginLeft: i > 0 ? '-10px' : undefined,
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          {/* Center: brand name */}
          <div className="text-center">
            <Link
              to="/"
              className="text-white no-underline font-serif uppercase"
              style={{ fontSize: '28px', letterSpacing: '10px' }}
            >
              Rakesh Sharma Design
            </Link>
          </div>

          {/* Right: menu trigger */}
          <div className="flex justify-end">
            <button
              onClick={toggleMenu}
              className="mobile-trigger w-[62px] h-[62px] rounded-full flex items-center justify-center relative overflow-hidden cursor-pointer"
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              <div className="flex flex-col gap-[5px] z-10">
                <span className="block w-[22px] h-px bg-white" />
                <span className="block w-[22px] h-px bg-white" />
              </div>
            </button>
          </div>
        </header>
      ) : (
        /* Other pages: simpler nav */
        <nav
           className="fixed top-0 left-0 w-full flex justify-between items-center z-[1000] transition-all duration-500 bg-black"
  style={{
    padding: '30px 4vw',
    backgroundColor: '#0a1f16', // same as Studio green theme
    
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  }}
  id="mainNav"

        >
          <Link
            to="/"
            className="text-[14px] text-white uppercase font-bold no-underline transition-colors duration-500"
            style={{ letterSpacing: '0.35em', color: variant === 'dark' ? '#ffffff' : '#ffffff' }}
          >
            Rakesh Sharma Designs
          </Link>
          <button
            onClick={toggleMenu}
            className="flex flex-col gap-[5px] cursor-pointer bg-transparent border-none p-2"
          >
            <span
              className="block w-[22px] h-px transition-colors duration-500"
              style={{ background: variant === 'dark' ? '#ffffff' : '#ffffff' }}
            />
            <span
              className="block w-[22px] h-px transition-colors duration-500"
              style={{ background: variant === 'dark' ? '#ffffff' : '#ffffff' }}
            />
          </button>
        </nav>
      )}
    </>
  );
}
