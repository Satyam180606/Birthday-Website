import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { loveStory } from '../data/loveStory';
import { PhotoFrame } from './PhotoFrame';

interface ThreeWordsSectionProps {
  onPhotoClick?: (data: { src: string; caption?: string; date?: string; alt: string }) => void;
}

export const ThreeWordsSection: React.FC<ThreeWordsSectionProps> = ({ onPhotoClick }) => {
  const { threeWords } = loveStory;

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    }),
  };

  return (
    <section id="three-words" className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-wine-850 wine-crushed-paper text-white overflow-hidden shadow-2xl">
      {/* Ambient background glows */}
      <div 
        className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-wine-700/30 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Header styled after Card 6 in reference: "If I Had to Describe You in Three Words" */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-xs bg-white/10 border border-white/20 text-blushCloud-200 text-xs font-mono tracking-widest uppercase mb-3 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{threeWords.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight mb-2"
          >
            If I Had to Describe You in <span className="italic font-serif font-light text-blushCloud-200">Three Words</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif italic text-base sm:text-xl text-blushCloud-100/80"
          >
            {threeWords.subheading}
          </motion.p>
        </div>

        {/* 3 Large Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {threeWords.words.map((item, index) => (
            <motion.div
              key={item.word}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="bg-white text-wine-950 rounded-lg p-5 sm:p-7 shadow-card-elevated border border-neutral-200 flex flex-col justify-between relative group hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Top Washi Tape */}
              <div
                className="washi-tape-blush left-1/2 -top-3 -translate-x-1/2 rotate-1"
                style={{ clipPath: 'polygon(3% 0%, 97% 2%, 100% 98%, 0% 100%)' }}
              />

              {/* Photo Frame */}
              <div className="mb-5 flex justify-center">
                <PhotoFrame
                  src={item.image}
                  alt={item.word}
                  caption=""
                  rotation={index === 1 ? 0 : index === 0 ? -1.5 : 1.5}
                  aspectRatio="aspect-[4/5]"
                  objectPosition={item.objectPosition}
                  variant="minimal"
                  className="w-full max-w-[260px]"
                  onPhotoClick={onPhotoClick}
                />
              </div>

              {/* Word & Subtext */}
              <div className="text-center pt-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="w-6 h-px bg-wine-200" />
                  <Heart className="w-3 h-3 text-wine-600 fill-wine-500" />
                  <span className="w-6 h-px bg-wine-200" />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-wine-900 font-medium tracking-wide mb-2">
                  {item.word}
                </h3>

                <p className="font-serif italic text-xs sm:text-sm text-wine-800/80 leading-relaxed">
                  "{item.subtext}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
