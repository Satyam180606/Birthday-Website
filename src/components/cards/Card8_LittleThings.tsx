import React from 'react';
import { Camera, Check, Gift, Heart } from 'lucide-react';
import { loveStory } from '../../data/loveStory';

interface SlideProps {
  onPhotoClick?: (data: { src: string; caption?: string; date?: string; alt: string }) => void;
  onOpenSecret?: () => void;
}

export const Card8_LittleThings: React.FC<SlideProps> = ({ onPhotoClick, onOpenSecret }) => {
  const { card8 } = loveStory;

  return (
    <div
      id="card-8"
      className="relative w-full min-h-screen md:h-screen bg-creamPaper-100 cream-textured-card text-wine-950 flex flex-col justify-between items-center px-6 sm:px-12 md:px-20 py-10 md:py-14 overflow-hidden select-none"
    >
      {/* 🌟 Scattered Wine Stars (exact placement matching reference Card 8 across full screen) */}
      <span className="absolute top-12 left-16 text-wine-800 text-2xl sm:text-4xl select-none opacity-80" aria-hidden="true">★</span>
      <span className="absolute bottom-16 left-20 text-wine-800 text-3xl sm:text-5xl select-none opacity-85" aria-hidden="true">★</span>
      <span className="absolute top-1/2 right-12 text-wine-800 text-2xl sm:text-4xl select-none opacity-75" aria-hidden="true">★</span>
      <span className="absolute bottom-20 right-24 text-wine-800 text-3xl sm:text-5xl select-none opacity-80" aria-hidden="true">★</span>

      {/* Top Heading matching reference Card 8 */}
      <div className="relative text-center pt-2 md:pt-4 z-10">
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-wine-900 tracking-wide font-normal">
          {card8.headingPart1}{' '}
          <span className="italic font-bold text-wine-800">{card8.headingPart2}</span>{' '}
          {card8.headingPart3}{' '}
          <span className="italic text-wine-700">{card8.headingPart4}</span>
        </h2>
      </div>

      {/* Center Composition: Retro Camera + Pinned Notepad Checklist */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 sm:gap-16 md:gap-20 my-auto z-10 px-4 sm:px-8">
        {/* Left: Vintage Camera with Polaroid photo sliding out */}
        <div
          onClick={() =>
            onPhotoClick?.({
              src: card8.cameraPhoto,
              alt: "The little things",
              caption: "A little thing that makes me smile",
            })
          }
          className="relative w-60 sm:w-72 md:w-80 flex flex-col items-center cursor-pointer group shrink-0"
        >
          {/* Retro Camera Graphic Box */}
          <div className="w-full bg-[#E5DDD0] border-4 border-wine-900/75 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col items-center relative">
            {/* Viewfinder & Flash */}
            <div className="w-full flex justify-between items-center px-2 mb-3">
              <div className="w-6 h-3 bg-neutral-800 rounded-xs" />
              <div className="w-5 h-5 rounded-full bg-red-400 border-2 border-neutral-700" />
            </div>

            {/* Lens / Photo Slot */}
            <div className="relative w-full aspect-square rounded-xl bg-white p-2.5 shadow-inner border border-neutral-300 overflow-hidden group-hover:scale-103 transition-transform">
              <img
                src={card8.cameraPhoto}
                alt="Camera snapshot"
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fb = target.parentElement?.querySelector('.cam-fb');
                  if (fb) fb.classList.remove('hidden');
                }}
              />
              <div className="cam-fb hidden absolute inset-0 flex items-center justify-center bg-blushCloud-100 text-wine-800">
                <Camera className="w-14 h-14 opacity-70" />
              </div>
            </div>

            {/* Gingham / Pink Washi tape at corner */}
            <div className="absolute -bottom-4 -left-4 bg-red-200 border border-red-300 w-24 h-7 rotate-[-15deg] shadow-md" />
          </div>
        </div>

        {/* Right: Pinned Lined Notepad Page (matching reference Card 8) */}
        <div className="relative w-full max-w-lg bg-white rounded-lg p-6 sm:p-10 shadow-2xl border border-neutral-200 rotate-1">
          {/* Paperclip / Pin at top */}
          <div className="absolute -top-4 left-10 w-5 h-9 rounded-full border-3 border-wine-800 bg-transparent rotate-12" />

          {/* Notepad Title */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-wine-100">
            <span className="font-serif italic font-bold text-xl sm:text-2xl text-wine-900">
              {card8.noteTitle}
            </span>
            <span className="text-base text-wine-600 font-mono">♥</span>
          </div>

          {/* Checklist Bullet Points */}
          <ul className="space-y-4 sm:space-y-5 text-sm sm:text-lg md:text-xl text-wine-900/90 font-serif leading-relaxed">
            {card8.bulletPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-wine-700 shrink-0 mt-1 stroke-[3]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Final CTA Button */}
      {onOpenSecret && (
        <div className="relative z-10 text-center pb-2">
          <button
            onClick={onOpenSecret}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-wine-800 hover:bg-wine-850 text-white font-serif text-base sm:text-xl shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <Gift className="w-5 h-5 text-blushCloud-300" />
            <span>Read One More Message ♥</span>
            <Heart className="w-5 h-5 text-blushCloud-300 fill-blushCloud-300 group-hover:scale-125 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};
