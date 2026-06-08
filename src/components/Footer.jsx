import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Footer({ theme = 'light' }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isDark = theme === 'dark';

  const bg = isDark ? 'bg-[#060e0a]' : 'bg-travertine-100';
  const textColor = isDark ? 'text-white' : 'text-onyx-soft';
  const mutedColor = isDark ? 'text-white/50' : 'text-muted-warm';
  const borderColor = isDark ? 'border-white/[0.04]' : 'border-black/[0.06]';
  const inputBorder = isDark ? 'border-white/15' : 'border-black/15';
  const linkColor = isDark ? 'text-white' : 'text-onyx-soft';

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer
      className={`${bg} ${textColor} transition-colors duration-700`}
      style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px) clamp(32px, 4vw, 50px)' }}
    >
      <div className="max-w-[1800px] mx-auto">

        {/* ── NEWSLETTER ROW ─────────────────────────────────────── */}
        {/*
          Mobile  : stacked (heading then form below)
          Desktop : side-by-side
        */}
        <div
          className={`border-b ${borderColor}`}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 'clamp(32px, 5vw, 60px)',
            paddingBottom: 'clamp(48px, 6vw, 80px)',
            marginBottom: 'clamp(48px, 6vw, 80px)',
          }}
        >
          {/* Left: heading */}
          <div style={{ flex: '1 1 clamp(260px, 50%, 600px)', minWidth: 0 }}>
            <p
              className={`uppercase ${mutedColor} mb-6`}
              style={{ fontSize: '11px', letterSpacing: '6px' }}
            >
              Newsletter
            </p>
            <h2
              className={`font-serif font-normal leading-[1.3] ${textColor}`}
              style={{ fontSize: 'clamp(22px, 3.5vw, 58px)' }}
            >
              Join our private journal for architecture,{' '}
              <span className="block">interiors &amp; timeless spatial inspiration.</span>
            </h2>
          </div>

          {/* Right: form */}
          <div style={{ flex: '1 1 clamp(240px, 36%, 420px)', minWidth: 0 }}>
            {submitted ? (
              <p
                className={`font-serif italic ${mutedColor}`}
                style={{ fontSize: 'clamp(14px, 1.6vw, 18px)' }}
              >
                Thank you — you're on the list.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className={`w-full bg-transparent border-b ${inputBorder} ${textColor} font-sans outline-none transition-colors`}
                  style={{
                    height: 'clamp(46px, 6vw, 58px)',
                    fontSize: 'clamp(12px, 1.4vw, 14px)',
                    borderTop: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                  }}
                />
                <button
                  type="submit"
                  className={`${isDark ? 'bg-white text-onyx-soft' : 'bg-onyx-soft text-white'} uppercase font-sans font-medium cursor-pointer border-none transition-transform duration-300 hover:-translate-y-[3px] w-full sm:w-max`}
                  style={{
                    height: 'clamp(46px, 6vw, 58px)',
                    padding: '0 clamp(20px, 3vw, 30px)',
                    fontSize: '11px',
                    letterSpacing: '4px',
                  }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── FOOTER GRID ────────────────────────────────────────── */}
        {/*
          Mobile  (< 480 px) : single column
          Tablet  (480–1023) : 2 columns
          Desktop (≥ 1024 px): 4 columns
        */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: 'clamp(40px, 5vw, 60px)',
            marginBottom: 'clamp(48px, 6vw, 80px)',
          }}
        >
          {/* Studio description */}
          <div>
            <h4
              className={`uppercase ${mutedColor} mb-[28px]`}
              style={{ fontSize: '12px', letterSpacing: '4px' }}
            >
              Rakesh Sharma Designs
            </h4>
            <p
              className={`leading-[1.9] ${isDark ? 'text-white/70' : 'text-onyx-soft/70'}`}
              style={{ fontSize: 'clamp(13px, 1.4vw, 15px)' }}
            >
              A luxury interior &amp; architectural studio crafting warm minimal spaces
              rooted in silence, elegance and structural sophistication.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className={`uppercase ${mutedColor} mb-[28px]`}
              style={{ fontSize: '12px', letterSpacing: '4px' }}
            >
              Navigation
            </h4>
            <ul className="list-none space-y-4">
              {[
                { label: 'Projects', to: '/studio' },
                { label: 'Studio', to: '/journal' },
                { label: 'Journal', to: '/journal' },
                { label: 'Contact', to: '/contact' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className={`footer-link ${linkColor} font-light`}
                    style={{ fontSize: 'clamp(13px, 1.4vw, 15px)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4
              className={`uppercase ${mutedColor} mb-[28px]`}
              style={{ fontSize: '12px', letterSpacing: '4px' }}
            >
              Social
            </h4>
            <ul className="list-none space-y-4">
              {[
                { label: 'Instagram', href: 'https://instagram.com' },
                { label: 'Facebook', href: 'https://facebook.com' },
                { label: 'LinkedIn', href: 'https://linkedin.com' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`footer-link ${linkColor} font-light`}
                    style={{ fontSize: 'clamp(13px, 1.4vw, 15px)' }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className={`uppercase ${mutedColor} mb-[28px]`}
              style={{ fontSize: '12px', letterSpacing: '4px' }}
            >
              Contact
            </h4>
            <a
              href="mailto:studio@rakeshsharmadesign.com"
              className={`block font-light leading-[1.6] ${isDark ? 'text-white/80' : 'text-onyx-soft/80'} break-all`}
              style={{ fontSize: 'clamp(12px, 1.3vw, 14px)' }}
            >
              studio@rakeshsharmadesign.com
            </a>
            <p
              className={`font-light leading-[1.6] mt-[18px] ${isDark ? 'text-white/80' : 'text-onyx-soft/80'}`}
              style={{ fontSize: 'clamp(12px, 1.3vw, 14px)' }}
            >
              Indore, Madhya Pradesh
              <br />India
            </p>
          </div>
        </div>

        {/* ── FOOTER BOTTOM ──────────────────────────────────────── */}
        <div
          className={`border-t ${borderColor} pt-8 uppercase ${mutedColor}`}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            fontSize: '11px',
            letterSpacing: '4px',
          }}
        >
          <p>© 2026 Rakesh Sharma Designs</p>
          <p>Quiet Luxury Framework</p>
        </div>

      </div>
    </footer>
  );
}