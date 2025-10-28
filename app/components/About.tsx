"use client";
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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
  // Section scale (subtle): zooms out -> slightly in -> rest
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 1]);
  // Corner radius: curved -> straight -> curved
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], [24, 0, 0]);
  // Content scale (more pronounced) to make text and image grow with the card
  const contentScale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.1, 1]),
    { stiffness: 140, damping: 20, mass: 0.3 }
  );

  return (
    <div ref={aboutRef} className="h-[200vh] w-full">
      <motion.section
        style={{ scale, borderRadius }}
        className="h-screen flex items-center justify-center sticky top-0 overflow-hidden will-change-transform bg-white"
      >
        <div className="mx-auto w-full max-w-6xl bg-white rounded-[inherit] p-6 md:p-10 lg:p-12">
          <motion.div style={{ scale: contentScale }} className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            {/* Left: Copy */}
            <div className="flex flex-col gap-y-6 sm:gap-y-8 lg:gap-y-8">
              <p className="text-4xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-900">
              We’re building ViFi because traditional financial infrastructure wasn’t made for us—or for the 3 billion people navigating informal and mobile-first economies.
              </p>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed text-neutral-600">
              Emerging markets aren’t just underserved—they’re the future of global growth. There are more mobile wallets than bank accounts. More freelancers than formal employees. A remittance corridor moving over $700B annually—mostly via legacy rails.
              </p>
            </div>


            {/* Right: Image */}
            <div className="flex w-full items-center justify-center">
              <div className="relative aspect-square w-full max-w-[440px] overflow-hidden rounded-xl">
                <Image
                  src="/about.png"
                  alt="About ViFi"
                  fill
                  sizes="(min-width: 1024px) 440px, 60vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
