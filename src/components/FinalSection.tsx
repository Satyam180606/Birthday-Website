import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ArrowUp, X, Gift } from 'lucide-react';
import { loveStory } from '../data/loveStory';
import { PhotoFrame } from './PhotoFrame';

interface FinalSectionProps {
  onReturnToTop: () => void;
  onPhotoClick?: (data: { src: string; caption?: string; date?: string; alt: string }) => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({ onReturnToTop, onPhotoClick }) => {
  const { final, myName } = loveStory;
  const [showSecretModal, setShowSecretModal] = useState(false);

  const handleRevealSecret = () => {
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#5C1322', '#7B1F31', '#EFADC0', '#F7CBD4', '#FFFFFF'],
    });
    setShowSecretModal(true);
  };

  return (
    <section className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 md:px-12 dreamy-page-bg flex flex-col justify-between items-center text-center overflow-hidden">
      {/* Soft Ambient Radiance */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] bg-gradient-to-tr from-blushCloud-200/50 via-blushCloud-100/30 to-white rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      {/* Main Quote & Central Photograph */}
      <div className="w-full max-w-4xl mx-auto my-auto flex flex-col items-center">
        {/* Central Softly Illuminated Photograph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative mb-8 sm:mb-10"
        >
          {/* Subtle back paper layer for depth */}
          <div className="absolute -inset-3 bg-wine-800/10 rounded-sm rotate-2 -z-10 shadow-lg blur-xs" />
          
          <PhotoFrame
            src={final.photo}
            alt="Forever Us"
            caption="Forever & always."
            date="My Whole Heart"
            rotation={-1.5}
            aspectRatio="aspect-[4/5]"
            objectPosition={final.objectPosition}
            variant="tape-top"
            tapeColor="blush"
            className="w-64 sm:w-72 md:w-80"
            onPhotoClick={onPhotoClick}
          />
        </motion.div>

        {/* Emotion-Driven Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-2 mb-6"
        >
          <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-wine-900 font-normal leading-snug">
            "{final.quoteLine1}"
          </p>
          <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-wine-800 font-medium leading-snug">
            "{final.quoteLine2}"
          </p>
        </motion.div>

        {/* Happy Birthday, My Love */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-wine-800 font-normal tracking-tight mb-8"
        >
          {final.birthdayGreeting}
        </motion.h2>

        {/* Button: "Read One More Message" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={handleRevealSecret}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-wine-800 hover:bg-wine-850 text-white font-serif text-base sm:text-lg tracking-wide shadow-card-elevated hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-wine-200 cursor-pointer"
          >
            <Gift className="w-4 h-4 text-blushCloud-300" />
            <span>{final.secretButtonText}</span>
            <Heart className="w-4 h-4 text-blushCloud-300 fill-blushCloud-300 group-hover:scale-125 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Footer & Return to Top */}
      <footer className="w-full max-w-4xl mx-auto pt-16 pb-4 border-t border-wine-200/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif text-wine-800/80">
        <p className="flex items-center gap-1.5">
          <span>{final.footerText}</span>
          <Heart className="w-3.5 h-3.5 text-wine-600 fill-wine-500 inline" />
        </p>

        {/* Return to Top Button */}
        <button
          onClick={onReturnToTop}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-blushCloud-100 text-wine-900 transition-colors cursor-pointer border border-wine-200/80"
          aria-label="Return to beginning"
        >
          <span>Return to the Beginning</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </footer>

      {/* Secret Message Modal */}
      <AnimatePresence>
        {showSecretModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-wine-950/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSecretModal(false)}
          >
            {/* Modal Card */}
            <motion.div
              className="relative max-w-xl w-full bg-white rounded-md p-6 sm:p-10 shadow-2xl border border-neutral-200 text-left overflow-hidden"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowSecretModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-wine-700 hover:text-wine-950 hover:bg-wine-100 transition-colors"
                aria-label="Close message"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Washi tape */}
              <div
                className="washi-tape-blush left-1/2 -top-3 -translate-x-1/2 rotate-1"
                style={{ clipPath: 'polygon(3% 0%, 97% 2%, 100% 98%, 0% 100%)' }}
              />

              <div className="flex items-center gap-2 text-wine-600 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-mono tracking-widest uppercase">
                  A Final Wish
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-wine-900 font-normal mb-4">
                {final.secretMessageHeading}
              </h3>

              <div className="space-y-4 font-serif text-base text-wine-900/90 leading-relaxed font-light">
                {final.secretMessageBody.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-200 flex items-center justify-between">
                <span className="font-handwriting text-2xl text-wine-900">
                  Always yours, {myName}
                </span>
                <Heart className="w-4 h-4 text-wine-600 fill-wine-500" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
