import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TEAM } from '../constants';

const Team: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Basic horizontal scroll logic for mobile friendliness
  // For a more advanced "scroll triggers horizontal move" effect, we'd need a larger container height
  // adhering to the PRD "One Page Flow" with "Luxurious inertia".

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="px-6 md:px-12 mb-12">
        <h2 className="text-3xl md:text-4xl font-medium">Team</h2>
      </div>

      <div 
        ref={containerRef}
        className="flex overflow-x-auto gap-8 px-6 md:px-12 pb-12 snap-x snap-mandatory no-scrollbar"
      >
        {TEAM.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="min-w-[85vw] md:min-w-[400px] snap-center"
          >
            <div className="aspect-[3/4] overflow-hidden mb-6 relative group grayscale hover:grayscale-0 transition-all duration-700">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
              />
              {/* object-top = aligns image to top, showing full heads */}
            </div>
            <h3 className="text-xl font-medium">{member.name}</h3>
            <p className="text-sm text-neutral-500 mt-1 uppercase tracking-wider">{member.role}</p>
          </motion.div>
        ))}
        
        {/* Padding for end of scroll */}
        <div className="min-w-[10vw]"></div>
      </div>
    </section>
  );
};

export default Team;