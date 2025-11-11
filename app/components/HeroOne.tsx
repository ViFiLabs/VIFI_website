"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroOne() {
  const logos = [
    { src: "/baseecosystemfund.svg", alt: "base ecosystem fund" },
    { src: "/scroll.svg", alt: "Scroll" },
    { src: "/bankless.svg", alt: "Bankless" },
  ];

  return (
    <section
      className="relative min-h-screen snap-start bg-cover bg-center bg-no-repeat flex flex-col justify-between"
      style={{ backgroundImage: "url('/herobg.png')" }}
    >
      {/* Top content wrapper */}
      <div className="flex flex-col items-center justify-center flex-grow px-5 pt-20 pb-24 sm:px-6 md:px-10 md:pb-32 relative z-10">
        
        {/* Animated culture-to-capital line */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="flex items-center w-full max-w-[calc(100vw-40px)] md:max-w-[1200px] gap-4 md:gap-8 px-6">
            <span className="text-xs md:text-sm font-medium capitalize tracking-[0.05em] text-[#2AE89B]">
              Where<br className="md:hidden" /> Culture
            </span>
            <motion.span
              className="relative flex-1 h-[1px] md:h-[1px] bg-emerald-300/40 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 1.6, ease: "easeInOut" }}
            >
              <span
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 h-0 w-0 border-l-[10px] border-l-emerald-300/60 border-y-[7px] border-y-transparent"
                aria-hidden="true"
              />
            </motion.span>
            <span className="text-xs md:text-sm font-medium capitalize tracking-[0.05em] text-[#2AE89B] text-right">
              Meets<br className="md:hidden" /> Capital
            </span>
          </div>
        </div>

        {/* Hero image + text */}
        <div className="relative z-10 h-[260px] w-[220px] transition-all duration-500 md:w-[min(78vw,980px)] md:aspect-[16/9] md:h-auto">
          <Image
            src="/heroimg.png"
            alt="ViFi hero graphic"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 980px"
            className="object-contain drop-shadow-2xl"
          />

          {/* Desktop H2 */}
          <div className="absolute bottom-0 left-0 hidden pointer-events-none md:flex md:w-full md:justify-start">
            <motion.h2
              className="text-left text-white font-thin leading-tight text-[clamp(36px,6vw,72px)] max-w-[20ch] md:px-4 md:pb-6 tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              Bringing emerging 
              <br className="hidden md:block" />
              market economies
              <br className="hidden md:block" />
              <span className="text-[#2AE89B]">onchain</span>
            </motion.h2>
          </div>
        </div>

        {/* Mobile H2 */}
        <motion.h2
          className="text-center text-white font-light leading-tight text-[clamp(30px,7vw,40px)] max-w-[22ch] mt-8 md:hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Bringing emerging market economies {" "}
          <span className="text-[#2AE89B]">onchain</span>
        </motion.h2>
      </div>

      {/* Backers strip (in normal flow, not absolute) */}
      <div className="relative z-20 flex justify-center bottom-4 md:bottom-8">
        <div className="w-[min(75vw,750px)]">
          <div className="flex h-[80px] flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-white/10 px-6 py-3 text-white backdrop-blur-[11px] md:h-[100px] md:flex-row md:justify-around md:gap-10 md:px-10 md:py-0">
            <p className="w-full text-center text-xs font-medium capitalize tracking-[0.05em] text-white/70 md:w-auto md:text-sm">
              Backed by
            </p>
            <div className="flex w-full items-center justify-center gap-4 md:w-auto md:justify-around md:gap-10">
              {logos.map((logo, index) => (
                <motion.div
                  key={logo.alt}
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.5, ease: "easeOut" }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={112}
                    height={40}
                    className="h-6 w-auto opacity-90 md:h-10"
                    priority
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
