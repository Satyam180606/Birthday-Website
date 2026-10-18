import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ArrowUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MusicProvider } from './context/MusicContext';
import { Navbar } from './components/Navbar';
import { FloatingDecorations } from './components/FloatingDecorations';
import { TopHeader } from './components/TopHeader';
import { SlideNavigator } from './components/SlideNavigator';
import { Card1_HappyBirthday } from './components/cards/Card1_HappyBirthday';
import { Card2_FavoritePerson } from './components/cards/Card2_FavoritePerson';
import { Card3_FavoriteMoments } from './components/cards/Card3_FavoriteMoments';
import { Card_VideoMemories } from './components/cards/Card_VideoMemories';
import { Card4_SongVinyl } from './components/cards/Card4_SongVinyl';
import { Card5_ReasonILoveYou } from './components/cards/Card5_ReasonILoveYou';
import { Card6_ThreeWords } from './components/cards/Card6_ThreeWords';
import { Card7_LetterForYou } from './components/cards/Card7_LetterForYou';
import { Card8_LittleThings } from './components/cards/Card8_LittleThings';
import { SectionMorph } from './components/SectionMorph';
import { FloatingMusicBar } from './components/FloatingMusicBar';
import { LightboxModal, type LightboxData } from './components/LightboxModal';
import { loveStory } from './data/loveStory';

export const AppContent: React.FC = () => {
  const [lightboxData, setLightboxData] = useState<LightboxData | null>(null);
  const [petalsActive, setPetalsActive] = useState(true);
  const [showSecretModal, setShowSecretModal] = useState(false);

  const handlePhotoClick = (data: LightboxData) => {
    setLightboxData(data);
  };

  const handleReturnToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSecret = () => {
    confetti({
      particleCount: 100,
      spread: 110,
      origin: { y: 0.6 },
      colors: ['#5C1322', '#7B1F31', '#EFADC0', '#F7CBD4', '#FFFFFF'],
    });
    setShowSecretModal(true);
  };

  const scrollToSlide = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-blushCloud-50 text-wine-900 selection:bg-blushCloud-200 selection:text-wine-950 overflow-x-hidden">
      {/* Floating Petals & Stars Background Animation */}
      {petalsActive && <FloatingDecorations count={18} />}

      {/* Top Floating Navigation Bar */}
      <Navbar
        petalsActive={petalsActive}
        onTogglePetals={() => setPetalsActive(!petalsActive)}
      />

      {/* Floating Side Slide Navigator with Hover Tooltips & Jump Dots */}
      <SlideNavigator />

      {/* Top Template Header Banner */}
      <TopHeader />

      {/* ============================================================ */}
      {/* 8 FULL-SCREEN, EDGE-TO-EDGE SLIDES (No Small Cards!) */}
      {/* ============================================================ */}
      <main className="w-full">
        {/* SLIDE 1: Happy Birthday Cover (Full-Screen Crushed Wine Paper) */}
        <section className="w-full min-h-screen">
          <SectionMorph variant="rise">
            <Card1_HappyBirthday
              onPhotoClick={handlePhotoClick}
              onNext={() => scrollToSlide('card-2')}
            />
          </SectionMorph>
        </section>

        {/* SLIDE 2: To My Favorite Person (Full-Screen Textured Cream Paper) */}
        <section className="w-full min-h-screen">
          <SectionMorph variant="page-turn">
            <Card2_FavoritePerson
              onPhotoClick={handlePhotoClick}
              onNext={() => scrollToSlide('card-3')}
            />
          </SectionMorph>
        </section>

        {/* SLIDE 3: One of My Favorite Moments (Full-Screen Linen Wine Paper) */}
        <section className="w-full min-h-screen">
          <SectionMorph variant="tilt-left">
            <Card3_FavoriteMoments
              onPhotoClick={handlePhotoClick}
              onNext={() => scrollToSlide('card-video')}
            />
          </SectionMorph>
        </section>

        {/* SLIDE 4: Moving Memories & Video Reels (11 Live Video Clips) */}
        <section className="w-full min-h-screen">
          <SectionMorph variant="zoom-in">
            <Card_VideoMemories
              onVideoClick={handlePhotoClick}
              onNext={() => scrollToSlide('music-section')}
            />
          </SectionMorph>
        </section>

        {/* SLIDE 5: This Song Reminds Me of You (Full-Screen Linen Wine Vinyl Player) */}
        <section className="w-full min-h-screen">
          <SectionMorph variant="zoom-in">
            <Card4_SongVinyl onNext={() => scrollToSlide('card-5')} />
          </SectionMorph>
        </section>

        {/* SLIDE 6: [reason] I Love You (Full-Screen Cream 6-Polaroids Grid) */}
        <section className="w-full min-h-screen">
          <SectionMorph variant="page-turn">
            <Card5_ReasonILoveYou
              onPhotoClick={handlePhotoClick}
              onNext={() => scrollToSlide('card-6')}
            />
          </SectionMorph>
        </section>

        {/* SLIDE 7: In Three Words (Full-Screen Crushed Wine Paper with 3 Words) */}
        <section className="w-full min-h-screen">
          <SectionMorph variant="tilt-right">
            <Card6_ThreeWords
              onPhotoClick={handlePhotoClick}
              onNext={() => scrollToSlide('card-7')}
            />
          </SectionMorph>
        </section>

        {/* SLIDE 8: A Letter for You (Full-Screen Crushed Wine Paper Filmstrip + Letter) */}
        <section className="w-full min-h-screen">
          <SectionMorph variant="page-turn">
            <Card7_LetterForYou
              onPhotoClick={handlePhotoClick}
              onNext={() => scrollToSlide('card-8')}
            />
          </SectionMorph>
        </section>

        {/* SLIDE 9: The Little Things (Full-Screen Cream Paper with Camera & Checklist) */}
        <section className="w-full min-h-screen">
          <SectionMorph variant="curtain">
            <Card8_LittleThings
              onPhotoClick={handlePhotoClick}
              onOpenSecret={handleOpenSecret}
            />
          </SectionMorph>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 bg-wine-950 text-white px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif border-t border-white/10">
        <p className="flex items-center gap-1.5">
          <span>Made with all my heart for {loveStory.herName}</span>
          <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400 inline" />
        </p>

        <button
          onClick={handleReturnToTop}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20"
          aria-label="Return to beginning"
        >
          <span>Return to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </footer>

      {/* Floating Mini Player for uninterrupted music across scrolling */}
      <FloatingMusicBar />

      {/* Full-Screen Interactive Photo Lightbox */}
      <LightboxModal
        data={lightboxData}
        onClose={() => setLightboxData(null)}
      />

      {/* Secret Message Modal */}
      <AnimatePresence>
        {showSecretModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-wine-950/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSecretModal(false)}
          >
            <motion.div
              className="relative max-w-lg w-full bg-white rounded-xl p-6 sm:p-8 shadow-2xl border border-neutral-200 text-left overflow-hidden"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSecretModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-wine-700 hover:text-wine-950 hover:bg-wine-100 transition-colors cursor-pointer"
                aria-label="Close message"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="washi-tape-blush left-1/2 -top-3 -translate-x-1/2 rotate-1" />

              <div className="flex items-center gap-2 text-wine-600 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-mono tracking-widest uppercase">
                  A Special Birthday Wish
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-wine-900 font-normal mb-3">
                To My Favorite Person
              </h3>

              <div className="space-y-3 font-serif text-sm sm:text-base text-wine-900/90 leading-relaxed font-light">
                <p>
                  If I could give you one gift that lasts forever, it would be the ability to see yourself through my eyes.
                </p>
                <p>
                  You would see how effortlessly you brighten any room, how deeply you make others feel loved, and just how breathtaking you truly are.
                </p>
                <p>
                  Happy Birthday, {loveStory.herName}. You are my whole heart.
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-neutral-200 flex items-center justify-between">
                <span className="font-handwriting text-2xl text-wine-900">
                  Always yours, {loveStory.myName}
                </span>
                <Heart className="w-4 h-4 text-wine-600 fill-wine-500" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <MusicProvider>
      <AppContent />
    </MusicProvider>
  );
}
