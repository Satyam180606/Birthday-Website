import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Calendar, Film } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export interface LightboxData {
  src: string;
  alt: string;
  caption?: string;
  date?: string;
  isVideo?: boolean;
}

interface LightboxModalProps {
  data: LightboxData | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ data, onClose }) => {
  const { pauseMusic } = useMusic();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isVideo = Boolean(data?.isVideo || data?.src?.toLowerCase().endsWith('.mp4'));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (data) {
      if (isVideo) {
        pauseMusic();
      }
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [data, isVideo, onClose, pauseMusic]);

  useEffect(() => {
    if (data && isVideo && videoRef.current) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [data, isVideo]);

  const resolvedSrc = data?.src?.startsWith('/') ? `.${data.src}` : data?.src;

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-wine-950/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-blushCloud-300 cursor-pointer shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <motion.div
            className={`relative w-full ${isVideo ? 'max-w-lg' : 'max-w-2xl'} bg-white rounded-xl p-3 sm:p-5 shadow-2xl border border-neutral-200 overflow-hidden`}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top washi tape */}
            <div
              className="washi-tape-blush left-1/2 -top-3 -translate-x-1/2 rotate-1"
              style={{ clipPath: 'polygon(2% 0%, 98% 3%, 100% 97%, 0% 100%)' }}
            />

            {/* Media preview */}
            <div className={`relative rounded-lg overflow-hidden ${isVideo ? 'bg-black' : 'bg-blushCloud-50'} max-h-[72vh] flex items-center justify-center shadow-inner border border-neutral-100`}>
              {isVideo ? (
                <video
                  ref={videoRef}
                  src={resolvedSrc}
                  controls
                  autoPlay
                  playsInline
                  loop
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                />
              ) : (
                <>
                  <img
                    src={data.src}
                    alt={data.alt}
                    className="w-full h-auto max-h-[65vh] object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.parentElement?.querySelector('.lightbox-fallback');
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                  <div className="lightbox-fallback hidden flex flex-col items-center justify-center p-12 text-center">
                    <Heart className="w-12 h-12 text-wine-500 fill-wine-400 mb-3" />
                    <p className="font-serif text-xl text-wine-900 mb-1">
                      {data.caption || "A Cherished Moment"}
                    </p>
                    <span className="font-mono text-xs text-wine-700 bg-white/90 px-2.5 py-1 rounded border border-wine-200">
                      {data.src.split('/').pop()}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Caption & Date */}
            <div className="mt-4 pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
              <div>
                {data.caption && (
                  <h3 className="font-handwriting text-2xl sm:text-3xl text-wine-900">
                    {data.caption}
                  </h3>
                )}
                <div className="flex items-center gap-2 mt-0.5 justify-center sm:justify-start">
                  {isVideo && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase bg-wine-800 text-white px-2 py-0.5 rounded-full">
                      <Film className="w-3 h-3 text-red-300" />
                      Video Reel
                    </span>
                  )}
                  <p className="text-xs font-sans text-wine-700/70">
                    {data.alt}
                  </p>
                </div>
              </div>

              {data.date && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blushCloud-100 border border-wine-200 text-xs font-medium text-wine-900">
                  <Calendar className="w-3.5 h-3.5 text-wine-600" />
                  <span>{data.date}</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
