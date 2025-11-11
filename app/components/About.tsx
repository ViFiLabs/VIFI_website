"use client";
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import useIsLargeScreen from './hooks/useIsLargeScreen';

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const isLargeScreen = useIsLargeScreen();
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
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1]);
  // Corner radius: curved -> straight -> curved
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], [24, 0, 0]);
  // Content scale (more pronounced) to make text and image grow with the card (disabled on mobile)
  const rawContentScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1]);
  const contentScale = useSpring(
    useTransform(rawContentScale, (value) => (isLargeScreen ? value : 1)),
    { stiffness: 140, damping: 20, mass: 0.3 }
  );

  return (
    <div ref={aboutRef} className="h-[200vh] w-full">
      <motion.section
        style={{ scale, borderRadius }}
        className="h-screen flex items-center justify-center sticky top-0 overflow-hidden will-change-transform bg-white"
      >
  <div className="mx-auto w-full max-w-[calc(100vw-40px)] sm:max-w-[min(520px,94vw)] md:max-w-6xl bg-white rounded-[inherit] p-5 sm:p-6 md:p-10 lg:p-12">
          <motion.div
            style={{ scale: contentScale }}
            className="grid grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-12"
          >
            {/* Left: Copy */}
            <div className="order-2 flex flex-col gap-y-5 sm:gap-y-6 md:order-1 lg:gap-y-8 px-4 sm:px-6 md:px-0">
              <p className="text-[clamp(1.5rem,3.6vw,2.5rem)] font-semibold leading-snug tracking-tight text-neutral-900">
              We’re building ViFi because traditional financial infrastructure wasn’t made for us—or for the 3 billion people navigating informal and mobile-first economies.
              </p>
              <p className="text-[clamp(0.95rem,3.2vw,1.125rem)] font-normal leading-relaxed text-neutral-600">
              Emerging markets aren’t just underserved—they’re the future of global growth. There are more mobile wallets than bank accounts. More freelancers than formal employees. A remittance corridor moving over $700B annually—mostly via legacy rails.
              </p>
            </div>


            {/* Right: Image */}
            <div className="order-1 flex w-full items-center justify-center md:order-2">
              <div className="relative w-full h-[clamp(220px,38vh,360px)] max-w-[calc(100vw-40px)] sm:max-w-[min(440px,88vw)] overflow-hidden rounded-3xl">
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
