import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] relative z-50 transition-colors duration-300"
    >
      {/* Navbar Overlay */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors font-[Syne] uppercase tracking-widest text-sm"
        >
          <ArrowLeft size={16} /> Back to Works
        </button>
        <div className="text-white font-[Syne] font-bold">{project.title}</div>
      </div>

      {/* Hero Image */}
      <div className="w-full h-[60vh] md:h-[80vh] relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] dark:from-[#0a0a0a] via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 -mt-32 relative z-10">
        
        {/* Header Info */}
        <div className="max-w-4xl mb-20">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-[Syne] font-bold mb-8 leading-[0.9] text-black dark:text-white"
          >
            {project.title}
          </motion.h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-black/10 dark:border-white/10 pt-8 text-black dark:text-white">
             <div>
                <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Role</span>
                <span className="text-sm md:text-base">{project.role || 'Product Designer'}</span>
             </div>
             <div>
                <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Year</span>
                <span className="text-sm md:text-base">{project.year}</span>
             </div>
             <div>
                <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Client</span>
                <span className="text-sm md:text-base">{project.client || 'Confidential'}</span>
             </div>
             <div>
                <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Website</span>
                {project.website ? (
                   <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base flex items-center gap-1 hover:underline">
                      Live Preview <ExternalLink size={12} />
                   </a>
                ) : (
                   <span className="text-sm md:text-base text-gray-500">Not available</span>
                )}
             </div>
          </div>
        </div>

        {/* Case Study Content */}
        <div className="grid md:grid-cols-12 gap-12 mb-32">
           <div className="md:col-span-4">
              <h3 className="text-2xl font-[Syne] mb-4 text-black dark:text-white">The Challenge</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {project.challenge || "Detailed problem statement goes here. Explaining the complexities and what needed to be solved for the user."}
              </p>
           </div>
           <div className="md:col-span-8">
              <h3 className="text-2xl font-[Syne] mb-4 text-black dark:text-white">The Solution</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                {project.solution || "Comprehensive breakdown of the design solution, methodology, and the final outcome that was delivered."}
              </p>
           </div>
        </div>

        {/* Gallery */}
        <div className="space-y-8 mb-32">
          {project.gallery?.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <img src={img} alt={`Project detail ${index + 1}`} className="w-full h-auto rounded-sm shadow-lg" />
            </motion.div>
          ))}
        </div>

        {/* Next Project Nav */}
        <div className="border-t border-black/10 dark:border-white/10 py-20 flex justify-center">
           <button onClick={onBack} className="text-3xl md:text-5xl font-[Syne] text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
              Next Project
           </button>
        </div>

      </div>
    </motion.div>
  );
};