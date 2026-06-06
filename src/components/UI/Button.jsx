export default function Button({
  children,
  variant = 'outline',
  className = '',
  onClick,
  type = 'button',
  theme = 'light',
}) {
  const isDark = theme === 'dark';

  const base =
    'relative overflow-hidden z-[1] text-[11px] uppercase font-medium font-sans cursor-pointer transition-all duration-[400ms] inline-block';

  const variants = {
    outline: `border px-10 py-[15px] ${
      isDark
        ? 'border-white text-white hover:text-onyx-soft'
        : 'border-onyx-soft text-onyx-soft hover:text-travertine-200'
    }`,
    solid: `px-10 py-[15px] ${
      isDark
        ? 'bg-white text-onyx-soft hover:bg-travertine-200'
        : 'bg-onyx-soft text-white hover:bg-onyx-dark'
    }`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className} group`}
      style={{ letterSpacing: '0.2em' }}
    >
      {/* Hover fill effect */}
      <span
        className={`absolute top-full left-0 w-full h-full transition-[top] duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:top-0 -z-[1] ${
          isDark ? 'bg-white' : 'bg-onyx-soft'
        }`}
      />
      {children}
    </button>
  );
}
