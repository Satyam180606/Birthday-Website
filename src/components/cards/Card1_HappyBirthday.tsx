import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, ChevronDown } from 'lucide-react';
import { loveStory } from '../../data/loveStory';

interface SlideProps {
  onPhotoClick?: (data: { src: string; caption?: string; date?: string; alt: string }) => void;
  onNext?: () => void;
}

export const Card1_HappyBirthday: React.FC<SlideProps> = ({ onPhotoClick, onNext }) => {
  const { card1 } = loveStory;

  return (
    <div
      id="card-1"
      className="relative w-full min-h-screen md:h-screen bg-wine-800 wine-crushed-paper text-white flex flex-col justify-between items-center px-6 sm:px-12 md:px-20 lg:px-28 py-10 md:py-14 overflow-hidden select-none"
    >
      {/* Full-bleed crushed paper highlight overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/10 pointer-events-none" />

      {/* Main Content Area: Left Portrait + Right Typography */}
      <div className="relative w-full max-w-6xl mx-auto flex-1 flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-14 z-10 my-auto">
        {/* Left: Cutout Portrait with Stickers */}
        <div className="relative w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[460px] lg:w-[420px] lg:h-[500px] flex items-center justify-center shrink-0">
          <div
            onClick={() =>
              onPhotoClick?.({
                src: card1.photo,
                alt: card1.name,
                caption: "Happy Birthday",
                date: card1.date,
              })
            }
            className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-wine-900 cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src={card1.photo}
              alt={card1.name}
              style={{ objectPosition: card1.objectPosition || "center 20%" }}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fb = target.parentElement?.querySelector('.card1-fallback');
                if (fb) fb.classList.remove('hidden');
              }}
            />
            {/* Fallback */}
            <div className="card1-fallback hidden absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-wine-900 to-wine-950">
              <Heart className="w-16 h-16 text-blushCloud-300 fill-blushCloud-300 mb-3" />
              <p className="font-serif italic text-base text-white">birthday-hero.jpg</p>
            </div>
          </div>

          {/* Cute Sticker: Speech Bubble with Heart */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="absolute -top-3 left-4 bg-white text-wine-900 px-3.5 py-1.5 rounded-full shadow-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 border border-wine-200 z-20"
          >
            <span className="text-red-500 text-sm">♥</span>
            <span className="font-sans text-xs sm:text-sm font-bold tracking-tight">hbd</span>
          </motion.div>

          {/* Cute Sticker: Love Envelope */}
          <div className="absolute top-1/2 -right-5 sm:-right-7 bg-[#FBF0F2] text-wine-800 p-2.5 sm:p-3 rounded-md shadow-xl border border-wine-200 rotate-12 z-20">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-wine-700" />
          </div>

          {/* Hearts Washi Tape Strip at bottom left */}
          <div className="absolute -bottom-3 -left-4 bg-white/95 px-4 py-2 rounded-xs shadow-lg border border-red-200 rotate-[-5deg] flex items-center gap-2 z-20">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          </div>
        </div>

        {/* Right: Typography matching Card 1 in reference */}
        <div className="flex-1 flex flex-col justify-center text-center md:text-left md:pl-8">
          <h1 className="font-serif italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-none">
            {card1.greeting}
          </h1>

          <p className="font-serif text-3xl sm:text-5xl md:text-6xl text-blushCloud-100 font-normal mt-3 sm:mt-5">
            {card1.name}
          </p>

          <p className="font-mono text-sm sm:text-lg text-blushCloud-200/80 tracking-widest my-4 sm:my-8">
            {card1.date}
          </p>

          <div className="pt-4 sm:pt-6 border-t border-white/20 space-y-1.5 max-w-lg">
            <p className="font-serif italic text-base sm:text-2xl text-white/95 font-light">
              {card1.subtextLine1}
            </p>
            <p className="font-serif text-xs sm:text-base text-blushCloud-200/80 font-light">
              {card1.subtextLine2}
            </p>
          </div>
        </div>
      </div>

      {/* Slide Navigation Cue */}
      {onNext && (
        <button
          onClick={onNext}
          className="relative z-10 flex flex-col items-center gap-1 text-blushCloud-200/70 hover:text-white transition-colors cursor-pointer group pb-2"
        >
          <span className="font-serif italic text-xs tracking-wider">Slide 01 / 09 • Next</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      )}
    </div>
  );
};
