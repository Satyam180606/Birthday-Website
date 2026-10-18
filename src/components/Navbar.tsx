import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Menu, X } from 'lucide-react';
import { loveStory } from '../data/loveStory';

interface NavbarProps {
  onTogglePetals?: () => void;
  petalsActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onTogglePetals, petalsActive = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Card 1', href: '#card-1' },
    { name: 'Card 2', href: '#card-2' },
    { name: 'Moments', href: '#card-3' },
    { name: 'Reels', href: '#card-video' },
    { name: 'Our Song', href: '#music-section' },
    { name: 'Reasons', href: '#card-5' },
    { name: '3 Words', href: '#card-6' },
    { name: 'Letter', href: '#card-7' },
    { name: 'Little Things', href: '#card-8' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-wine-100 py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-wine-800 flex items-center justify-center text-white font-serif text-sm font-semibold shadow-xs group-hover:scale-105 transition-transform">
              <Heart className="w-4 h-4 text-blushCloud-300 fill-blushCloud-300" />
            </div>
            <span className="font-serif italic text-lg sm:text-xl text-wine-900 font-medium">
              {loveStory.herName} & {loveStory.myName}
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-serif tracking-widest uppercase text-wine-800">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="hover:text-wine-600 transition-colors cursor-pointer py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-wine-600 hover:after:w-full after:transition-all"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Action: Mobile Toggle */}
          <div className="flex items-center gap-3">
            {onTogglePetals && (
              <button
                onClick={onTogglePetals}
                title={petalsActive ? 'Disable floating petals' : 'Enable floating petals'}
                className={`p-1.5 rounded-full border text-xs transition-colors cursor-pointer ${
                  petalsActive
                    ? 'border-wine-300 text-wine-800 bg-white'
                    : 'border-neutral-300 text-neutral-400 hover:text-neutral-600'
                }`}
                aria-label="Toggle floating petals"
              >
                <Sparkles className="w-4 h-4 text-wine-600" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-wine-900 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-30 bg-white/98 backdrop-blur-lg border-b border-wine-100 p-6 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-4 text-center font-serif text-lg text-wine-900">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="py-2 border-b border-wine-100/60 hover:text-wine-600 transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
