'use client';

import { useEffect, useRef } from 'react';
import { generateStars } from './StarGenerator';

const StarsBackground = () => {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateStars({
      container: starsRef.current,
      count: 200,
      minSize: 0.5,
      maxSize: 3,
    });
  }, []);

  return (
    <div
      ref={starsRef}
      className="fixed inset-0"
      style={{ zIndex: -20 }}
      aria-hidden="true"
    />
  );
};

export default StarsBackground;
