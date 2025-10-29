"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";

export default function ProductReserveX() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageControls = useAnimation();
  const copyControls = useAnimation();
  const isInView = useInView(sectionRef, { amount: 0.45, margin: "-10% 0px -10% 0px" });

  useEffect(() => {
    if (isInView) {
      imageControls.start({ x: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } });
      copyControls.start({ y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut", delay: 0.15 } });
    } else {
      imageControls.start({ x: -160, opacity: 0, transition: { duration: 0.45, ease: "easeIn" } });
      copyControls.start({ y: 40, opacity: 0, transition: { duration: 0.45, ease: "easeIn" } });
    }
  }, [copyControls, imageControls, isInView]);

  return (
    <section
      ref={sectionRef}
      className="h-full w-full bg-[#296450] text-white pt-24 pb-12 md:py-20"
    >
  <div className="grid h-full w-full grid-cols-1 items-start gap-0 px-[20px] py-8 md:grid-cols-2 md:gap-16 md:items-center md:px-12 md:py-0">
        {/* Left: Image */}
        <div className="flex w-full items-start justify-center pt-[clamp(72px,18vh,120px)] -mb-[clamp(32px,8vh,64px)] md:items-center md:pt-0 md:mb-0">
          <motion.div
            className="relative aspect-[4/3] w-[min(80vw,560px)] md:w-[min(40vw,560px)]"
            initial={{ x: -160, opacity: 0 }}
            animate={imageControls}
          >
            <Image
              src="/reservex.svg"
              alt="reserveX"
              fill
              sizes="(min-width: 1280px) 560px, (min-width: 768px) 40vw, 80vw"
              className="object-contain translate-y-[clamp(24px,8vh,40px)] md:translate-y-0"
              priority
            />
          </motion.div>
        </div>
        {/* Right: Copy */}
  <div className="flex w-full items-start justify-center px-[20px] -translate-y-[clamp(24px,8vh,48px)] md:translate-y-0 md:items-center md:px-0">
          <motion.div
            className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8 w-full max-w-[calc(100vw-40px)] md:max-w-[560px] text-left"
            initial={{ y: 40, opacity: 0 }}
            animate={copyControls}
          >
            <h2 className="mb-6 text-5xl font-semibold tracking-tight md:text-6xl">reserveX</h2>
            <p className="mb-4 text-base leading-7 md:text-lg md:leading-8 text-white/85">
              Nulla facilisi. Quisque tincidunt dapibus ligula id aliquet. Mauris vulputate nibh sed dolor finibus,
              sed mattis quam vehicula. Donec mollis eros mollis mauris feugiat, id aliquet augue placerat.
            </p>
            <p className="mb-8 text-base leading-7 md:text-lg md:leading-8 text-white/85">
              Fusce vitae metus sodales, elementum tortor non, ornare urna. Mauris eget nisl neque. Aliquam sapien ipsum,
              mattis eu neque in, tristique vestibulum diam. Suspendisse finibus, lorem.
            </p>
            {/* <button className="rounded-full border border-white/30 px-6 py-2.5 text-sm text-white/90 hover:bg-white/10">
              HOME
            </button> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
