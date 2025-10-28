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
    // Start when this section's top hits the viewport center,
    // finish when this section's center hits the viewport center
    offset: ['start center', 'center center']
  });
  // Use this adjusted progress directly (0..1 in the desired window)
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
    <section
      ref={sectionRef}
      className="min-h-screen snap-start flex flex-col justify-around items-center bg-gradient-to-b from-[#192621] to-[#191919] px-6 py-12 md:py-16"
    >
       {/* explainer */}
      <div className="max-w-5xl mx-auto text-center">
        <p className="tracking-[0.35em] text-xs md:text-sm uppercase mb-6">
          <TextReveal text="POWERING PARALLEL ECONOMIES FOR THE GLOBAL SOUTH" />
        </p>

        <h2 className="text-2xl md:text-4xl lg:text-4xl xl:text-5xl font-medium leading-relaxed md:leading-relaxed lg:leading-[1.2]">
          <TextReveal text="ViFi Labs is a technology studio that brings emerging market economies. We are bringing emerging market payment and capital networks onchain through our innovative product offerings." />
        </h2>
      </div>

      {/* Our Products summary */}
  <div className="mx-auto w-full max-w-6xl border-t border-[#216e54]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          <p className="text-sm md:text-base font-medium text-white/80 text-center md:text-left">Our Products</p>
          <p className="md:col-span-2 text-lg leading-relaxed text-white/70 text-center md:text-left">
            ViFi Labs delivers the infrastructure that emerging markets need most — FX swaps, tokenized reserves,
            and seamless remittances — building a borderless financial system designed for the billions still excluded.
          </p>
        </div>
      </div>
    </section>
  );
}
