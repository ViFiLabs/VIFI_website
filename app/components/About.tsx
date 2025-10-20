"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  // Bind to the custom scroll container set in app/page.tsx
  const initialContainer = typeof document !== 'undefined'
    ? (document.querySelector('[data-scroll-container="main"]') as HTMLElement | null)
    : null;
  const containerRef = useRef<HTMLElement | null>(initialContainer);

  const { scrollYProgress } = useScroll({
    target: aboutRef,
    container: containerRef,
    offset: ['start start', 'end start']
  });
  // Scale from 0.8 (top of section) to 1 (middle of section) and back to 0.8 (bottom of section)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.02, 0.8]);
  // Corner radius: curved -> straight -> curved
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], [24, 0, 24]);

  return (
    <div ref={aboutRef} className="h-[200vh] w-full">
      <motion.section
        style={{ scale, borderRadius }}
        className="h-screen bg-cyan-400 flex items-center justify-center sticky top-0 overflow-hidden will-change-transform"
      >
        <h1 className="text-6xl font-bold text-white">Contact US</h1>
      </motion.section>
    </div>
  );
}
