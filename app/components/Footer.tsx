"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const [isDesktop, setIsDesktop] = useState(false);
  const inViewOptions = useMemo(
    () => ({ amount: isDesktop ? 0.45 : 0.2, margin: "-10% 0px -10% 0px" }),
    [isDesktop]
  );
  const inView = useInView(imageRef, inViewOptions as unknown as any);

  const headingRef = useRef<HTMLDivElement | null>(null);
  const headingControls = useAnimation();
  const headingInView = useInView(headingRef, { amount: 0.75, margin: "-5% 0px -15% 0px" } as unknown as any);

  const mobileHeadingRef = useRef<HTMLDivElement | null>(null);
  const mobileHeadingControls = useAnimation();
  const mobileHeadingInView = useInView(mobileHeadingRef, { amount: 0.6, margin: "-15% 0px -20% 0px" } as unknown as any);

  const copyRef = useRef<HTMLDivElement | null>(null);
  const copyControls = useAnimation();
  const copyInView = useInView(copyRef, { amount: 0.6, margin: "-10% 0px -15% 0px" } as unknown as any);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaQueryChange);
    } else {
      mediaQuery.addListener(handleMediaQueryChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaQueryChange);
      } else {
        mediaQuery.removeListener(handleMediaQueryChange);
      }
    };
  }, []);

  const hiddenImageState = useMemo(
    () => ({ x: -240, y: 0, rotate: -8, scale: 1, opacity: 0 }),
    []
  );

  const visibleImageState = useMemo(
    () => ({ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }),
    []
  );

  const hasInitializedImage = useRef(false);

  useEffect(() => {
    if (!hasInitializedImage.current) {
      controls.set(inView ? visibleImageState : hiddenImageState);
      hasInitializedImage.current = true;
      return;
    }

    if (inView) {
      controls.start({ ...visibleImageState, transition: { duration: 1.1, ease: "easeOut" } });
    } else {
      controls.start({ ...hiddenImageState, transition: { duration: 0.6, ease: "easeIn" } });
    }
  }, [controls, hiddenImageState, inView, visibleImageState]);

  useEffect(() => {
    if (headingInView) {
      headingControls.start({ scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } });
    } else {
      headingControls.start({ scaleX: 0, opacity: 0, transition: { duration: 0.5, ease: "easeIn" } });
    }
  }, [headingControls, headingInView]);

  useEffect(() => {
    if (copyInView) {
      copyControls.start("visible");
    } else {
      copyControls.start("hidden");
    }
  }, [copyControls, copyInView]);

  useEffect(() => {
    if (mobileHeadingInView) {
      mobileHeadingControls.start("visible");
    } else {
      mobileHeadingControls.start("hidden");
    }
  }, [mobileHeadingControls, mobileHeadingInView]);

  return (
    <>
      <div className="relative min-h-[100vh]">
        <div className="sticky top-0 h-screen bg-gradient-to-b from-[#191919] to-[#188257] z-20 shadow-xl">
          {/* Heading + rule positioned responsively */}
          <div
            ref={headingRef}
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-[clamp(64px,12vh,128px)] items-center gap-6"
          >
            <motion.div
              className="relative h-[2px] w-[clamp(6rem,20vw,24rem)] origin-right bg-emerald-400/60"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={headingControls}
            >
              <span
                aria-hidden="true"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 h-0 w-0 border-l-[12px] border-l-emerald-400/60 border-y-[7px] border-y-transparent"
              />
            </motion.div>
              <h1 className="whitespace-nowrap text-4xl md:text-6xl lg:text-6xl font-light text-white">Our Team</h1>
            <motion.div
              className="relative h-[2px] w-[clamp(6rem,20vw,24rem)] origin-left bg-emerald-400/60"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={headingControls}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 h-0 w-0 border-r-[12px] border-r-emerald-400/60 border-y-[7px] border-y-transparent"
              />
            </motion.div>
          </div>

         {/* Outer layout container */}
            <div className="relative h-full w-full flex items-center justify-center md:justify-start">
              <div className="w-full max-w-[1400px] flex flex-col items-center gap-10 px-6 sm:px-10 md:flex-row md:items-center md:justify-between md:gap-0 md:px-0 lg:px-0 xl:px-0">
              {/* Left: decorative image */}
              <motion.div
                ref={imageRef}
                className="relative h-[clamp(240px,55vh,540px)] w-full max-w-[520px] flex-shrink-0 self-start md:self-center md:h-[clamp(320px,75vh,820px)] md:w-[clamp(280px,45vw,760px)]"
                animate={controls}
                initial={hiddenImageState}
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
              <div
                ref={copyRef}
                className="flex w-full flex-col gap-y-3 sm:gap-y-5 lg:gap-y-8 justify-center text-left max-w-[calc(100vw-40px)] md:max-w-[min(65ch,520px)] text-white px-3 sm:px-5 md:px-0 md:pl-10 lg:pl-16 xl:pl-20"
              >
                <div
                  ref={mobileHeadingRef}
                  className="md:hidden flex w-full flex-col items-start gap-3 text-left pr-5"
                >
                  <motion.div
                    className="flex w-full items-center gap-3"
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
                    }}
                    initial="hidden"
                    animate={mobileHeadingControls}
                  >
                    <h2 className="text-[30px] leading-[1.2] font-light">Our Team</h2>
                    <motion.div
                      className="relative h-[2px] flex-1 origin-right bg-emerald-400/60"
                      variants={{
                        hidden: { scaleX: 0, opacity: 0 },
                        visible: {
                          scaleX: 1,
                          opacity: 1,
                          transition: { duration: 0.6, ease: "easeOut", delay: 0.15 },
                        },
                      }}
                      initial="hidden"
                      animate={mobileHeadingControls}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 h-0 w-0 border-y-[6px] border-y-transparent border-r-[14px] border-r-emerald-400/60"
                      />
                    </motion.div>
                  </motion.div>
                </div>
                <motion.p
                  className="text-[15px] sm:text-[18px] lg:text-xl leading-relaxed text-neutral-200 mb-5 md:mb-12"
                  variants={{
                    hidden: { opacity: 0, x: 60 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.3 } },
                  }}
                  initial="hidden"
                  animate={copyControls}
                >
                  We’re not outsiders trying to “unlock” emerging markets. We live here. We build here. Our families transact on
                  mobile money, buy airtime with USSD, and pool money in group chats. ViFi is what we wish existed five years ago.
                </motion.p>

                <motion.p
                  className="text-[16px] sm:text-[30px] lg:text-[42px] leading-tight text-white"
                  variants={{
                    hidden: { opacity: 0, x: 80 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.65 } },
                  }}
                  initial="hidden"
                  animate={copyControls}
                >
                  Now we’re building it — for everyone else who’s been left out of the system.
                </motion.p>
              </div>
            </div>
            </div>
        </div>
      </div>

      {/* footer parallax */}
      <footer className="sticky bottom-0 z-auto h-[40vh] w-full bg-[#2AE89B] flex items-center justify-center px-6">
        <p className="text-center text-[36px] md:text-[54px] font-bold leading-tight text-black max-w-[900px]">
          Now we’re building it—for everyone else who’s been left out of the system.
        </p>
      </footer>
    </>
  );
}
