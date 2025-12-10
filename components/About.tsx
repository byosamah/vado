import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

const TABS = [
  {
    id: 'history',
    label: 'History',
    title: 'Founded in 1994',
    content: "Established in 1994 under the visionary leadership of Architect Khalid Al-Mulla, VADO has consistently demonstrated a track record of excellence. The firm has successfully conducted in-depth studies, meticulously designed projects, provided detailed engineering expertise, and demonstrated effective project management across hotels, resorts, hospitals, compounds, residential projects, and urban planning initiatives."
  },
  {
    id: 'vision',
    label: 'Vision',
    title: 'Leading the Region',
    content: "To shape meaningful spaces through thoughtful design and engineering excellence—creating environments that inspire, serve, and sustain communities. We aspire to achieve leadership in providing design and construction services for buildings in the Eastern region."
  },
  {
    id: 'mission',
    label: 'Mission',
    title: 'Precision & Balance',
    content: "To provide integrated architectural and engineering solutions rooted in innovation, precision, and client-focused collaboration, ensuring every project achieves its full potential from concept to completion."
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
              Design for Life.
            </motion.h2>
            <div className="w-12 h-1 bg-black mb-8" />
            <p className="text-lg text-neutral-600 font-serif italic">
              "The essence of our success lies in the quality of our people."
            </p>
            <p className="mt-4 text-sm font-medium uppercase tracking-wide">
              — Arch. Khalid Al Mulla
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
                <p className="text-base md:text-lg leading-relaxed text-neutral-600 max-w-2xl">
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