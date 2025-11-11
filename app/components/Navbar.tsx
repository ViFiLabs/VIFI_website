"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [overLightBackground, setOverLightBackground] = useState(false);
  const [ctaOverLightBackground, setCtaOverLightBackground] = useState(false);
  const lastYRef = useRef(0);
  const cleanupRef = useRef<() => void>(() => {});
  const intervalRef = useRef<number | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

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

    const ctaNode = ctaRef.current;
    const ctaRect = ctaNode?.getBoundingClientRect();
    const ctaSampleX = ctaRect ? ctaRect.left + ctaRect.width / 2 : window.innerWidth - Math.min(window.innerWidth * 0.1, 160);
    const ctaSampleY = ctaRect ? Math.min(window.innerHeight - 1, Math.max(0, ctaRect.bottom + 1)) : sampleY;
    let restoredPointer = '';
    let restoredAnchorPointer = '';
    if (ctaNode) {
      restoredPointer = ctaNode.style.pointerEvents;
      ctaNode.style.pointerEvents = 'none';
    }
    const ctaAnchor = ctaNode?.querySelector('a') as HTMLElement | null;
    if (ctaAnchor) {
      restoredAnchorPointer = ctaAnchor.style.pointerEvents;
      ctaAnchor.style.pointerEvents = 'none';
    }
    const ctaUnderneath = document.elementFromPoint(ctaSampleX, ctaSampleY) as HTMLElement | null;
    if (ctaAnchor) {
      ctaAnchor.style.pointerEvents = restoredAnchorPointer;
    }
    if (ctaNode) {
      ctaNode.style.pointerEvents = restoredPointer;
    }
    if (!ctaUnderneath) {
      setCtaOverLightBackground(false);
      return;
    }
    const ctaBackground = resolveBackgroundColor(ctaUnderneath);
    setCtaOverLightBackground(ctaBackground ? isColorLight(ctaBackground) : false);
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

  const handleExploreClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    const container = document.querySelector('[data-scroll-container="main"]') as HTMLElement | null;
    const target = document.getElementById('hero-two');

    if (container && target) {
      event.preventDefault();
      const targetOffset = target.offsetTop;
      container.scrollTo({ top: targetOffset, behavior: 'smooth' });
    }
  }, []);

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
  <div ref={ctaRef} className="fixed top-0 z-[60] h-20 flex items-center right-[clamp(48px,8vw,160px)]">
      <a
        href="#hero-two"
        aria-label="Explore products"
  className={`group relative inline-flex items-center justify-center rounded-full border border-[#E24232] px-6 py-2 text-base font-light text-white/90 transition-colors duration-300 overflow-hidden ${!visible && ctaOverLightBackground ? 'bg-black/20 backdrop-blur-md' : 'bg-transparent backdrop-blur-none'}`}
        style={{ paddingLeft: "12px", paddingRight: "12px", paddingTop: "8px", paddingBottom: "8px" }}
        onClick={handleExploreClick}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-left scale-x-0 rounded-full bg-[#28E89B] transition-transform duration-500 ease-out group-hover:scale-x-100"
        />
        <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Explore products</span>
      </a>
      </div>
    </>
  );
}
