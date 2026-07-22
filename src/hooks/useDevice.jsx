import { useState, useEffect, useCallback } from 'react';

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useDevice() {
  const get = useCallback(() => {
    if (typeof window === 'undefined') return { w: 1024, h: 768 };
    return { w: window.innerWidth, h: window.innerHeight };
  }, []);

  const [size, setSize] = useState(get);

  useEffect(() => {
    let frame;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setSize(get()));
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', onResize); };
  }, [get]);

  const w = size.w;

  return {
    width: w,
    height: size.h,
    isMobile: w < BREAKPOINTS.sm,
    isTablet: w >= BREAKPOINTS.sm && w < BREAKPOINTS.lg,
    isDesktop: w >= BREAKPOINTS.lg,
    isLarge: w >= BREAKPOINTS.xl,
    isXLarge: w >= BREAKPOINTS['2xl'],

    sm: w >= BREAKPOINTS.sm,
    md: w >= BREAKPOINTS.md,
    lg: w >= BREAKPOINTS.lg,
    xl: w >= BREAKPOINTS.xl,
    '2xl': w >= BREAKPOINTS['2xl'],
  };
}

export default useDevice;
