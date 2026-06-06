import { useState, useEffect } from "react";

/**
 * useSlider — cycles through `count` slides every `interval` ms.
 * Returns [currentIndex, setCurrentIndex].
 */
const useSlider = (count, interval = 6000) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, interval);
    return () => clearInterval(timer);
  }, [count, interval]);

  return [current, setCurrent];
};

export default useSlider;
