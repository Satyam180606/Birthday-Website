import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Camera, Heart, Sparkles, ZoomIn } from 'lucide-react';

export interface PhotoFrameProps {
  src: string;
  alt: string;
  caption?: string;
  date?: string;
  rotation?: number;
  aspectRatio?: string;
  objectPosition?: string;
  variant?: 'polaroid' | 'warm-card' | 'tape-top' | 'tape-corner' | 'minimal';
  tapeColor?: 'blush' | 'kraft';
  className?: string;
  onPhotoClick?: (data: { src: string; caption?: string; date?: string; alt: string }) => void;
  priority?: boolean;
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  src,
  alt,
  caption,
  date,
  rotation = 0,
  aspectRatio = 'aspect-[4/5]',
  objectPosition = 'center',
  variant = 'polaroid',
  tapeColor = 'blush',
  className = '',
  onPhotoClick,
  priority = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const filename = src.split('/').pop() || 'photo.jpg';

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    if (onPhotoClick) {
      onPhotoClick({ src, caption, date, alt });
    }
  };

  return (
    <motion.div
      className={`relative inline-block select-none cursor-pointer group ${className}`}
      style={{
        rotate: `${rotation}deg`,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{ scale: 1.025, zIndex: 20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Washi Tape Accent */}
      {(variant === 'tape-top' || variant === 'polaroid') && (
        <div
          className={`${tapeColor === 'kraft' ? 'washi-tape-kraft' : 'washi-tape-blush'} left-1/2 -top-3 -translate-x-1/2 -rotate-1`}
          style={{ clipPath: 'polygon(3% 0%, 97% 2%, 100% 98%, 0% 100%)' }}
        />
      )}
      {variant === 'tape-corner' && (
        <div
          className={`${tapeColor === 'kraft' ? 'washi-tape-kraft' : 'washi-tape-blush'} -top-2 -left-3 -rotate-45 w-16 h-5`}
          style={{ clipPath: 'polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)' }}
        />
      )}

      {/* Main Crisp White Polaroid Paper Container */}
      <div className="bg-white p-2.5 sm:p-3.5 pb-3.5 sm:pb-5 rounded-xs shadow-polaroid group-hover:shadow-polaroid-hover transition-shadow duration-300 border border-neutral-200/70 relative">
        {/* Inner Photo Area */}
        <div className={`relative overflow-hidden bg-blushCloud-100 rounded-[2px] ${aspectRatio} w-full flex items-center justify-center border border-neutral-100`}>
          {!imageError && (
            <img
              src={src}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              style={{ objectPosition }}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              } group-hover:scale-105`}
            />
          )}

          {/* Fallback Illustrated Card */}
          {(imageError || !imageLoaded) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#FFF9FA] via-[#FDF2F4] to-[#FBE4E8]">
              <div className="w-11 h-11 rounded-full bg-white/80 shadow-xs flex items-center justify-center mb-2 text-wine-700 border border-wine-100">
                <Camera className="w-5 h-5 opacity-80" />
              </div>
              <p className="font-serif italic text-wine-900 text-sm sm:text-base font-medium px-2 leading-tight">
                {caption || "Photo Memory"}
              </p>
              <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/70 border border-wine-100 text-[11px] font-sans text-wine-700">
                <Sparkles className="w-2.5 h-2.5 text-wine-500" />
                <span className="font-mono text-[10px] truncate max-w-[130px]">{filename}</span>
              </div>
            </div>
          )}

          {/* Quick Zoom Indicator */}
          <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-wine-950/65 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <ZoomIn className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Caption */}
        {(caption || date) && (
          <div className="mt-2.5 px-1 flex flex-col items-center justify-center text-center">
            {caption && (
              <p className="font-handwriting text-xl sm:text-2xl text-wine-900 leading-snug tracking-wide">
                {caption}
              </p>
            )}
            {date && (
              <span className="text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-wider text-wine-700/70 mt-0.5 flex items-center gap-1">
                <Heart className="w-2.5 h-2.5 text-wine-500 fill-wine-500" />
                {date}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
