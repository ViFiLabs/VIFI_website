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
    // Start when this section's top reaches the viewport center, finish when bottom crosses center
    offset: ['start center', 'end center']
  });
  // Accelerate reveal by completing animations within the first 70% of the scroll window
  const progress = useTransform(scrollYProgress, [0, 0.7], [0, 1], { clamp: true });
  const borderProgress = useTransform(progress as MotionValue<number>, [0.25, 0.85], [0, 1], { clamp: true });

  // Per-word reveal component
  function Word({ text, index, total }: { text: string; index: number; total: number }) {
    const t = total > 1 ? index / (total - 1) : 1;
    const falloff = 0.08; // smoothness of transition per word
    const start = Math.max(0, t - falloff);
    const end = Math.min(1, t + falloff);
  const color = useTransform(progress as MotionValue<number>, [start, t, end], ['#6A6A6A', '#e5e7eb', '#ffffff']);
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
      className="min-h-screen flex flex-col justify-around items-center bg-gradient-to-b from-[#192621] to-[#191919] py-12 md:py-16"
    >
       {/* explainer */}
      <div className="mx-auto w-full max-w-[calc(100vw-40px)] text-center py-10 md:max-w-5xl md:py-12">
        <h2 className="text-2xl md:text-4xl lg:text-4xl xl:text-5xl font-extralight leading-relaxed md:leading-relaxed lg:leading-[1.2]">
          <TextReveal text="ViFi Labs is a technology studio that powers emerging market economies. We are bringing emerging market payment and capital networks onchain through our innovative product offerings." />
        </h2>
      </div>

      {/* Our Products summary */}
      <div className="mx-auto w-full max-w-[calc(100vw-40px)] md:max-w-6xl relative">
        <div className="md:hidden w-full text-left mb-6">
          <p className="text-[30px] leading-[38px] font-thin text-white/80 mb-3">Our Products</p>
          <motion.div
            className="h-px bg-[#216e54]/80 origin-left"
            style={{ scaleX: borderProgress }}
          />
        </div>

        <motion.div
          className="absolute left-0 top-0 hidden w-full h-px bg-[#216e54]/80 origin-left md:block md:h-[2px]"
          style={{ scaleX: borderProgress }}
        />
        <div aria-hidden="true" className="hidden h-[60px] md:block" />
        <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-3 md:gap-8">
          <p className="hidden text-sm font-thin text-white/80 md:block md:text-base">Our Products</p>
          <p className="md:col-span-2 text-[18px] leading-[26px] text-white/70 md:text-lg md:leading-relaxed">
            ViFi Labs is building financial infrastructure for emerging markets, starting with FX swaps, tokenized reserves, and seamless remittances. We’re creating a borderless system designed to serve the billions who remain financially excluded.
          </p>
        </div>
      </div>
    </section>
  );
}
