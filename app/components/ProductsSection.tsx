"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductOneramp from './ProductOneramp';
import ProductReserveX from './ProductReserveX';
import ProductVIFIFX from './ProductVIFIFX';

export default function ProductsSection() {
  const products = useMemo(() => [
    <ProductVIFIFX key="vififx" />,
    <ProductReserveX key="reservex" />,
    <ProductOneramp key="oneramp" />
  ], []);

  // Labels and colors for the rails (left/right tabs)
  const titles = useMemo(() => ["vifiFX", "reserveX", "oneRamp"], []);
  const colors = useMemo(() => [
    '#1c392f', // dark green for vifiFX
    '#296450', // green for reserveX
    '#216e54', // light green for oneRamp
  ], []);

  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Bind to the custom scroll container (falls back to window on first render)
  const initialContainer = typeof document !== 'undefined'
    ? (document.querySelector('[data-scroll-container="main"]') as HTMLElement | null)
    : null;
  const containerRef = useRef<HTMLElement | null>(initialContainer);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: containerRef,
    offset: ['start start', 'end start']
  });

  // Measure viewport width of the sticky container so our translateX is in pixels
  const [vw, setVw] = useState(0);
  useEffect(() => {
    const measure = () => {
      const el = stickyRef.current;
      if (el) setVw(el.getBoundingClientRect().width);
      else if (typeof window !== 'undefined') setVw(window.innerWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Layout constants
  const railWidth = 88; // px per tab
  const railGap = 64;   // px (2rem) horizontal offset between stacked tabs
  const outerMarginLeft = 24; // px margin from the viewport edge
  const outerMarginRight = 24; // px margin from the viewport edge

  // Reserve max stacking width so layout doesn't shift as stacks grow/shrink
  const maxLeftRails = products.length;      // at the last slide, all tabs visible on the left
  const maxRightRails = products.length - 1; // at the first slide, upcoming tabs on the right

  // Width occupied by a rail stack = railWidth + (count-1)*railGap (stacked inward)
  const leftRailsWidth = railWidth + Math.max(0, maxLeftRails - 1) * railGap;
  const rightRailsWidth = railWidth + Math.max(0, maxRightRails - 1) * railGap;

  // Gutters include the outer margin plus the maximum stack widths
  const leftGutter = outerMarginLeft + leftRailsWidth;
  const rightGutter = outerMarginRight + rightRailsWidth;

  // Give enough vertical space to complete all slide-ins
  const totalHeight = `${products.length * 100}vh`;

  // Track active index to drive a base background fill and stack order
  const count = products.length;
  const segment = 1 / count;
  const [active, setActive] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const idx = Math.min(count - 1, Math.max(0, Math.floor(v / segment)));
      setActive(idx);
    });
    return () => unsub();
  }, [scrollYProgress, count, segment]);

  return (
    <div ref={sectionRef} className="relative w-full" style={{ height: totalHeight }}>
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative h-full w-full">
          {/* Base background fill to eliminate any seams/gaps (match current slide) */}
          <div className="absolute inset-0" style={{ backgroundColor: colors[active] }} />
          {/* Right gutter background should match the upcoming slide so previous doesn't peek */}
          <div
            className="absolute inset-y-0 right-0"
            style={{ width: rightGutter, backgroundColor: colors[Math.min(active + 1, count - 1)] }}
          />
          {products.map((product, i) => {
            // First slide is static at x=0. Subsequent slides slide in from right to left
            const segment = 1 / products.length;
            const start = Math.max(0, (i - 1) * segment);
            const end = Math.min(1, i * segment);
            const x = i === 0
              ? 0
              : useTransform(scrollYProgress, [start, end], [Math.max(0, vw - leftGutter), 0]);

            return (
              <motion.div
                key={i}
                style={{ x, left: leftGutter, width: `calc(100% - ${leftGutter + rightGutter}px)` }}
                className="absolute top-0 bottom-0 h-full overflow-hidden rounded-l-xl"
                // Later slides are above earlier ones so they slide over
                
              >
                {product}
              </motion.div>
            );
          })}

          {/* Rails overlay (left and right) */}
          <Rails
            scrollYProgress={scrollYProgress}
            titles={titles}
            colors={colors}
            leftGutter={leftGutter}
            rightGutter={rightGutter}
            railWidth={railWidth}
            railGap={railGap}
            outerMarginLeft={outerMarginLeft}
            outerMarginRight={outerMarginRight}
          />
        </div>
      </div>
    </div>
  );
}

function Rails({
  scrollYProgress,
  titles,
  colors,
  leftGutter,
  rightGutter,
  railWidth,
  railGap,
  outerMarginLeft,
  outerMarginRight,
}: {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  titles: string[];
  colors: string[];
  leftGutter: number;
  rightGutter: number;
  railWidth: number;
  railGap: number;
  outerMarginLeft: number;
  outerMarginRight: number;
}) {
  const count = titles.length;
  const segment = 1 / count;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const idx = Math.min(count - 1, Math.max(0, Math.floor(v / segment)));
      setActive(idx);
    });
    return () => unsub();
  }, [scrollYProgress, segment, count]);

  // Left side: show previous (including current) stacked from left edge inward
  // Reverse so the first color is outermost (far left), current is nearest content
  const leftIndices = Array.from({ length: active + 1 }, (_, i) => i);
  // Right side: show upcoming stacked from right edge inward
  const rightIndices = Array.from({ length: Math.max(0, count - (active + 1)) }, (_, i) => active + 1 + i);

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Left rails */}
      <div className="absolute inset-y-0 left-0" style={{ width: leftGutter }}>
        {(() => {
          const lc = leftIndices.length;
          const stackWidth = lc > 0 ? (railWidth + (lc - 1) * railGap) : 0;
          const pad = Math.max(0, leftGutter - stackWidth);
          // Leave this padding area blank so no extra colored strip appears
          return pad > 0 ? null : null;
        })()}
        {leftIndices.map((idx, s) => (
          <div key={`L-${idx}`} className="absolute inset-y-0" style={{ left: outerMarginLeft + s * railGap, width: railWidth }}>
            <div className="h-full rounded-l-xl" style={{ backgroundColor: colors[idx] }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 text-[11px] tracking-wider text-white/85">
              {titles[idx]}
            </div>
          </div>
        ))}
      </div>

      {/* Right rails */}
      <div className="absolute inset-y-0 right-0" style={{ width: rightGutter }}>
        {(() => {
          const rc = rightIndices.length;
          const stackWidth = rc > 0 ? (railWidth + (rc - 1) * railGap) : 0;
          const pad = Math.max(0, rightGutter - stackWidth);
          return pad > 0 ? null : null;
        })()}
        {[...rightIndices].reverse().map((idx, s) => (
          <div key={`R-${idx}`} className="absolute inset-y-0" style={{ right: s * railGap, width: railWidth }}>
            <div className="h-full rounded-l-xl" style={{ backgroundColor: colors[idx] }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[11px] tracking-wider text-white/85">
              {titles[idx]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
