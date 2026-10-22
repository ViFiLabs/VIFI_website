"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [overLightBackground, setOverLightBackground] = useState(false);
  const lastYRef = useRef(0);
  const cleanupRef = useRef<() => void>(() => {});
  const intervalRef = useRef<number | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  const parseColor = (color: string) => {
    const rgbaMatch = color.match(/rgba?\(([^)]+)\)/);
    if (!rgbaMatch) {
      return null;
    }
    const parts = rgbaMatch[1].split(',').map((part) => part.trim());
    const r = Number(parts[0]);
    const g = Number(parts[1]);
    const b = Number(parts[2]);
    const a = parts[3] !== undefined ? Number(parts[3]) : 1;
    if ([r, g, b, a].some((value) => Number.isNaN(value))) {
      return null;
    }
    return { r, g, b, a };
  };

  const isTransparent = (color: string) => {
    const parsed = parseColor(color);
    if (!parsed) {
      return true;
    }
    return parsed.a === 0;
  };

  const isColorLight = (color: string) => {
    const parsed = parseColor(color);
    if (!parsed) {
      return false;
    }
    const { r, g, b } = parsed;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness >= 210; // treat light backgrounds as values near white
  };

  const resolveBackgroundColor = (node: HTMLElement | null): string | null => {
    let current: HTMLElement | null = node;
    while (current && current !== document.body) {
      const styles = window.getComputedStyle(current);
      if (styles.backgroundImage && styles.backgroundImage !== 'none') {
        // Assume gradients/imagery are intentional backgrounds; sample via background color fallback if available
        if (styles.backgroundColor && !isTransparent(styles.backgroundColor)) {
          return styles.backgroundColor;
        }
        return null;
      }
      if (styles.backgroundColor && !isTransparent(styles.backgroundColor)) {
        return styles.backgroundColor;
      }
      current = current.parentElement;
    }
    return window.getComputedStyle(document.body).backgroundColor;
  };

  const evaluateBackground = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const navRect = navRef.current?.getBoundingClientRect();
    const sampleY = Math.min(window.innerHeight - 1, Math.max(0, (navRect?.bottom ?? 72) + 1));
    const sampleX = window.innerWidth / 2;
    const underneath = document.elementFromPoint(sampleX, sampleY) as HTMLElement | null;
    if (!underneath) {
      setOverLightBackground(false);
    } else {
      const background = resolveBackgroundColor(underneath);
      setOverLightBackground(background ? isColorLight(background) : false);
    }
  }, []);

  useEffect(() => {
    const onScroll = (currentY: number) => {
      const last = lastYRef.current;
      const delta = currentY - last;
      if (Math.abs(delta) > 2) {
        // Show when scrolling UP, hide when scrolling DOWN
        setVisible(delta < 0);
        lastYRef.current = currentY;
      }
      evaluateBackground();
    };

    // Attach to a target element
    const attach = (target: HTMLElement | Window) => {
      const handler = () => {
        const y = target instanceof Window
          ? window.scrollY
          : (target as HTMLElement).scrollTop;
        onScroll(y);
      };
      target.addEventListener('scroll', handler as any, { passive: true } as any);
      cleanupRef.current = () => {
        target.removeEventListener('scroll', handler as any);
      };
    };

    // Start with window, then upgrade to custom container when it appears
    attach(window);
    intervalRef.current = window.setInterval(() => {
      const container = document.querySelector('[data-scroll-container="main"]') as HTMLElement | null;
      if (container) {
        // Switch listeners
        cleanupRef.current?.();
        attach(container);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 250);

    evaluateBackground();
    window.addEventListener('resize', evaluateBackground);

    return () => {
      cleanupRef.current?.();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      window.removeEventListener('resize', evaluateBackground);
    };
  }, [evaluateBackground]);

  return (
    <>
    <motion.nav
      ref={navRef}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="w-full px-[clamp(48px,8vw,160px)]">
        <div className="h-20 grid grid-cols-3 items-center">
          <div className="hidden md:block" />
          {/* <div className="flex justify-center">
            <ul className="hidden md:flex items-center gap-16 lg:gap-20 text-sm text-gray-300">
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div> */}
          <div />
        </div>
      </div>
    </motion.nav>
    {/* Fixed Logo + animated wordmark */}
    <div className="fixed top-0 z-[60] h-20 flex items-center left-[clamp(48px,8vw,160px)]">
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center">
          <a href="/" aria-label="VIFILABS home" className="z-10"
          style={{ padding:5, borderRadius: '9999px' }}>
            <img src="/vifilogo.svg" alt="VIFILABS logo mark" className="h-7 w-auto" />
          </a>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={!visible && overLightBackground ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ backgroundColor: 'rgba(0,0,0,0.20)', borderRadius: '9999px', backdropFilter: 'blur(8px)', padding: 10 }}
          />
        </div>
        <motion.img
          src="/vifilabs-text.svg"
          alt="VIFILABS wordmark"
          className="hidden h-4 w-auto md:block"
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
    {/* Fixed CTA, always visible and independent of navbar visibility */}
    <div className="fixed top-0 z-[60] h-20 flex items-center right-[clamp(48px,8vw,160px)]">
      <a
        href="https://dev.vifilabs.xyz/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#2AE89B] text-sm md:text-base font-medium leading-none text-black shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-[filter,box-shadow] duration-300 hover:brightness-110 hover:shadow-[0_0_24px_rgba(42,232,155,0.45)] outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        style={{ paddingLeft: "20px", paddingRight: "18px", paddingTop: "10px", paddingBottom: "10px" }}
      >
        Explore Testnet
        <span aria-hidden="true">↗</span>
      </a>
    </div>
    </>
  );
}
