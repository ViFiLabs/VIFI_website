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
}

function ProductCard({ children, index, totalCards }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start']
  });

  // Scale and transform effects as card gets covered
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 16]);

  const targetScale = 1 - (totalCards - index) * 0.05;

  return (
    <div ref={cardRef} className="h-screen sticky top-0" style={{ zIndex: index }}>
      <motion.div
        style={{
          scale: index === totalCards - 1 ? scale : targetScale,
          borderRadius,
          transformOrigin: 'top center',
        }}
        className="h-full w-full will-change-transform origin-top"
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
