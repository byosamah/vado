import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { useCursor } from '../context/CursorContext';

const Services: React.FC = () => {
  const { setCursorState } = useCursor();

  // Split services: first 2 for top row, last 2 for bottom row
  const topRowServices = SERVICES.slice(0, 2);
  const bottomRowServices = SERVICES.slice(2, 4);

  return (
    <section id="services" className="bg-[#F8F8F8] border-t border-neutral-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

        {/* Title Block */}
        <div className="p-8 md:p-12 lg:p-16 border-b border-r border-neutral-200 bg-[#F8F8F8]">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">Our Services</h2>
          <p className="text-neutral-500 leading-relaxed">
            Comprehensive architectural and engineering solutions delivered with precision and sustainability at the core.
          </p>
        </div>

        {/* Top row services (01, 02) */}
        {topRowServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group relative p-8 md:p-12 lg:p-16 border-b border-r border-neutral-200 hover:bg-black hover:text-white transition-colors duration-500 min-h-[300px] flex flex-col justify-between"
            onMouseEnter={() => setCursorState('hover')}
            onMouseLeave={() => setCursorState('default')}
          >
            <div>
              <span className="block text-xs font-mono mb-4 opacity-50">0{index + 1}</span>
              <h3 className="text-2xl font-medium leading-tight">{service.title}</h3>
            </div>
            <p className="text-sm opacity-0 group-hover:opacity-80 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75 max-w-[90%] leading-relaxed">
              {service.description}
            </p>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-3 h-3 border-l border-b border-transparent group-hover:border-white/20 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-r border-t border-transparent group-hover:border-white/20 transition-colors duration-500" />
          </motion.div>
        ))}

        {/* Empty block under "Our Services" */}
        <div className="hidden lg:block p-8 md:p-12 lg:p-16 border-b border-r border-neutral-200 bg-[#F8F8F8] min-h-[300px]" />

        {/* Bottom row services (03, 04) */}
        {bottomRowServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (index + 2) * 0.05 }}
            className="group relative p-8 md:p-12 lg:p-16 border-b border-r border-neutral-200 hover:bg-black hover:text-white transition-colors duration-500 min-h-[300px] flex flex-col justify-between"
            onMouseEnter={() => setCursorState('hover')}
            onMouseLeave={() => setCursorState('default')}
          >
            <div>
              <span className="block text-xs font-mono mb-4 opacity-50">0{index + 3}</span>
              <h3 className="text-2xl font-medium leading-tight">{service.title}</h3>
            </div>
            <p className="text-sm opacity-0 group-hover:opacity-80 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75 max-w-[90%] leading-relaxed">
              {service.description}
            </p>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-3 h-3 border-l border-b border-transparent group-hover:border-white/20 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-r border-t border-transparent group-hover:border-white/20 transition-colors duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;