"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroOne() {
  return (
    <section
      className="h-screen snap-start relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/herobg.png')" }}
    >
      <div
        className="absolute inset-0"
        aria-hidden="true"
      />

      {/* Centerpiece image */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-10 px-5 py-20 sm:px-6 md:gap-0 md:px-10 md:py-0">
        {/* Animated culture-to-capital line */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="flex items-center w-full max-w-[1200px] gap-4 md:gap-8 px-6">
            <span className="text-xs md:text-sm font-medium uppercase tracking-[0.32em] text-emerald-300/80">
              Where<br className="md:hidden" /> Culture
            </span>
            <motion.span
              className="relative flex-1 h-px md:h-[2px] bg-emerald-300/40 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 1.6, ease: "easeInOut" }}
            >
              <span
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 h-0 w-0 border-l-[10px] border-l-emerald-300/60 border-y-[6px] border-y-transparent"
                aria-hidden="true"
              />
            </motion.span>
            <span className="text-xs md:text-sm font-medium uppercase tracking-[0.32em] text-emerald-300/80 text-right">
              Meets<br className="md:hidden" /> Capital
            </span>
          </div>
        </div>

        <div className="relative z-10 w-[min(88vw,420px)] aspect-[3/4] transition-all duration-500 md:w-[min(78vw,980px)] md:aspect-[16/9]">
          <Image
            src="/heroimg.png"
            alt="ViFi hero graphic"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 980px"
            className="object-contain drop-shadow-2xl"
          />

          <div className="absolute inset-0 hidden items-center justify-center pointer-events-none md:flex">
            <motion.h2
              className="text-center text-white font-light leading-tight text-[clamp(36px,6vw,72px)] max-w-[18ch]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              Powering parallel economies for the <span className="text-emerald-300">Global South.</span>
            </motion.h2>
          </div>
        </div>

        <motion.h2
          className="text-center text-white font-light leading-tight text-[clamp(30px,7vw,40px)] max-w-[22ch] md:hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Powering parallel economies for the <span className="text-emerald-300">Global South.</span>
        </motion.h2>
      </div>

      {/* Backers strip */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="relative w-[min(92vw,1100px)] max-w-[640px] md:max-w-none">
          <Image
            src="/backed.svg"
            alt="Backed by our partners"
            width={1100}
            height={120}
            className="w-full h-auto opacity-90"
            priority
          />
        </div>
      </div>
    </section>
  );
}
