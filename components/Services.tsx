import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../constants';
import { ArrowUpRight, MousePointer2 } from 'lucide-react';

const ServiceVisual = ({ id }: { id: string }) => {
  const [motionStep, setMotionStep] = useState(0);

  // Cycle through motion presets for s3
  useEffect(() => {
    if (id === 's3') {
      const interval = setInterval(() => {
        setMotionStep((prev) => (prev + 1) % 3);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [id]);

  const motionConfigs = [
    {
      name: "Linear",
      // M start C cp1 cp2 end
      d: "M 40,140 C 113,140 186,40 260,40",
      cp1: { x: 113, y: 140 },
      cp2: { x: 186, y: 40 },
      ease: "linear",
    },
    {
      name: "Ease In Out",
      d: "M 40,140 C 160,140 140,40 260,40",
      cp1: { x: 160, y: 140 },
      cp2: { x: 140, y: 40 },
      ease: "easeInOut",
    },
    {
      name: "Elastic Snap",
      d: "M 40,140 C 180,140 180,-30 260,40",
      cp1: { x: 180, y: 140 },
      cp2: { x: 180, y: -30 },
      ease: [0.34, 1.56, 0.64, 1], // Custom cubic-bezier approximation for elastic
    }
  ];

  const currentMotion = motionConfigs[motionStep];
  const CURVE_COLOR = "#f97316"; // Vibrant Orange for all curves

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-[#050505] rounded-xl border border-black/5 dark:border-white/10 transition-colors duration-300">
      {/* Background Noise/Texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {id === 's1' && (
          <motion.div
            key="s1" // Product Design - Figma Style Prototyping
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Figma Grid Background */}
            <div className="absolute inset-0 opacity-10 dark:opacity-20" 
                 style={{ 
                    backgroundImage: 'radial-gradient(#888 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                 }} 
            />

            {/* The "Canvas" - Mobile App Frame */}
            <div className="relative w-[280px] h-[400px] bg-white dark:bg-[#1a1a1a] rounded-[2rem] shadow-2xl border-[6px] border-gray-200 dark:border-[#333] overflow-hidden flex flex-col">
                {/* Status Bar */}
                <div className="h-6 w-full flex justify-between px-4 items-center mt-2">
                    <div className="w-8 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full" />
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full border border-gray-300 dark:border-white/20" />
                        <div className="w-3 h-3 bg-gray-300 dark:bg-white/20 rounded-full" />
                    </div>
                </div>

                {/* App Content */}
                <div className="p-5 flex flex-col gap-4 h-full">
                    {/* Header Image Block */}
                    <motion.div 
                        className="w-full h-32 rounded-xl bg-gray-100 dark:bg-white/5 relative overflow-hidden"
                    >
                        {/* Image Placeholder Skeleton */}
                        <div className="absolute inset-0 bg-gray-200 dark:bg-white/5" />
                    </motion.div>

                    {/* Text Lines */}
                    <div className="space-y-2">
                        <div className="w-3/4 h-4 bg-gray-200 dark:bg-white/10 rounded-full" />
                        <div className="w-1/2 h-3 bg-gray-100 dark:bg-white/5 rounded-full" />
                    </div>

                    <div className="flex-grow" />

                    {/* The Button being Designed */}
                    <motion.div
                        className="w-full h-12 flex items-center justify-center relative"
                        animate={{
                            borderRadius: ["0px", "0px", "24px", "24px", "24px", "0px"],
                            backgroundColor: ["#e5e7eb", "#e5e7eb", "#000000", "#000000", "#000000", "#e5e7eb"],
                            color: ["#9ca3af", "#9ca3af", "#ffffff", "#ffffff", "#ffffff", "#9ca3af"],
                            scale: [1, 1, 1, 0.95, 1, 1]
                        }}
                        style={{
                            '--tw-bg-opacity': 1, 
                        } as any}
                        transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.3, 0.35, 0.4, 1], ease: "easeInOut" }}
                    >
                        {/* Light Mode / Dark Mode Color handling manually via framer animate above is tricky, 
                            so we use CSS classes for the 'final' state and let framer handle the shape */}
                        <div className="absolute inset-0 bg-gray-200 dark:bg-white/10 transition-colors" />
                        
                        {/* The "Final" Button Overlay that fades in */}
                        <motion.div 
                            className="absolute inset-0 bg-black dark:bg-white flex items-center justify-center"
                            animate={{ opacity: [0, 0, 1, 1, 1, 0], borderRadius: ["0px", "0px", "24px", "24px", "24px", "0px"] }}
                            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.3, 0.35, 0.4, 1] }}
                        >
                             <span className="text-white dark:text-black font-bold text-sm">Get Started</span>
                        </motion.div>

                        {/* Wireframe Text */}
                        <motion.div 
                            className="absolute text-gray-400 dark:text-gray-600 text-sm font-bold"
                            animate={{ opacity: [1, 1, 0, 0, 0, 1] }}
                            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.3, 0.35, 0.4, 1] }}
                        >
                            Button
                        </motion.div>

                        {/* Selection Box (Figma Blue) */}
                        <motion.div
                            className="absolute -inset-1 border-2 border-[#0C8CE9] z-20 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 1, 1, 0, 0] }}
                            transition={{ duration: 4, repeat: Infinity, times: [0, 0.15, 0.3, 0.45, 0.5, 1] }}
                        >
                            {/* Corner Handles */}
                            <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-[#0C8CE9]" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-[#0C8CE9]" />
                            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-[#0C8CE9]" />
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-[#0C8CE9]" />
                            
                            {/* Property Label tooltip */}
                            <motion.div 
                                className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#0C8CE9] text-white text-[9px] px-2 py-1 rounded font-mono whitespace-nowrap"
                                animate={{ opacity: [0, 0, 1, 1, 0] }}
                                transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.25, 0.35, 0.4] }}
                            >
                                Radius: 24px
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* The Cursor with Name Tag */}
            <motion.div
                className="absolute z-50 pointer-events-none drop-shadow-xl"
                animate={{ 
                    x: [100, 20, 20, 20, 120, 100], 
                    y: [100, 130, 130, 130, 200, 100] 
                }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.3, 0.4, 0.6, 1], ease: "easeInOut" }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19177L11.7841 12.3673H5.65376Z" fill="black" stroke="white"/>
                </svg>
                <div className="absolute left-3 top-3 px-2 py-1 bg-black dark:bg-[#0C8CE9] rounded-md rounded-tl-none text-white text-[10px] font-bold whitespace-nowrap">
                    Shakibul
                </div>
            </motion.div>

          </motion.div>
        )}

        {id === 's2' && (
          <motion.div
            key="s2" // Brand Identity
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="absolute w-[350px] h-[350px] bg-purple-300/30 dark:bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-2 gap-4">
               <motion.div 
                 animate={{ rotate: 90 }}
                 transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, type: 'spring' }}
                 className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 blur-sm" 
               />
               <motion.div 
                 animate={{ borderRadius: ["0%", "50%", "0%"] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className="w-24 h-24 bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/20 backdrop-blur-md flex items-center justify-center text-black dark:text-white"
               >
                  <span className="font-[Syne] text-4xl font-bold">Aa</span>
               </motion.div>
               <div className="col-span-2 flex gap-2 justify-center">
                  {['bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-blue-500'].map((bg, i) => (
                      <motion.div 
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className={`w-8 h-8 rounded-full ${bg}`} 
                      />
                  ))}
               </div>
            </div>
          </motion.div>
        )}

        {id === 's3' && (
          <motion.div
            key="s3" // Motion Graphics - Interactive Curve Simulator
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col"
          >
            {/* Top Half: Preview Area (The Effect) */}
            <div className="flex-1 bg-gray-100 dark:bg-[#0a0a0a] relative border-b border-black/5 dark:border-white/5 flex items-center px-8 md:px-12">
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-gray-400 font-mono">Preview</div>
                
                {/* Motion Track */}
                <div className="w-full h-1 bg-gray-300 dark:bg-white/10 rounded-full relative overflow-visible">
                     {/* The Ball */}
                     <motion.div 
                        key={motionStep} // Forces reset on step change
                        className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-[0_0_20px_rgba(249,115,22,0.5)]"
                        initial={{ left: "0%" }}
                        animate={{ left: "100%" }}
                        transition={{ 
                            duration: 1.5, 
                            ease: currentMotion.ease as any,
                            delay: 0.6, // Wait for curve to change first
                            repeat: Infinity,
                            repeatDelay: 1
                        }}
                     />
                </div>
            </div>

            {/* Bottom Half: Graph Editor (The Cause) */}
            <div className="h-[60%] relative bg-white dark:bg-[#111] p-6 overflow-hidden">
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-gray-400 font-mono flex items-center gap-2">
                    Graph Editor
                    <motion.span 
                        key={currentMotion.name}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-500 font-bold"
                    >
                        {currentMotion.name}
                    </motion.span>
                </div>

                {/* Grid Background */}
                <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none" 
                     style={{ 
                        backgroundImage: 'linear-gradient(#888 1px, transparent 1px), linear-gradient(90deg, #888 1px, transparent 1px)', 
                        backgroundSize: '40px 40px',
                        backgroundPosition: 'center'
                     }} 
                />

                {/* The SVG Graph */}
                <div className="w-full h-full flex items-center justify-center">
                    <svg width="300" height="180" viewBox="0 0 300 180" className="overflow-visible">
                        {/* Base Line */}
                        <line x1="40" y1="140" x2="260" y2="40" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />

                        {/* Tangent Lines (Visualizing the handle connection) */}
                        <motion.line 
                             initial={false}
                             animate={{ x1: 40, y1: 140, x2: currentMotion.cp1.x, y2: currentMotion.cp1.y }}
                             transition={{ duration: 0.6, ease: "easeInOut" }}
                             className="stroke-gray-300 dark:stroke-gray-700"
                             strokeWidth="1"
                             strokeDasharray="4 4"
                        />
                        <motion.line 
                             initial={false}
                             animate={{ x1: 260, y1: 40, x2: currentMotion.cp2.x, y2: currentMotion.cp2.y }}
                             transition={{ duration: 0.6, ease: "easeInOut" }}
                             className="stroke-gray-300 dark:stroke-gray-700"
                             strokeWidth="1"
                             strokeDasharray="4 4"
                        />

                        {/* The Bezier Curve */}
                        <motion.path 
                            d={currentMotion.d}
                            fill="none"
                            stroke={CURVE_COLOR}
                            strokeWidth="4"
                            strokeLinecap="round"
                            initial={false}
                            animate={{ d: currentMotion.d }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            style={{ filter: 'drop-shadow(0 0 8px rgba(249,115,22,0.3))' }}
                        />

                        {/* Start Point */}
                        <circle cx="40" cy="140" r="4" className="fill-black dark:fill-white" />
                        
                        {/* End Point */}
                        <circle cx="260" cy="40" r="4" className="fill-black dark:fill-white" />

                        {/* Control Point 1 Handle */}
                        <motion.circle 
                            r="6" 
                            initial={false}
                            animate={{ cx: currentMotion.cp1.x, cy: currentMotion.cp1.y }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="fill-white dark:fill-[#111] stroke-black dark:stroke-white stroke-2 cursor-pointer"
                            whileHover={{ scale: 1.2 }}
                        />

                        {/* Control Point 2 Handle */}
                        <motion.circle 
                            r="6" 
                            initial={false}
                            animate={{ cx: currentMotion.cp2.x, cy: currentMotion.cp2.y }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="fill-white dark:fill-[#111] stroke-black dark:stroke-white stroke-2 cursor-pointer"
                            whileHover={{ scale: 1.2 }}
                        />
                    </svg>
                </div>
            </div>
          </motion.div>
        )}

        {id === 's4' && (
          <motion.div
            key="s4" // UX - Grid Sorting
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="absolute w-[350px] h-[350px] bg-emerald-200/50 dark:bg-emerald-900/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative w-[240px] h-[240px]">
                {/* Box 1 */}
                <motion.div 
                    className="absolute w-[112px] h-[112px] bg-white dark:bg-[#151515] border border-black/5 dark:border-white/10 rounded-2xl flex flex-col p-4 gap-3 shadow-sm"
                    animate={{
                        x: [0, 0, 128, 128, 0],
                        y: [0, 0, 0, 0, 0],
                    }}
                    transition={{ duration: 6, repeat: Infinity, times: [0, 0.25, 0.45, 0.8, 1] }}
                >
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20" />
                    <div className="w-full h-2 bg-black/5 dark:bg-white/10 rounded-full" />
                    <div className="w-1/2 h-2 bg-black/5 dark:bg-white/5 rounded-full" />
                </motion.div>

                {/* Box 2 */}
                <motion.div 
                    className="absolute w-[112px] h-[112px] bg-white dark:bg-[#151515] border border-black/5 dark:border-white/10 rounded-2xl flex flex-col p-4 gap-3 shadow-sm"
                    animate={{
                        x: [128, 128, 0, 0, 128],
                        y: [0, 0, 128, 128, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, times: [0, 0.25, 0.45, 0.8, 1] }}
                >
                    <div className="w-8 h-8 rounded-full bg-purple-500/20" />
                    <div className="w-full h-2 bg-black/5 dark:bg-white/10 rounded-full" />
                    <div className="w-1/2 h-2 bg-black/5 dark:bg-white/5 rounded-full" />
                </motion.div>

                {/* Box 3 */}
                <motion.div 
                    className="absolute w-[112px] h-[112px] bg-white dark:bg-[#151515] border border-black/5 dark:border-white/10 rounded-2xl flex flex-col p-4 gap-3 shadow-sm"
                    animate={{
                        x: [0, 0, 128, 128, 0],
                        y: [128, 128, 128, 128, 128]
                    }}
                    transition={{ duration: 6, repeat: Infinity, times: [0, 0.25, 0.45, 0.8, 1] }}
                >
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20" />
                    <div className="w-full h-2 bg-black/5 dark:bg-white/10 rounded-full" />
                    <div className="w-1/2 h-2 bg-black/5 dark:bg-white/5 rounded-full" />
                </motion.div>

                {/* Box 4 - THE DRAGGED ONE */}
                <motion.div 
                    className="absolute w-[112px] h-[112px] bg-white dark:bg-[#1a1a1a] border border-emerald-500/50 rounded-2xl flex flex-col p-4 gap-3 shadow-2xl"
                    animate={{
                        x: [128, 128, 0, 0, 128],
                        y: [128, 128, 0, 0, 128],
                        scale: [1, 1.1, 1.1, 1, 1],
                        zIndex: [1, 50, 50, 1, 1],
                        boxShadow: ["0 0 0 rgba(0,0,0,0)", "0 20px 25px -5px rgba(0, 0, 0, 0.1)", "0 20px 25px -5px rgba(0, 0, 0, 0.1)", "0 0 0 rgba(0,0,0,0)", "0 0 0 rgba(0,0,0,0)"]
                    }}
                    transition={{ duration: 6, repeat: Infinity, times: [0, 0.25, 0.45, 0.6, 1] }}
                >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20" />
                    <div className="w-full h-2 bg-emerald-500/20 rounded-full" />
                    <div className="w-1/2 h-2 bg-emerald-500/10 rounded-full" />
                </motion.div>

                {/* Cursor Animation */}
                <motion.div
                   className="absolute top-0 left-0 pointer-events-none z-[100]"
                   animate={{ 
                      x: [240, 184, 56, 56, 240], 
                      y: [240, 184, 56, 56, 240],
                      scale: [1, 1, 1, 1, 1]
                   }}
                   transition={{ duration: 6, repeat: Infinity, times: [0, 0.25, 0.45, 0.6, 1] }}
                >
                   <MousePointer2 className="fill-black stroke-white dark:fill-white dark:stroke-black" size={32} />
                   <motion.div 
                      className="absolute -top-3 -left-3 w-14 h-14 bg-black/10 dark:bg-white/20 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.5, 0, 0, 0] }}
                      transition={{ duration: 6, repeat: Infinity, times: [0, 0.25, 0.4, 1, 1] }}
                   />
                </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Services: React.FC = () => {
  const [activeService, setActiveService] = useState(SERVICES[0].id);

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          
          {/* Service List */}
          <div className="w-full md:w-1/2 order-2 md:order-1">
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-4xl md:text-6xl font-[Syne] font-bold mb-16 text-black dark:text-white"
             >
               Our Services
             </motion.h2>

             <div className="flex flex-col">
               {SERVICES.map((service) => (
                 <div 
                    key={service.id}
                    onMouseEnter={() => setActiveService(service.id)}
                    className={`group border-t border-black/10 dark:border-white/10 py-8 md:py-10 cursor-pointer transition-all duration-300 ${activeService === service.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                 >
                    <div className="flex items-baseline justify-between mb-4">
                       <div className="flex items-baseline gap-4">
                          <span className="text-xs font-mono text-gray-500">{service.number}</span>
                          <h3 className="text-2xl md:text-3xl font-[Syne] font-medium text-black dark:text-white">{service.title}</h3>
                       </div>
                       <ArrowUpRight className={`transform transition-transform duration-300 ${activeService === service.id ? 'rotate-45 opacity-100' : 'opacity-0'}`} size={20} />
                    </div>
                    
                    <motion.div 
                      initial={false}
                      animate={{ height: activeService === service.id ? 'auto' : 0, opacity: activeService === service.id ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                       <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-md">
                          {service.description}
                       </p>
                       <div className="flex flex-wrap gap-2">
                          {service.tags.map(tag => (
                             <span key={tag} className="px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-xs uppercase tracking-wider text-black dark:text-white bg-black/5 dark:bg-white/5">
                                {tag}
                             </span>
                          ))}
                       </div>
                    </motion.div>
                 </div>
               ))}
               <div className="border-t border-black/10 dark:border-white/10" />
             </div>
          </div>

          {/* Visual Preview - Sticky */}
          <div className="w-full md:w-1/2 order-1 md:order-2 relative hidden md:block">
             <div className="sticky top-32 w-full aspect-square md:aspect-[4/5] lg:aspect-square">
                <ServiceVisual id={activeService} />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};