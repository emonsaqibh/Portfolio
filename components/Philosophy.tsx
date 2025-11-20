import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Philosophy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "center 0.5"]
  });

  // Opacity goes from 0.2 (dimmed) to 1 (full)
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  // Gentle slide up effect
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <section className="py-32 px-6 md:px-12 bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="container mx-auto">
        <div ref={containerRef} className="max-w-5xl">
          <motion.h2 
            style={{ opacity, y }}
            className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight mb-12 font-[Syne] text-black dark:text-white"
          >
            Building something that is bigger than ourselves and to create tools and products that will have a global impact, for good.
          </motion.h2>
          
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4, duration: 0.6 }}
          >
            <a href="#about" className="inline-flex items-center text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors group">
                More About Us
                <span className="ml-2 p-1 bg-black text-white dark:bg-white dark:text-black rounded-full group-hover:translate-x-1 transition-transform">
                <ArrowRight size={14} />
                </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};