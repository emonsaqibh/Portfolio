import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// IMPORT SETTINGS
import { SITE_SETTINGS } from '../constants';

interface NavigationProps {
  onNavigate: (view: 'home' | 'about') => void;
  theme: 'dark' | 'light';
  toggleTheme: (e?: React.MouseEvent) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (view: 'home' | 'about', hash?: string) => {
    setIsMobileMenuOpen(false);
    
    // Small delay to allow menu close animation to start
    setTimeout(() => {
      onNavigate(view);
      if (view === 'home' && hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (view === 'home') {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 300);
  };

  const menuVariants = {
    closed: { 
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as any }
    },
    open: { 
      opacity: 1,
      y: "0%", 
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as any }
    }
  };

  const linkVariants = {
    closed: { y: 30, opacity: 0 },
    open: (i: number) => ({ 
      y: 0, 
      opacity: 1, 
      transition: { delay: 0.3 + (i * 0.1), duration: 0.4 } 
    })
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'py-4' : 'py-6'}`}>
        
        {/* Background Blur Layer */}
        <div className={`absolute inset-0 bg-[#fafafa]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md transition-opacity duration-300 ${isScrolled && !isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} />

        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative z-10">
          <button onClick={() => handleNavClick('home')} className="text-xl font-bold tracking-tighter uppercase font-[Syne] text-black dark:text-white z-[70] transition-colors">
            {/* DYNAMIC LOGO FROM CMS */}
            {SITE_SETTINGS.logo_text}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
            <button onClick={() => handleNavClick('about')} className="hover:text-black dark:hover:text-white transition-colors">About</button>
            <button onClick={() => handleNavClick('home', '#works')} className="hover:text-black dark:hover:text-white transition-colors">Works</button>
            <button onClick={() => handleNavClick('home', '#services')} className="hover:text-black dark:hover:text-white transition-colors">Services</button>
            <button onClick={() => handleNavClick('home', '#contact')} className="hover:text-black dark:hover:text-white transition-colors">Contact</button>
            
            {/* Theme Toggle */}
            <button 
                onClick={(e) => toggleTheme(e)}
                className="p-2 rounded-full bg-gray-200 dark:bg-white/10 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-white/20 transition-colors relative overflow-hidden"
                aria-label="Toggle theme"
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={theme}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </motion.div>
                </AnimatePresence>
            </button>

            <button className="px-5 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-semibold">
              Book a Call
            </button>
          </div>

          {/* Mobile Toggle & Theme */}
          <div className="md:hidden flex items-center gap-4 z-[70]">
            <button 
                onClick={(e) => toggleTheme(e)}
                className="p-2 text-black dark:text-white focus:outline-none"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button 
                className="text-black dark:text-white p-2 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-[#fafafa] dark:bg-[#0a0a0a] z-[50] flex flex-col justify-center px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              {[
                { label: 'Home', action: () => handleNavClick('home') },
                { label: 'About', action: () => handleNavClick('about') },
                { label: 'Selected Works', action: () => handleNavClick('home', '#works') },
                { label: 'Services', action: () => handleNavClick('home', '#services') },
                { label: 'Contact', action: () => handleNavClick('home', '#contact') },
              ].map((item, i) => (
                <motion.button
                  key={item.label}
                  custom={i}
                  variants={linkVariants}
                  onClick={item.action}
                  className="text-4xl font-[Syne] font-bold text-left text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors flex items-center gap-4 group"
                >
                  {item.label}
                  <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-sm" size={24} />
                </motion.button>
              ))}
            </div>

            <motion.div 
               variants={linkVariants} 
               custom={5}
               className="mt-12 pt-12 border-t border-black/10 dark:border-white/10"
            >
               <button className="w-full py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold text-lg uppercase tracking-wide">
                 Book a Call
               </button>
               <div className="mt-8 flex justify-between text-gray-500 text-xs uppercase tracking-widest">
                 <span>Dhaka, Bangladesh</span>
                 {/* DYNAMIC EMAIL FROM CMS */}
                 <span>{SITE_SETTINGS.email}</span>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
