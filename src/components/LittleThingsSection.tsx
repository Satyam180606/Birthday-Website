import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';
import { loveStory } from '../data/loveStory';
import { PhotoFrame } from './PhotoFrame';

interface LittleThingsSectionProps {
  onPhotoClick?: (data: { src: string; caption?: string; date?: string; alt: string }) => void;
}

export const LittleThingsSection: React.FC<LittleThingsSectionProps> = ({ onPhotoClick }) => {
  const { littleThings } = loveStory;

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section id="little-things" className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-creamPaper-100 cream-textured-card overflow-hidden shadow-inner">
      {/* 🌟 Scattered Wine Stars like Card 8 in reference */}
      <span className="absolute top-12 left-16 text-wine-800 text-xl select-none opacity-80" aria-hidden="true">★</span>
      <span className="absolute top-28 right-24 text-wine-800 text-base select-none opacity-70" aria-hidden="true">★</span>
      <span className="absolute bottom-20 left-12 text-wine-800 text-lg select-none opacity-75" aria-hidden="true">★</span>
      <span className="absolute bottom-16 right-16 text-wine-800 text-xl select-none opacity-85" aria-hidden="true">★</span>
      <span className="absolute top-1/2 left-8 text-wine-800 text-sm select-none opacity-60" aria-hidden="true">★</span>
      <span className="absolute top-1/3 right-10 text-wine-800 text-lg select-none opacity-70" aria-hidden="true">★</span>

      <div className="max-w-6xl mx-auto">
        {/* Section Header styled after Card 8 in reference: "The Little Things You Do That Make Me Smile" */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-wine-200 text-wine-800 text-xs font-medium tracking-widest uppercase mb-3 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-wine-600" />
            <span>{littleThings.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-wine-900 font-normal tracking-tight mb-2"
          >
            The Little Things <span className="italic font-serif font-light text-wine-700">You Do That Make Me Smile</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif italic text-base sm:text-xl text-wine-800/80"
          >
            {littleThings.subheading}
          </motion.p>
        </div>

        {/* 4 Mini Memory Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {littleThings.items.map((item, index) => {
            const rotations = [-2, 2.5, -1.5, 3];
            const rotation = rotations[index % rotations.length];

            return (
              <motion.div
                key={item.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="bg-white rounded-md p-4 sm:p-5 shadow-card-cream hover:shadow-card-elevated transition-all duration-300 border border-neutral-200/80 flex flex-col justify-between group"
              >
                {/* Photo frame */}
                <div className="mb-4">
                  <PhotoFrame
                    src={item.image}
                    alt={item.title}
                    caption=""
                    rotation={rotation}
                    aspectRatio="aspect-square"
                    objectPosition={item.objectPosition}
                    variant="minimal"
                    className="w-full"
                    onPhotoClick={onPhotoClick}
                  />
                </div>

                {/* Details */}
                <div className="pt-2 text-center">
                  {item.tag && (
                    <div className="flex items-center justify-center gap-1.5 mb-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-wine-700 bg-blushCloud-100 px-2 py-0.5 rounded border border-wine-200">
                        {item.tag}
                      </span>
                      <Star className="w-3 h-3 text-wine-600 fill-wine-500" />
                    </div>
                  )}

                  <h3 className="font-serif text-xl text-wine-900 font-medium mb-1.5 group-hover:text-wine-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-wine-800/80 leading-relaxed font-light">
                    {item.note}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
