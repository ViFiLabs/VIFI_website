"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductOneramp from '../components/ProductOneramp';
import ProductReserveX from '../components/ProductReserveX';
import ProductVIFIFX from '../components/ProductVIFIFX';

interface ProductCardProps {
  children: React.ReactNode;
  index: number;
  totalCards: number;
}

function ProductCard({ children, index, totalCards }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start']
  });

  // Scale and transform effects as card gets covered by the next card
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 16]);

  return (
    <div ref={cardRef} className="h-screen sticky top-0 w-full" style={{ zIndex: index }}>
      <motion.div
        style={{
          scale,
          borderRadius,
          transformOrigin: 'top center',
        }}
        className="h-full w-full will-change-transform origin-top overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function ProductsSection() {
  const products = [
    <ProductOneramp key="oneramp" />,
    <ProductReserveX key="reservex" />,
    <ProductVIFIFX key="vififx" />
  ];

  return (
    <div className="relative">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          index={index}
          totalCards={products.length}
        >
          {product}
        </ProductCard>
      ))}
    </div>
  );
}
