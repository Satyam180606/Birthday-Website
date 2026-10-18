import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Disc, Music } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export const FloatingMusicBar: React.FC = () => {
  const { isPlaying, togglePlay, trackTitle, artistName } = useMusic();
  const [minimized, setMinimized] = useState(false);

  const scrollToMusic = () => {
    const el = document.getElementById('music-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-[90vw] select-none">
      <AnimatePresence>
        {!minimized ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-full shadow-lg border border-wine-200 text-wine-950"
          >
            {/* Spinning Disc / Cover */}
            <button
              onClick={scrollToMusic}
              className="relative w-9 h-9 rounded-full bg-wine-900 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden border border-blushCloud-300 shadow-inner group"
              title="Jump to Record Player"
              aria-label="Jump to Record Player"
            >
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{
                  repeat: isPlaying ? Infinity : 0,
                  duration: 3,
                  ease: 'linear',
                }}
                className="w-full h-full flex items-center justify-center"
              >
                <Disc className="w-5 h-5 text-blushCloud-200" />
              </motion.div>
            </button>

            {/* Track Info */}
            <div
              onClick={scrollToMusic}
              className="cursor-pointer max-w-[130px] sm:max-w-[180px] overflow-hidden text-left"
            >
              <p className="font-serif text-xs font-semibold truncate text-wine-900">
                {trackTitle}
              </p>
              <p className="font-sans text-[10px] truncate text-wine-700/80">
                {artistName}
              </p>
            </div>

            {/* Play / Pause Toggle */}
            <button
              onClick={togglePlay}
              className="p-2 rounded-full bg-wine-800 hover:bg-wine-850 text-white transition-colors shadow-sm focus:outline-none cursor-pointer"
              aria-label={isPlaying ? 'Pause song' : 'Play song'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-white" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-white" />
              )}
            </button>

            {/* Minimize button */}
            <button
              onClick={() => setMinimized(true)}
              className="text-wine-400 hover:text-wine-700 p-1 text-xs cursor-pointer"
              aria-label="Minimize player"
            >
              ×
            </button>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setMinimized(false)}
            className="w-11 h-11 rounded-full bg-wine-800 text-white shadow-lg flex items-center justify-center border-2 border-blushCloud-200 cursor-pointer"
            aria-label="Open mini music player"
          >
            <Music className={`w-5 h-5 ${isPlaying ? 'animate-pulse text-blushCloud-200' : ''}`} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
