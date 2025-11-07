"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function MidSectionHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const unseenRef = useRef<HTMLSpanElement>(null);
  const [unseenWidth, setUnseenWidth] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState<boolean | null>(null);

  // Bind to the main scroll container used in app/page.tsx
  const initialContainer = typeof document !== 'undefined'
    ? (document.querySelector('[data-scroll-container="main"]') as HTMLElement | null)
    : null;
  const containerRef = useRef<HTMLElement | null>(initialContainer);

  // Start when this section's top hits the viewport center and finish when center hits center
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: containerRef,
    // Begin when section top hits ~60% of viewport height so animation starts higher
    // and complete when section bottom hits the same line to keep the longer window
    offset: ['start 60%', 'end 60%']
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !shouldAnimate) {
      return;
    }
    const measure = () => {
      if (unseenRef.current) {
        setUnseenWidth(unseenRef.current.getBoundingClientRect().width);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [shouldAnimate]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    const update = () => setShouldAnimate(!mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  // Strike-through grows first (center the action roughly in the middle of the window)
  const strikeProgress = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  // Then "Unseen" fades away
  const unseenOpacity = useTransform(scrollYProgress, [0.45, 0.65], [1, 0]);
  // "Majority" slides left to occupy the gap of the removed word
  const gap = 16; // px spacing approximation between words
  const majorityShift = useTransform(scrollYProgress, [0.6, 0.95], [0, -(unseenWidth + gap)]);
  const majorityX = useSpring(majorityShift, { stiffness: 180, damping: 26, mass: 0.3 });

  return (
  <section ref={sectionRef} className="h-[40vh] sm:h-[60vh] bg-black-400 snap-start flex items-center">
      <div className="w-full px-6 sm:px-8 md:px-12 flex justify-center">
        <h1 className="text-white font-bold tracking-tight leading-[0.9] text-left text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-[8vw] max-w-[min(90vw,1100px)]">
          <span className="block">A Protocol for</span>

          {(shouldAnimate ?? false) ? (
            <span className="block lg:whitespace-nowrap">
              <span className="inline-block">the&nbsp;</span>

              {/* Unseen with strike-through and fade out */}
              <motion.span
                ref={unseenRef}
                style={{ opacity: unseenOpacity }}
                className="relative inline-block"
              >
                Unseen
                {/* Strike line */}
                <motion.span
                  style={{ scaleX: strikeProgress }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[0.08em] w-full bg-white origin-left z-10"
                />
              </motion.span>

              {/* Space between words preserved visually */}
              <span style={{ display: 'inline-block', width: gap }} aria-hidden>
                
              </span>

              {/* Majority slides into place */}
              <motion.span style={{ x: majorityX }} className="inline-block">
                Majority
              </motion.span>
            </span>
          ) : (
            <span className="block lg:whitespace-nowrap">
              <span className="inline-block">the&nbsp;</span>
              <span className="inline-block line-through decoration-white decoration-2 md:decoration-4">
                Unseen
              </span>
              <span className="inline-block">&nbsp;Majority</span>
            </span>
          )}
        </h1>
      </div>
    </section>
  );
}
