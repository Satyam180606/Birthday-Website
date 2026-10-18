import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingDecorationsProps {
  count?: number;
}

export const FloatingDecorations: React.FC<FloatingDecorationsProps> = ({ count = 18 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 8 + Math.random() * 12,
      rotation: Math.random() * 360,
      duration: 12 + Math.random() * 16,
      delay: Math.random() * 8,
      type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'petal' : 'star',
      opacity: 0.15 + Math.random() * 0.25,
    }));
  }, [count]);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden" 
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `-5%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [
              '0px',
              `${(p.id % 2 === 0 ? 1 : -1) * (20 + Math.random() * 25)}px`,
              `${(p.id % 2 === 0 ? -1 : 1) * (15 + Math.random() * 20)}px`,
              '0px',
            ],
            rotate: [p.rotation, p.rotation + 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          {p.type === 'heart' ? (
            <svg
              viewBox="0 0 24 24"
              fill="#7B1F31"
              className="w-full h-full drop-shadow-xs"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : p.type === 'star' ? (
            <span className="text-wine-700 text-xs select-none block">★</span>
          ) : (
            <svg
              viewBox="0 0 30 30"
              fill="#EFADC0"
              className="w-full h-full drop-shadow-xs"
            >
              <path d="M15,2 C22,5 28,12 28,19 C28,26 21,29 15,29 C9,29 2,26 2,19 C2,12 8,5 15,2 Z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};
