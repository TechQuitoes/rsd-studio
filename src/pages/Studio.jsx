import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import Marquee from '../components/UI/Marquee';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'offices', label: 'Offices' },
];

const PANELS = {
  residential: {
    heading: 'Private Sanctums\n& High Havens',
    description:
      'A careful study of highly tailored layout schemes built for custom living boundaries. Every home layout targets material contrast.',
    images: [
      { src: 'assets/Res1.jpeg', title: 'Malibu Coast Domain', cat: 'Residential', offset: false },
      { src: 'assets/Res2.jpeg', title: 'Harper Avenue Lounge', cat: 'Residential', offset: true },
      { src: 'assets/Res3.jpeg', title: 'Desert Sanctuary Villa', cat: 'Residential', offset: false },
      { src: 'assets/Res4.jpeg', title: 'Hillcrest Estate Salon', cat: 'Residential', offset: true },
    ],
    extra: [
  {
    src: '/assets/re1.jpeg',
    title: 'Residential 01',
    cat: 'Residential',
  },
  {
    src: '/assets/re2.jpeg',
    title: 'Residential 02',
    cat: 'Residential',
  },
  {
    src: '/assets/re3.jpeg',
    title: 'Residential 03',
    cat: 'Residential',
  },
   { src: 'assets/re4.jpeg', title: 'Hillcrest Estate Salon', cat: 'Residential'},
    { src: 'assets/re5.jpeg', title: 'Hillcrest Estate Salon', cat: 'Residential' },
    { src: 'assets/re6.jpeg', title: 'Hillcrest Estate Salon', cat: 'Residential', },
    { src: 'assets/re7.jpeg', title: 'Hillcrest Estate Salon', cat: 'Residential' },
    { src: 'assets/re8.jpeg', title: 'Hillcrest Estate Salon', cat: 'Residential',  },
    { src: 'assets/re9.jpeg', title: 'Hillcrest Estate Salon', cat: 'Residential',  },
    { src: 'assets/re10.jpeg', title: 'Hillcrest Estate Salon', cat: 'Residential',  },
    { src: 'assets/re11.jpeg', title: 'Hillcrest Estate Salon', cat: 'Residential', },
    { src: 'assets/re12.jpeg', title: 'Hillcrest Estate Salon', cat: 'Residential', },
    { src: 'assets/re13.jpeg', title: 'Hillcrest Estate Salon', cat: 'Residential', },
    { src: 'assets/re14.jpeg', title: 'Hillcrest Estate Salon', cat: 'Residential', },
    { src: 'assets/re15.jpeg', title: 'Hillcrest Estate Salon', cat: 'Residential',  },
    { src: 'assets/re16.jpeg', title: 'Hillcrest Estate Salon', cat: 'Residential',  },
    


          
    


          

]
  },
  commercial: {
    heading: 'Immersive Venues\n& Social Assets',
    description:
      'Scaling high-impact sensory architecture for the public landscape. These installations focus entirely on community interaction dynamics.',
    images: [
      { src: 'assets/Comm1.jpeg', title: 'The Bureau Collective', cat: 'Commercial Space', offset: false },
      { src: '/assets/co1.jpeg', title: 'Aura Social Club Lounge', cat: 'Hospitality Hub', },
      { src: 'assets/comm3.jpeg', title: 'Monolith Boutique Showroom', cat: 'Retail Exhibit', offset: false },
      { src: '/assets/co2.jpeg', title: 'Verdant Concept Lounge', cat: 'Commercial Interior',  },
    ],
    extra: [
  
  {
    src: '/assets/co4.jpeg',
    title: 'Commercial Space 02',
    cat: 'Commercial',
  },
  {
    src: '/assets/co5.jpeg',
    title: 'Commercial Space 03',
    cat: 'Commercial',
  },
  { src: 'assets/co6.jpeg', title: 'Hillcrest Estate Salon', cat: 'Commercial'},
  { src: 'assets/co7.jpeg', title: 'Hillcrest Estate Salon', cat: 'Commercial' },
 

          
    


          

]
  },
  offices: {
    heading: 'Monolithic Facades\n& Workplace Horizons',
    description:
      'Shaping external elevations and focused corporate workspaces. This track demonstrates how structural masonry grids shield corporate culture.',
    images: [
      { src: 'assets/offi1.jpeg', title: 'Onyx Executive HQ', cat: 'Office Architecture', offset: false },
      { src: 'assets/offi2.jpeg', title: 'Travertine Structural Facade', cat: 'Architectural Elevation', offset: true },
      { src: 'assets/offi3.jpeg', title: 'Monolith Conference Wing', cat: 'Office Workspace', offset: false },
      { src: 'assets/offi4.jpeg', title: 'Fluted Timber Pavilion Facade', cat: 'Architectural Elevation', offset: true },
    ],
     extra: [
  {
    src: '/assets/offi5.jpeg',
    title: 'Commercial Space 01',
    cat: 'Offices',
  },
  {
    src: '/assets/offi7.jpeg',
    title: 'Commercial Space 02',
    cat: 'Offices',
  },
  {
    src: '/assets/offi6.jpeg',
    title: 'Commercial Space 03',
    cat: 'Offices',
  },
  

          
    


          

]
  },
};

const INSTAGRAM_IMAGES = [
  'assets/partner1.jpeg',
  'assets/partner2.jpeg',
  'assets/partner3.jpeg',
  'assets/timeless.jpeg',
];

export default function Studio() {
  const [activeTab, setActiveTab] = useState('residential');
  const [showMore, setShowMore] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);
  const tabsNavRef = useRef(null);
  const tabRefs = useRef({});
  const drawerRef = useRef(null);

  const { theme, setTheme } = useTheme();
  const bgColor = theme;
  const panel = PANELS[activeTab];

  useEffect(() => {
    setTheme('#0a1f16');
  }, [setTheme]);

  /* ── responsive breakpoint tracker ── */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = e => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* ── pill positioning ── */
  const updatePill = tabId => {
    const navEl = tabsNavRef.current;
    const tabEl = tabRefs.current[tabId];
    if (!navEl || !tabEl) return;
    const navRect = navEl.getBoundingClientRect();
    const tabRect = tabEl.getBoundingClientRect();
    setPillStyle({ left: tabRect.left - navRect.left, width: tabRect.width });
  };

  useEffect(() => {
    const timer = setTimeout(() => updatePill(activeTab), 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => updatePill(activeTab);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  const handleTabChange = tabId => {
    if (tabId === activeTab) return;
    setActiveTab(tabId);
    setShowMore(false);
  };

  /* ── GSAP parallax ── */
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

    gsap.from('.marquee-h2', {
      opacity: 0,
      y: 30,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, { scope: containerRef });

  useGSAP(() => {
    const panelEl = containerRef.current?.querySelector('.active-gallery-panel');
    if (!panelEl) return;
    gsap.fromTo(panelEl, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
  }, [activeTab]);

  useGSAP(() => {
    if (!drawerRef.current) return;
    if (showMore) {
      gsap.fromTo(drawerRef.current, { opacity: 0, height: 0 }, {
        opacity: 1, height: 'auto', duration: 0.8, ease: 'power2.out',
      });
    } else {
      gsap.to(drawerRef.current, { opacity: 0, height: 0, duration: 0.5, ease: 'power2.inOut' });
    }
    ScrollTrigger.refresh();
  }, [showMore]);

  /* ── horizontal padding shared by main canvas and instagram strip ── */
useGSAP(() => {
  const tl = gsap.timeline();

  tl.to("#backdrop", {
    scaleX: 1,
    duration: 1.8,
    ease: "power4.out",
  })

  .to(
    ".banner-heading",
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
    },
    "-=0.8"
  );

}, { scope: containerRef });
const hPad = 'clamp(24px, 5vw, 72px)';
  return (
    <div ref={containerRef} style={{ '--bg-canvas': bgColor }}>

      {/* ─── STICKY HERO ─────────────────────────────────────────── */}
      <div
  className={`
    w-full overflow-hidden bg-white/70 z-[1]
    ${isMobile ? 'relative h-auto' : 'sticky top-0 h-screen'}
  `}
>
        {/* Header text row */}
        <div
  className="
    absolute top-1/2 left-0 w-full z-[2]
    grid grid-cols-1 md:grid-cols-2
    gap-2
    px-6 md:px-12 lg:px-16
    pt-5 pb-5
       to-transparent
  "
>
   
  <div
  
    id="backdrop"
    className="
      absolute inset-0
      bg-white/70
      origin-left
      scale-x-0
      z-0
    "
  />

  <h2
    className="banner-heading relative z-10 font-sans font-light  leading-[1.1] opacity-0 translate-y-8 pl-2"
    style={{
      fontSize: 'clamp(16px, 3.5vw, 56px)',
      letterSpacing: '0.03em',
    }}
  >
       Designed   For   Life
  </h2>

  <h2
    className="banner-heading relative z-10 font-sans font-light leading-[1.1] opacity-0 translate-y-8"
    style={{
      fontSize: 'clamp(16px, 3.5vw, 56px)',
      letterSpacing: '0.03em',
      textAlign: isMobile ? 'left' : 'right',
    }}
  >
    Built   For   Legacy
  </h2>
</div>



        {/* Split hero images */}
        <div
  className={`grid grid-cols-2 w-full ${
    isMobile ? 'h-[280px]' : 'h-screen'
  }`}
>
          {['/assets/studio1.jpeg', '/assets/studio2.jpeg'].map((src, i) => (
            <div key={i} className="relative w-full h-full overflow-hidden">
              <img
                src={src}
                alt="Studio interior"
                className="hero-pane-img w-full object-cover"
                style={{ height: '135%', marginTop: '-17.5%' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ─── SCROLLING CANVAS ────────────────────────────────────── */}
      <main
        id="mainCanvas"
        className="relative z-[2] text-white shadow-[0_-20px_40px_rgba(0,0,0,0.4)] transition-colors duration-700"
        style={{
          backgroundColor: bgColor,
          display: 'flex',
          flexDirection: 'column',
          /* consistent vertical gap between every section */
          gap: 'clamp(48px, 8vw, 90px)',
          paddingTop: 'clamp(48px, 8vw, 90px)',
          paddingBottom: 'clamp(48px, 8vw, 90px)',
          paddingLeft: hPad,
          paddingRight: hPad,
        }}
      >

        {/* ── Studio manifesto ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '200px 1fr',
            gap: 'clamp(20px, 5vw, 56px)',
            alignItems: 'start',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: 'clamp(40px, 6vw, 72px)',
          }}
        >
          <div
            className="text-[10px] uppercase text-white/60 font-medium"
            style={{ letterSpacing: '0.25em', paddingTop: '4px' }}
          >
            The Manifesto
          </div>
          <p
            className="font-sans font-light text-white"
            style={{
              fontSize: 'clamp(15px, 1.8vw, 26px)',
              lineHeight: 1.35,
              margin: 0,
            }}
          >
            We design spaces that balance geometric exactness with functional weight.
            Our studio shapes architectures that hold lasting gravity.
          </p>
        </div>

        {/* ── STICKY TABS ── */}
        <div
          className="sticky z-50 pointer-events-none"
          style={{ top: isMobile ? '58px' : '88px' }}
        >
          <div
            className="overflow-x-auto pointer-events-auto"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div
              ref={tabsNavRef}
              className="relative flex gap-[5px] w-max"
              style={{
                padding: '5px',
                borderRadius: '40px',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 16px 36px rgba(0,0,0,0.18)',
              }}
            >
              {/* Sliding pill */}
              <div
                className="tab-pill absolute top-[5px] h-[calc(100%-10px)] bg-white z-[1] pointer-events-none transition-all duration-300"
                style={{
                  left: pillStyle.left + 'px',
                  width: pillStyle.width + 'px',
                  borderRadius: '30px',
                }}
              />
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  ref={el => (tabRefs.current[tab.id] = el)}
                  onClick={() => handleTabChange(tab.id)}
                  className="relative z-[2] bg-transparent border-none cursor-pointer transition-all duration-300"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    borderRadius: '30px',
                    padding: isMobile ? '9px 16px' : '11px 26px',
                    whiteSpace: 'nowrap',
                    color: activeTab === tab.id ? '#000' : 'rgba(255,255,255,0.5)',
                    transition: 'color 0.3s',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── GALLERY PANEL ── */}
        <div className="active-gallery-panel flex flex-col" style={{ gap: 'clamp(48px, 3vw, 50px)' }}>

          {/* Panel heading + description */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 'clamp(20px, 5vw, 72px)',
              alignItems: 'start',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              paddingBottom: 'clamp(32px, 5vw, 56px)',
            }}
          >
            <h3
              className="font-sans font-light uppercase text-white"
              style={{
                fontSize: 'clamp(20px, 3.2vw, 42px)',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                margin: 0,
              }}
            >
              {panel.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </h3>
            <p
              className="font-sans font-light text-white/70"
              style={{
                fontSize: 'clamp(13px, 1.1vw, 15px)',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {panel.description}
            </p>
          </div>

          {/* Image grid rows */}
          <div className="flex flex-col" style={{ gap: 'clamp(32px, 6vw, 80px)' }}>

            {/* Row 1 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: 'clamp(16px, 3vw, 40px)',
                alignItems: 'start',
              }}
            >
              {panel.images.slice(0, 2).map((img, i) => (
                <ImageCard key={i} img={img} isMobile={isMobile} />
              ))}
            </div>

            {/* Row 2 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: 'clamp(16px, 3vw, 40px)',
                alignItems: 'start',
              }}
            >
              {panel.images.slice(2, 4).map((img, i) => (
                <ImageCard key={i} img={img} isMobile={isMobile} />
              ))}
            </div>

            {/* Expandable drawer */}
            <div
  ref={drawerRef}
  style={{
    height: 0,
    overflow: 'hidden',
    opacity: 0,
  }}
>
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: 'clamp(16px,3vw,40px)',
    }}
  >
    {panel.extra?.map((item, index) => (
      <div
        key={index}
        className="graphic-panel parallax-container relative overflow-hidden"
        style={{
          aspectRatio: '3/4',
          marginTop:
            !isMobile && index % 2 !== 0
              ? '72px'
              : 0,
        }}
      >
        <div
          className="w-full overflow-hidden"
          style={{
            height: '135%',
            marginTop: '-17.5%',
          }}
        >
          <img
            src={item.src}
            alt={item.title}
            className="parallax-img w-full h-full object-cover"
          />
        </div>

        <div className="panel-meta-overlay">
          <h4
            className="font-light uppercase text-white"
            style={{
              fontSize: 'clamp(13px,1.2vw,16px)',
              marginBottom: '4px',
            }}
          >
            {item.title}
          </h4>

          <p
            className="uppercase text-white/60"
            style={{
              fontSize: '10px',
              letterSpacing: '1.5px',
            }}
          >
            {item.cat}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
          </div>
        </div>

        {/* ── Toggle button ── */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowMore(prev => !prev)}
            className="bg-transparent text-white cursor-pointer transition-all duration-300 hover:bg-white hover:text-black"
            style={{
              border: '1px solid rgba(255,255,255,0.15)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 500,
              padding: isMobile ? '13px 26px' : '14px 38px',
            }}
          >
            {showMore ? 'Collapse Gallery' : 'Show More Elements'}
          </button>
        </div>

        {/* ── Instagram ticker ── full-bleed strip ── */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: 'clamp(36px, 5vw, 60px)',
            /* pull it edge-to-edge against main canvas padding */
            width: `calc(100% + 2 * ${hPad})`,
            marginLeft: `calc(-1 * ${hPad})`,
            overflow: 'hidden',
          }}
        >
          <p
            className="uppercase text-white/50"
            style={{
              fontSize: '10px',
              letterSpacing: '0.3em',
              marginBottom: '24px',
              paddingLeft: hPad,
            }}
          >
            Instagram / @RakeshSharmaDesigns
          </p>
          <Marquee
            items={INSTAGRAM_IMAGES.map(src => (
              <div
                key={src}
                className="overflow-hidden flex-shrink-0"
                style={{
                  width: 'clamp(180px, 28vw, 300px)',
                  height: 'clamp(180px, 28vw, 300px)',
                  marginRight: '12px',
                }}
              >
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

/* ── Sub-component: image card with parallax ── */
function ImageCard({ img, isMobile }) {
  return (
    <div
      className="graphic-panel parallax-container relative overflow-hidden"
      style={{
        aspectRatio: '3/4',
        /* offset only on desktop, and only for right-column cards */
        marginTop: !isMobile && img.offset ? '72px' : 0,
        width: '100%',
      }}
    >
      <div className="w-full overflow-hidden" style={{ height: '135%', marginTop: '-17.5%' }}>
        <img
          src={img.src}
          alt={img.title}
          className="parallax-img w-full h-full object-cover"
        />
      </div>
      <div className="panel-meta-overlay">
        <h4
          className="font-light uppercase text-white"
          style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', marginBottom: '4px' }}
        >
          {img.title}
        </h4>
        <p
          className="uppercase text-white/60"
          style={{ fontSize: '10px', letterSpacing: '1.5px' }}
        >
          {img.cat}
        </p>
      </div>
    </div>
  );
}