"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ProductVIFIFX() {
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
      style={{ background: "linear-gradient(180deg, #1C382F 0%, #152C25 100%)" }}
    >
  <div className="grid w-full grid-cols-1 items-start gap-[100px] px-[20px] py-8 md:h-full md:grid-cols-2 md:gap-16 md:items-center md:px-12 md:py-0">
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
              src="/vivifxvid.mp4"
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
              className="mb-6 text-4xl sm:text-5xl md:text-6xl font-thin tracking-wide leading-[1.1]"
            >
              ViFi
            </h2>
            <p
              className="mb-4 text-sm font-normal sm:text-base md:text-lg leading-7 md:leading-8 text-white/85"
            >
             ViFi is the world’s first capital-efficient decentralized exchange for emerging market stablecoins.
            </p>
            <p
              className="mb-4 text-sm font-normal sm:text-base md:text-lg leading-7 md:leading-8 text-white/85"
            >
          It enables real-time, onchain FX with near-zero slippage. By replacing cash swaps and OTC desks with programmable liquidity pools, ViFi FX delivers institutional grade FX infrastructure for merchants, wallets, fintechs, and banks.
          </p>
          <p
              className="mb-8 text-sm font-normal sm:text-base md:text-lg leading-7 md:leading-8 text-white/85"
            >
          The protocol allows seamless swaps between USD and local stablecoins, reducing dependence on intermediaries and improving price efficiency. Designed for the $540 billion crypto economy in Africa and LATAM, its novel AMM architecture unlocks deep, transparent liquidity for long-tail currencies. For the first time, providing liquidity for on-chain FX and local stablecoins is not only possible but profitable.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
