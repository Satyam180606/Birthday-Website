import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, Mail } from 'lucide-react';
import { loveStory } from '../data/loveStory';
import { PhotoFrame } from './PhotoFrame';
import { ScrollRevealText } from './SectionMorph';

interface BirthdayCardProps {
  onPhotoClick?: (data: { src: string; caption?: string; date?: string; alt: string }) => void;
}

export const BirthdayCard: React.FC<BirthdayCardProps> = ({ onPhotoClick }) => {
  const { birthdayCard, herName } = loveStory;

  return (
    <section id="birthday-card" className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-wine-850 wine-crushed-paper text-white overflow-hidden shadow-2xl">
      {/* Soft Ambient Radiance */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-wine-700/40 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-6xl mx-auto">
        {/* Main Card Wrapper Inspired by Card 1 in Reference */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative bg-wine-800/80 backdrop-blur-xs rounded-xl p-6 sm:p-10 md:p-14 shadow-card-elevated border border-white/15"
        >
          {/* Subtle Decorative Postage Stamp / Heart in Corner */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded bg-white/10 border border-white/20 text-xs font-mono text-blushCloud-200">
            <Mail className="w-3.5 h-3.5" />
            <span>Air Mail • Love</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Portrait Photograph */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -1.5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Back decorative white paper shadow */}
                <div className="absolute -inset-2 bg-white/15 rounded rotate-2 -z-10 shadow-lg" />
                
                <PhotoFrame
                  src={birthdayCard.photo}
                  alt={`Portrait of ${herName}`}
                  caption={birthdayCard.photoCaption}
                  date={loveStory.birthdayDate}
                  rotation={-1.5}
                  aspectRatio="aspect-[3/4]"
                  objectPosition={birthdayCard.objectPosition}
                  variant="tape-top"
                  tapeColor="blush"
                  className="w-72 sm:w-80 md:w-88"
                  onPhotoClick={onPhotoClick}
                />
              </motion.div>
            </div>

            {/* Right Column: Birthday Card Message styled as Reference Card 1 */}
            <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-blushCloud-300 text-xs sm:text-sm font-serif tracking-widest uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{birthdayCard.badge}</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>

              {/* Grand "Happy Birthday" Script Heading like reference */}
              <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-tight mb-1">
                Happy Birthday
              </h2>

              {/* Subheading: Her Name & Date */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 text-blushCloud-200 font-sans text-sm tracking-wide mb-6">
                <span className="font-medium text-base text-blushCloud-100">{herName}</span>
                <span className="hidden sm:inline opacity-50">•</span>
                <span className="font-mono text-xs opacity-90">{loveStory.birthdayDate}</span>
              </div>

              {/* Letter Paragraphs — word-by-word scroll morph reveal */}
              <div className="space-y-4 font-serif text-white/90 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                {birthdayCard.letterParagraphs.map((para, index) => (
                  <ScrollRevealText
                    key={index}
                    text={para}
                    mode="word"
                    className="block"
                  />
                ))}
              </div>

              {/* Footer / Dedication */}
              <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-blushCloud-200/80 text-xs sm:text-sm font-serif">
                <div className="flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-blushCloud-300 fill-blushCloud-300/50" />
                  <span>A letter made just for you</span>
                </div>
                <div className="font-handwriting text-2xl text-blushCloud-100 flex items-center gap-1.5">
                  <span>With all my love</span>
                  <Heart className="w-3.5 h-3.5 text-blushCloud-300 fill-blushCloud-300" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
