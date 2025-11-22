import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Filter } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

interface WorksProps {
  onBack: () => void;
  onProjectClick: (project: Project) => void;
}

// Duplicating projects to simulate a fuller CMS list for the design
const ALL_PROJECTS = [
  ...PROJECTS,
  {
    ...PROJECTS[0],
    id: 4,
    title: "NeoBank App",
    category: "Product Design",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop"
  },
  {
    ...PROJECTS[1],
    id: 5,
    title: "Vertex Dashboard",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    ...PROJECTS[2],
    id: 6,
    title: "Aura Identity",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1558655146-d09347e0b7a8?q=80&w=1000&auto=format&fit=crop"
  }
];

const CATEGORIES = ['All', 'Product Design', 'User Experience', 'Brand Identity', 'SaaS'];

export const Works: React.FC<WorksProps> = ({ onBack, onProjectClick }) => {
  const [filter, setFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(ALL_PROJECTS);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProjects(ALL_PROJECTS);
    } else {
      setFilteredProjects(ALL_PROJECTS.filter(p => p.category === filter));
    }
  }, [filter]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] relative z-50 transition-colors duration-300"
    >
      {/* Navbar Overlay */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors font-[Syne] uppercase tracking-widest text-sm pointer-events-auto cursor-pointer group"
        >
          <div className="bg-white text-black rounded-full p-2 group-hover:scale-110 transition-transform">
             <ArrowLeft size={16} /> 
          </div>
          <span className="ml-2">Back to Home</span>
        </button>
      </div>

      {/* Header Section */}
      <div className="container mx-auto px-6 md:px-12 pt-32 md:pt-48 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl md:text-8xl font-[Syne] font-bold text-black dark:text-white leading-[0.9] tracking-tighter"
            >
                My<br/><span className="text-gray-400">Projects.</span>
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 dark:text-gray-400 max-w-xs text-sm md:text-base"
            >
                A curated archive of projects that define the intersection of aesthetics and functionality.
            </motion.p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 md:gap-4 border-y border-black/10 dark:border-white/10 py-6 sticky top-0 bg-[#fafafa]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md z-40">
             <div className="hidden md:flex items-center gap-2 text-gray-500 mr-4">
                <Filter size={14} />
                <span className="text-xs uppercase tracking-widest">Filter By</span>
             </div>
             {CATEGORIES.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                        filter === cat 
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg' 
                        : 'bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10'
                    }`}
                >
                    {cat}
                </button>
             ))}
        </div>
      </div>

      {/* Grid Section */}
      <div className="container mx-auto px-6 md:px-12 pb-32">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-y-16"
          >
             <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`group cursor-pointer ${index % 3 === 0 ? 'md:col-span-2' : ''}`}
                        onClick={() => onProjectClick(project)}
                    >
                        {/* Image Container */}
                        <div className={`relative overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-900 mb-6 ${index % 3 === 0 ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                            
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            
                            {/* Floating View Button */}
                            <div className="absolute bottom-6 right-6 z-20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-white dark:bg-black rounded-full flex items-center justify-center text-black dark:text-white shadow-xl">
                                    <ArrowUpRight size={24} />
                                </div>
                            </div>
                        </div>

                        {/* Text Info */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl md:text-4xl font-[Syne] font-bold text-black dark:text-white mb-2 group-hover:underline decoration-1 underline-offset-4">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-md line-clamp-2">
                                    {project.description}
                                </p>
                            </div>
                            <div className="hidden md:block text-right">
                                <span className="inline-block px-3 py-1 border border-black/10 dark:border-white/10 rounded-full text-xs uppercase tracking-widest text-gray-500">
                                    {project.category}
                                </span>
                                <div className="mt-2 text-xs font-mono text-gray-400">{project.year}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
             </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
             <div className="py-20 text-center text-gray-500 dark:text-gray-400">
                No projects found in this category.
             </div>
          )}
      </div>

      {/* CMS Note Footer */}
      <div className="container mx-auto px-6 md:px-12 pb-12 text-center border-t border-black/5 dark:border-white/5 pt-12">
         <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">
            Archive updated weekly. Connected to Headless CMS.
         </p>
      </div>

    </motion.div>
  );
};