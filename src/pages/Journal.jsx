import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import Marquee from '../components/UI/Marquee';

gsap.registerPlugin(ScrollTrigger);

const PARTNER_IMAGES = [
  '/assets/partner1.jpeg',
  '/assets/partner2.jpeg',
  '/assets/partner3.jpeg',
  '/assets/timeless.jpeg',
];

export default function Journal() {
  const containerRef = useRef(null);
//   const parallaxRef = useRef(null);

  useGSAP(() => {
    // Hero entrance
    gsap.from('#heroImgPane img', {
      scale: 1.15,
      duration: 1.8,
      ease: 'power3.out',
    });
    gsap.from('#heroTextPane > *', {
      opacity: 0,
      x: 40,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out',
    });

    // Story text reveal
    gsap.from('#storyCoreText', {
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#storyCoreText',
        start: 'top 85%',
      },
    });

    // Profile cards stagger reveal
    gsap.utils.toArray('.profile-card').forEach(card => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        }
      );
    });

    // Parallax divider scrub
    gsap.fromTo(
      '#parallaxDivider img',
      { yPercent: -15 },
      {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '#parallaxDivider',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    // Brand tile reveals
    gsap.utils.toArray('.brand-tile').forEach(tile => {
      gsap.fromTo(
        tile,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tile,
            start: 'top 85%',
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-travertine-200 font-sans">
      {/* SECTION 1: SPLIT HERO */}
      <header
        className="grid grid-cols-[1.1fr_1fr] w-full overflow-hidden max-lg:grid-cols-1"
        style={{ height: '90vh', backgroundColor: '#3d2c25', color: '#ffffff' }}
      >
        <div id="heroImgPane" className="w-full h-full overflow-hidden max-lg:h-[45vh]">
          <img
            src="/assets/rakesh_sonali03.jpg"
            alt="Studio Entrance"
            className="w-full h-full object-cover scale-[1.05]"
          />
        </div>
        <div
          id="heroTextPane"
          className="flex flex-col justify-center px-[8vw] pt-[80px] max-lg:px-[5vw] max-lg:py-[80px]"
        >
          <h1
            className="font-serif font-normal leading-[1.15] mb-[10px] text-white"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
          >
            Rakesh Sharma Designs
          </h1>
          <h2
            className="font-serif italic font-normal opacity-90 mb-[25px] text-white"
            style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}
          >
            One Shared Mindset, Absolute Architectural Focus.
          </h2>
          <p className="text-[14px] leading-[1.75] opacity-80 font-light mb-[35px] max-w-[520px] text-white">
            We trace residential spaces down to the structural core. Our workflow layers
            deliberate details over pristine outlines—bridging unyielding architectural
            principles with the deep, expressive inspirations of modern luxury design.
          </p>
          <button
            className="w-max bg-transparent border border-white text-white px-[30px] py-[12px] text-[11px] uppercase font-medium cursor-pointer transition-all duration-300 hover:bg-white hover:text-black"
            style={{ letterSpacing: '0.2em' }}
          >
            Collaborate With Us
          </button>
        </div>
      </header>

      {/* SECTION 2: STORY & FOUNDER PROFILES */}
      <section className="max-w-[1400px] mx-auto px-[6vw] py-[120px] grid grid-cols-[1fr_1.2fr] gap-[6vw] max-lg:grid-cols-1 max-lg:gap-[50px]">
        <div id="storyCoreText">
          <h3
            className="font-serif font-normal italic mb-[30px] text-onyx-soft"
            style={{ fontSize: '36px' }}
          >
            Our Core Beliefs
          </h3>
          <p className="text-[15px] leading-[1.8] text-onyx-soft/85 font-light">
            Rakesh Sharma Designs stands on a powerful balance of professional engineering
            insight and high-end design instincts. Rakesh transforms spatial limits into
            striking interior plans, while Sonali translates fine art, textures, and global
            movements into cohesive, layered narratives.
          </p>
          <p className="text-[15px] leading-[1.8] text-onyx-soft/85 font-light mt-5">
            Together, they ensure every property selection tells a story. From stone
            selection down to the custom joinery lines, their dual process results in
            immersive interiors built with lasting precision.
          </p>
        </div>

        {/* Founder profiles */}
        <div className="grid grid-cols-2 gap-[30px] max-sm:grid-cols-1">
          {[
            {
              name: 'Rakesh Sharma',
              role: 'Interior Design Consultant',
              bio: 'Rakesh manages structural layouts and spatial blueprints, ensuring raw masonry elements interact beautifully with light and alignment bounds.',
              img: '/assets/rakesh011.jpg',
              offset: false,
            },
            {
              name: 'Sonali Sharma',
              role: 'Design Inspiration & Director',
              bio: 'Sonali steers the artistic vision of the studio. Her detailed thoughts define the custom fabric combinations, material styling layers, and authentic details.',
              img: '/assets/sonali01.jpg',
              offset: true,
            },
          ].map(person => (
            <div
              key={person.name}
              className="profile-card flex flex-col gap-5"
              style={{ marginTop: person.offset ? '40px' : 0, opacity: 0 }}
            >
              <div
                className="w-full overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.05)]"
                style={{ aspectRatio: '1 / 1.15' }}
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <div>
                <h4 className="font-serif font-normal text-[20px] mb-[2px] text-onyx-soft">
                  {person.name}
                </h4>
                <span
                  className="block text-[10px] uppercase text-onyx-soft/60 mb-3"
                  style={{ letterSpacing: '0.15em' }}
                >
                  {person.role}
                </span>
                <p className="text-[13px] leading-[1.6] text-onyx-soft/75 font-light">
                  {person.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: PARALLAX DIVIDER */}
      <div id="parallaxDivider" className="w-full overflow-hidden" style={{ height: '55vh' }}>
        <img
          src="/assets/jour2.jpeg"
          alt="Material Integration"
          className="w-full object-cover"
          style={{ height: '130%', willChange: 'transform' }}
        />
      </div>

      {/* SECTION 4: SUB-BRANDS */}
      <section className="bg-charcoal text-white px-[6vw] py-[120px]">
        <div className="text-center max-w-[600px] mx-auto mb-[60px]">
          <h3 className="font-serif font-normal text-[32px] mb-[10px]">
            Strict Detailing Focus
          </h3>
          <p className="font-serif italic text-[16px] text-white/70">
            Every Space Crafted Individually
          </p>
        </div>

        <div className="max-w-[1400px] mx-auto flex gap-[40px] max-lg:flex-col">
          {[
            {
              title: 'RSD Architecture',
              img: '/assets/jour3.jpeg',
              desc: 'We approach structural layout updates from the ground up, clearing spatial constraints to maximize lines of sight and raw functional flow.',
              offset: false,
            },
            {
              title: 'Bespoke Curation',
              img: '/assets/jour4.jpeg',
              desc: 'Our soft styling approach focuses on material depth. We layer hand-picked Italian marbles against rich woods and fluted panels designed to last.',
              offset: true,
            },
          ].map(brand => (
            <div
              key={brand.title}
              className="brand-tile flex-1 flex flex-col gap-[25px] group"
              style={{ marginTop: brand.offset ? '40px' : 0, opacity: 0 }}
            >
              <div
                className="relative w-full overflow-hidden bg-black/10"
                style={{ aspectRatio: '1.4 / 1' }}
              >
                <img
                  src={brand.img}
                  alt={brand.title}
                  className="w-full h-full object-cover transition-all duration-700 opacity-85 group-hover:scale-[1.05] group-hover:opacity-40"
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white uppercase font-light text-center w-full pointer-events-none"
                  style={{ fontSize: 'clamp(20px, 3vw, 36px)', letterSpacing: '0.25em' }}
                >
                  {brand.title}
                </div>
              </div>
              <p className="text-[14px] leading-[1.75] text-white/80 font-light">
                {brand.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: PARTNERSHIPS MARQUEE */}
      <section className="px-[6vw] py-[100px] text-center bg-travertine-200">
        <h3 className="font-serif font-normal text-[28px] mb-[10px] text-onyx-soft">
          Collaborations
        </h3>
        <p
          className="text-[13px] uppercase text-onyx-soft/50 mb-[40px]"
          style={{ letterSpacing: '0.15em' }}
        >
          Our Selected Industry Partners
        </p>

        <Marquee
          speed="slow"
          items={PARTNER_IMAGES.map(src => (
            <div className="mr-[30px] flex-shrink-0">
              <img
                src={src}
                alt="Partner"
                className="h-[240px] w-[320px] object-cover transition-[filter] duration-300"
                style={{ filter: 'grayscale(0.2) contrast(0.95)' }}
                onMouseEnter={e => (e.target.style.filter = 'none')}
                onMouseLeave={e => (e.target.style.filter = 'grayscale(0.2) contrast(0.95)')}
              />
            </div>
          ))}
        />
      </section>

      {/* FOOTER */}
      <Footer theme="light" />
    </div>
  );
}