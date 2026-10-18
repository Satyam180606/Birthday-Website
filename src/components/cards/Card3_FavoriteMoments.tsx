import React from 'react';
import { Camera, Sparkles, ChevronDown } from 'lucide-react';
import { loveStory } from '../../data/loveStory';

interface SlideProps {
  onPhotoClick?: (data: { src: string; caption?: string; date?: string; alt: string }) => void;
  onNext?: () => void;
}

export const Card3_FavoriteMoments: React.FC<SlideProps> = ({ onPhotoClick, onNext }) => {
  const { card3 } = loveStory;

  return (
    <div
      id="card-3"
      className="relative w-full min-h-screen md:h-screen bg-wine-850 wine-linen-paper text-white flex flex-col justify-between items-center px-6 sm:px-12 md:px-20 py-10 md:py-14 overflow-hidden select-none"
    >
      {/* Top Heading matching reference: "one of my favorite moments" */}
      <div className="relative text-center pt-2 md:pt-4 z-10">
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-wide">
          {card3.titlePrefix}{' '}
          <span className="italic font-serif font-light text-blushCloud-200">
            {card3.titleItalic}
          </span>
        </h2>
      </div>

      {/* 4 Overlapping Polaroids Collage across the full screen */}
      <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center my-auto px-2 sm:px-6">
        {/* Cute camera sticker at top-center */}
        <div className="absolute -top-6 left-[38%] -translate-x-1/2 bg-white text-wine-900 p-2 sm:p-2.5 rounded-sm shadow-2xl z-30 border border-wine-200 rotate-6">
          <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-wine-800" />
        </div>

        {/* Washi tape at top left */}
        <div className="washi-tape-blush -top-6 left-[10%] w-20 sm:w-28 h-6 rotate-[-12deg] z-30" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full items-center justify-items-center">
          {card3.photos.map((item, idx) => {
            const rotations = [-4, 2, -2, 3.5];
            const rot = item.rotation ?? rotations[idx % 4];

            return (
              <div
                key={idx}
                onClick={() =>
                  onPhotoClick?.({
                    src: item.image,
                    alt: item.alt,
                    caption: `Favorite moment #${idx + 1}`,
                  })
                }
                style={{ transform: `rotate(${rot}deg)` }}
                className="relative bg-white p-2.5 sm:p-4 pb-4 sm:pb-6 rounded-xs shadow-2xl border border-neutral-200/90 w-full max-w-[260px] flex flex-col justify-between cursor-pointer hover:scale-108 hover:z-20 transition-all duration-300"
              >
                {/* Photo area */}
                <div className="relative w-full aspect-[4/5] bg-blushCloud-100 rounded-xs overflow-hidden flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.alt}
                    style={{ objectPosition: item.objectPosition || "center 25%" }}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fb = target.parentElement?.querySelector('.mom-fb');
                      if (fb) fb.classList.remove('hidden');
                    }}
                  />
                  <div className="mom-fb hidden absolute inset-0 flex items-center justify-center bg-blushCloud-200 text-wine-700">
                    <Sparkles className="w-8 h-8 opacity-70" />
                  </div>
                </div>

                {/* Bottom polaroid chin */}
                <div className="pt-2 sm:pt-3 text-center">
                  <span className="font-handwriting text-sm sm:text-lg text-wine-900 truncate block">
                    moment #{idx + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shortcut button to Video Reels */}
        <div className="mt-8 text-center">
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-blushCloud-200 hover:text-white transition-all text-xs font-serif italic border border-white/20 cursor-pointer shadow-md hover:scale-105"
          >
            <span>🎥 Watch 11 Candid Video Reels</span>
            <span className="font-sans text-xs">➔</span>
          </button>
        </div>
      </div>

      {/* Slide Navigation Cue */}
      {onNext && (
        <button
          onClick={onNext}
          className="relative z-10 flex flex-col items-center gap-1 text-blushCloud-200/70 hover:text-white transition-colors cursor-pointer group pb-2"
        >
          <span className="font-serif italic text-xs tracking-wider">Slide 03 / 09 • Next: Moving Reels</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      )}
    </div>
  );
};
