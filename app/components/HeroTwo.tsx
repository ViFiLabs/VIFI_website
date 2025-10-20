"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

export default function HeroTwo() {
  const sectionRef = useRef<HTMLElement>(null);
  // Bind scroll to the custom container used by the app
  const initialContainer = typeof document !== 'undefined'
    ? (document.querySelector('[data-scroll-container="main"]') as HTMLElement | null)
    : null;
  const containerRef = useRef<HTMLElement | null>(initialContainer);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: containerRef,
    offset: ['start start', 'end start']
  });
  // Reading progress finishes by the middle of the screen
  const progress = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  // Per-word reveal component
  function Word({ text, index, total }: { text: string; index: number; total: number }) {
    const t = total > 1 ? index / (total - 1) : 1;
    const falloff = 0.08; // smoothness of transition per word
    const start = Math.max(0, t - falloff);
    const end = Math.min(1, t + falloff);
    const color = useTransform(progress as MotionValue<number>, [start, t, end], ['#94a3b8', '#e5e7eb', '#ffffff']);
    return (
      <motion.span style={{ color }} className="inline-block">
        {text}
      </motion.span>
    );
  }

  function TextReveal({ text, className }: { text: string; className?: string }) {
    const words = text.split(' ');
    const total = words.length;
    return (
      <span className={className}>
        {words.map((w, i) => (
          <span key={i} className="inline">
            <Word text={w} index={i} total={total} />
            {i < total - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    );
  }

  return (
    <section ref={sectionRef} className="h-screen snap-start flex items-center justify-center bg-black px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="tracking-[0.35em] text-xs md:text-sm uppercase mb-6">
          <TextReveal text="A NEW DAWN FOR THE INTERNET FINANCIAL SYSTEM" />
        </p>

        <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-relaxed md:leading-relaxed lg:leading-[1.2]">
          <TextReveal text="ViFi Labs is a technology studio that brings emerging market economies. We are bringing emerging market payment and capital networks onchain through our innovative product offerings." />
        </h2>

        <p className="mt-10 text-2xl md:text-3xl font-medium">
          <TextReveal text="Welcome to VIFILABS." />
        </p>
      </div>
    </section>
  );
}
