import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Play, Pause, Music, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { loveStory } from '../../data/loveStory';
import { useMusic } from '../../context/MusicContext';

interface SlideProps {
  onNext?: () => void;
}

export const Card4_SongVinyl: React.FC<SlideProps> = ({ onNext }) => {
  const { card4 } = loveStory;
  const { isPlaying, togglePlay, audioError, isMuted, toggleMute } = useMusic();
  const [coverError, setCoverError] = useState(false);

  return (
    <div
      id="music-section"
      className="relative w-full min-h-screen md:h-screen bg-wine-850 wine-linen-paper text-white flex flex-col justify-between items-center px-6 sm:px-12 md:px-20 py-10 md:py-14 overflow-hidden select-none"
    >
      {/* Top Heading matching reference Card 4 */}
      <div className="relative text-center pt-2 md:pt-4 z-10">
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-wide">
          {card4.titlePrefix}{' '}
          <span className="italic font-serif font-light text-blushCloud-200">
            {card4.titleItalic}
          </span>{' '}
          {card4.titleSuffix}
        </h2>
        <p className="font-serif italic text-base sm:text-xl text-blushCloud-200/85 mt-2">
          {card4.trackTitle} • {card4.artistName}
        </p>
      </div>

      {/* Center Vinyl Record with Fanned Pink Ribbon Petals */}
      <div className="relative my-auto flex items-center justify-center">
        {/* 🌸 Fanned Blush Pink Ribbon Petals (matching reference Card 4) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-0">
          <div className="absolute -top-10 w-16 sm:w-24 md:w-28 h-32 sm:h-48 md:h-56 bg-gradient-to-t from-blushCloud-300 to-blushCloud-200 rounded-full rotate-[-22deg] opacity-85 shadow-xl" />
          <div className="absolute -top-6 w-16 sm:w-24 md:w-28 h-32 sm:h-48 md:h-56 bg-gradient-to-t from-blushCloud-300 to-blushCloud-200 rounded-full rotate-[25deg] opacity-85 shadow-xl" />
          <div className="absolute -bottom-10 w-16 sm:w-24 md:w-28 h-32 sm:h-48 md:h-56 bg-gradient-to-b from-blushCloud-300 to-blushCloud-200 rounded-full rotate-[-35deg] opacity-85 shadow-xl" />
          <div className="absolute -bottom-6 w-16 sm:w-24 md:w-28 h-32 sm:h-48 md:h-56 bg-gradient-to-b from-blushCloud-300 to-blushCloud-200 rounded-full rotate-[30deg] opacity-85 shadow-xl" />
          <div className="absolute -right-10 w-28 sm:w-40 md:w-48 h-16 sm:h-24 md:h-28 bg-gradient-to-r from-blushCloud-300 to-blushCloud-200 rounded-full rotate-[15deg] opacity-85 shadow-xl" />
          <div className="absolute -left-10 w-28 sm:w-40 md:w-48 h-16 sm:h-24 md:h-28 bg-gradient-to-l from-blushCloud-300 to-blushCloud-200 rounded-full rotate-[-15deg] opacity-85 shadow-xl" />
        </div>

        {/* Large Rotating Vinyl Record */}
        <motion.div
          onClick={togglePlay}
          className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] rounded-full vinyl-grooves shadow-record flex items-center justify-center cursor-pointer group z-10"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{
            repeat: isPlaying ? Infinity : 0,
            duration: 3.5,
            ease: 'linear',
          }}
          title="Click to play / pause our song"
        >
          {/* Vinyl light sheen reflection */}
          <div className="absolute inset-0 vinyl-sheen rounded-full pointer-events-none opacity-85" />

          {/* Center Label Sticker */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-38 md:h-38 rounded-full bg-gradient-to-br from-wine-700 to-wine-950 p-2 flex items-center justify-center shadow-2xl border-2 sm:border-4 border-blushCloud-200">
            <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-wine-900">
              {!coverError ? (
                <img
                  src={card4.albumCover}
                  alt="Album Cover"
                  onError={() => setCoverError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-2 bg-gradient-to-tr from-wine-950 to-wine-800">
                  <Heart className="w-8 h-8 text-blushCloud-200 fill-blushCloud-200" />
                </div>
              )}
            </div>
            {/* Center Spindle Hole */}
            <div className="absolute w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-creamPaper-100 border-2 border-neutral-700 shadow-inner z-10" />
          </div>

          {/* Center Play / Pause Indicator */}
          <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
            {isPlaying ? (
              <Pause className="w-14 h-14 sm:w-16 sm:h-16 text-white fill-white drop-shadow-2xl" />
            ) : (
              <Play className="w-14 h-14 sm:w-16 sm:h-16 text-white fill-white drop-shadow-2xl ml-2" />
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Subtext & Controls */}
      <div className="relative flex items-center justify-between w-full max-w-xl z-10 text-sm sm:text-base px-4 py-2 bg-black/20 rounded-full backdrop-blur-xs border border-white/10">
        <button
          onClick={toggleMute}
          className="p-2.5 rounded-full hover:bg-white/15 text-blushCloud-200 transition-colors cursor-pointer"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        <p className="font-serif italic text-blushCloud-200/90 text-center">
          {isPlaying ? (
            <span className="flex items-center justify-center gap-2 text-blushCloud-100 font-medium">
              <Music className="w-4 h-4 animate-bounce" />
              <span>Playing our melody • Click vinyl to pause</span>
            </span>
          ) : audioError ? (
            <span>{card4.placeholderMessage} (add our-song.mp3 to public/assets/)</span>
          ) : (
            <span>{card4.instruction}</span>
          )}
        </p>

        <button
          onClick={togglePlay}
          className="p-2.5 rounded-full hover:bg-white/15 text-blushCloud-200 transition-colors cursor-pointer"
          aria-label="Play song"
        >
          <Music className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Navigation Cue */}
      {onNext && (
        <button
          onClick={onNext}
          className="relative z-10 flex flex-col items-center gap-1 text-blushCloud-200/70 hover:text-white transition-colors cursor-pointer group pb-2 pt-2"
        >
          <span className="font-serif italic text-xs tracking-wider">Slide 05 / 09 • Next: Reasons</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      )}
    </div>
  );
};
