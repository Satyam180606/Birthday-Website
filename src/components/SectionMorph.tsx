import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
 * SectionMorph
 * ─────────────────────────────────────────────────────────────
 * Gives every section a cinematic 3D perspective morph transition:
 *   - Perspective-based entry with 3D tilt that settles as you scroll
 *   - Subtle scale transition from 0.94 to 1
 *   - Soft blur-to-sharp focus clearing
 *   - Stays fully visible while in view (no premature dimming)
 * ───────────────────────────────────────────────────────────── */

export type MorphVariant =
  | 'rise'          // rises up with gentle 3D tilt
  | 'tilt-left'     // enters angled from left perspective
  | 'tilt-right'    // enters angled from right perspective
  | 'page-turn'     // authentic scrapbook page-turn fold
  | 'zoom-in'       // smooth depth zoom from background
  | 'curtain'       // vertical unveiling
  | 'none';

interface SectionMorphProps {
  children: React.ReactNode;
  variant?: MorphVariant;
  className?: string;
  parallaxOffset?: number;
}

export const SectionMorph: React.FC<SectionMorphProps> = ({
  children,
  variant = 'rise',
  className = '',
  parallaxOffset = 30,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Smooth out scroll progress with spring physics for butter-smooth morphing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  // Opacity: smoothly enters, stays 100% solid while reading, only fades out as it truly leaves
  const opacity = useTransform(
    smoothProgress,
    [0, 0.18, 0.94, 1],
    [0.1, 1, 1, 0.8]
  );

  // Parallax Y offset
  const y = useTransform(
    smoothProgress,
    [0, 0.35, 1],
    [parallaxOffset, 0, -parallaxOffset * 0.4]
  );

  // Subtle scale morph
  const scale = useTransform(
    smoothProgress,
    [0, 0.22, 0.92, 1],
    variant === 'zoom-in'
      ? [0.91, 1, 1, 0.97]
      : [0.96, 1, 1, 0.98]
  );

  // 3D rotations based on selected morph variant
  const rotateX = useTransform(
    smoothProgress,
    [0, 0.25],
    variant === 'rise'
      ? [5, 0]
      : variant === 'page-turn'
        ? [6, 0]
        : variant === 'curtain'
          ? [7, 0]
          : [0, 0]
  );

  const rotateY = useTransform(
    smoothProgress,
    [0, 0.25],
    variant === 'tilt-left'
      ? [-4, 0]
      : variant === 'tilt-right'
        ? [4, 0]
        : variant === 'page-turn'
          ? [-3, 0]
          : [0, 0]
  );

  // Gentle depth blur clearing on entry
  const filter = useTransform(
    smoothProgress,
    [0, 0.16],
    ['blur(3px)', 'blur(0px)']
  );

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ perspective: '1400px' }}
    >
      <motion.div
        style={{
          opacity,
          y,
          scale,
          rotateX,
          rotateY,
          filter,
          transformOrigin:
            variant === 'tilt-left'
              ? 'left center'
              : variant === 'tilt-right'
                ? 'right center'
                : variant === 'page-turn'
                  ? 'top center'
                  : 'center center',
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};


/* ─────────────────────────────────────────────────────────────
 * ScrollRevealText
 * ─────────────────────────────────────────────────────────────
 * Smoothly morphs text into full radiance as you scroll past.
 * Never leaves text unreadable — base opacity is clear, and
 * active words morph into bright focus with a gentle upward glide.
 * ───────────────────────────────────────────────────────────── */

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  mode?: 'word' | 'line';
}

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
  text,
  className = '',
  mode = 'word',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.5'],
  });

  const pieces = mode === 'word' ? text.split(' ') : text.split('\n');

  return (
    <div ref={ref} className={className}>
      {pieces.map((piece, i) => {
        const start = i / (pieces.length * 1.2);
        const end = Math.min(start + 0.35, 1);

        return (
          <ScrollRevealPiece
            key={`${i}-${piece.slice(0, 8)}`}
            piece={piece}
            scrollYProgress={scrollYProgress}
            rangeStart={start}
            rangeEnd={end}
            isWord={mode === 'word'}
          />
        );
      })}
    </div>
  );
};

const ScrollRevealPiece: React.FC<{
  piece: string;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  rangeStart: number;
  rangeEnd: number;
  isWord: boolean;
}> = ({ piece, scrollYProgress, rangeStart, rangeEnd, isWord }) => {
  // Graceful minimum opacity of 0.45 so text is always comfortably readable,
  // then morphs to 1.0 with subtle lift when scrolled into focus
  const opacity = useTransform(scrollYProgress, [rangeStart, rangeEnd], [0.45, 1]);
  const y = useTransform(scrollYProgress, [rangeStart, rangeEnd], [4, 0]);

  return (
    <motion.span
      style={{ opacity, y, display: 'inline-block' }}
      className={isWord ? 'mr-[0.28em]' : 'block'}
    >
      {piece}
    </motion.span>
  );
};


/* ─────────────────────────────────────────────────────────────
 * MorphDivider
 * ─────────────────────────────────────────────────────────────
 * An organic torn-paper / wave SVG divider between sections that
 * morphs subtly as the user scrolls across the boundary!
 * ───────────────────────────────────────────────────────────── */

interface MorphDividerProps {
  fillColor?: string; // hex or tailwind class
  flip?: boolean;
}

export const MorphDivider: React.FC<MorphDividerProps> = ({
  fillColor = '#5C1322',
  flip = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.15, 0.95]);

  return (
    <div
      ref={ref}
      className={`w-full overflow-hidden leading-none pointer-events-none ${
        flip ? 'rotate-180 -mb-1' : '-mt-1'
      }`}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-8 sm:h-12 md:h-14 block"
        style={{ scaleY }}
      >
        <path
          d="M0,0 C150,35 350,10 500,28 C650,46 900,15 1050,32 C1150,42 1200,20 1200,20 L1200,60 L0,60 Z"
          fill={fillColor}
        />
      </motion.svg>
    </div>
  );
};

export const ParallaxLayer: React.FC<{
  children: React.ReactNode;
  speed?: number;
  className?: string;
}> = ({ children, speed = 0.3, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 60, speed * -60]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

