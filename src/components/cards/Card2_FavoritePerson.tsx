import React from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { loveStory } from '../../data/loveStory';

interface SlideProps {
  onPhotoClick?: (data: { src: string; caption?: string; date?: string; alt: string }) => void;
  onNext?: () => void;
}

export const Card2_FavoritePerson: React.FC<SlideProps> = ({ onPhotoClick, onNext }) => {
  const { card2 } = loveStory;

  return (
    <div
      id="card-2"
      className="relative w-full min-h-screen md:h-screen bg-creamPaper-100 cream-textured-card text-wine-950 flex flex-col justify-between items-center px-6 sm:px-12 md:px-20 py-10 md:py-14 overflow-hidden select-none"
    >
      {/* Top / Center Text Content */}
      <div className="relative w-full max-w-4xl mx-auto text-center z-10 my-auto pt-4">
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-6 sm:mb-8 leading-tight">
          <span className="font-bold text-wine-800">{card2.titleBold}</span>{' '}
          <span className="text-wine-900/90 font-light">{card2.titleRest}</span>
        </h2>

        <p className="font-serif text-base sm:text-2xl md:text-3xl text-wine-900/85 leading-relaxed font-light mb-5 sm:mb-8 max-w-3xl mx-auto">
          {card2.paragraph1}
        </p>

        <p className="font-serif italic text-sm sm:text-xl md:text-2xl text-wine-700/85 max-w-2xl mx-auto">
          {card2.paragraph2}
        </p>
      </div>

      {/* Bottom Stickers Row: Head cutout 1, Birthday Cake starburst badge, Head cutout 2 */}
      <div className="relative w-full max-w-3xl mx-auto flex items-center justify-center gap-10 sm:gap-20 md:gap-28 z-10 pb-6 my-auto">
        {/* Left Circular Photo Sticker */}
        <div
          onClick={() =>
            onPhotoClick?.({
              src: card2.stickerPhoto1,
              alt: "Sticker 1",
              caption: "My favorite smile",
            })
          }
          className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-wine-100 cursor-pointer hover:scale-108 transition-transform"
        >
          <img
            src={card2.stickerPhoto1}
            alt="Sticker 1"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fb = target.parentElement?.querySelector('.stk1-fb');
              if (fb) fb.classList.remove('hidden');
            }}
          />
          <div className="stk1-fb hidden absolute inset-0 flex items-center justify-center bg-blushCloud-200">
            <Heart className="w-10 h-10 text-wine-700 fill-wine-500" />
          </div>
        </div>

        {/* Center: Birthday Cake Badge with Starburst Spikes (from reference) */}
        <div className="relative flex items-center justify-center">
          {/* Starburst rays behind cake */}
          <div className="absolute w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 pointer-events-none opacity-85">
            {[0, 30, 60, 90, 120, 150].map((deg) => (
              <div
                key={deg}
                className="absolute inset-x-0 top-1/2 h-1 sm:h-1.5 bg-wine-800 -translate-y-1/2"
                style={{ transform: `rotate(${deg}deg)` }}
              />
            ))}
          </div>

          {/* Round Cake Badge */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-white shadow-2xl border-4 border-wine-800 flex flex-col items-center justify-center text-center p-2 z-10 hover:scale-105 transition-transform">
            <span className="text-xl sm:text-3xl md:text-4xl mb-1">🎂</span>
            <span className="font-mono text-[9px] sm:text-xs md:text-sm font-extrabold text-wine-900 leading-tight tracking-tight uppercase">
              {card2.cakeBadgeText}
            </span>
          </div>
        </div>

        {/* Right Circular Photo Sticker */}
        <div
          onClick={() =>
            onPhotoClick?.({
              src: card2.stickerPhoto2,
              alt: "Sticker 2",
              caption: "Pure happiness",
            })
          }
          className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-wine-100 cursor-pointer hover:scale-108 transition-transform"
        >
          <img
            src={card2.stickerPhoto2}
            alt="Sticker 2"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fb = target.parentElement?.querySelector('.stk2-fb');
              if (fb) fb.classList.remove('hidden');
            }}
          />
          <div className="stk2-fb hidden absolute inset-0 flex items-center justify-center bg-blushCloud-200">
            <Heart className="w-10 h-10 text-wine-700 fill-wine-500" />
          </div>
        </div>
      </div>

      {/* Slide Navigation Cue */}
      {onNext && (
        <button
          onClick={onNext}
          className="relative z-10 flex flex-col items-center gap-1 text-wine-800/60 hover:text-wine-900 transition-colors cursor-pointer group pb-2"
        >
          <span className="font-serif italic text-xs tracking-wider">Slide 02 / 09 • Next</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      )}
    </div>
  );
};
