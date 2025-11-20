import React from 'react';
import { motion } from 'framer-motion';
import { APPROACH_DATA } from '../constants';

export const Approach: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 border-t border-black/10 dark:border-white/10 bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="container mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-[Syne] mb-2 text-black dark:text-white">About our</h2>
          <h2 className="text-4xl md:text-5xl font-[Syne] text-gray-400 dark:text-gray-500">approach to work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {APPROACH_DATA.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6 text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                <span className="p-1 border border-gray-300 dark:border-gray-700 rounded group-hover:border-black dark:group-hover:border-white transition-colors">
                  <item.icon size={12} />
                </span>
                {item.title}
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">{item.subtitle}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-200 dark:border-gray-800 pt-4 group-hover:border-black/30 dark:group-hover:border-white/30 transition-colors">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};