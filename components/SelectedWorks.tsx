import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Plus, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface SelectedWorksProps {
  onProjectClick?: (project: Project) => void;
  onViewAll?: () => void;
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({ onProjectClick, onViewAll }) => {
  const [activeProject, setActiveProject] = useState(0);

  const handleViewProject = () => {
    if (onProjectClick) {
      onProjectClick(PROJECTS[activeProject]);
    }
  };

  return (
    <section id="works" className="py-16 md:py-24 px-4 md:px-12 bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-[Syne] mb-4 text-black dark:text-white">Selected Works</h2>
            <p className="text-gray-600 dark:text-gray-500 text-sm max-w-md">
              Whether you're building a SaaS platform, launching a mobile app, or validating a new MVP — we're ready to help.
            </p>
          </div>
          
          {/* Desktop View All Button */}
          <div className="hidden md:block">
             <button 
                onClick={onViewAll}
                className="group relative px-8 py-4 rounded-full border border-black/10 dark:border-white/10 overflow-hidden bg-transparent transition-colors"
             >
                <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-black dark:bg-white transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                <span className="relative z-10 flex items-center gap-2 font-bold uppercase tracking-wider text-sm text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                   See All Works <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
             </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-auto md:h-[600px] gap-6 md:gap-4">
          {/* Image Area */}
          <div className="relative flex-grow h-[400px] md:h-full bg-gray-200 dark:bg-gray-900 overflow-hidden rounded-sm group cursor-pointer" onClick={handleViewProject}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src={PROJECTS[activeProject].image} 
                  alt={PROJECTS[activeProject].title}
                  className="w-full h-full object-cover opacity-90 dark:opacity-80 transition-transform duration-700 group-hover:scale-105"
                />
                {/* Always dark overlay for readability of white text on image */}
                <div className="absolute inset-0 bg-black/10 dark:bg-black/20 transition-colors duration-300 group-hover:bg-black/30 dark:group-hover:bg-black/40" />
                
                {/* View Project Overlay Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 font-bold uppercase tracking-widest text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                        View Case Study <ArrowUpRight size={16} />
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 p-6 md:p-12 max-w-lg pointer-events-none">
                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-bold mb-2 text-white drop-shadow-md"
                  >
                    {PROJECTS[activeProject].title}
                  </motion.h3>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-200 text-xs md:text-sm line-clamp-2 md:line-clamp-none drop-shadow-md"
                  >
                    {PROJECTS[activeProject].description}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-row lg:flex-col gap-4 lg:gap-px bg-transparent md:bg-gray-100 dark:md:bg-gray-900/20 overflow-x-auto md:overflow-visible pb-4 md:pb-0 no-scrollbar snap-x">
            {PROJECTS.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(index)}
                className={`relative min-w-[160px] md:min-w-0 flex-1 lg:w-24 p-6 md:p-4 flex flex-col lg:flex-col items-start md:items-center justify-center transition-all duration-300 border border-black/5 dark:border-white/5 rounded-lg md:rounded-none snap-start ${
                  activeProject === index 
                    ? 'bg-black text-white dark:bg-white dark:text-black' 
                    : 'bg-white text-gray-500 hover:text-black dark:bg-[#0f0f0f] dark:text-gray-500 dark:hover:text-white'
                }`}
              >
                <span className="text-xs font-mono mb-2 md:mb-2 lg:mb-auto">{`0${index + 1}`}</span>
                <span 
                  className="text-sm font-bold uppercase tracking-widest whitespace-nowrap lg:[writing-mode:vertical-lr] lg:rotate-180"
                >
                  {project.category}
                </span>
                <Plus size={16} className={`mt-2 lg:mt-auto transition-opacity duration-300 ${activeProject === index ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 md:hidden">
            <button 
            onClick={onViewAll}
            className="w-full group relative px-8 py-4 rounded-full border border-black/10 dark:border-white/10 overflow-hidden bg-transparent transition-colors"
            >
            <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-black dark:bg-white transition-transform duration-500 ease-[0.22,1,0.36,1]" />
            <span className="relative z-10 flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-sm text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                See All Works <ArrowRight size={16} />
            </span>
            </button>
        </div>

      </div>
    </section>
  );
};