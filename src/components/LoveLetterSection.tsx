import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Heart, Feather, Sparkles } from 'lucide-react';
import { loveStory } from '../data/loveStory';
import { PhotoFrame } from './PhotoFrame';
import { ScrollRevealText } from './SectionMorph';

interface LoveLetterSectionProps {
  onPhotoClick?: (data: { src: string; caption?: string; date?: string; alt: string }) => void;
}

export const LoveLetterSection: React.FC<LoveLetterSectionProps> = ({ onPhotoClick }) => {
  const { loveLetter, myName } = loveStory;

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const paragraphVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="love-letter" className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-wine-800 wine-crushed-paper text-white overflow-hidden shadow-2xl">
      {/* Soft warm glows */}
      <div 
        className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-wine-700/30 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-6xl mx-auto">
        {/* Main 2-Column Composition matching Card 7 in reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Filmstrip / Polaroid Photo Stack */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              {loveLetter.photos[0] && (
                <PhotoFrame
                  src={loveLetter.photos[0].image}
                  alt="Letter photo"
                  caption={loveLetter.photos[0].caption}
                  rotation={-3}
                  aspectRatio="aspect-[4/5]"
                  objectPosition={loveLetter.photos[0].objectPosition}
                  variant="tape-top"
                  tapeColor="blush"
                  className="w-64 sm:w-72"
                  onPhotoClick={onPhotoClick}
                />
              )}
            </div>

            {loveLetter.photos[1] && (
              <div className="relative -mt-6 sm:-mt-10 ml-8 sm:ml-12">
                <PhotoFrame
                  src={loveLetter.photos[1].image}
                  alt="Letter memory"
                  caption={loveLetter.photos[1].caption}
                  rotation={2.5}
                  aspectRatio="aspect-[4/5]"
                  objectPosition={loveLetter.photos[1].objectPosition}
                  variant="tape-corner"
                  tapeColor="kraft"
                  className="w-56 sm:w-64"
                  onPhotoClick={onPhotoClick}
                />
              </div>
            )}
          </div>

          {/* Right Column: The Letter text (inspired by Card 7 in reference) */}
          <motion.div
            variants={letterVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-7 bg-wine-900/70 backdrop-blur-xs rounded-xl p-6 sm:p-10 md:p-12 border border-white/15 shadow-card-elevated"
          >
            {/* Header Badge */}
            <div className="flex items-center gap-2 text-blushCloud-300 text-xs font-mono uppercase tracking-widest mb-3">
              <Feather className="w-3.5 h-3.5" />
              <span>{loveLetter.badge}</span>
            </div>

            {/* Title: "A Letter for You" */}
            <h2 className="font-serif italic text-3xl sm:text-5xl font-normal text-white mb-6">
              A Letter for You
            </h2>

            {/* Salutation */}
            <motion.div variants={paragraphVariants} className="mb-4">
              <h3 className="font-serif italic text-xl sm:text-2xl text-blushCloud-100 font-medium">
                {loveLetter.salutation}
              </h3>
            </motion.div>

            {/* Letter Body Paragraphs — word morph reveal */}
            <div className="space-y-4 font-serif text-base sm:text-lg text-white/90 leading-relaxed font-light">
              {loveLetter.body.map((paragraph, index) => (
                <ScrollRevealText
                  key={index}
                  text={paragraph}
                  mode="word"
                  className="block"
                />
              ))}
            </div>

            {/* Sign Off & Handwritten Signature */}
            <motion.div variants={paragraphVariants} className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between">
              <div>
                <p className="font-serif italic text-xs text-blushCloud-200/80 mb-1">
                  {loveLetter.signOff}
                </p>
                <div className="font-handwriting text-3xl sm:text-4xl text-blushCloud-100 flex items-center gap-2">
                  <span>{myName}</span>
                  <Heart className="w-3.5 h-3.5 text-blushCloud-300 fill-blushCloud-300" />
                </div>
              </div>

              {/* Little Stamp Graphic */}
              <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-blushCloud-200" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
