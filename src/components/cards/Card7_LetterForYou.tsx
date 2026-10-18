import React from 'react';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { loveStory } from '../../data/loveStory';

interface SlideProps {
  onPhotoClick?: (data: { src: string; caption?: string; date?: string; alt: string }) => void;
  onNext?: () => void;
}

export const Card7_LetterForYou: React.FC<SlideProps> = ({ onPhotoClick, onNext }) => {
  const { card7 } = loveStory;

  return (
    <div
      id="card-7"
      className="relative w-full min-h-screen md:h-screen bg-wine-800 wine-crushed-paper text-white flex flex-col justify-between items-center px-6 sm:px-12 md:px-20 py-10 md:py-14 overflow-hidden select-none"
    >
      {/* Main Content: Left Filmstrip + Right Letter */}
      <div className="relative w-full max-w-6xl mx-auto flex-1 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-14 my-auto z-10">
        {/* Left: Vertical Filmstrip Photo Strip (matching reference Card 7) */}
        <div className="relative w-48 sm:w-60 md:w-72 h-[380px] sm:h-[480px] md:h-[540px] flex flex-col justify-between items-center py-2 shrink-0">
          {/* Top washi tape on filmstrip */}
          <div className="washi-tape-blush -top-4 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-6 rotate-2 z-20" />

          <div className="w-full h-full bg-white p-2 sm:p-2.5 rounded-xs shadow-2xl flex flex-col justify-between space-y-2 overflow-hidden">
            {card7.photos.slice(0, 4).map((img, idx) => (
              <div
                key={idx}
                onClick={() =>
                  onPhotoClick?.({
                    src: img,
                    alt: `Letter keepsake ${idx + 1}`,
                    caption: `Keepsake #${idx + 1}`,
                  })
                }
                className="relative w-full flex-1 bg-blushCloud-100 rounded-xs overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img
                  src={img}
                  alt={`Photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fb = target.parentElement?.querySelector('.strip-fb');
                    if (fb) fb.classList.remove('hidden');
                  }}
                />
                <div className="strip-fb hidden absolute inset-0 flex items-center justify-center bg-blushCloud-200 text-wine-700">
                  <Sparkles className="w-5 h-5 opacity-60" />
                </div>
              </div>
            ))}
          </div>

          {/* Little Floral Sticker at bottom of filmstrip (from reference) */}
          <div className="absolute -bottom-3 -right-4 bg-blushCloud-200 text-wine-800 rounded-full p-2 shadow-xl border-2 border-white z-20">
            <Heart className="w-6 h-6 fill-wine-700 text-wine-700" />
          </div>
        </div>

        {/* Right: Love Letter Text matching Card 7 in reference */}
        <div className="flex-1 flex flex-col justify-between text-left md:pl-8">
          <div>
            <h2 className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-white font-normal mb-3">
              {card7.heading}
            </h2>
            <p className="font-serif italic text-sm sm:text-lg text-blushCloud-200/85 mb-4 sm:mb-6">
              {card7.date}
            </p>

            {/* Letter Body Paragraphs */}
            <div className="space-y-4 sm:space-y-6 font-serif text-sm sm:text-lg md:text-xl text-white/95 leading-relaxed font-light">
              {card7.letterParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Sign Off */}
          <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-white/20 flex items-center justify-between">
            <p className="font-serif italic text-sm sm:text-lg text-blushCloud-100">
              {card7.signOff}
            </p>
            <p className="font-handwriting text-3xl sm:text-4xl md:text-5xl text-blushCloud-200">
              {card7.signature}
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
          <span className="font-serif italic text-xs tracking-wider">Slide 08 / 09 • Next: Little Things</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      )}
    </div>
  );
};
