import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

const TABS = [
  {
    id: 'vision',
    label: 'Vision',
    title: 'Our Vision',
    content: "To shape meaningful spaces through thoughtful design and engineering excellence—creating environments that inspire, serve, and sustain communities."
  },
  {
    id: 'mission',
    label: 'Mission',
    title: 'Our Mission',
    content: "To provide integrated architectural and engineering solutions rooted in innovation, precision, and client-focused collaboration, ensuring every project achieves its full potential from concept to completion."
  },
  {
    id: 'values',
    label: 'Values',
    title: 'Our Values',
    content: "Excellence — Pursuing the highest standards in design and execution.\n\nIntegrity — Operating with honesty, transparency, and respect.\n\nInnovation — Embracing creativity and forward-thinking engineering.\n\nResponsibility — Designing sustainably with future generations in mind.\n\nPartnership — Collaborating closely with clients, stakeholders, and communities."
  }
];

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const { setCursorState } = useCursor();

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-[#F8F8F8]">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column */}
          <div className="lg:col-span-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-semibold mb-8"
            >
              About VADO
            </motion.h2>
            <div className="w-12 h-1 bg-black mb-8" />
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
              VADO (VISION Arch. & Engineering Consultants) is a multidisciplinary consultancy specialized in architecture, engineering, and project development. With decades of experience, VADO delivers innovative, functional, and sustainable solutions tailored to meet the evolving needs of communities and clients across Saudi Arabia.
            </p>
          </div>

          {/* Right Column (Tabs) */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="flex border-b border-neutral-300 mb-8 overflow-x-auto no-scrollbar">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                  className={`pb-4 px-4 text-sm md:text-base tracking-widest uppercase transition-colors relative whitespace-nowrap ${
                    activeTab.id === tab.id ? 'text-black font-medium' : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                >
                  {tab.label}
                  {activeTab.id === tab.id && (
                    <motion.div 
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-black"
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="min-h-[200px]"
              >
                <h3 className="text-2xl md:text-3xl font-light mb-6">{activeTab.title}</h3>
                <p className="text-base md:text-lg leading-relaxed text-neutral-600 max-w-2xl whitespace-pre-line">
                  {activeTab.content}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;