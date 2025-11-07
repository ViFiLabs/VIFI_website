"use client";

import { motion } from "framer-motion";
import useIsLargeScreen from "./hooks/useIsLargeScreen";

export default function Tokenized() {
  const isLargeScreen = useIsLargeScreen();

  return (
    <section className="min-h-[60vh] bg-white text-neutral-900 snap-start flex items-center justify-center py-12 md:py-16">
      <div className="mx-auto w-full max-w-[calc(100vw-40px)] sm:max-w-6xl">
        {/* Combined top/bottom dividers with internal padding to avoid margin-collapsing */}
        <div className="w-full border-y border-neutral-400 px-5 sm:px-6 md:px-10">
          {/* Explicit spacer blocks to guarantee consistent spacing from dividers */}
          <div aria-hidden="true" className="h-[32px] sm:h-[48px]" />
          <div className="flex flex-col gap-8 md:grid md:grid-cols-12 md:gap-12 text-left">
            {/* Left: Title */}
            <motion.div
              className="md:col-span-4 flex flex-col items-start justify-center w-full"
              initial={{ opacity: isLargeScreen ? 0 : 1, x: isLargeScreen ? 40 : 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={isLargeScreen ? { once: true, amount: 0.4 } : undefined}
            >
              <h2 className="mb-6 text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]">Tokenized Futures</h2>
            </motion.div>

            {/* Middle: Bold paragraph (20px) */}
            <motion.div
              className="md:col-span-4 flex flex-col items-start justify-center w-full"
              initial={{ opacity: isLargeScreen ? 0 : 1, x: isLargeScreen ? 40 : 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: isLargeScreen ? 0.15 : 0 }}
              viewport={isLargeScreen ? { once: true, amount: 0.4 } : undefined}
            >
              <p className="mb-4 text-[16px] sm:text-lg md:text-xl font-semibold leading-7 md:leading-8 text-neutral-900">
                As Wall Street experiments with tokenized private credit and broadens access with blockchain-enabled funds at $25 entry points, the long-term alpha from crypto exposure continues to compress.
              </p>
            </motion.div>

            {/* Right: Supporting paragraph (18px) */}
            <motion.div
              className="md:col-span-4 flex flex-col items-start justify-center w-full"
              initial={{ opacity: isLargeScreen ? 0 : 1, x: isLargeScreen ? 40 : 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: isLargeScreen ? 0.3 : 0 }}
              viewport={isLargeScreen ? { once: true, amount: 0.4 } : undefined}
            >
              <p className="mb-8 text-[15px] sm:text-base md:text-lg leading-7 md:leading-8 text-neutral-700">
                African and LATAM fund managers cannot afford to watch from the sidelines — they must embrace tokenized real-world assets and blockchain rails now, or risk being permanently left behind in the next wave of financial innovation.
              </p>
            </motion.div>
          </div>
          <div aria-hidden="true" className="h-[32px] sm:h-[48px]" />
        </div>
      </div>
    </section>
  );
}
