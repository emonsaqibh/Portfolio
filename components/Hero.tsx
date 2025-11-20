import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, X, Send, Loader2, CheckCircle, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({ name: '', email: '', message: '' });
  };
  
  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -300]);
  const gridY = useTransform(scrollY, [0, 1000], [0, 150]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring" as const,
        duration: 0.6,
        bounce: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0, scale: 0.9, y: 20 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fafafa] dark:bg-[#0a0a0a] pt-32 pb-20 md:pt-40 transition-colors duration-300">
      
      {/* Background Effects - Optimized for Mobile */}
      {/* Blob 1 - Using mix-blend-multiply for light mode, screen for dark */}
      {!isMobile && (
        <motion.div 
            style={{ y: y1 }}
            animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] right-[-5%] w-[200px] h-[200px] md:w-[600px] md:h-[600px] bg-indigo-200/50 dark:bg-indigo-900/20 rounded-full blur-[60px] md:blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen will-change-transform" 
        />
      )}
      
      {/* Blob 2 */}
      {!isMobile && (
        <motion.div 
            style={{ y: y2 }}
            animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-10%] left-[-20%] w-[200px] h-[200px] md:w-[500px] md:h-[500px] bg-fuchsia-200/50 dark:bg-fuchsia-900/20 rounded-full blur-[60px] md:blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen will-change-transform" 
        />
      )}
      
      {/* Subtle Grid - Inverted for light mode */}
      <motion.div 
        style={{ y: isMobile ? 0 : gridY }}
        className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] pointer-events-none will-change-transform"
      >
         <div className="absolute inset-0 bg-[#fafafa] dark:bg-[#0a0a0a] [mask-image:radial-gradient(transparent,black_80%)]" />
      </motion.div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.06] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

      {/* Main Content Container */}
      <div className="container mx-auto px-4 md:px-12 relative z-10 flex flex-col items-center w-full">
        
        {/* Status Badge */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 md:mb-8 flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-sm"
        >
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full" />
            <span className="text-[10px] md:text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-widest">Available for new projects</span>
        </motion.div>

        {/* Massive Typography Section */}
        <div className="relative w-full mx-auto">
            
            {/* Intro Line */}
            <motion.h2 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-center text-xl md:text-4xl font-[Geist] font-bold tracking-tighter text-black dark:text-white mb-2 md:mb-4 relative z-10"
            >
                HI, I AM
            </motion.h2>

            {/* Massive Name - Flex Justified */}
            <div className="relative w-full">
                <motion.h1 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex justify-between w-full font-[Syne] font-black text-black dark:text-white tracking-tighter select-none leading-[0.8]"
                    style={{ fontSize: 'clamp(4rem, 15.5vw, 20rem)' }} 
                >
                    <span className="scale-y-110 block origin-bottom">E</span>
                    <span className="scale-y-110 block origin-bottom">M</span>
                    <span className="scale-y-110 block origin-bottom">O</span>
                    <span className="scale-y-110 block origin-bottom">N</span>
                </motion.h1>
                
                {/* Creative Floating Avatar - Adjusted for Mobile */}
                <motion.div
                    initial={{ scale: 0, rotate: -5 }}
                    animate={{ scale: 1, rotate: 3 }}
                    transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
                    className="absolute top-[20%] left-[50%] -translate-x-1/2 w-24 h-24 md:top-[15%] md:left-[62%] md:w-[10vw] md:h-[10vw] md:max-w-[150px] md:max-h-[150px] z-10"
                >
                     <div className="relative w-full h-full bg-white dark:bg-gray-800 p-1 md:p-1.5 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-500 ease-in-out cursor-pointer">
                        {/* Image */}
                        <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" 
                            alt="Emon Avatar" 
                            className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                        />
                        {/* Tape effect */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-2 md:w-8 md:h-3 bg-black/10 dark:bg-white/30 backdrop-blur-sm rotate-1" />
                        
                        {/* Hover Name Tag */}
                        <div className="absolute bottom-1 left-1 bg-black dark:bg-white text-white dark:text-black text-[8px] font-bold px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            @emon.design
                        </div>
                     </div>
                </motion.div>

                {/* Stickers - Adjusted shadows for light mode */}
                <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: -8 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="absolute top-[-20px] left-0 md:top-[-5%] md:left-[10%] bg-[#38bdf8] text-black text-[9px] md:text-[10px] font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-[0_0_15px_rgba(56,189,248,0.3)] z-20 transform -rotate-8"
                >
                    Get Landing Pages
                    <div className="absolute bottom-[-4px] right-2 w-2 h-2 bg-[#38bdf8] rotate-45" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 4 }}
                    transition={{ delay: 1.0, type: "spring" }}
                    className="absolute top-[110%] left-[5%] md:top-[60%] md:left-[2%] bg-[#c084fc] text-black text-[9px] md:text-[10px] font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-[0_0_15px_rgba(192,132,252,0.3)] z-20 transform rotate-4"
                >
                    Product Design
                    <div className="absolute top-[-4px] right-3 w-2 h-2 bg-[#c084fc] rotate-45" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 10 }}
                    transition={{ delay: 1.2, type: "spring" }}
                    className="absolute bottom-[-30px] right-0 md:bottom-[10%] md:right-[2%] bg-[#fb923c] text-black text-[9px] md:text-[10px] font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-[0_0_15px_rgba(251,146,60,0.3)] z-20 transform rotate-10"
                >
                    Add Creatives
                    <div className="absolute bottom-[-4px] left-2 w-2 h-2 bg-[#fb923c] rotate-45" />
                </motion.div>

            </div>
        </div>

        {/* Description */}
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gray-600 dark:text-gray-400 text-sm md:text-lg md:text-xl max-w-md md:max-w-2xl text-center mt-16 md:mt-12 mb-8 md:mb-12 leading-relaxed relative z-20 px-4"
        >
            A multidisciplinary product designer building digital products that define the future. Merging aesthetic precision with technical excellence.
        </motion.p>

        {/* Buttons */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 relative z-30 w-full px-6"
        >
            <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full transition-all font-bold flex items-center justify-center gap-3 text-base md:text-lg shadow-xl group"
            >
                Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.a 
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05, backgroundColor: "rgba(125,125,125,0.05)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-black/10 dark:border-white/20 text-black dark:text-white rounded-full transition-colors font-medium text-base md:text-lg flex items-center justify-center gap-3 hover:border-black/30 dark:hover:border-white/50"
            >
                Download Resume <Download size={20} />
            </motion.a>
        </motion.div>

      </div>

      {/* Clean Single Line Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-20 hidden md:flex"
        onClick={handleScrollDown}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-black/40 dark:text-white/40 font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-black/10 dark:bg-white/10 relative overflow-hidden">
            <motion.div 
               className="absolute top-0 left-0 w-full h-1/2 bg-black dark:bg-white"
               initial={{ y: "-100%" }}
               animate={{ y: "200%" }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
        </div>
      </motion.div>

      {/* Modern Lead Gen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/50 dark:bg-black/90 backdrop-blur-xl"
             />
             
             <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-0 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
             >
                {/* Modal Glow Effect */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 dark:bg-purple-500/20 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 dark:bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />

                <button 
                    onClick={() => setIsModalOpen(false)} 
                    className="absolute top-6 right-6 text-gray-400 hover:text-black dark:hover:text-white transition-colors z-20"
                >
                  <X size={24} />
                </button>
                
                {!isSuccess ? (
                  <div className="p-8 md:p-10 relative z-10">
                    <motion.div variants={itemVariants} className="mb-8">
                         <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
                            <Sparkles size={10} className="text-yellow-500 dark:text-yellow-400" />
                            Start a Project
                         </div>
                        <h3 className="text-3xl md:text-4xl font-[Syne] font-bold mb-3 text-black dark:text-white leading-tight">
                            Let's build something<br/> <span className="text-gray-500">extraordinary.</span>
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Fill out the form below and I'll get back to you within 24 hours.</p>
                    </motion.div>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <motion.div variants={itemVariants}>
                        <input 
                          type="text" 
                          required
                          value={formState.name}
                          onChange={e => setFormState({...formState, name: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl p-4 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-black/10 dark:focus:border-white/30 focus:bg-white dark:focus:bg-white/10 transition-all"
                          placeholder="What's your name?"
                        />
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <input 
                          type="email" 
                          required
                          value={formState.email}
                          onChange={e => setFormState({...formState, email: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl p-4 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-black/10 dark:focus:border-white/30 focus:bg-white dark:focus:bg-white/10 transition-all"
                          placeholder="your@email.com"
                        />
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <textarea 
                          required
                          rows={4}
                          value={formState.message}
                          onChange={e => setFormState({...formState, message: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl p-4 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-black/10 dark:focus:border-white/30 focus:bg-white dark:focus:bg-white/10 transition-all resize-none"
                          placeholder="Tell me about your project..."
                        />
                      </motion.div>
                      
                      <motion.button 
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-4 rounded-xl hover:opacity-80 transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
                      >
                        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <><Send size={20} /> Send Request</>}
                      </motion.button>
                    </form>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[500px] p-10 text-center relative z-10">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.6 }}
                        className="w-24 h-24 bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-8"
                    >
                      <CheckCircle className="w-12 h-12" />
                    </motion.div>
                    <motion.h3 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl font-[Syne] font-bold mb-4 text-black dark:text-white"
                    >
                        Message Sent!
                    </motion.h3>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-500 dark:text-gray-400 text-lg max-w-xs leading-relaxed mb-10"
                    >
                        Thanks for reaching out. I've received your inquiry and will respond shortly.
                    </motion.p>
                    <motion.button 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      onClick={() => setIsModalOpen(false)}
                      className="px-10 py-3 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-full text-black dark:text-white font-medium transition-colors"
                    >
                      Close
                    </motion.button>
                  </div>
                )}
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};