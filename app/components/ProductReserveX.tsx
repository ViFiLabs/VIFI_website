"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ProductReserveX() {
  const [enableAnimation, setEnableAnimation] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateMatch = () => setEnableAnimation(mediaQuery.matches);

    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);
    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, []);

  return (
    <section
      className="w-full text-white pt-24 pb-12 md:h-full md:py-20"
      style={{ background: "linear-gradient(180deg, #286550 0%, #1B4F3E 100%)" }}
    >
  <div className="grid w-full grid-cols-1 items-start gap-[100px] px-[20px] py-8 md:h-full md:grid-cols-2 md:gap-16 md:items-center md:px-12 md:py-0 ">
        {/* Left: Image */}
        <motion.div
          className="flex w-full items-start justify-center pt-[clamp(48px,12vh,120px)] -mb-[clamp(24px,6vh,64px)] md:items-center md:pt-0 md:mb-0"
          initial={enableAnimation ? { x: -140, opacity: 0 } : { x: 0, opacity: 1 }}
          whileInView={enableAnimation ? { x: 0, opacity: 1 } : undefined}
          animate={enableAnimation ? undefined : { x: 0, opacity: 1 }}
          transition={enableAnimation ? { duration: 0.8, ease: "easeOut" } : undefined}
          viewport={enableAnimation ? { amount: 0.4, once: false } : undefined}
        >
          <div
            className="relative aspect-[4/3] w-[min(90vw,420px)] sm:w-[min(80vw,480px)] md:w-[min(40vw,560px)] overflow-hidden rounded-[24px] translate-y-[clamp(16px,6vh,40px)] md:translate-y-0"
          >
            <video
              src="/reservexnew.mp4"
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </motion.div>

        {/* Right: Copy */}
        <motion.div
          className="flex w-full items-start justify-center px-[20px] -translate-y-[clamp(16px,6vh,48px)] md:translate-y-0 md:items-center md:px-0"
          initial={enableAnimation ? { x: 140, opacity: 0 } : { x: 0, opacity: 1 }}
          whileInView={enableAnimation ? { x: 0, opacity: 1 } : undefined}
          animate={enableAnimation ? undefined : { x: 0, opacity: 1 }}
          transition={enableAnimation ? { duration: 0.8, ease: "easeOut", delay: 0.1 } : undefined}
          viewport={enableAnimation ? { amount: 0.4, once: false } : undefined}
        >
          <div className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8 w-full max-w-[calc(100vw-40px)] md:max-w-[560px] text-left">
            <h2
              className="mb-6 text-4xl font-thin sm:text-5xl md:text-6xl tracking-wide leading-[1.1]"
            >
              ReserveX
            </h2>
            <p
              className="mb-4 text-sm font-normal sm:text-base md:text-lg leading-7 md:leading-8 text-white/85"
            >
            ReserveX is ViFi Labs’ RWA infrastructure protocol enabling the tokenization of emerging market bonds and securities.
            </p>
            <p
              className="mb-4 text-sm font-normal sm:text-base md:text-lg leading-7 md:leading-8 text-white/85"
            >
            Global tokenization remains concentrated in U.S. fixed income, leaving local-currency debt in Africa and LATAM largely untapped. ReserveX changes this by introducing transparent, programmable infrastructure for issuance and settlement.            </p>
            <p
              className="mb-8 text-sm font-normal sm:text-base md:text-lg leading-7 md:leading-8 text-white/85"
            >
            Built for asset managers, banks, and fintechs, it connects emerging economies to global liquidity, creating efficient issuance, settlement, and yield discovery in the next frontier of tokenized finance.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
