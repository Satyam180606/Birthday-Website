import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Heart } from 'lucide-react';

interface SlideItem {
  id: string;
  number: string;
  title: string;
  theme: 'wine' | 'cream';
}

const slides: SlideItem[] = [
  { id: 'card-1', number: '01', title: 'Happy Birthday', theme: 'wine' },
  { id: 'card-2', number: '02', title: 'Favorite Person', theme: 'cream' },
  { id: 'card-3', number: '03', title: 'Favorite Moments', theme: 'wine' },
  { id: 'card-video', number: '04', title: 'Video Reels', theme: 'wine' },
  { id: 'music-section', number: '05', title: 'This Song (Vinyl)', theme: 'wine' },
  { id: 'card-5', number: '06', title: 'Reasons I Love You', theme: 'cream' },
  { id: 'card-6', number: '07', title: 'In Three Words', theme: 'wine' },
  { id: 'card-7', number: '08', title: 'A Letter for You', theme: 'wine' },
  { id: 'card-8', number: '09', title: 'The Little Things', theme: 'cream' },
];

export const SlideNavigator: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Track active slide based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;

      for (let i = slides.length - 1; i >= 0; i--) {
        const el = document.getElementById(slides[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSlide(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for arrow up/down
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        if (activeSlide < slides.length - 1) {
          e.preventDefault();
          scrollToSlide(activeSlide + 1);
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        if (activeSlide > 0) {
          e.preventDefault();
          scrollToSlide(activeSlide - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide]);

  const scrollToSlide = (index: number) => {
    const target = document.getElementById(slides[index].id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveSlide(index);
    }
  };

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      scrollToSlide(activeSlide + 1);
    }
  };

  const handlePrev = () => {
    if (activeSlide > 0) {
      scrollToSlide(activeSlide - 1);
    }
  };

  return (
    <aside
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2 select-none"
      aria-label="Slide Navigation"
    >
      {/* Up Button */}
      <button
        onClick={handlePrev}
        disabled={activeSlide === 0}
        className={`p-1.5 rounded-full bg-white/80 backdrop-blur-xs text-wine-900 border border-wine-200/80 shadow-md transition-all ${
          activeSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-wine-800 hover:text-white cursor-pointer hover:scale-110'
        }`}
        aria-label="Previous Slide"
      >
        <ChevronUp className="w-3.5 h-3.5" />
      </button>

      {/* Dots Container */}
      <div className="bg-white/85 backdrop-blur-md px-2 py-3 rounded-full border border-wine-200/70 shadow-lg flex flex-col items-center gap-2.5">
        {slides.map((slide, idx) => {
          const isActive = activeSlide === idx;

          return (
            <div
              key={slide.id}
              className="relative flex items-center"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip on Hover */}
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-7 pointer-events-none whitespace-nowrap bg-wine-900 text-white text-xs font-serif px-3 py-1 rounded-md shadow-xl border border-white/20 flex items-center gap-1.5 z-50"
                  >
                    <span className="font-mono text-blushCloud-300 text-[10px] font-bold">
                      {slide.number}
                    </span>
                    <span>{slide.title}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dot Button */}
              <button
                onClick={() => scrollToSlide(idx)}
                className={`relative rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'w-6 h-6 bg-wine-800 text-white shadow-md ring-2 ring-wine-300 ring-offset-1'
                    : 'w-2.5 h-2.5 bg-wine-300 hover:bg-wine-600 hover:scale-130'
                }`}
                aria-label={`Go to slide ${slide.number}: ${slide.title}`}
              >
                {isActive && <Heart className="w-3 h-3 text-blushCloud-200 fill-blushCloud-200" />}
              </button>
            </div>
          );
        })}
      </div>

      {/* Down Button */}
      <button
        onClick={handleNext}
        disabled={activeSlide === slides.length - 1}
        className={`p-1.5 rounded-full bg-white/80 backdrop-blur-xs text-wine-900 border border-wine-200/80 shadow-md transition-all ${
          activeSlide === slides.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-wine-800 hover:text-white cursor-pointer hover:scale-110'
        }`}
        aria-label="Next Slide"
      >
        <ChevronDown className="w-3.5 h-3.5" />
      </button>

      {/* Current Slide Number Indicator */}
      <div className="font-mono text-[10px] text-wine-800 font-bold bg-white/80 px-2 py-0.5 rounded-full shadow-xs border border-wine-200/60 mt-1">
        {slides[activeSlide]?.number || '01'}/09
      </div>
    </aside>
  );
};
