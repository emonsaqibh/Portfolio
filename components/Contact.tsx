import React, { useMemo, useState, useEffect } from 'react';
import { ArrowUpRight, ArrowUp, Hand } from 'lucide-react';
import { motion } from 'framer-motion';

const SmileyFace = () => (
  <svg 
    viewBox="0 0 100 100" 
    className="w-12 h-12 md:w-20 md:h-20" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="6"
  >
    <circle cx="50" cy="50" r="45" />
    {/* Eyes - Static */}
    <path d="M30 40 L30 50" strokeLinecap="round" />
    <path d="M70 40 L70 50" strokeLinecap="round" />
    {/* Mouth */}
    <path d="M30 70 Q50 85 70 70" strokeLinecap="round" />
  </svg>
);

interface AnimatedStickerProps {
  index: number;
  isSpecial: boolean;
}

const AnimatedSticker: React.FC<AnimatedStickerProps> = ({ index, isSpecial }) => {
  // Generate random rotation once per component instance
  const randomRotation = useMemo(() => Math.random() * 20 - 10, []);

  return (
    <motion.div
      initial={{ y: 150, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: index * 0.05, 
        type: "spring", 
        stiffness: 50,
        damping: 15
      }}
      whileHover="hover"
      className="flex-shrink-0 -ml-4 md:-ml-10 mb-[-20px] relative z-10"
      style={{ zIndex: index }}
    >
      <motion.div
        variants={{
          hover: { 
            scale: 1.15, 
            y: -20,
            rotate: randomRotation,
            backgroundColor: isSpecial ? '#FACC15' : 'var(--sticker-bg)',
            color: isSpecial ? '#000000' : 'var(--sticker-text)',
            borderColor: isSpecial ? '#FACC15' : 'var(--sticker-border)',
            transition: { type: "spring", stiffness: 300, damping: 15 }
          }
        }}
        // Using CSS variables for dynamic framer motion values or classes
        className="w-16 h-16 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-white dark:bg-[#0a0a0a] rounded-full border-2 md:border-4 border-black dark:border-white text-black dark:text-white flex items-center justify-center cursor-pointer relative"
        style={{
             // @ts-ignore
             '--sticker-bg': isSpecial ? '#FACC15' : '#fff', 
             '--sticker-text': '#000',
             '--sticker-border': '#000'
        }}
      >
        <SmileyFace />

        {/* Special Dialogue Bubble */}
        {isSpecial && (
          <motion.div
            variants={{
              hover: { opacity: 1, scale: 1, y: -70 }
            }}
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-[10px] md:text-sm font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-lg shadow-xl whitespace-nowrap pointer-events-none z-20"
          >
            Ready to build?
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black dark:bg-white rotate-45" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const StickerRow: React.FC = () => {
  const [specialIndex, setSpecialIndex] = useState<number>(-1);

  useEffect(() => {
    const min = 2;
    const max = 17;
    setSpecialIndex(Math.floor(Math.random() * (max - min + 1)) + min);
  }, []);

  return (
    <div className="flex overflow-x-clip overflow-y-visible pt-12 pb-4 px-4 w-full justify-center opacity-80 relative z-0 pointer-events-auto">
      <div className="flex min-w-max">
        {[...Array(20)].map((_, i) => (
          <AnimatedSticker key={i} index={i} isSpecial={i === specialIndex} />
        ))}
      </div>
    </div>
  );
};

export const Contact: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'Instagram', url: '#' },
    { name: 'Dribbble', url: '#' },
    { name: 'LinkedIn', url: '#' },
    { name: 'Contact', url: 'mailto:hello@lustra.studio' },
  ];

  return (
    <section id="contact" className="relative bg-[#fafafa] dark:bg-[#0a0a0a] pt-24 md:pt-32 overflow-hidden flex flex-col justify-between min-h-[70vh] md:min-h-[80vh] transition-colors duration-300">
      
      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex-grow flex flex-col items-center justify-center mb-32 md:mb-48">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-7xl lg:text-9xl font-[Syne] font-medium leading-tight mb-4 flex flex-col items-center text-black dark:text-white">
            <span>Let's build</span>
            <span className="flex items-center gap-2 md:gap-4">
              something cool 
              <Hand className="w-8 h-8 md:w-20 md:h-20 stroke-1 text-black dark:text-white" />
            </span>
          </h2>
        </motion.div>

        {/* Floating Pill Links */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8 md:mt-12"
        >
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.url}
              className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 rounded-full text-xs md:text-sm uppercase tracking-wider text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 group"
            >
              {link.name}
              <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Footer Stickers */}
      <div className="w-full mt-auto">
        <StickerRow />
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-black/10 dark:border-white/10 bg-[#fafafa] dark:bg-[#0a0a0a] relative z-20 transition-colors duration-300">
        <div className="container mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-gray-500 uppercase tracking-widest text-center md:text-left">
          <div>
            All rights reserved 2025 © Shakibul Alam Emon
          </div>
          
          <div className="flex items-center gap-6 md:gap-8">
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Imprint</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy</a>
          </div>

          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors group"
          >
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            To Top
          </button>
        </div>
      </div>
    </section>
  );
};