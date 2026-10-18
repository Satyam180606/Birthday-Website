import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Heart } from 'lucide-react';
import { loveStory } from '../data/loveStory';
import { useMusic } from '../context/MusicContext';

export const MusicSection: React.FC = () => {
  const { music } = loveStory;
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    audioError,
    togglePlay,
    seek,
    setAudioVolume,
    toggleMute,
    trackTitle,
    artistName,
  } = useMusic();

  const [coverError, setCoverError] = useState(false);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(parseFloat(e.target.value));
  };

  return (
    <section id="music-section" className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-wine-850 wine-linen-paper text-white overflow-hidden shadow-2xl">
      {/* Ambient lighting */}
      <div 
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-wine-700/30 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-5xl mx-auto">
        {/* Section Header styled after Card 4 in reference: "This song reminds me of you" */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-xs bg-white/10 border border-white/20 text-blushCloud-200 text-xs font-mono tracking-widest uppercase mb-3 shadow-xs"
          >
            <Music className="w-3.5 h-3.5 text-blushCloud-300" />
            <span>{music.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight mb-2"
          >
            This <span className="italic font-serif font-light text-blushCloud-200">song</span> reminds me of you
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif italic text-base sm:text-xl text-blushCloud-100/80"
          >
            {music.subheading}
          </motion.p>
        </div>

        {/* The Turntable & Record Player Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-wine-800/85 backdrop-blur-xs rounded-2xl p-6 sm:p-10 md:p-12 shadow-card-elevated border border-white/15 overflow-hidden"
        >
          {/* Top washi tape */}
          <div
            className="washi-tape-blush left-10 -top-3 rotate-2"
            style={{ clipPath: 'polygon(2% 0%, 98% 3%, 100% 97%, 0% 100%)' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Vinyl Record with Reference's Pink Ribbon Petals */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 flex items-center justify-center">
                
                {/* 🌸 Pink Ribbon Petals Fanning Out Behind Vinyl (Inspired by reference Card 4) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-0">
                  <div className="absolute -top-3 w-10 sm:w-12 h-20 sm:h-24 bg-gradient-to-t from-blushCloud-300 to-blushCloud-200 rounded-full rotate-[-20deg] opacity-85 shadow-sm" />
                  <div className="absolute -top-2 w-10 sm:w-12 h-20 sm:h-24 bg-gradient-to-t from-blushCloud-300 to-blushCloud-200 rounded-full rotate-[25deg] opacity-85 shadow-sm" />
                  <div className="absolute -bottom-3 w-10 sm:w-12 h-20 sm:h-24 bg-gradient-to-b from-blushCloud-300 to-blushCloud-200 rounded-full rotate-[-35deg] opacity-85 shadow-sm" />
                  <div className="absolute -bottom-2 w-10 sm:w-12 h-20 sm:h-24 bg-gradient-to-b from-blushCloud-300 to-blushCloud-200 rounded-full rotate-[30deg] opacity-85 shadow-sm" />
                  <div className="absolute -right-4 w-18 h-10 bg-gradient-to-r from-blushCloud-300 to-blushCloud-200 rounded-full rotate-[15deg] opacity-85 shadow-sm" />
                  <div className="absolute -left-4 w-18 h-10 bg-gradient-to-l from-blushCloud-300 to-blushCloud-200 rounded-full rotate-[-15deg] opacity-85 shadow-sm" />
                </div>

                {/* Vinyl Record Disc */}
                <motion.div
                  className="relative w-[88%] h-[88%] rounded-full vinyl-grooves shadow-record flex items-center justify-center overflow-hidden cursor-pointer"
                  onClick={togglePlay}
                  title="Click to play / pause"
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{
                    repeat: isPlaying ? Infinity : 0,
                    duration: 4,
                    ease: 'linear',
                  }}
                >
                  {/* Vinyl light sheen reflection */}
                  <div className="absolute inset-0 vinyl-sheen rounded-full pointer-events-none opacity-80" />

                  {/* Center Label Sticker */}
                  <div className="relative w-26 h-26 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-wine-700 to-wine-950 p-1 flex items-center justify-center shadow-lg border-2 border-blushCloud-300">
                    <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-wine-900">
                      {!coverError ? (
                        <img
                          src={music.albumCover}
                          alt="Album Cover"
                          onError={() => setCoverError(true)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-center p-2 bg-gradient-to-tr from-wine-950 to-wine-800">
                          <Heart className="w-4 h-4 text-blushCloud-200 fill-blushCloud-200 mb-0.5" />
                          <span className="font-serif text-[9px] tracking-wider text-white uppercase font-bold">
                            Our Melody
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Spindle Hole */}
                    <div className="absolute w-4 h-4 rounded-full bg-white border border-neutral-700 shadow-inner z-10" />
                  </div>
                </motion.div>

                {/* Turntable Tonearm */}
                <div className="absolute top-2 right-2 sm:right-4 w-24 h-44 pointer-events-none hidden sm:block">
                  <div className="absolute top-0 right-0 w-7 h-7 rounded-full bg-gradient-to-b from-neutral-300 to-neutral-400 shadow-md border border-neutral-500" />
                  <motion.div
                    className="absolute top-3.5 right-3.5 w-1.5 h-32 bg-gradient-to-b from-neutral-200 to-neutral-400 origin-top rounded-full shadow-sm"
                    animate={{ rotate: isPlaying ? 24 : 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  >
                    <div className="absolute bottom-0 -left-1.5 w-4 h-5 bg-wine-950 rounded-xs shadow-xs border border-blushCloud-200" />
                  </motion.div>
                </div>
              </div>

              {/* Subtext like reference Card 4 */}
              <p className="mt-3 font-serif italic text-xs text-blushCloud-200/80">
                *click the vinyl to play the song
              </p>
            </div>

            {/* Right: Controls & Dedication Card */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Song Title & Artist */}
              <div className="mb-4">
                <span className="text-xs font-mono tracking-widest text-blushCloud-300 uppercase">
                  Our Track
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-0.5">
                  {trackTitle}
                </h3>
                <p className="font-sans text-sm text-blushCloud-100/80 mt-1">
                  {artistName}
                </p>
              </div>

              {/* Missing Audio File / Placeholder Notice */}
              {audioError && (
                <div className="mb-5 p-4 rounded-lg bg-wine-900/90 border border-white/20 text-white flex items-start gap-3">
                  <Heart className="w-5 h-5 text-blushCloud-300 fill-blushCloud-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base font-bold text-blushCloud-100">
                      {music.placeholderMessage}
                    </h4>
                    <p className="text-xs text-white/80 mt-1 leading-relaxed">
                      Add your song file to <code className="bg-white/20 px-1.5 py-0.5 rounded font-mono text-[11px] text-blushCloud-100">public/assets/our-song.mp3</code> to hear our melody!
                    </p>
                  </div>
                </div>
              )}

              {/* Scrubber Progress Bar */}
              <div className="mb-6">
                <div className="relative flex items-center">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    disabled={audioError || !duration}
                    aria-label="Seek track position"
                    className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blushCloud-300 disabled:opacity-50"
                  />
                </div>
                <div className="flex justify-between items-center text-xs font-mono text-blushCloud-200 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls & Equalizer */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause song' : 'Play song'}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-white hover:bg-blushCloud-100 text-wine-900 font-serif text-base font-medium shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/30 cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-wine-900" />
                      <span>Pause Song</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-wine-900" />
                      <span>Play Our Song</span>
                    </>
                  )}
                </button>

                {/* Animated Equalizer */}
                <div className="flex items-end gap-1 h-6 px-3 py-1 bg-white/10 rounded-md border border-white/20">
                  {[1, 2, 3, 4, 5].map((bar) => (
                    <motion.span
                      key={bar}
                      className="w-1 bg-blushCloud-200 rounded-full"
                      animate={{
                        height: isPlaying ? ['20%', '100%', '35%', '85%', '40%'] : '25%',
                      }}
                      transition={{
                        repeat: isPlaying ? Infinity : 0,
                        duration: 0.6 + bar * 0.15,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>

                {/* Volume Control */}
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="text-blushCloud-200 hover:text-white p-1"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setAudioVolume(parseFloat(e.target.value))}
                    aria-label="Volume slider"
                    className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blushCloud-300"
                  />
                </div>
              </div>

              {/* Dedication Note Card */}
              <div className="bg-white/10 backdrop-blur-xs p-5 rounded-md border border-white/15 relative">
                <div className="flex items-center gap-2 mb-2 text-blushCloud-200">
                  <Heart className="w-4 h-4 text-blushCloud-300 fill-blushCloud-300" />
                  <span className="font-serif italic font-medium text-sm text-blushCloud-100">
                    Why this song is you
                  </span>
                </div>
                <p className="font-serif text-white/90 text-sm sm:text-base leading-relaxed italic">
                  "{music.dedicationNote}"
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
