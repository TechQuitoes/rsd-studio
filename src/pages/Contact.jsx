import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { useTheme } from '../context/ThemeContext';

const THEMES = {
  '#f4f0ea': {
    bg: '#f4f0ea',
    text: '#111111',
    muted: '#666666',
    border: 'rgba(0,0,0,0.12)',
  },

  '#0a1f16': {
    bg: '#0a1f16',
    text: '#ffffff',
    muted: '#ffffff',
    border: '#ffffff',
  },

  '#1a0f2b': {
    bg: '#1a0f2b',
    text: '#ffffff',
    muted: '#c8bfdc',
    border: 'rgba(255,255,255,0.15)',
  },

  '#080808': {
    bg: '#080808',
    text: '#ffffff',
    muted: '#888888',
    border: 'rgba(255,255,255,0.15)',
  },
};

const CALENDAR_DAYS = [
  { day: '01', muted: false }, { day: '02', muted: false }, { day: '03', muted: false },
  { day: '04', muted: false }, { day: '05', muted: false }, { day: '06', muted: true },
  { day: '07', muted: true },
  { day: '08', muted: false }, { day: '09', muted: false }, { day: '10', muted: false },
  { day: '11', muted: false }, { day: '12', muted: false }, { day: '13', muted: true },
  { day: '14', muted: true },
  { day: '15', muted: false }, { day: '16', muted: false }, { day: '17', muted: false },
  { day: '18', muted: false }, { day: '19', muted: false }, { day: '20', muted: true },
  { day: '21', muted: true },
];

const TIME_SLOTS = ['10:30 AM', '02:00 PM', '04:30 PM'];

const INQUIRY_TYPES = [
  { value: 'project', label: 'New Turnkey Project' },
  { value: 'renovation', label: 'Renovation / Elevation' },
  { value: 'general', label: 'General Inquiry' },
];

const SOCIAL_ICONS = [
  {
    name: 'Instagram',
    full: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    name: 'Facebook',
    full: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    name: 'LinkedIn',
    full: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    name: 'YouTube',
    full: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </>
    ),
  },
];

/* ── Floating Label Input ── */
function FloatingLabel({ id, label, type = 'text', required = false, textArea = false }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const active = focused || value.length > 0;

  const base =
    'w-full bg-transparent border-0 border-b outline-none font-sans font-light text-[15px] pt-[14px] pb-[14px] transition-colors duration-500';

  return (
    <div className="relative w-full input-group">
      {textArea ? (
        <textarea
          id={id}
          required={required}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={e => setValue(e.target.value)}
          className={`${base} resize-none h-[95px]`}
          style={{ borderColor: focused ? 'inherit' : 'rgba(0,0,0,0.12)', color: 'inherit' }}
          placeholder=""
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={e => setValue(e.target.value)}
          className={base}
          style={{ borderColor: focused ? 'inherit' : 'rgba(0,0,0,0.12)', color: 'inherit' }}
          placeholder=""
          autoComplete="off"
        />
      )}
      <label
        htmlFor={id}
        className="absolute pointer-events-none transition-all duration-300 font-sans font-light"
        style={{
          top: active ? '-12px' : '14px',
          left: 0,
          fontSize: active ? '7px' : '11px',
          letterSpacing: active ? '0.15em' : 'normal',
          textTransform: active ? 'uppercase' : 'none',
          fontWeight: active ? 600 : 300,
          color: 'var(--contact-muted)',
        }}
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
   const { theme, setTheme } = useTheme();
  const [selectedDay, setSelectedDay] = useState('01');
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  const [inquiryType, setInquiryType] = useState('project');
  const [submitted, setSubmitted] = useState(false);

  const containerRef = useRef(null);
  const t = THEMES[theme] || THEMES['#f4f0ea'];

  useGSAP(() => {
    gsap.to('#dirPane',   { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' });
    gsap.to('#formPane',  { opacity: 1, y: 0, duration: 1.2, delay: 0.15, ease: 'power3.out' });
    gsap.to('#schedPane', { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' });
  }, { scope: containerRef });
 useEffect(() => {
    setTheme("#f4f0ea");
  }, [setTheme]);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen font-sans transition-colors duration-700"
      style={{
        backgroundColor: t.bg,
        color: t.text,
        '--contact-muted': t.muted,
        '--contact-border': t.border,
      }}
    >
      {/* ── FLOATING SOCIAL DOCK (desktop only) ── */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-[22px] z-[999] hidden lg:flex">
        {SOCIAL_ICONS.map(icon => (
          <a
            key={icon.name}
            href="https://www.instagram.com/rakeshsharmadesigns/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={icon.name}
            className="block w-5 h-5 transition-all duration-300 hover:scale-[1.12]"
            style={{ color: theme === '#f4f0ea'? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.45)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#c5a880')}
            onMouseLeave={e =>
              (e.currentTarget.style.color =
                theme === '#f4f0ea' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.45)')
            }
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              {icon.full}
            </svg>
          </a>
        ))}
      </div>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href="https://wa.me/919999999999?text=Hello%20Rakesh%20Sharma%20Designs"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-5 bottom-5 w-[50px] h-[50px] bg-[#25d366] text-white rounded-full flex items-center justify-center z-[999] transition-all duration-300 hover:scale-[1.08] hover:-translate-y-[4px]"
        style={{ boxShadow: '0 10px 30px rgba(37,211,102,0.3)' }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[26px] h-[26px]">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.855.001-2.633-1.022-5.101-2.881-6.963C16.528 1.951 14.063.929 11.43.929c-5.441 0-9.864 4.422-9.867 9.858-.001 1.764.464 3.486 1.346 5.011l-.993 3.626 3.731-.979zm11.205-4.437c-.3-.15-1.774-.875-2.048-.975-.274-.1-.474-.15-.674.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-1.125-.562-1.925-.925-2.687-2.237-.2-.35-.2-.1-.05-.425.113-.25.275-.425.425-.6.15-.175.225-.3.325-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.625-.925-2.225-.244-.589-.493-.51-.674-.519-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8 1.05-.275.975-1.05 2.4-1.05 2.454 0 .054.054.425.237.762.538 1.077 1.45 1.95 2.475 2.5 1.025.55 1.775.675 2.6.575.625-.075 1.775-.725 2.025-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z" />
        </svg>
      </a>

      {/* ── TOP NAV ── */}
      

      {/* ── MAIN CONTENT ── */}
      {/*
        Layout strategy:
        - Mobile (< 768 px)  : single column, stacked top→bottom:
            Directory info → Form → Scheduler
        - Tablet (768–1199 px): two columns: [Dir | Form] then [Scheduler below full-width]
        - Desktop (≥ 1200 px) : three columns (original)
      */}
      <div
        className="w-full max-w-[1350px] mx-auto "
        style={{ paddingTop: 'clamp(100px, 14vw, 140px)', paddingBottom: 'clamp(60px, 8vw, 100px)', paddingLeft: 'clamp(16px, 4vw, 40px)', paddingRight: 'clamp(16px, 4vw, 40px)' }}
      >
        {/* Three-pane grid — collapses gracefully */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            columnGap: 'clamp(24px, 5vw, 70px)',
            rowGap: 'clamp(48px, 8vw, 80px)',
          }}
        >
          {/* ── COLUMN 1: DIRECTORY ── */}
          <aside
            id="dirPane"
            className="flex flex-col gap-[20px] pl-10 "
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <div>
              <h1
                className="font-serif font-normal uppercase leading-[1] mb-[10px]"
                style={{ fontSize: 'clamp(30px, 4vw, 50px)', fontWeight: 200, color: t.text }}
              >
                Contact
              </h1>
              <p className="text-[14px] max-w-4xl mb-5 leading-[1.7] font-light" style={{ color: t.muted }}>
                Connect with our regional studio hub nodes to initiate spatial alignments
                and customized high-performance turnkey assemblies.
              </p>
            </div>

            <div className="flex flex-col  gap-4 border-t pt-[35px]" style={{ borderColor: t.border }}>
              {[
                { label: 'Email', href: 'studio@rakeshsharmadesigns.com', display: 'studio@rakeshsharmadesigns.com' },
                { label: 'For project quotation', href: 'inquiry@rakeshsharmadesigns.com', display: 'inquiry@rakeshsharmadesigns.com' },
                { label: 'For Press', href: 'sonali@rakeshsharmadesigns.com', display: 'sonali@rakeshsharmadesigns.com' },
              ].map(item => (
                <div key={item.label} className="flex flex-col gap-[3px]">
                  <span
                    className="text-[11px] uppercase font-semibold opacity-50"
                    style={{ letterSpacing: '0.18em', color: t.text }}
                  >
                    {item.label}
                  </span>
                  <a
                    href={`mailto:${item.href}`}
                    className="text-[14px] font-light border-b border-transparent transition-all duration-300 w-max hover:border-[#c5a880] break-all"
                    style={{ color: t.text, textDecoration: 'none' }}
                    onMouseEnter={e => { e.target.style.color = '#c5a880'; e.target.style.borderColor = '#c5a880'; }}
                    onMouseLeave={e => { e.target.style.color = t.text; e.target.style.borderColor = 'transparent'; }}
                  >
                    {item.display}
                  </a>
                </div>
              ))}
            </div>

            <div className="text-[13.5px] leading-[1.4] pt-2 font-light" style={{ color: t.muted }}>
  

  <p className=" text-black">
    <span className="font-semibold opacity-50" style={{ color: t.text }}>
      Office Location:
    </span>
    <br />
    121, Rafael Tower, Old Palasia,
    <br />
    Indore, Madhya Pradesh 452016
  </p>

  <p className="mt-2">
    <span className="font-semibold opacity-50" style={{ color: t.text }}>
      Call for Consultation:
    </span>
    
    <a
      href="tel:+919773510007"
      style={{ color: t.text, textDecoration: "none" }}
    >
      +91 9773510007
    </a>
  </p>

  <p className="mt-2">
    <span className="font-semibold opacity-50" style={{ color: t.text }}>
      Email:
    </span>
    
    <a
      href="mailto:raksinterior@gmail.com"
      style={{ color: t.text, textDecoration: "none" }}
    >
      raksinterior@gmail.com
    </a>
  </p>
</div>
          </aside>

          {/* ── COLUMN 2: FORM ── */}
          <main
            id="formPane"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              borderLeft: `1px solid ${t.border}`,
              borderRight: `1px solid ${t.border}`,
              padding: '0 clamp(16px, 2vw, 8px)',
            }}
          >
            {submitted ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center">
                  <div className="font-serif font-normal text-[24px] mb-4" style={{ color: t.text }}>
                    Inquiry Received
                  </div>
                  <p className="text-[14px] font-light" style={{ color: t.muted }}>
                    We'll be in touch shortly.
                  </p>
                </div>
              </div>
            ) : (
              <div /* using div instead of form to avoid native submit on Enter */ className="flex flex-col gap-[20px]">
                {/* Row 1 */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 100px), 1fr))',
                    gap: 'clamp(20px, 2vw, 23px)',
                  }}
                >
                  <FloatingLabel id="clientName" label="Name *" required />
                  <FloatingLabel id="clientEmail" label="Email *" type="email" required />
                </div>
                {/* Row 2 */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 100px), 1fr))',
                    gap: 'clamp(32px, 4vw, 30px)',
                  }}
                >
                  <FloatingLabel id="propertySqFt" label="Property Sq. Ft. *" required />
                  <FloatingLabel id="projectLocation" label="Project Location *" required />
                </div>
                {/* Row 3 */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 100px), 1fr))',
                    gap: 'clamp(32px, 4vw, 30px)',
                  }}
                >
                  <FloatingLabel id="constructionBudget" label="Construction Budget *" required />
                  <FloatingLabel id="interiorBudget" label="Interior Budget *" required />
                </div>

                {/* Inquiry type */}
                <div className="flex flex-col gap-3">
                  <h5
                    className="text-[11px] uppercase font-semibold"
                    style={{ letterSpacing: '0.15em', color: t.text }}
                  >
                    Type of Inquiry *
                  </h5>
                  {/* Stacked on mobile, row on larger */}
                  <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                    {INQUIRY_TYPES.map(opt => (
                      <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="inquiryType"
                          value={opt.value}
                          checked={inquiryType === opt.value}
                          onChange={() => setInquiryType(opt.value)}
                          className="hidden"
                        />
                        <span
                          className="relative w-[13px] h-[13px] rounded-full border flex-shrink-0 transition-colors duration-300"
                          style={{ borderColor: inquiryType === opt.value ? t.text : t.muted }}
                        >
                          {inquiryType === opt.value && (
                            <span
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full"
                              style={{ backgroundColor: t.text }}
                            />
                          )}
                        </span>
                        <span
                          className="text-[11px] uppercase font-light transition-colors duration-300"
                          style={{
                            letterSpacing: '0.05em',
                            color: inquiryType === opt.value ? t.text : t.muted,
                            fontWeight: inquiryType === opt.value ? 500 : 300,
                          }}
                        >
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <FloatingLabel id="clientMessage" label="Tell Us About Your Vision *" required textArea />

                <button
                  onClick={handleSubmit}
                  className="relative overflow-hidden z-[1] bg-transparent border text-[10px] uppercase font-medium cursor-pointer transition-all duration-300 w-max group hover:text-travertine-200"
                  style={{
                    border: `1px solid ${t.text}`,
                    color: t.text,
                    letterSpacing: '0.2em',
                    padding: '15px 10px',
                  }}
                >
                  <span
                    className="absolute top-full left-0 w-full h-full transition-[top] duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:top-0 -z-[1]"
                    style={{ backgroundColor: t.text }}
                  />
                  Submit Inquiry
                </button>
              </div>
            )}
          </main>

          {/* ── COLUMN 3: SCHEDULER ── */}
          <section
            id="schedPane"
            className="flex flex-col gap-[20px]"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <div>
              <h3
                className="font-serif font-normal uppercase text-[14px] mb-0"
                style={{ letterSpacing: '0.02em', color: t.text }}
              >
                Book Appointment
              </h3>
              <span
                className="block text-[11px] uppercase font-semibold mt-6"
                style={{ letterSpacing: '0.15em', color: '#836e62' }}
              >
                Meeting by appointment only
              </span>
            </div>

            {/* Calendar */}
            <div
              className="w-full p-5 flex flex-col gap-4 border"
              style={{
                background: theme === 'cream' ? 'rgba(0,0,0,0.015)' : 'rgba(255,255,255,0.02)',
                borderColor: t.border,
              }}
            >
              <div
                className="text-[10px] font-semibold uppercase text-center"
                style={{ letterSpacing: '0.12em', color: t.text }}
              >
                June 2026
              </div>

              <div className="grid grid-cols-7 gap-[4px] text-center">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <div key={i} className="text-[12px] font-semibold uppercase pb-1" style={{ color: t.muted }}>
                    {d}
                  </div>
                ))}
                {CALENDAR_DAYS.map(({ day, muted }) => (
                  <button
                    key={day}
                    disabled={muted}
                    onClick={() => !muted && setSelectedDay(day)}
                    className={`aspect-square flex items-center justify-center text-[10px] font-light transition-all duration-200 border-none cursor-pointer ${
                      muted ? 'opacity-20 cursor-not-allowed' : ''
                    }`}
                    style={{
                      color: selectedDay === day && !muted ? '#ffffff' : t.text,
                      backgroundColor: selectedDay === day && !muted ? '#c5a880' : 'transparent',
                    }}
                    onMouseEnter={e => {
                      if (!muted && selectedDay !== day) {
                        e.target.style.backgroundColor = t.text;
                        e.target.style.color = t.bg;
                      }
                    }}
                    onMouseLeave={e => {
                      if (!muted && selectedDay !== day) {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = t.text;
                      }
                    }}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Time slots */}
              <div
                className="flex gap-2 justify-center flex-wrap mt-[10px] border-t pt-[15px]"
                style={{ borderColor: t.border }}
              >
                {TIME_SLOTS.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className="border text-[11px] uppercase cursor-pointer transition-all duration-300 font-sans"
                    style={{
                      letterSpacing: '0.02em',
                      padding: '8px 12px',
                      borderColor: selectedTime === slot ? t.text : t.border,
                      backgroundColor: selectedTime === slot ? t.text : 'transparent',
                      color: selectedTime === slot ? t.bg : t.text,
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <p
              className="text-[10px] uppercase opacity-40 mt-[30px]"
              style={{ letterSpacing: '0.15em', color: t.text }}
            >
              &copy; 2026 Rakesh Sharma Designs
              <br />Architecture &amp; Interiors
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}