import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, Mail, Quote } from 'lucide-react';
import { Contact } from './Contact';

interface AboutProps {
  onBack: () => void;
}

const EXPERIENCE = [
  {
    role: "Product Manager",
    company: "Fringecore_",
    period: "2020 - Current",
  },
  {
    role: "Senior UI/UX Designer",
    company: "AD-IQ",
    period: "2021 - 2022",
  },
  {
    role: "UI/UX Designer",
    company: "BanBase",
    period: "2020 - 2021",
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Creative Director at Studio X",
    text: "Working with Shakibul was a game-changer. He understood our product vision instantly and delivered a clean, user-centered design that our customers love.",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 2,
    name: "James Carter",
    role: "CEO at NexusPay",
    text: "Exceptional attention to detail. The new dashboard design increased our user engagement by 40% within the first month of launch.",
    avatar: "https://i.pravatar.cc/150?u=james"
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Product Lead at Flow",
    text: "Shakibul bridges the gap between aesthetics and functionality perfectly. A true professional who delivers high-quality work on time.",
    avatar: "https://i.pravatar.cc/150?u=emily"
  }
];

const STORY_DURATION = 5000; // 5 seconds per story

export const About: React.FC<AboutProps> = ({ onBack }) => {
  const [currentStory, setCurrentStory] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % TESTIMONIALS.length);
    }, STORY_DURATION);

    return () => clearInterval(timer);
  }, [currentStory]); // Reset timer when story changes (auto or manual)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-black dark:text-white pt-32 relative z-50 transition-colors duration-300"
    >
       {/* Navigation Overlay */}
       <div className="fixed top-0 left-0 w-full p-6 md:px-12 md:py-8 flex justify-between items-center z-50 bg-[#fafafa]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-black/5 dark:border-white/5 transition-colors">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-[Syne] uppercase tracking-widest text-sm"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
        <div className="text-black dark:text-white font-[Syne] font-bold hidden md:block">About Me</div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        {/* Header / Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-24">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-black/10 dark:border-white/10">
              <img 
                src="https://picsum.photos/seed/shakibul/400/400" 
                alt="Shakibul Alam Emon" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Est. 1998
            </div>
          </motion.div>

          <div className="flex-1">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-[Syne] font-bold mb-2 text-black dark:text-white"
            >
              Shakibul Alam Emon
            </motion.h1>
            <motion.p 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="text-xl text-gray-600 dark:text-gray-400 font-light mb-6"
            >
              Product Designer & Strategist
            </motion.p>
            
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="prose prose-invert text-gray-600 dark:text-gray-400 leading-relaxed mb-8"
            >
              <p>
                I’m a multidisciplinary designer focusing on digital products, interactive experiences, and branding. 
                My approach combines aesthetic precision with strategic thinking to build tools that are not just beautiful, but impactful.
              </p>
              <p className="mt-4">
                Based in Dhaka, I work with startups and established brands to define their digital future. When I'm not designing, I'm exploring new tech stacks or mentoring young designers.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
               <a href="mailto:hello@lustra.studio" className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                 <Mail size={16} /> Contact Me
               </a>
               <a href="#" className="px-6 py-2 border border-black/20 dark:border-white/20 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-black dark:text-white">
                 <Download size={16} /> Resume
               </a>
            </motion.div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="border-t border-black/10 dark:border-white/10 pt-16 mb-32">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col mb-16"
            >
                <div className="w-full overflow-x-auto no-scrollbar pb-4">
                    <div className="min-w-max">
                        {/* Timeline Graphic */}
                        <div className="flex items-center gap-8 md:gap-16 mb-4 relative pr-8">
                           <div className="absolute top-1.5 left-0 w-full h-[1px] bg-black/10 dark:bg-white/10 -z-10" />
                           
                           <div className="relative">
                              <div className="w-3 h-3 bg-indigo-500 rounded-full ring-4 ring-[#fafafa] dark:ring-[#0a0a0a]" />
                           </div>
                           {[1, 2, 3, 4, 5].map(i => (
                              <div key={i} className="w-2 h-2 bg-gray-300 dark:bg-gray-800 rounded-full ring-4 ring-[#fafafa] dark:ring-[#0a0a0a]" />
                           ))}
                        </div>

                        {/* Years */}
                        <div className="flex items-baseline gap-8 md:gap-12 mb-8 pr-8">
                           <span className="text-6xl md:text-7xl font-[Syne] font-bold text-black dark:text-white leading-none">2025</span>
                           <div className="flex gap-6 text-gray-500 dark:text-gray-700 text-lg md:text-xl font-[Syne] select-none">
                              <span>2024</span>
                              <span>2023</span>
                              <span>2022</span>
                              <span>2021</span>
                              <span>2020</span>
                           </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-[Syne] mb-2 text-black dark:text-white">My journey through design</h3>
                    <p className="text-gray-600 dark:text-gray-500 text-sm max-w-md">Explore the milestones and experiences that have shaped my career, year by year.</p>
                </div>
            </motion.div>

            <div className="space-y-0">
                {EXPERIENCE.map((exp, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-t border-gray-200 dark:border-gray-800 hover:border-black/30 dark:hover:border-white/30 transition-colors items-center"
                    >
                        <div className="md:col-span-5">
                            <h4 className="text-xl font-medium text-gray-800 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">{exp.role}</h4>
                        </div>
                        <div className="md:col-span-4">
                            <span className="text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">{exp.company}</span>
                        </div>
                        <div className="md:col-span-3 text-right md:text-right">
                            <span className="text-gray-400 dark:text-gray-500 font-mono text-sm group-hover:text-black dark:group-hover:text-white transition-colors">{exp.period}</span>
                        </div>
                    </motion.div>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-800" />
            </div>
        </div>
      </div>

      {/* Redesigned Testimonials Section - Open Layout */}
      <section className="py-32 border-t border-black/10 dark:border-white/10 relative overflow-hidden transition-colors duration-300">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/30 dark:bg-blue-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-4xl">
            <div className="mb-20">
                <h2 className="text-4xl md:text-7xl font-[Syne] font-medium mb-4 text-black dark:text-white">Trusted by</h2>
                <p className="text-gray-600 dark:text-gray-500 text-lg">Visionaries and industry leaders.</p>
            </div>

            {/* Fixed Height Container for smooth transitions */}
            <div className="relative h-[500px] md:h-[400px]">
                {/* Giant Quote Mark */}
                <Quote className="absolute -top-12 -left-4 md:-left-12 w-32 h-32 md:w-48 md:h-48 text-black/5 dark:text-white/5 rotate-180 pointer-events-none" />

                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentStory}
                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -30, filter: "blur(10px)", pointerEvents: "none" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-0 left-0 w-full z-10"
                    >
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-[Syne] leading-tight md:leading-tight lg:leading-tight mb-12 text-black dark:text-gray-100">
                            "{TESTIMONIALS[currentStory].text}"
                        </h3>

                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full overflow-hidden border border-black/10 dark:border-white/20 bg-gray-100 dark:bg-gray-800 relative group">
                                <img 
                                    src={TESTIMONIALS[currentStory].avatar} 
                                    alt={TESTIMONIALS[currentStory].name} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="text-xl font-bold font-[Syne] text-black dark:text-white">{TESTIMONIALS[currentStory].name}</div>
                                <div className="text-gray-500 text-sm uppercase tracking-wider">{TESTIMONIALS[currentStory].role}</div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Progress Indicators - Pinned to Bottom */}
                <div className="absolute bottom-0 left-0 w-full max-w-xs flex gap-3">
                    {TESTIMONIALS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentStory(index)}
                            className="group relative h-1 flex-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden transition-all py-2 bg-clip-content cursor-pointer outline-none"
                            aria-label={`Go to testimonial ${index + 1}`}
                        >
                             {/* Background Track */}
                             <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-black/20 dark:bg-white/20 group-hover:bg-black/40 dark:group-hover:bg-white/40 transition-colors" />
                             
                             {/* Active Progress Fill */}
                             <motion.div 
                                 className="absolute top-1/2 -translate-y-1/2 left-0 h-0.5 bg-black dark:bg-white"
                                 initial={{ width: "0%" }}
                                 animate={{ width: index === currentStory ? "100%" : "0%" }}
                                 transition={{ duration: index === currentStory ? STORY_DURATION / 1000 : 0.3, ease: "linear" }}
                             />
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Contact Footer */}
      <Contact />
    </motion.div>
  );
};