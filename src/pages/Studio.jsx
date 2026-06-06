import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import Marquee from '../components/UI/Marquee';

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'offices', label: 'Offices & Elevation' },
];

const PANELS = {
  residential: {
    heading: 'Private Sanctums\n& High Havens',
    description:
      'A careful study of highly tailored layout schemes built for custom living boundaries. Every home layout targets material contrast.',
    images: [
      {
        src: 'assets/Res1.jpeg',
        title: 'Malibu Coast Domain',
        cat: 'Residential',
        offset: false,
      },
      {
        src: 'assets/Res2.jpeg',
        title: 'Harper Avenue Lounge',
        cat: 'Residential',
        offset: true,
      },
      {
        src: 'assets/Res3.jpeg',
        title: 'Desert Sanctuary Villa',
        cat: 'Residential',
        offset: false,
      },
      {
        src: 'assets/Res4.jpeg',
        title: 'Hillcrest Estate Salon',
        cat: 'Residential',
        offset: true,
      },
    ],
    extra:
      'assets/Res5.jpeg',
  },
  commercial: {
    heading: 'Immersive Venues\n& Social Assets',
    description:
      'Scaling high-impact sensory architecture for the public landscape. These installations focus entirely on community interaction dynamics.',
    images: [
      {
        src: 'assets/Comm1.jpeg',
        title: 'The Bureau Collective',
        cat: 'Commercial Space',
        offset: false,
      },
      {
        src: 'assets/comm2.jpeg',
        title: 'Aura Social Club Lounge',
        cat: 'Hospitality Hub',
        offset: true,
      },
      {
        src: 'assets/comm3.jpeg',
        title: 'Monolith Boutique Showroom',
        cat: 'Retail Exhibit',
        offset: false,
      },
      {
        src: 'assets/comm4.jpeg',
        title: 'Verdant Concept Lounge',
        cat: 'Commercial Interior',
        offset: true,
      },
    ],
    extra:
      'assets/comm5.jpeg',
  },
  offices: {
    heading: 'Monolithic Facades\n& Workplace Horizons',
    description:
      'Shaping external elevations and focused corporate workspaces. This track demonstrates how structural masonry grids shield corporate culture.',
    images: [
      {
        src: 'assets/offi1.jpeg',
        title: 'Onyx Executive HQ',
        cat: 'Office Architecture',
        offset: false,
      },
      {
        src: 'assets/offi2.jpeg',
        title: 'Travertine Structural Facade',
        cat: 'Architectural Elevation',
        offset: true,
      },
      {
        src: 'assets/offi3.jpeg',
        title: 'Monolith Conference Wing',
        cat: 'Office Workspace',
        offset: false,
      },
      {
        src: 'assets/offi4.jpeg',
        title: 'Fluted Timber Pavilion Facade',
        cat: 'Architectural Elevation',
        offset: true,
      },
    ],
    extra:
      'assets/offi5.jpeg',
    extraTitle: 'The Glass Horizon Villa Shell',
    extraCat: 'Architectural Elevation',
  },
};

const INSTAGRAM_IMAGES = [
  'assets/partner1.jpeg',
  'assets/partner2.jpeg',
  'assets/partner3.jpeg',
  'assets/timeless.jpeg',
];

const THEME_COLORS = {
  green: '#0a1f16',
  purple: '#1a0f2b',
  black: '#080808',
};

export default function Studio() {
  const [activeTab, setActiveTab] = useState('residential');
  const [showMore, setShowMore] = useState(false);
  const [theme, setTheme] = useState('green');
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  const containerRef = useRef(null);
  const tabsNavRef = useRef(null);
  const tabRefs = useRef({});
  const drawerRef = useRef(null);

  const bgColor = THEME_COLORS[theme];
  const panel = PANELS[activeTab];

  // Update pill position
  const updatePill = (tabId) => {
    const navEl = tabsNavRef.current;
    const tabEl = tabRefs.current[tabId];
    if (!navEl || !tabEl) return;
    const navRect = navEl.getBoundingClientRect();
    const tabRect = tabEl.getBoundingClientRect();
    setPillStyle({
      left: tabRect.left - navRect.left,
      width: tabRect.width,
    });
  };

  useEffect(() => {
    // Small delay to ensure DOM is painted
    const timer = setTimeout(() => updatePill(activeTab), 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => updatePill(activeTab);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;
    setActiveTab(tabId);
    setShowMore(false);
  };

  // Parallax on images
  useGSAP(() => {
    const parallaxItems = containerRef.current?.querySelectorAll('.parallax-container');
    parallaxItems?.forEach(container => {
      const img = container.querySelector('.parallax-img');
      if (!img) return;
      gsap.fromTo(
        img,
        { yPercent: -20 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    // Nav dark on scroll into canvas
    ScrollTrigger.create({
      trigger: '#mainCanvas',
      start: 'top 80px',
      onEnter: () => {
        const nav = document.getElementById('mainNav');
        if (nav) nav.style.background = 'rgba(10,31,22,0.95)';
      },
      onLeaveBack: () => {
        const nav = document.getElementById('mainNav');
        if (nav) nav.style.background = '#0a1f16';
      },
    });

    // Hero image parallax
    gsap.to('.hero-pane-img', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: '.luxury-hero-container',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Header grid text entrance
    gsap.from('.marquee-h2', {
      opacity: 0,
      y: 30,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, { scope: containerRef });

  // Tab panel animation
  useGSAP(() => {
    const panelEl = containerRef.current?.querySelector('.active-gallery-panel');
    if (!panelEl) return;
    gsap.fromTo(panelEl, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
  }, [activeTab]);

  // Drawer animation
  useGSAP(() => {
    if (!drawerRef.current) return;
    if (showMore) {
      gsap.fromTo(drawerRef.current, { opacity: 0, height: 0 }, {
        opacity: 1,
        height: 'auto',
        duration: 0.8,
        ease: 'power2.out',
      });
    } else {
      gsap.to(drawerRef.current, {
        opacity: 0,
        height: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }
    ScrollTrigger.refresh();
  }, [showMore]);

  return (
    <div
      ref={containerRef}
      style={{ '--bg-canvas': bgColor }}
    >
      {/* STICKY HERO (white bg) */}
      <div className="luxury-hero-container sticky top-0 w-full h-screen z-[1] overflow-hidden bg-white pt-[85px]">
        {/* Header grid */}
        <div className="marquee-header-grid grid grid-cols-2 px-[5vw] py-[40px] pb-[20px] border-b border-black/[0.06]">
          <h2
            className="marquee-h2 font-sans font-light uppercase leading-[1.1]"
            style={{ fontSize: 'clamp(24px, 3.8vw, 64px)', letterSpacing: '-0.01em' }}
          >
            Interiors Portfolio |
          </h2>
          <h2
            className="marquee-h2 font-sans font-light uppercase leading-[1.1] text-right"
            style={{ fontSize: 'clamp(24px, 3.8vw, 64px)', letterSpacing: '-0.02em' }}
          >
            Exhibition | Showcase
          </h2>
        </div>

        {/* Split hero images */}
        <div className="grid grid-cols-2 w-full" style={{ height: 'calc(100vh - 185px)' }}>
          <div className="relative w-full h-full overflow-hidden">
            <img
              src="/assets/studio1.jpeg"
              alt="Studio interior"
              className="hero-pane-img w-full h-[135%] object-cover"
              style={{ marginTop: '-17.5%' }}
            />
          </div>
          <div className="relative w-full h-full overflow-hidden">
            <img
              src="/assets/studio2.jpeg"
              alt="Studio interior"
              className="hero-pane-img w-full h-[135%] object-cover"
              style={{ marginTop: '-17.5%' }}
            />
          </div>
        </div>
      </div>

      {/* SCROLLING CONTENT CANVAS */}
      <main
        id="mainCanvas"
        className="relative z-[2] text-white flex flex-col gap-[100px] px-[5vw] py-[120px] pb-[100px] shadow-[0_-20px_40px_rgba(0,0,0,0.4)] transition-colors duration-700 max-lg:gap-[60px]"
        style={{ backgroundColor: bgColor }}
      >
        {/* Theme swatches */}
        <div className="absolute top-8 right-[5vw] flex gap-3 items-center">
          {Object.entries(THEME_COLORS).map(([key, color]) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              title={key}
              className={`swatch w-[18px] h-[18px] rounded-full border-2 transition-transform ${
                theme === key ? 'scale-[1.15] border-white' : 'border-transparent'
              }`}
              style={{
                backgroundColor: color,
                boxShadow: '0 0 0 1px rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>

        {/* Studio intro */}
        <div className="grid grid-cols-[1fr_1.5fr] gap-[60px] border-b border-white/[0.08] pb-[80px] mb-5 max-lg:grid-cols-1 max-lg:gap-10">
          <div
            className="text-[11px] uppercase text-white/60 font-medium"
            style={{ letterSpacing: '0.25em' }}
          >
            The Manifesto
          </div>
          <div
            className="font-sans font-light leading-[1.4] text-white"
            style={{ fontSize: 'clamp(18px, 2.2vw, 32px)' }}
          >
            We design spaces that balance geometric exactness with functional weight. Our studio shapes architectures that hold lasting gravity.
          </div>
        </div>

        {/* Sticky tabs */}
        <div className="sticky top-[100px] z-50 w-full py-[15px] mb-5 pointer-events-none">
          <div
            ref={tabsNavRef}
            className="relative w-max flex gap-[10px] p-[6px] rounded-[40px] pointer-events-auto shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Sliding pill */}
            <div
              className="tab-pill absolute top-[6px] h-[calc(100%-12px)] bg-white rounded-[30px] z-[1] pointer-events-none"
              style={{ left: pillStyle.left + 'px', width: pillStyle.width + 'px' }}
            />
            {TABS.map(tab => (
              <button
                key={tab.id}
                ref={el => (tabRefs.current[tab.id] = el)}
                onClick={() => handleTabChange(tab.id)}
                className={`relative z-[2] text-[11px] uppercase text-black font-medium py-[12px] px-[28px] rounded-[30px] bg-transparent border-none cursor-pointer transition-all duration-300 ${
                  activeTab === tab.id ? 'opacity-100 text-black' : 'opacity-50'
                }`}
                style={{ letterSpacing: '0.2em' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery panel */}
        <div className="active-gallery-panel flex flex-col gap-[100px]">
          {/* Manifesto block */}
          <div className="grid grid-cols-[1.2fr_0.8fr] gap-[80px] border-b border-white/[0.08] pb-[60px] max-lg:grid-cols-1 max-lg:gap-10">
            <h3
              className="font-sans font-light uppercase leading-[1.15] text-white"
              style={{ fontSize: 'clamp(24px, 3.5vw, 46px)', letterSpacing: '-0.01em' }}
            >
              {panel.heading.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h3>
            <p className="text-[16px] leading-[1.75] font-light text-white/75 self-end">
              {panel.description}
            </p>
          </div>

          {/* Image grid rows */}
          <div className="flex flex-col gap-[100px]">
            {/* Row 1 */}
            <div className="flex gap-[40px] w-full max-lg:flex-col">
              {panel.images.slice(0, 2).map((img, i) => (
                <div
                  key={i}
                  className="graphic-panel parallax-container relative overflow-hidden w-1/2 max-lg:w-full"
                  style={{ aspectRatio: '3/4', marginTop: img.offset ? '80px' : 0 }}
                >
                  <div className="w-full h-[135%] overflow-hidden" style={{ marginTop: '-17.5%' }}>
                    <img
                      src={img.src}
                      alt={img.title}
                      className="parallax-img w-full h-full object-cover"
                    />
                  </div>
                  <div className="panel-meta-overlay">
                    <h4 className="text-[18px] font-light uppercase mb-[5px] text-white">{img.title}</h4>
                    <p className="text-[11px] uppercase text-white/60" style={{ letterSpacing: '1.5px' }}>{img.cat}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex gap-[40px] w-full max-lg:flex-col">
              {panel.images.slice(2, 4).map((img, i) => (
                <div
                  key={i}
                  className="graphic-panel parallax-container relative overflow-hidden w-1/2 max-lg:w-full"
                  style={{ aspectRatio: '3/4', marginTop: img.offset ? '80px' : 0 }}
                >
                  <div className="w-full h-[135%] overflow-hidden" style={{ marginTop: '-17.5%' }}>
                    <img
                      src={img.src}
                      alt={img.title}
                      className="parallax-img w-full h-full object-cover"
                    />
                  </div>
                  <div className="panel-meta-overlay">
                    <h4 className="text-[18px] font-light uppercase mb-[5px] text-white">{img.title}</h4>
                    <p className="text-[11px] uppercase text-white/60" style={{ letterSpacing: '1.5px' }}>{img.cat}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Expandable drawer */}
            <div
              ref={drawerRef}
              style={{ height: 0, overflow: 'hidden', opacity: 0 }}
            >
              <div className="graphic-panel parallax-container relative overflow-hidden w-full" style={{ aspectRatio: '16/7' }}>
                <div className="w-full h-[135%] overflow-hidden" style={{ marginTop: '-17.5%' }}>
                  <img
                    src={panel.extra}
                    alt="Gallery extra"
                    className="parallax-img w-full h-full object-cover"
                  />
                </div>
                {panel.extraTitle && (
                  <div className="panel-meta-overlay">
                    <h4 className="text-[18px] font-light uppercase mb-[5px] text-white">{panel.extraTitle}</h4>
                    <p className="text-[11px] uppercase text-white/60" style={{ letterSpacing: '1.5px' }}>{panel.extraCat}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Toggle button */}
        <div className="flex justify-center pt-5">
          <button
            onClick={() => setShowMore(prev => !prev)}
            className="bg-transparent border border-white/[0.08] text-white py-[16px] px-[40px] text-[11px] uppercase font-medium cursor-pointer transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
            style={{ letterSpacing: '0.2em' }}
          >
            {showMore ? 'Collapse Gallery' : 'Show More Elements'}
          </button>
        </div>

        {/* Instagram ticker */}
        <div
          className="w-screen -ml-[5vw] border-t border-white/[0.08] pt-[60px] overflow-hidden"
        >
          <h3 className="text-[11px] uppercase text-white/50 mb-[30px] pl-[5vw]" style={{ letterSpacing: '0.3em' }}>
            Instagram / @RakeshSharmaDesigns
          </h3>
          <Marquee
            items={INSTAGRAM_IMAGES.map(src => (
              <div className="w-[320px] h-[320px] overflow-hidden mr-6 flex-shrink-0">
                <img
                  src={src}
                  alt="Instagram"
                  className="w-full h-full object-cover transition-transform duration-700 brightness-[0.85] hover:scale-[1.04] hover:brightness-100"
                />
              </div>
            ))}
          />
        </div>
      </main>

      <div className="relative z-[10]">
  <Footer theme="" />
</div>
    </div>
  );
}
