import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

const Hero: React.FC = () => {
  const { setCursorState } = useCursor();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { y: 100, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 40,
        stiffness: 100,
        duration: 1,
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-32 pb-12 bg-[#F8F8F8]">
      <div className="max-w-6xl w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6 md:space-y-10"
        >
          <div className="overflow-hidden">
            <motion.p variants={item} className="text-sm md:text-base tracking-[0.2em] uppercase text-neutral-500 mb-4">
              Est. 1994 &mdash; Al Khobar
            </motion.p>
          </div>
          
          <div className="overflow-hidden">
            <motion.h1
              variants={item}
              className="text-5xl md:text-7xl lg:text-9xl font-semibold tracking-tighter leading-[0.9] text-[#1A1A1A]"
              onMouseEnter={() => setCursorState('text')}
              onMouseLeave={() => setCursorState('default')}
            >
              Where <span className="serif italic font-light">Vision</span> <br className="hidden md:block"/>
              Becomes
            </motion.h1>
          </div>

          <div className="overflow-hidden">
             <motion.h1
              variants={item}
              className="text-5xl md:text-7xl lg:text-9xl font-semibold tracking-tighter leading-[0.9] text-[#1A1A1A]"
              onMouseEnter={() => setCursorState('text')}
              onMouseLeave={() => setCursorState('default')}
            >
              Architecture.
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12 md:mt-24">
            <div className="md:col-start-8 md:col-span-5">
              <motion.p 
                variants={item}
                className="text-lg md:text-xl leading-relaxed text-neutral-600"
              >
                VADO is a leading architectural and engineering consultancy transforming ideas into built realities through thoughtful design, technical excellence, and a deep commitment to creating meaningful spaces.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;