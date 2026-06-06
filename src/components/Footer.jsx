import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Footer({ theme = 'light' }) {
  const [email, setEmail] = useState('');
  const isDark = theme === 'dark';

  const bg = isDark ? 'bg-[#060e0a]' : 'bg-travertine-100';
  const textColor = isDark ? 'text-white' : 'text-onyx-soft';
  const mutedColor = isDark ? 'text-white/50' : 'text-muted-warm';
  const borderColor = isDark ? 'border-white/[0.04]' : 'border-black/[0.06]';
  const inputBorder = isDark ? 'border-white/15' : 'border-black/15';
  const linkColor = isDark ? 'text-white' : 'text-onyx-soft';

  return (
    <footer className={`${bg} ${textColor} px-[5vw] pt-[100px] pb-[50px] transition-colors duration-700`}>
      <div className="max-w-[1800px] mx-auto">
        {/* Newsletter row */}
        <div
          className={`flex justify-between items-end gap-[60px] pb-[80px] mb-[80px] border-b ${borderColor} flex-wrap`}
        >
          <div className="newsletter-left">
            <p className={`text-[11px] uppercase tracking-[6px] ${mutedColor} mb-6`}>
              Newsletter
            </p>
            <h2
              className={`font-serif font-normal leading-[1.2] ${textColor}`}
              style={{ fontSize: 'clamp(34px, 4vw, 58px)' }}
            >
              Join our private journal for architecture,
              <br />interiors &amp; timeless spatial inspiration.
            </h2>
          </div>
          <form
            className="flex items-center gap-4"
            onSubmit={e => {
              e.preventDefault();
              setEmail('');
            }}
          >
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className={`w-[320px] h-[58px] bg-transparent border-b ${inputBorder} ${textColor} text-[14px] font-sans outline-none placeholder:${mutedColor} focus:border-current transition-colors`}
              style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
            />
            <button
              type="submit"
              className={`h-[58px] px-[30px] ${isDark ? 'bg-white text-onyx-soft' : 'bg-onyx-soft text-white'} text-[11px] tracking-[4px] uppercase font-sans font-medium cursor-pointer border-none transition-transform duration-700 hover:-translate-y-[3px]`}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer grid */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-[60px] mb-[80px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {/* Studio description */}
          <div>
            <h4 className={`text-[12px] uppercase tracking-[4px] mb-[28px] ${mutedColor}`}>
              Rakesh Sharma Designs
            </h4>
            <p className={`text-[15px] leading-[1.9] ${isDark ? 'text-white/70' : 'text-onyx-soft/70'}`}>
              A luxury interior &amp; architectural studio crafting warm minimal spaces
              rooted in silence, elegance and structural sophistication.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className={`text-[12px] uppercase tracking-[4px] mb-[28px] ${mutedColor}`}>
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
        className={`footer-link ${linkColor} text-[15px] font-light`}
      >
        {label}
      </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className={`text-[12px] uppercase tracking-[4px] mb-[28px] ${mutedColor}`}>
              Social
            </h4>
            <ul className="list-none space-y-4">
              {['Instagram', 'Facebook', 'LinkedIn'].map(platform => (
                <li key={platform}>
                  <a
                    href="https://instagram.com"
                    className={`footer-link ${linkColor} text-[15px] font-light`}
                  >
                    {platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`text-[12px] uppercase tracking-[4px] mb-[28px] ${mutedColor}`}>
              Contact
            </h4>
            <p className={`text-[14px] leading-[1.6] font-light ${isDark ? 'text-white/80' : 'text-onyx-soft/80'}`}>
              studio@rakeshsharmadesign.com
            </p>
            <p className={`text-[14px] leading-[1.6] font-light mt-[18px] ${isDark ? 'text-white/80' : 'text-onyx-soft/80'}`}>
              Indore, Madhya Pradesh<br />India
            </p>
          </div>
        </div>

        {/* Footer bottom */}
        <div
          className={`border-t ${borderColor} pt-8 flex justify-between items-center text-[11px] tracking-[4px] uppercase ${mutedColor} max-sm:flex-col max-sm:gap-3 max-sm:text-center`}
        >
          <p>© 2026 Rakesh Sharma Designs</p>
          <p>Quiet Luxury Framework</p>
        </div>
      </div>
    </footer>
  );
}
