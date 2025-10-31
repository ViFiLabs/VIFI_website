"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const lastYRef = useRef(0);
  const cleanupRef = useRef<() => void>(() => {});
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = (currentY: number) => {
      const last = lastYRef.current;
      const delta = currentY - last;
      if (Math.abs(delta) > 2) {
        // Show when scrolling UP, hide when scrolling DOWN
        setVisible(delta < 0);
        lastYRef.current = currentY;
      }
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

    return () => {
      cleanupRef.current?.();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

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
        <a href="/" aria-label="VIFILABS home">
          <img src="/vifilogo.svg" alt="VIFILABS logo mark" className="h-7 w-auto" />
        </a>
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
        href="#hero-two"
        aria-label="Explore products"
        className="group relative inline-flex items-center justify-center rounded-full border border-[#E24232] px-6 py-2 text-base bg-[#000000]/20 backdrop-blur-md 
              font-light text-white/90 transition-colors duration-300 overflow-hidden"
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
