"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const inView = useInView(imageRef, { amount: 0.45, margin: "-10% 0px -10% 0px" });

  useEffect(() => {
    if (inView) {
      controls.start({ x: 0, rotate: 0, opacity: 1, transition: { duration: 1.1, ease: "easeOut" } });
    } else {
      controls.start({ x: -240, rotate: -8, opacity: 0, transition: { duration: 0.6, ease: "easeIn" } });
    }
  }, [controls, inView]);

  return (
    <>
      <div className="relative min-h-[200vh]">
        <div className="sticky top-0 h-screen bg-gradient-to-b from-[#191919] to-[#188257] z-20 shadow-xl">
          {/* Heading + rule positioned responsively */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[clamp(64px,12vh,128px)] flex items-center gap-6">
            <h1 className="text-5xl md:text-6xl lg:text-6xl font-light">Our Team</h1>
          </div>

         {/* Outer layout container */}
            <div className="relative h-full w-full flex items-center justify-between">
              <div className="w-full max-w-[1400px] flex items-center justify-between px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28">
              {/* Left: decorative image */}
              <motion.div
                ref={imageRef}
                className="relative h-[clamp(320px,90vh,820px)] w-[clamp(280px,45vw,760px)] flex-shrink-0 self-center ml-0"
                initial={{ x: -240, rotate: -8, opacity: 0 }}
                animate={controls}
              >
                <Image
                  src="/footer.svg"
                  alt="ViFi abstract brand shape"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-left"
                />
              </motion.div>

             {/* Right: copy block */}
              <div className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8 justify-center max-w-[min(65ch,480px)] text-white">

                  <div className="h-[2px] w-[clamp(8rem,25vw,28rem)] bg-emerald-400/50 mb-40"  />
                
                  <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-neutral-200 mb-12">
                    We’re not outsiders trying to “unlock” emerging markets. We live here. We build here. Our families transact on mobile money, buy airtime with USSD, and pool money in group chats. ViFi is what we wish existed five years ago.
                  </p>

                  <p className="text-2xl sm:text-3xl lg:text-4xl leading-none text-white">
                    Now we’re building it — for everyone else who’s been left out of the system.
                  </p>
                
              </div>
            </div>
            </div>
        </div>
      </div>

      {/* footer parallax */}
      <footer className="sticky bottom-0 z-auto h-[20vh] w-full bg-black flex items-center justify-center text-white text-xl font-semibold">
        footer
      </footer>
    </>
  );
}
