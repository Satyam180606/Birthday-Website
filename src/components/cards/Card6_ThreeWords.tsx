import React from 'react';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import { loveStory } from '../../data/loveStory';

interface SlideProps {
  onPhotoClick?: (data: { src: string; caption?: string; date?: string; alt: string }) => void;
  onNext?: () => void;
}

export const Card6_ThreeWords: React.FC<SlideProps> = ({ onPhotoClick, onNext }) => {
  const { card6 } = loveStory;

  return (
    <div
      id="card-6"
      className="relative w-full min-h-screen md:h-screen bg-wine-800 wine-crushed-paper text-white flex flex-col justify-between items-center px-6 sm:px-12 md:px-20 py-10 md:py-14 overflow-hidden select-none"
    >
      {/* Top Heading matching reference Card 6 */}
      <div className="relative text-center pt-2 md:pt-4 z-10">
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-wide">
          {card6.heading}
        </h2>
      </div>

      {/* 3 Polaroids with Word & Description underneath matching Card 6 */}
      <div className="relative w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 my-auto px-4 sm:px-8 z-10">
        {card6.words.map((item, idx) => (
          <div
            key={item.word}
            onClick={() =>
              onPhotoClick?.({
                src: item.image,
                alt: item.word,
                caption: item.word,
              })
            }
            className="flex flex-col items-center text-center cursor-pointer group"
          >
            {/* White Polaroid Card */}
            <div className="relative w-full max-w-[280px] bg-white p-3 sm:p-4 pb-4 sm:pb-5 rounded-xs shadow-2xl border border-neutral-200/90 group-hover:scale-106 group-hover:shadow-2xl transition-all duration-300">
              {/* Cute pin/sticker at top right (from reference) */}
              <div className="absolute -top-3 -right-2 bg-wine-800 text-white rounded-full p-1.5 shadow-lg border-2 border-white z-20">
                {idx === 0 ? (
                  <Heart className="w-4 h-4 text-blushCloud-200 fill-blushCloud-200" />
                ) : (
                  <Sparkles className="w-4 h-4 text-blushCloud-200" />
                )}
              </div>

              {/* Photo Area */}
              <div className="w-full aspect-[4/5] bg-blushCloud-100 rounded-xs overflow-hidden flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.word}
                  style={{ objectPosition: item.objectPosition || "center 20%" }}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fb = target.parentElement?.querySelector('.w-fb');
                    if (fb) fb.classList.remove('hidden');
                  }}
                />
                <div className="w-fb hidden absolute inset-0 flex items-center justify-center bg-blushCloud-200 text-wine-700">
                  <Heart className="w-10 h-10 opacity-70" />
                </div>
              </div>

              {/* Word */}
              <p className="font-serif italic font-medium text-xl sm:text-2xl text-wine-900 mt-3">
                {item.word}
              </p>
            </div>

            {/* Short Supporting Paragraph Underneath (matching reference Card 6) */}
            <p className="font-serif text-sm sm:text-base text-blushCloud-100/90 mt-4 leading-relaxed max-w-[260px]">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Slide Navigation Cue */}
      {onNext && (
        <button
          onClick={onNext}
          className="relative z-10 flex flex-col items-center gap-1 text-blushCloud-200/70 hover:text-white transition-colors cursor-pointer group pb-2"
        >
          <span className="font-serif italic text-xs tracking-wider">Slide 07 / 09 • Next: Letter</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      )}
    </div>
  );
};
