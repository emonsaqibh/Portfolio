import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, Mail, Quote, Pause } from 'lucide-react';
import { Contact } from './Contact';
// IMPORT ALL CMS DATA
import { WORK_HISTORY, RESUME_URL, TESTIMONIALS } from '../constants';

interface AboutProps {
  onBack: () => void;
}

const StoryViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const DURATION = 5000; // 5 seconds per slide

  // Ensure testimonials exist to prevent crashes if empty
  const safeTestimonials = TESTIMONIALS.length > 0 ? TESTIMONIALS : [{
      id: 0, name: "Coming Soon", role: "", text: "No testimonials added yet.", avatar: "", bg: "bg-black"
  }];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % safeTestimonials.length);
  }, [safeTestimonials.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + safeTestimonials.length) % safeTestimonials.length);
  }, [safeTestimonials.length]);

  const handleJump = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPaused) {
        setIsPaused(false);
    }
    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    if (x < width * 0.3) {
      handlePrev();
    } else {
      handleNext();
    }
  };

  const handlePointerDown = () => setIsPaused(true);
  const handlePointerLeave = () => setIsPaused(false);

  return (
    <div 
      className="w-full mx-auto aspect-[9/16] md:aspect-[21/9] bg-black rounded-[2rem] md:rounded-[3rem] relative overflow-hidden shadow-2xl border border-white/10 group select-none transform transition-all duration-500 hover:shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5)] ring-1 ring-black/10"
      onPointerDown={handlePointerDown}
      onPointerUp={handleTap}
      onPointerLeave={handlePointerLeave}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 ${safeTestimonials[currentIndex].bg}`}
        />
      </AnimatePresence>
      
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 pt-6 px-6 md:pt-10 md:px-10 z-50 flex flex-col gap-2 pointer-events-none">
          <div className="flex gap-2 w-full">
            {safeTestimonials.map((_, idx) => (
                <div 
                    key={idx}
                    className="relative h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden cursor-pointer pointer-events-auto group transition-all duration-300 hover:h-2"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleJump(idx);
                    }}
                >
                    <div className="absolute -inset-y-4 inset-x-0 z-10" />
                    {idx < currentIndex && <div className="absolute inset-0 bg-white" />}
                    {idx === currentIndex && (
                        <div 
                            className="absolute top-0 left-0 h-full bg-white"
                            style={{
                                width: '0%',
                                animation: `progress ${DURATION}ms linear forwards`,
                                animationPlayState: isPaused ? 'paused' : 'running'
                            }}
                            onAnimationEnd={handleNext}
                        />
                    )}
                </div>
            ))}
          </div>
       </div>
       <style>{`@keyframes progress { to { width: 100%; } }`}</style>

      <div className="absolute inset-0 flex flex-col md:flex-row items-center md:items-end p-8 md:p-16 z-20 pointer-events-none gap-8 md:gap-16">
          <div className="flex-1 flex flex-col justify-center h-full w-full">
             <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="relative"
                >
                  <Quote className="w-12 h-12 md:w-20 md:h-20 text-white/20 mb-4 md:mb-8" />
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-[Syne] font-medium text-white leading-snug drop-shadow-lg">
                    "{safeTestimonials[currentIndex].text}"
                  </h3>
                </motion.div>
             </AnimatePresence>
          </div>

          <div className="w-full md:w-auto flex md:flex-col items-center md:items-start gap-4 md:gap-6">
             <motion.div 
                key={`info-${currentIndex}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-4 md:block"
             >
                 <img 
                     src={safeTestimonials[currentIndex].avatar} 
                     alt={safeTestimonials[currentIndex].name} 
                     className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-white/30 object-cover md:mb-4"
                 />
                 <div>
                     <div className="text-white font-[Syne] font-bold text-base md:text-xl">
                         {safeTestimonials[currentIndex].name}
                     </div>
                     <div className="text-white/60 text-xs md:text-sm uppercase tracking-widest font-mono">
                         {safeTestimonials[currentIndex].role}
                     </div>
                 </div>
             </motion.div>
          </div>
      </div>

      <AnimatePresence>
        {isPaused && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-8 right-8 z-40 pointer-events-none"
          >
            <div className="bg-black/40 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center border border-white/10">
                 <Pause size={16} className="text-white fill-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-10 flex">
          <div className="w-[30%] h-full cursor-w-resize" title="Previous" />
          <div className="w-[40%] h-full cursor-pointer" />
          <div className="w-[30%] h-full cursor-e-resize" title="Next" />
      </div>
    </div>
  );
};

export const About: React.FC<AboutProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] relative z-50 transition-colors duration-300"
      ref={containerRef}
    >
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
        <button onClick={onBack} className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors font-[Syne] uppercase tracking-widest text-sm pointer-events-auto">
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>

      <div className="container mx-auto px-6 md:px-12 pt-32 md:pt-48 pb-20">
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-start gap-12 md:gap-20 max-w-6xl"
        >
            <div className="flex flex-col items-center gap-6 flex-shrink-0 mx-auto md:mx-0">
                <div className="relative group">
                    <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-[#222] shadow-2xl">
                        <img src="https://github.com/emonsaqibh/Portfolio/blob/main/public/images/uploads/generated-image-september-09-2025-3_10am.png?raw=true" alt="Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110" />
                    </div>
                    <motion.div 
                        initial={{ scale: 0, rotate: 10 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.4, type: "spring" }}
                        className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-white text-black px-3 py-1 rounded-full font-bold text-[10px] md:text-xs font-[Syne] shadow-lg border border-black/5 z-20"
                    >
                        Est. 1998
                    </motion.div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#111] rounded-full border border-black/5 dark:border-white/10 shadow-sm">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">Based in Dhaka</span>
                </div>
            </div>

            <div className="flex-1 pt-4 text-center md:text-left">
                <h1 className="text-5xl md:text-7xl font-[Syne] font-bold text-black dark:text-white leading-none mb-4 tracking-tighter">Shakibul Alam<br />Emon</h1>
                <h2 className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium mb-8 uppercase tracking-wide">Product Designer & Strategist</h2>
                <div className="space-y-6 text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto md:mx-0">
                    <p>I'm a multidisciplinary designer focusing on digital products, interactive experiences, and branding. My approach combines aesthetic precision with strategic thinking to build tools that are not just beautiful, but impactful.</p>
                    <p>Based in Dhaka, I work with startups and established brands to define their digital future. When I'm not designing, I'm exploring new tech stacks or mentoring young designers.</p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-10">
                    <a href="mailto:hello@lustra.studio" className="flex items-center gap-2 px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold text-sm uppercase tracking-wide hover:scale-105 transition-transform shadow-lg">
                        <Mail size={18} /> Contact Me
                    </a>
                    <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-3 bg-transparent border border-black/20 dark:border-white/20 text-black dark:text-white rounded-full font-bold text-sm uppercase tracking-wide hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <Download size={18} /> Resume
                    </a>
                </div>
            </div>
        </motion.div>
      </div>

      <div className="bg-white dark:bg-[#0f0f0f] py-32 border-t border-black/5 dark:border-white/5">
         <div className="container mx-auto px-6 md:px-12">
            <div className="flex items-end justify-between mb-20">
               <h2 className="text-4xl md:text-5xl font-[Syne] font-bold text-black dark:text-white">Work History</h2>
               <span className="hidden md:block text-xs font-mono uppercase tracking-widest text-gray-400">2016 — Present</span>
            </div>
            <div className="relative">
               <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-white/10 -translate-x-1/2" />
               <div className="space-y-12 md:space-y-24">
                  {WORK_HISTORY.map((job, index) => (
                     <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`flex flex-col md:flex-row items-start gap-8 md:gap-0 relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                     >
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-white dark:border-[#0f0f0f] shadow-sm z-10 mt-1.5" />
                        <div className="md:hidden absolute left-0 top-2 bottom-0 w-px bg-gray-200 dark:bg-white/10" />
                        <div className="md:hidden absolute left-[-4.5px] top-2 w-2.5 h-2.5 rounded-full bg-black dark:bg-white" />
                        <div className={`w-full md:w-1/2 pl-6 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                           <span className="font-mono text-sm text-gray-500 uppercase tracking-widest bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-md inline-block mb-2 md:mb-0">{job.period}</span>
                        </div>
                        <div className={`w-full md:w-1/2 pl-6 md:pl-0 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 md:text-right'}`}>
                           <h3 className="text-2xl font-[Syne] font-bold text-black dark:text-white mb-1">{job.role}</h3>
                           <div className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2 md:inline-flex">{job.company}</div>
                           <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">{job.description}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      <div className="py-20 md:py-32 overflow-hidden bg-[#fafafa] dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
               <div>
                  <h2 className="text-4xl md:text-6xl font-[Syne] font-bold text-black dark:text-white mb-4 leading-tight">Stories from<br/><span className="text-gray-400">happy clients.</span></h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-md">Successful projects are built on trust. Here is what my partners have to say.</p>
               </div>
               <div className="flex gap-8">
                  <div><div className="text-3xl font-[Syne] font-bold text-black dark:text-white mb-1">100%</div><div className="text-xs uppercase tracking-widest text-gray-500">Job Success</div></div>
                  <div><div className="text-3xl font-[Syne] font-bold text-black dark:text-white mb-1">45+</div><div className="text-xs uppercase tracking-widest text-gray-500">Projects</div></div>
               </div>
            </div>
            <div className="w-full"><StoryViewer /></div>
          </div>
        </div>
      </div>
      <Contact />
    </motion.div>
  );
};
