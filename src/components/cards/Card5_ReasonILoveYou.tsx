import React from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import { loveStory } from '../../data/loveStory';

interface SlideProps {
  onPhotoClick?: (data: { src: string; caption?: string; date?: string; alt: string }) => void;
  onNext?: () => void;
}

export const Card5_ReasonILoveYou: React.FC<SlideProps> = ({ onPhotoClick, onNext }) => {
  const { card5 } = loveStory;

  return (
    <div
      id="card-5"
      className="relative w-full min-h-screen md:h-screen bg-creamPaper-100 cream-textured-card text-wine-950 flex flex-col justify-between items-center px-6 sm:px-12 md:px-20 py-10 md:py-14 overflow-hidden select-none"
    >
      {/* Top Heading matching reference Card 5: "[reason] I Love You" */}
      <div className="relative flex items-center justify-center gap-4 pt-2 md:pt-4 z-10">
        <span className="bg-wine-800 text-white font-sans font-bold text-lg sm:text-2xl md:text-3xl px-5 py-1.5 rounded-sm tracking-tight shadow-md">
          {card5.badgeWord}
        </span>
        <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-wine-900 font-normal">
          {card5.headingRest}
        </h2>
      </div>

      {/* 6 Square Polaroids Grid (2 rows of 3) matching Card 5 */}
      <div className="relative w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 md:gap-12 my-auto px-4 sm:px-8 z-10">
        {card5.reasons.map((item) => (
          <div
            key={item.id}
            onClick={() =>
              onPhotoClick?.({
                src: item.image,
                alt: item.title,
                caption: item.title,
              })
            }
            className="flex flex-col items-center text-center cursor-pointer group"
          >
            {/* White Square Photo Frame */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 bg-white p-2.5 sm:p-3 rounded-xs shadow-xl border border-neutral-200/90 group-hover:scale-108 group-hover:shadow-2xl transition-all duration-300">
              <div className="w-full h-full bg-blushCloud-100 rounded-xs overflow-hidden flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ objectPosition: item.objectPosition || "center 20%" }}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fb = target.parentElement?.querySelector('.r-fb');
                    if (fb) fb.classList.remove('hidden');
                  }}
                />
                <div className="r-fb hidden absolute inset-0 flex items-center justify-center bg-blushCloud-200 text-wine-700">
                  <Sparkles className="w-8 h-8 opacity-70" />
                </div>
              </div>
            </div>

            {/* Caption underneath */}
            <span className="font-serif text-sm sm:text-lg md:text-xl text-wine-900 font-light mt-2.5 sm:mt-3 leading-tight">
              {item.title}
            </span>
          </div>
        ))}
      </div>

      {/* Slide Navigation Cue */}
      {onNext && (
        <button
          onClick={onNext}
          className="relative z-10 flex flex-col items-center gap-1 text-wine-800/60 hover:text-wine-900 transition-colors cursor-pointer group pb-2"
        >
          <span className="font-serif italic text-xs tracking-wider">Slide 06 / 09 • Next</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      )}
    </div>
  );
};
