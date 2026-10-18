import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Film,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronDown,
  Sparkles,
  Heart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { loveStory } from '../../data/loveStory';
import { useMusic } from '../../context/MusicContext';

interface SlideProps {
  onVideoClick?: (data: { src: string; caption?: string; date?: string; alt: string; isVideo?: boolean }) => void;
  onNext?: () => void;
}

export const Card_VideoMemories: React.FC<SlideProps> = ({ onVideoClick, onNext }) => {
  const { videoMemories } = loveStory;
  const { pauseMusic } = useMusic();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const currentVideo = videoMemories.videos[selectedIndex] || videoMemories.videos[0];

  const handleSelectVideo = (idx: number) => {
    setSelectedIndex(idx);
    setIsPlaying(true);
    if (!isMuted) {
      pauseMusic();
    }
  };

  const handleTogglePlay = () => {
    if (!mainVideoRef.current) return;
    if (isPlaying) {
      mainVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      mainVideoRef.current.play();
      setIsPlaying(true);
      if (!isMuted) {
        pauseMusic();
      }
    }
  };

  const handleToggleMute = () => {
    if (!mainVideoRef.current) return;
    const nextMuted = !isMuted;
    mainVideoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      pauseMusic();
    }
  };

  const handleOpenFullscreen = () => {
    if (onVideoClick && currentVideo) {
      onVideoClick({
        src: currentVideo.src,
        caption: currentVideo.caption,
        alt: currentVideo.title,
        isVideo: true,
      });
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === 'left' ? -260 : 260;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div
      id="card-video"
      className="relative w-full min-h-screen bg-wine-900 wine-crushed-paper text-white flex flex-col justify-between items-center px-4 sm:px-8 md:px-14 lg:px-20 py-8 md:py-12 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-wine-700/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blushCloud-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative text-center pt-2 md:pt-4 z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blushCloud-200 text-xs font-mono tracking-widest uppercase mb-2 shadow-xs"
        >
          <Film className="w-3.5 h-3.5 text-red-300" />
          <span>{videoMemories.badge}</span>
        </motion.div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-wide">
          {videoMemories.titlePrefix}{' '}
          <span className="italic font-serif font-light text-blushCloud-200">
            {videoMemories.titleItalic}
          </span>
        </h2>

        <p className="font-serif italic text-sm sm:text-lg text-blushCloud-100/85 mt-1 sm:mt-2">
          {videoMemories.subtitle}
        </p>
      </div>

      {/* Main Content: Left Featured Camcorder Cinema + Right 11-Reels Filmstrip */}
      <div className="relative w-full max-w-6xl mx-auto my-auto py-4 z-10 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
        {/* Featured Video Player (Retro Camcorder Styling) */}
        <div className="relative w-full max-w-[340px] sm:max-w-[380px] bg-[#1A0B10] p-3 sm:p-4 rounded-2xl shadow-2xl border-2 border-white/20 flex flex-col items-center">
          {/* Camcorder Top Status Bar */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-blushCloud-200/90 pb-2 border-b border-white/10 px-1">
            <span className="flex items-center gap-1 text-red-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              REC
            </span>
            <span className="text-white/80 uppercase font-semibold">
              {currentVideo.tag || `Clip ${selectedIndex + 1}`}
            </span>
            <span className="text-blushCloud-300">
              {selectedIndex + 1}/{videoMemories.videos.length}
            </span>
          </div>

          {/* Video Container (Vertical 9:16 aspect ratio) */}
          <div
            onClick={handleTogglePlay}
            className="relative w-full aspect-[9/14] sm:aspect-[9/13.5] bg-black rounded-xl overflow-hidden mt-3 shadow-inner cursor-pointer group flex items-center justify-center"
          >
            <video
              key={currentVideo.src}
              ref={mainVideoRef}
              src={currentVideo.src}
              autoPlay
              playsInline
              loop
              muted={isMuted}
              className="w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Play/Pause indicator on hover or when paused */}
            <div
              className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity ${
                !isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-xl group-hover:scale-110 transition-transform">
                {isPlaying ? (
                  <Pause className="w-7 h-7 text-white fill-white" />
                ) : (
                  <Play className="w-7 h-7 text-white fill-white ml-1" />
                )}
              </div>
            </div>

            {/* Camcorder Viewfinder Corner Brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/50 pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/50 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white/50 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/50 pointer-events-none" />
          </div>

          {/* Video Info & Controls Bar */}
          <div className="w-full mt-3 flex items-center justify-between gap-2 px-1">
            <div className="flex-1 min-w-0">
              <h3 className="font-serif italic text-base sm:text-lg text-white font-medium truncate">
                {currentVideo.title}
              </h3>
              <p className="text-xs text-blushCloud-200/80 truncate font-light">
                {currentVideo.caption}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleToggleMute}
                title={isMuted ? 'Turn Sound On' : 'Mute'}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-blushCloud-200 transition-colors cursor-pointer border border-white/10"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-red-300" />}
              </button>

              <button
                onClick={handleOpenFullscreen}
                title="Watch Fullscreen"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10"
                aria-label="Open fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Reel Carousel / Gallery (All 11 Videos) */}
        <div className="relative w-full lg:max-w-xl flex flex-col justify-center">
          {/* Carousel Header & Nav Arrows */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-blushCloud-300 font-semibold">
                All 11 Video Clips
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blushCloud-300" />
              <span className="text-xs text-white/70 italic font-serif">
                Select any reel to preview
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => scrollCarousel('left')}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Scrolling Filmstrip Container */}
          <div
            ref={carouselRef}
            className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 scroll-smooth no-scrollbar"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {videoMemories.videos.map((item, idx) => {
              const isSelected = selectedIndex === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectVideo(idx)}
                  style={{ scrollSnapAlign: 'start' }}
                  className={`relative shrink-0 w-32 sm:w-36 rounded-xl p-2 pb-3 cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-white text-wine-950 border-white shadow-2xl scale-103 ring-2 ring-red-400'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/15 hover:scale-102'
                  }`}
                >
                  {/* Top Reel Tag */}
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1.5 px-0.5">
                    <span className={isSelected ? 'text-wine-800' : 'text-blushCloud-300'}>
                      {item.tag || `#${idx + 1}`}
                    </span>
                    {isSelected && <Heart className="w-3 h-3 text-red-500 fill-red-500" />}
                  </div>

                  {/* Looping preview video thumbnail */}
                  <div className="relative w-full aspect-[9/13] rounded-lg overflow-hidden bg-black/60 shadow-inner flex items-center justify-center">
                    <video
                      src={item.src}
                      muted
                      playsInline
                      loop
                      autoPlay
                      className="w-full h-full object-cover pointer-events-none"
                    />

                    {/* Play Icon Badge */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white border border-white/30 shadow-md">
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Title & Caption preview */}
                  <div className="mt-2 text-center">
                    <p
                      className={`font-serif italic text-xs font-semibold truncate ${
                        isSelected ? 'text-wine-900' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </p>
                    <p
                      className={`text-[10px] font-light truncate ${
                        isSelected ? 'text-wine-700/80' : 'text-blushCloud-200/70'
                      }`}
                    >
                      {item.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom helper tip */}
          <div className="mt-3 text-center lg:text-left flex items-center justify-center lg:justify-start gap-2 text-xs font-serif italic text-blushCloud-200/80">
            <Sparkles className="w-3.5 h-3.5 text-blushCloud-300" />
            <span>Click any reel to play, or click the expand button to watch full-screen with sound!</span>
          </div>
        </div>
      </div>

      {/* Slide Navigation Cue */}
      {onNext && (
        <button
          onClick={onNext}
          className="relative z-10 flex flex-col items-center gap-1 text-blushCloud-200/70 hover:text-white transition-colors cursor-pointer group pb-2"
        >
          <span className="font-serif italic text-xs tracking-wider">Slide 04 / 09 • Next: Our Song</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      )}
    </div>
  );
};
