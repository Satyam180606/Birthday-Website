import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { loveStory } from '../data/loveStory';
import { PhotoFrame } from './PhotoFrame';

interface ReasonsSectionProps {
  onPhotoClick?: (data: { src: string; caption?: string; date?: string; alt: string }) => void;
}

export const ReasonsSection: React.FC<ReasonsSectionProps> = ({ onPhotoClick }) => {
  const { reasons } = loveStory;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <section id="reasons" className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-creamPaper-100 cream-textured-card overflow-hidden shadow-inner">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/3 left-10 w-96 h-96 bg-blushCloud-200/50 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Header styled after Card 5 in reference: "[reason] I Love You" */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-wine-200 text-wine-800 text-xs font-medium tracking-widest uppercase mb-4 shadow-xs"
          >
            <Sparkles className="w-3 h-3 text-wine-600" />
            <span>{reasons.badge}</span>
          </motion.div>

          {/* Iconic Reference Heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <span className="bg-wine-800 text-white font-sans font-bold text-2xl sm:text-4xl md:text-5xl px-3 py-0.5 rounded-xs tracking-tight shadow-sm">
              reason
            </span>
            <span className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-wine-900 font-normal">
              I Love You
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif italic text-base sm:text-xl text-wine-800/80"
          >
            {reasons.subheading}
          </motion.p>

          <div className="flex items-center justify-center gap-2 mt-4 text-wine-400">
            <span className="w-12 h-px bg-wine-200" />
            <Heart className="w-3.5 h-3.5 fill-wine-300 text-wine-600" />
            <span className="w-12 h-px bg-wine-200" />
          </div>
        </div>

        {/* 6 Grid Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          {reasons.items.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className="bg-white rounded-md p-5 sm:p-6 shadow-card-cream hover:shadow-card-elevated transition-all duration-300 border border-neutral-200/80 flex flex-col justify-between group"
            >
              {/* Photo placeholder on top */}
              <div className="mb-4 flex justify-center">
                <PhotoFrame
                  src={item.image}
                  alt={item.title}
                  caption=""
                  rotation={index % 2 === 0 ? -1.5 : 1.5}
                  aspectRatio="aspect-square"
                  objectPosition={item.objectPosition}
                  variant="minimal"
                  className="w-full max-w-[240px]"
                  onPhotoClick={onPhotoClick}
                />
              </div>

              {/* Text content */}
              <div className="flex-1 flex flex-col text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="font-mono text-xs font-semibold tracking-wider text-wine-800 bg-blushCloud-100 px-2 py-0.5 rounded border border-wine-200">
                    {item.number}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-wine-900 font-medium mb-2 group-hover:text-wine-700 transition-colors">
                  {item.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-wine-800/80 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
