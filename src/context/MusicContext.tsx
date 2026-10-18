import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { loveStory } from '../data/loveStory';

interface MusicContextType {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  audioError: boolean;
  togglePlay: () => void;
  pauseMusic: () => void;
  seek: (time: number) => void;
  setAudioVolume: (vol: number) => void;
  toggleMute: () => void;
  trackTitle: string;
  artistName: string;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { trackTitle, artistName, audioSrc } = loveStory.card4;

  useEffect(() => {
    const audio = new Audio();
    const resolvedSrc = audioSrc.startsWith('/') ? `.${audioSrc}` : audioSrc;
    audio.src = resolvedSrc;
    audio.preload = 'auto';
    audio.volume = volume;
    audio.loop = true;
    audioRef.current = audio;

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setAudioError(false);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const onEnded = () => {
      // Loop the audio continuously
      audio.currentTime = 0;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    };

    const onError = () => {
      // Audio file not found or browser could not decode
      setAudioError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.pause();
      audioRef.current = null;
    };
  }, [audioSrc]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setAudioError(false);
      }).catch((err) => {
        console.warn('Playback notice:', err.message);
        // Could be missing local file or autoplay restriction
        setAudioError(true);
        setIsPlaying(false);
      });
    }
  };

  const pauseMusic = () => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const seek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const setAudioVolume = (vol: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clamped = Math.max(0, Math.min(1, vol));
    audio.volume = clamped;
    setVolume(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
      audio.muted = false;
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        audioError,
        togglePlay,
        pauseMusic,
        seek,
        setAudioVolume,
        toggleMute,
        trackTitle,
        artistName,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
