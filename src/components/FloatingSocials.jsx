import { useTheme } from "../context/ThemeContext";

const SOCIAL_ICONS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/rakeshsharmadesigns/",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    name: "Facebook",
    url: "#",
    icon: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    name: "LinkedIn",
    url: "#",
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    name: "YouTube",
    url: "#",
    icon: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </>
    ),
  },
];

export default function FloatingSocials() {
  const { theme } = useTheme();

  return (
    <>
      {/* Social Icons */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-[22px] z-[999] hidden lg:flex">
        {SOCIAL_ICONS.map((icon) => (
          <a
            key={icon.name}
            href={icon.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={icon.name}
            className="block w-5 h-5 transition-all duration-300 hover:scale-[1.12]"
            style={{
              color:
                theme === "#f4f0ea"
                  ? "rgba(0,0,0,0.4)"
                  : "rgba(255,255,255,0.45)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full"
            >
              {icon.icon}
            </svg>
          </a>
        ))}
      </div>

      {/* WhatsApp */}
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
    </>
  );
}