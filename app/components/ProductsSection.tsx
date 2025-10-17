"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductOneramp from './ProductOneramp';
import ProductReserveX from './ProductReserveX';
import ProductVIFIFX from './ProductVIFIFX';

interface ProductCardProps {
  children: React.ReactNode;
  index: number;
  totalCards: number;
  containerRef: React.RefObject<HTMLElement | null>;
  isLast?: boolean;
}

function ProductCard({ children, index, totalCards, containerRef, isLast = false }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    // Ensure we listen to the actual page scroll container
    container: containerRef,
    offset: ['start start', 'end start']
  });

  // Keep card static for the first half of the wrapper's scroll,
  // then slightly scale and round as the next card overlaps.
  // Wrapper is 200vh tall (except last), so progress ~0.5 is the overlap moment.
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.92]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 24]);

  return (
    <div
      ref={cardRef}
      className="w-full"
      style={{ height: isLast ? '100vh' : '200vh', zIndex: index + 1 }}
    >
      <motion.div
        style={{
          scale,
          borderRadius,
          transformOrigin: 'top center',
          // Ensure newer cards appear above older ones
          zIndex: index + 1,
        }}
        className="sticky top-0 h-screen w-full overflow-hidden will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function ProductsSection() {
  // Find the page's scroll container (set in app/page.tsx)
  const initialContainer = typeof document !== 'undefined'
    ? (document.querySelector('[data-scroll-container="main"]') as HTMLElement | null)
    : null;
  const containerRef = useRef<HTMLElement | null>(initialContainer);

  const products = [
    <ProductOneramp key="oneramp" />,
    <ProductReserveX key="reservex" />,
    <ProductVIFIFX key="vififx" />
  ];

  return (
    <div className="relative isolate">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          index={index}
          totalCards={products.length}
          containerRef={containerRef}
          isLast={index === products.length - 1}
        >
          {product}
        </ProductCard>
      ))}
    </div>
  );
}
