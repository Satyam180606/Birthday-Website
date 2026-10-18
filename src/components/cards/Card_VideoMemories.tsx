import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  RotateCcw,
} from 'lucide-react';
import { loveStory } from '../../data/loveStory';
import { useMusic } from '../../context/MusicContext';

interface SlideProps {
  onVideoClick?: (data: { src: string; caption?: string; date?: string; alt: string; isVideo?: boolean }) => void;
  onNext?: () => void;
}

// Carousel preview item that plays on hover/touch without overloading hardware decoders
const CarouselCard: React.FC<{
  video: { id: string; src: string; title: string; tag?: string; caption: string };
  idx: number;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ video, idx, isSelected, onSelect }) => {
  const previewRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    if (previewRef.current) {
      previewRef.current.muted = true;
      previewRef.current.currentTime = 0;
      previewRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (previewRef.current) {
      previewRef.current.pause();
      previewRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onClick={onSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ scrollSnapAlign: 'start' }}
      className={`relative shrink-0 w-32 sm:w-36 rounded-xl p-2 pb-3 cursor-pointer transition-all duration-300 border select-none ${
        isSelected
          ? 'bg-white text-wine-950 border-white shadow-2xl scale-105 ring-2 ring-red-400 z-10'
          : 'bg-white/10 text-white border-white/20 hover:bg-white/15 hover:scale-102'
      }`}
    >
      {/* Reel Tag */}
      <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1.5 px-0.5">
        <span className={isSelected ? 'text-wine-800' : 'text-blushCloud-300'}>
          {video.tag || `Reel ${idx + 1}`}
        </span>
        {isSelected && <Heart className="w-3 h-3 text-red-500 fill-red-500" />}
      </div>

      {/* Video Preview Frame */}
      <div className="relative w-full aspect-[9/13] rounded-lg overflow-hidden bg-black/80 shadow-inner flex items-center justify-center">
        <video
          ref={previewRef}
          src={video.src}
          muted
          playsInline
          loop
          preload="metadata"
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* Play Icon Badge */}
        <div className={`absolute inset-0 bg-black/25 flex items-center justify-center transition-opacity ${isSelected ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
          <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center text-white border border-white/30 shadow-md">
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Title & Caption */}
      <div className="mt-2 text-center">
        <p className={`font-serif italic text-xs font-semibold truncate ${isSelected ? 'text-wine-900' : 'text-white'}`}>
          {video.title}
        </p>
        <p className={`text-[10px] font-light truncate ${isSelected ? 'text-wine-700/80' : 'text-blushCloud-200/70'}`}>
          {video.caption}
        </p>
      </div>
    </div>
  );
};

export const Card_VideoMemories: React.FC<SlideProps> = ({ onVideoClick, onNext }) => {
  const { videoMemories } = loveStory;
  const { pauseMusic } = useMusic();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const currentVideo = videoMemories.videos[selectedIndex] || videoMemories.videos[0];

  // Safely play video with fallback to muted if unmuted is rejected by browser
  const playVideoSafe = useCallback(async (video: HTMLVideoElement, shouldBeMuted: boolean) => {
    try {
      video.muted = shouldBeMuted;
      video.defaultMuted = shouldBeMuted;
      await video.play();
      setIsPlaying(true);
    } catch {
      // Browser blocked autoplay (usually unmuted), fallback to muted autoplay
      try {
        video.muted = true;
        video.defaultMuted = true;
        setIsMuted(true);
        await video.play();
        setIsPlaying(true);
      } catch {
        // Requires explicit user interaction
        setIsPlaying(false);
      }
    }
  }, []);

  // When selected video changes, load and play it
  useEffect(() => {
    const video = mainVideoRef.current;
    if (!video) return;

    setProgress(0);
    video.currentTime = 0;
    playVideoSafe(video, isMuted);
  }, [selectedIndex, currentVideo.src, playVideoSafe, isMuted]);

  // Video progress and state listeners
  useEffect(() => {
    const video = mainVideoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const handleSelectVideo = (idx: number) => {
    setSelectedIndex(idx);
    if (!isMuted) {
      pauseMusic();
    }
  };

  const handleTogglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = mainVideoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.muted = isMuted;
      video.defaultMuted = isMuted;
      video.play().then(() => {
        setIsPlaying(true);
        if (!isMuted) {
          pauseMusic();
        }
      }).catch(() => {
        // Retry muted
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      });
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = mainVideoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    video.defaultMuted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      pauseMusic();
      // Ensure video continues playing with sound
      video.play().catch(() => {});
    }
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = mainVideoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const handleOpenFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onVideoClick && currentVideo) {
      onVideoClick({
        src: currentVideo.src,
        caption: currentVideo.caption,
        alt: currentVideo.title,
        isVideo: true,
      });
    }
  };

  const handlePrevReel = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else {
      setSelectedIndex(videoMemories.videos.length - 1);
    }
  };

  const handleNextReel = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex < videoMemories.videos.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else {
      setSelectedIndex(0);
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === 'left' ? -280 : 280;
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
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-red-700'}`} />
              {isPlaying ? 'REC ●' : 'PAUSED'}
            </span>
            <span className="text-white/80 uppercase font-semibold">
              {currentVideo.tag || `Reel ${selectedIndex + 1}`}
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
              ref={mainVideoRef}
              src={currentVideo.src}
              autoPlay
              playsInline
              loop
              muted={isMuted}
              preload="auto"
              className="w-full h-full object-cover"
            />

            {/* Play / Pause Overlay Button */}
            <div
              className={`absolute inset-0 flex items-center justify-center bg-black/35 transition-opacity ${
                !isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <button
                onClick={handleTogglePlay}
                className="w-16 h-16 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center border-2 border-white/60 shadow-2xl group-hover:scale-110 transition-transform cursor-pointer"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white fill-white" />
                ) : (
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                )}
              </button>
            </div>

            {/* Progress bar at bottom of video */}
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-black/40">
              <div
                className="h-full bg-gradient-to-r from-red-400 to-blushCloud-300 transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Camcorder Viewfinder Corner Brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/50 pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/50 pointer-events-none" />
            <div className="absolute bottom-3 left-2 w-4 h-4 border-b-2 border-l-2 border-white/50 pointer-events-none" />
            <div className="absolute bottom-3 right-2 w-4 h-4 border-b-2 border-r-2 border-white/50 pointer-events-none" />
          </div>

          {/* Video Info & Interactive Controls Bar */}
          <div className="w-full mt-3 flex items-center justify-between gap-2 px-1">
            <div className="flex-1 min-w-0 text-left">
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
                onClick={handleRestart}
                title="Replay from start"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-blushCloud-200 transition-colors cursor-pointer border border-white/10"
                aria-label="Replay"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleToggleMute}
                title={isMuted ? 'Turn Sound ON' : 'Mute Sound'}
                className={`p-2 rounded-full transition-colors cursor-pointer border ${
                  !isMuted
                    ? 'bg-red-500/80 text-white border-red-300 ring-2 ring-red-400/50'
                    : 'bg-white/10 hover:bg-white/20 text-blushCloud-200 border-white/10'
                }`}
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
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

          {/* Quick Reel Skipper (Prev / Next) */}
          <div className="w-full mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs text-blushCloud-200/80">
            <button
              onClick={handlePrevReel}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <span className="text-[10px] font-mono tracking-widest text-blushCloud-300">
              CLICK VIDEO TO {isPlaying ? 'PAUSE' : 'PLAY'}
            </span>
            <button
              onClick={handleNextReel}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Reel Carousel / Gallery (All 11 Videos) */}
        <div className="relative w-full lg:max-w-xl flex flex-col justify-center">
          {/* Carousel Header & Nav Arrows */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-blushCloud-300 font-semibold">
                All 11 Video Reels
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blushCloud-300" />
              <span className="text-xs text-white/70 italic font-serif">
                Select any reel to play
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
            {videoMemories.videos.map((item, idx) => (
              <CarouselCard
                key={item.id}
                video={item}
                idx={idx}
                isSelected={selectedIndex === idx}
                onSelect={() => handleSelectVideo(idx)}
              />
            ))}
          </div>

          {/* Bottom helper tip */}
          <div className="mt-3 text-center lg:text-left flex items-center justify-center lg:justify-start gap-2 text-xs font-serif italic text-blushCloud-200/80">
            <Sparkles className="w-3.5 h-3.5 text-blushCloud-300" />
            <span>Hover on any card to preview • Click to play with sound!</span>
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
