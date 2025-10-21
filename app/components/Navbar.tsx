"use client";

import { useEffect, useRef, useState } from 'react';
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

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="w-full px-[clamp(48px,8vw,160px)]">
        <div className="h-20 grid grid-cols-[auto_1fr_auto] items-center">
          {/* Left: Logo + wordmark */}
          <div className="flex items-center gap-3 justify-self-start">
            <img src="/vifilogo.svg" alt="VIFILABS logo mark" className="h-7 w-auto" />
            <img src="/vifilabs-text.svg" alt="VIFILABS" className="h-4 w-auto" />
          </div>

          {/* Center: Links */}
          <ul className="hidden md:flex items-center gap-16 lg:gap-20 text-sm text-gray-300 justify-self-center">
            <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#partners" className="hover:text-white transition-colors">Partners</a></li>
            <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
          </ul>

          {/* Right: CTA */}
          <a
            href="#products"
            className="group inline-flex items-center gap-3 rounded-full border border-white/30 px-5 py-2 text-sm text-white/90 hover:text-white hover:border-white/60 transition-colors justify-self-end"
          >
            <span>Explore products</span>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/30 group-hover:border-white/60">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
