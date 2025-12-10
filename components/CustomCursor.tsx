import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

const CustomCursor: React.FC = () => {
  const { cursorState } = useCursor();
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the cursor movement
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device is touch-enabled to disable custom cursor
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16); // Center the cursor (32px width / 2)
      mouseY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('resize', checkMobile);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  const variants = {
    default: {
      height: 32,
      width: 32,
      opacity: 1,
      backgroundColor: 'transparent',
      border: '1px solid #000',
    },
    hover: {
      height: 64,
      width: 64,
      opacity: 1,
      backgroundColor: '#fff',
      border: '0px solid #fff',
      mixBlendMode: 'difference' as any, // Inverts colors
      x: -16, // Adjust for size change
      y: -16,
    },
    text: {
      height: 64,
      width: 64,
      opacity: 1,
      backgroundColor: '#000', // Black background for text selection
      mixBlendMode: 'difference' as any,
      x: -16,
      y: -16,
    },
    hidden: {
      opacity: 0,
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center"
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
      variants={variants}
      animate={cursorState}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      {cursorState === 'hover' && (
        <span className="text-[10px] text-black font-medium tracking-widest uppercase">View</span>
      )}
    </motion.div>
  );
};

export default CustomCursor;