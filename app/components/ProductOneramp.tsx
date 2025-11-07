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
    <section className="h-full w-full bg-[#216e54] text-white pt-24 pb-12 md:py-20">
    <div className="grid h-full w-full grid-cols-1 items-start gap-12 px-[20px] py-8 md:grid-cols-2 md:gap-16 md:items-center md:px-12 md:py-0">
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
            className="relative aspect-[4/3] 
                       w-[min(90vw,420px)] 
                       sm:w-[min(80vw,480px)] 
                       md:w-[min(40vw,560px)]"
          >
            <Image
              src="/oneramp.png"
              alt="oneRamp"
              fill
              sizes="(min-width: 1280px) 560px, (min-width: 768px) 40vw, 80vw"
              className="object-contain translate-y-[clamp(16px,6vh,40px)] md:translate-y-0"
              priority
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
              className="mb-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]"
            >
              OneRamp
            </h2>
            <p
              className="mb-4 text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-white/85"
            >
              Nulla facilisi. Quisque tincidunt dapibus ligula id aliquet. Mauris vulputate nibh sed dolor finibus,
              sed mattis quam vehicula. Donec mollis eros mollis mauris feugiat, id aliquet augue placerat.
            </p>
            <p
              className="mb-8 text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-white/85"
            >
              Fusce vitae metus sodales, elementum tortor non, ornare urna. Mauris eget nisl neque. Aliquam sapien ipsum,
              mattis eu neque in, tristique vestibulum diam. Suspendisse finibus, lorem.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
