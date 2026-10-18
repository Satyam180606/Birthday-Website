import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { loveStory } from '../data/loveStory';

export const TopHeader: React.FC = () => {
  const { banner, herName } = loveStory;

  return (
    <header className="relative pt-12 sm:pt-16 pb-8 sm:pb-12 text-center select-none overflow-hidden">
      {/* "by Satyam" tag matching reference */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xs sm:text-sm font-sans tracking-wide text-wine-600/80 mb-3"
      >
        {banner.authorTag}
      </motion.p>

      {/* Pill Badges in Slate Blue like "let's use this" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="inline-flex items-center gap-1.5 mb-2 sm:mb-3"
      >
        <span className="px-3 py-1 bg-slateBadge-500 text-white font-sans text-xs sm:text-sm tracking-wider uppercase font-medium rounded-xs shadow-xs">
          {banner.badge1}
        </span>
        <span className="px-3 py-1 bg-slateBadge-500 text-white font-sans text-xs sm:text-sm tracking-wider uppercase font-medium rounded-xs shadow-xs">
          {banner.badge2}
        </span>
      </motion.div>

      {/* Grand Title: "Template" / "Happy Birthday" in Reference's Elegant Script / Serif */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="font-serif italic text-5xl sm:text-7xl md:text-8xl text-wine-800 font-normal tracking-tight leading-none mb-2"
      >
        Happy Birthday
      </motion.h1>

      {/* Subtitle: "for birthday gift" */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="font-sans text-xs sm:text-sm text-wine-800/85 font-medium flex items-center justify-center gap-1.5"
      >
        <span>for {herName}'s birthday gift</span>
        <Heart className="w-3.5 h-3.5 text-wine-600 fill-wine-500 inline" />
      </motion.p>
    </header>
  );
};
