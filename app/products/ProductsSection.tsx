"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductOneramp from '../components/ProductOneramp';
import ProductReserveX from '../components/ProductReserveX';
import ProductVIFIFX from '../components/ProductVIFIFX';

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
  const railWidth = 80; // px per tab (Figma spec)
  const railGap = 64;   // px (2rem) horizontal offset between stacked tabs
  const innerGutter = railWidth; // keep a full tab-width gutter between rails and panel
  const railRadius = 20; // px target radius per spec
  const slowWindowPx = 36; // px of eased slowdown as panel approaches gutter (more pronounced glide)
  const overshootPxDefault = 6; // tiny overshoot distance for floaty feel
  // Left keeps a margin equal to railGap; right starts at margin 0 (flush to edge)
  const outerMarginLeft = railGap;
  const outerMarginRight = 0;

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
      const EPS = 0.002; // delay boundary flip slightly to avoid premature snapping
      const idx = Math.min(count - 1, Math.max(0, Math.floor((v + EPS) / segment)));
      setActive(idx);
    });
    return () => unsub();
  }, [scrollYProgress, count, segment]);

  return (
    <div ref={sectionRef} className="relative w-full bg-black" style={{ height: totalHeight }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden rounded-l-[20px] bg-black"
        style={{ borderTopLeftRadius: railRadius, borderBottomLeftRadius: railRadius }}
      >
  <div className="relative h-full w-full" style={{ borderTopLeftRadius: railRadius, borderBottomLeftRadius: railRadius }}>
          {/* Base background fill to eliminate any seams/gaps (match current slide) */}
          <div className="absolute inset-0 z-0" style={{ backgroundColor: colors[active], borderTopLeftRadius: railRadius, borderBottomLeftRadius: railRadius }} />
          {/* Ensure area left of the rails remains blank/background-colored */}
          <div
            className="absolute inset-y-0 left-0 z-0"
            style={{ width: outerMarginLeft + railRadius + 2, backgroundColor: '#000', borderTopLeftRadius: railRadius, borderBottomLeftRadius: railRadius }}
          />
          {/* Right gutter background matches upcoming slide but only for the width of visible right rails */}
          {(() => {
            const remaining = Math.max(0, count - (active + 1));
            if (remaining === 0) return null;
            const width = outerMarginRight + railWidth + Math.max(0, remaining - 1) * railGap;
            return (
              <div
                className="absolute inset-y-0 right-0 z-0"
                style={{ width, backgroundColor: colors[Math.min(active + 1, count - 1)] }}
              />
            );
          })()}
          {products.map((product, i) => {
            // First slide is static at x=0. Subsequent slides slide in from right to left
            const segment = 1 / products.length;
            const start = Math.max(0, (i - 1) * segment);
            const end = Math.min(1, i * segment);
            // Align to the CURRENT left rails plus inner gutter so panels always meet the rail margin
            const leftOffset = outerMarginLeft + railWidth + active * railGap + innerGutter;
            // Safe padding on the right so content never sits under the right rails
            const remainingWhenActive = Math.max(0, count - (i + 1));
            const rightRailsWidthWhenActive = remainingWhenActive > 0
              ? (railWidth + Math.max(0, remainingWhenActive - 1) * railGap)
              : 0;
            const rightSafePadding = outerMarginRight + rightRailsWidthWhenActive + 24; // +24px breathing space
            const x = i === 0
              ? 0
              : (() => {
                  const fromX = Math.max(0, vw - leftOffset);
                  const slowPx = Math.min(slowWindowPx, fromX);
                  const overshootPx = Math.min(overshootPxDefault, Math.max(0, slowPx * 0.6));
                  const tiny = 1e-6;
                  return useTransform(scrollYProgress, (v) => {
                    if (v <= start) return fromX;
                    if (v >= end) return 0;
                    const t = (v - start) / Math.max(end - start, tiny); // 0..1
                    const linEnd = fromX > 0 ? Math.max(0, 1 - slowPx / Math.max(fromX, tiny)) : 0.5; // linear phase end
                    if (t <= linEnd) {
                      const linT = linEnd > 0 ? t / linEnd : 1;
                      return fromX - (fromX - slowPx) * linT;
                    }
                    // Remaining time window after linear phase
                    const rem = Math.max(1 - linEnd, tiny);
                    // Split remaining time proportionally: approach (slowPx+overshoot) vs recoil (overshoot)
                    const approachDist = slowPx + overshootPx;
                    const recoilDist = Math.max(overshootPx, tiny);
                    const mid = linEnd + rem * (approachDist / (approachDist + recoilDist));

                    if (t <= mid) {
                      // Approach: ease-out-quint from slowPx -> -overshootPx
                      const k = (t - linEnd) / Math.max(mid - linEnd, tiny);
                      const easeOutQuint = 1 - Math.pow(1 - k, 5);
                      return slowPx - (slowPx + overshootPx) * easeOutQuint;
                    }
                    // Recoil: ease-in-out (sine) from -overshootPx -> 0
                    const k2 = (t - mid) / Math.max(1 - mid, tiny);
                    const easeInOutSine = (u: number) => 0.5 * (1 - Math.cos(Math.PI * u));
                    return -overshootPx * (1 - easeInOutSine(k2));
                  });
                })();

            return (
              <motion.div
                key={i}
                style={{ x, left: leftOffset, width: `calc(100% - ${leftOffset}px)`, borderTopLeftRadius: railRadius, borderBottomLeftRadius: railRadius }}
                className="absolute top-0 bottom-0 z-10 h-full overflow-hidden rounded-l-[20px]"
                // Later slides are above earlier ones so they slide over
                
              >
                <div className="h-full w-full pointer-events-auto" style={{ paddingRight: rightSafePadding }}>
                  {product}
                </div>
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
      const EPS = 0.002;
      const idx = Math.min(count - 1, Math.max(0, Math.floor((v + EPS) / segment)));
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
    <div className="pointer-events-none absolute inset-0 z-20 rounded-l-[20px]" style={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}>
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
            <div className="h-full rounded-l-[20px]" style={{ backgroundColor: colors[idx], borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />
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
            <div className="h-full rounded-l-[20px]" style={{ backgroundColor: colors[idx], borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[11px] tracking-wider text-white/85">
              {titles[idx]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
