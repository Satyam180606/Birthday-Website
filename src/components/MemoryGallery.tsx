import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { loveStory } from '../data/loveStory';
import { PhotoFrame } from './PhotoFrame';

interface MemoryGalleryProps {
  onPhotoClick?: (data: { src: string; caption?: string; date?: string; alt: string }) => void;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ onPhotoClick }) => {
  const { ourWorld } = loveStory;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <section id="our-world" className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-wine-800 wine-crushed-paper text-white overflow-hidden shadow-inner">
      {/* Subtle crushed paper ambient light */}
      <div 
        className="absolute top-10 left-10 w-96 h-96 bg-wine-700/30 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Header styled after reference Card 3: "one of my favorite moments" */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-xs bg-white/10 border border-white/20 text-blushCloud-200 text-xs font-mono tracking-widest uppercase mb-3 shadow-xs"
          >
            <Sparkles className="w-3 h-3 text-blushCloud-300" />
            <span>{ourWorld.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight mb-2"
          >
            one of my <span className="italic font-serif font-light text-blushCloud-200">favorite moments</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif italic text-base sm:text-xl text-blushCloud-100/80"
          >
            {ourWorld.subheading}
          </motion.p>
          
          <div className="flex items-center justify-center gap-2 mt-4 text-wine-300">
            <span className="w-12 h-px bg-white/20" />
            <Heart className="w-3.5 h-3.5 fill-blushCloud-300 text-blushCloud-300" />
            <span className="w-12 h-px bg-white/20" />
          </div>
        </div>

        {/* Asymmetrical Scrapbook Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 items-start"
        >
          {ourWorld.photos.map((item, index) => {
            const offsetClasses = [
              'sm:translate-y-0',
              'sm:translate-y-8',
              'sm:translate-y-2',
              'sm:-translate-y-4',
              'sm:translate-y-6',
              'sm:translate-y-0',
            ][index % 6];

            const tapeVariants: ('polaroid' | 'tape-top' | 'tape-corner')[] = [
              'polaroid',
              'tape-corner',
              'tape-top',
              'polaroid',
              'tape-corner',
              'tape-top',
            ];

            const tapeColors: ('blush' | 'kraft')[] = ['blush', 'kraft', 'blush', 'kraft', 'blush', 'kraft'];

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`flex justify-center ${offsetClasses}`}
              >
                <PhotoFrame
                  src={item.image}
                  alt={item.alt}
                  caption={item.caption}
                  date={item.date}
                  rotation={item.rotation || 0}
                  aspectRatio="aspect-[4/5]"
                  objectPosition={item.objectPosition}
                  variant={tapeVariants[index % tapeVariants.length]}
                  tapeColor={tapeColors[index % tapeColors.length]}
                  className="w-full max-w-[290px] sm:max-w-[310px]"
                  onPhotoClick={onPhotoClick}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
