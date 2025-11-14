"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProductOneramp() {
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
      style={{ background: "linear-gradient(180deg, #2D906F 0%, #1F674F 100%)" }}
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
            className="relative w-[min(80vw,360px)] sm:w-[min(70vw,400px)] md:w-[min(28vw,420px)] overflow-hidden rounded-[24px] translate-y-[clamp(16px,6vh,40px)] md:translate-y-0"
          >
            <video
              src="/onerampvid.mp4"
              className="block h-auto w-full"
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
              className="mb-6 text-4xl sm:text-5xl md:text-6xl font-thin tracking-tight leading-[1.1]"
            >
              OneRamp
            </h2>
            <p
              className="mb-4 text-sm font-normal sm:text-base md:text-lg leading-7 md:leading-8 text-white/85"
            >
              OneRamp provides next-generation crypto-to-fiat infrastructure across Africa, connecting decentralized liquidity to real-world payment networks. 
            </p>
            <p
              className="mb-4 text-sm font-normal sm:text-base md:text-lg leading-7 md:leading-8 text-white/85"
            >
              Powered by ViFi’s proprietary FX protocol, OneRamp delivers competitive rates and near-instant crypto-to-mobile-money conversions. It allows diaspora users to send value home seamlessly while giving local businesses and wallets direct access to stablecoin liquidity.
            </p>
            <p
              className="mb-8 text-sm font-normal sm:text-base md:text-lg leading-7 md:leading-8 text-white/85"
            >
             Today, OneRamp serves seven African markets. Tomorrow, it becomes the bridge linking 200 million senders to 800 million recipients across the continent. ViFi Labs is building the rails to onboard one billion people into the future of finance.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
