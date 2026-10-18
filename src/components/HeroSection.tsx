import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import { loveStory } from '../data/loveStory';
import { PhotoFrame } from './PhotoFrame';

interface HeroSectionProps {
  onOpenGift: () => void;
  onPhotoClick?: (data: { src: string; caption?: string; date?: string; alt: string }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenGift, onPhotoClick }) => {
  const { hero, herName } = loveStory;

  const { scrollY } = useScroll();
  const yPhoto = useTransform(scrollY, [0, 600], [0, 80]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0.2]);
  const scaleHero = useTransform(scrollY, [0, 600], [1, 0.96]);

  const handleOpenGiftClick = () => {
    confetti({
      particleCount: 60,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#5C1322', '#7B1F31', '#EFADC0', '#F7CBD4', '#FFFFFF'],
      shapes: ['circle'],
      scalar: 1.1,
    });

    onOpenGift();
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 sm:px-6 pt-16 sm:pt-20 pb-8 overflow-hidden dreamy-page-bg">
      {/* Decorative Vintage Stamp Corner */}
      <div className="absolute top-6 left-6 hidden md:flex items-center gap-2 border border-wine-200/80 bg-white/70 backdrop-blur-xs px-3 py-1.5 rounded-sm text-[11px] font-serif text-wine-900 tracking-widest uppercase">
        <Sparkles className="w-3 h-3 text-wine-600" />
        <span>Birthday Edition • 2026</span>
      </div>

      <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 border border-wine-200/80 bg-white/70 backdrop-blur-xs px-3 py-1.5 rounded-sm text-[11px] font-serif text-wine-900 tracking-widest uppercase">
        <span>For {herName}</span>
        <Heart className="w-3 h-3 text-wine-600 fill-wine-500" />
      </div>

      {/* Main Content Container */}
      <motion.div
        className="w-full max-w-4xl mx-auto flex flex-col items-center text-center my-auto z-10"
        style={{ y: yPhoto, opacity: opacityHero, scale: scaleHero }}
      >
        {/* Top Tagline with Reference's Slate-Blue Pill Badge Style */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 mb-4 sm:mb-6"
        >
          <span className="px-3 py-1 bg-slateBadge-500 text-white font-sans text-xs tracking-wider uppercase font-semibold rounded-xs shadow-xs">
            {hero.badge}
          </span>
        </motion.div>

        {/* Grand Headline in Deep Wine Display Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-wine-800 tracking-tight leading-[1.08] mb-2 sm:mb-3"
        >
          {hero.heading}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-serif italic text-lg sm:text-2xl text-wine-700/85 max-w-xl mb-8 sm:mb-10 font-normal"
        >
          "{hero.subheading}"
        </motion.p>

        {/* Centered Layered 3D Photograph Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, rotateZ: -2 }}
          animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
          transition={{ duration: 1, delay: 0.7, type: 'spring', bounce: 0.3 }}
          className="relative my-2 sm:my-4"
        >
          {/* Subtle back paper layer for scrapbook depth */}
          <div className="absolute -inset-2 bg-wine-800/10 rounded-sm -rotate-2 -z-10 shadow-sm border border-wine-200/50" />
          <div className="absolute -inset-1 bg-white/60 rounded-sm rotate-2 -z-10 shadow-sm" />

          <PhotoFrame
            src={hero.photo}
            alt={hero.photoAlt}
            caption={`The Birthday Girl • ${herName}`}
            date={loveStory.birthdayDate}
            rotation={1.5}
            aspectRatio="aspect-[4/5]"
            objectPosition={hero.objectPosition}
            variant="tape-top"
            tapeColor="blush"
            priority={true}
            className="w-64 sm:w-72 md:w-80"
            onPhotoClick={onPhotoClick}
          />
        </motion.div>

        {/* Main CTA Button: "Open Your Gift ♥" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 sm:mt-10"
        >
          <button
            onClick={handleOpenGiftClick}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-wine-800 hover:bg-wine-850 text-white font-serif text-lg sm:text-xl tracking-wide shadow-card-elevated hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-wine-200"
          >
            <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span>{hero.ctaButton}</span>
            <Heart className="w-4 h-4 text-blushCloud-300 group-hover:scale-125 transition-transform duration-300 fill-blushCloud-300" />
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="flex flex-col items-center gap-1 text-wine-700/70 text-xs font-serif tracking-widest uppercase cursor-pointer pt-4 pb-2 hover:text-wine-900 transition-colors"
        onClick={handleOpenGiftClick}
      >
        <span>Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-wine-600" />
      </motion.div>
    </section>
  );
};
