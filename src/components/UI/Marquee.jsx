/**
 * Infinite scrolling ticker/marquee strip.
 * Pass `items` as an array of React nodes.
 * `speed` controls animation class: 'normal' | 'slow'
 */
export default function Marquee({ items = [], speed = 'normal', className = '' }) {
  const trackClass = speed === 'slow' ? 'ticker-track-slow' : 'ticker-track';

  // Double the items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className={`w-full overflow-hidden flex ${className}`}>
      <div className={`${trackClass} flex w-max`}>
        {doubled.map((item, i) => (
          <div key={i} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
