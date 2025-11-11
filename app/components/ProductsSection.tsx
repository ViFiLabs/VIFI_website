"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductOneramp from './ProductOneramp';
import ProductReserveX from './ProductReserveX';
import ProductVIFIFX from './ProductVIFIFX';

interface ProductCardProps {
  children: React.ReactNode;
  index: number;
  enableParallax: boolean;
}

function ProductCard({ children, index, enableParallax }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start']
  });

  // Scale and transform effects as card gets covered by the next card
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 16]);

  if (!enableParallax) {
    return (
      <div ref={cardRef} className="w-full">
        <div className="w-full">
          {children}
        </div>
      </div>
    );
  }

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
  const [enableParallax, setEnableParallax] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const query = window.matchMedia('(min-width: 768px)');
    const update = () => setEnableParallax(query.matches);

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const products = [
    <ProductVIFIFX key="vififx" />,
    <ProductReserveX key="reservex" />,
    <ProductOneramp key="oneramp" />
  ];

  return (
    <div className="relative">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          index={index}
          enableParallax={enableParallax}
        >
          {product}
        </ProductCard>
      ))}
    </div>
  );
}