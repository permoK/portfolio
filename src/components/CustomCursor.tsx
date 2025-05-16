'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for interactive elements
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);

        // Get data attribute for custom cursor text
        const text = target.getAttribute('data-cursor-text') ||
                    (target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text') || '');
        setCursorText(text);
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Only show custom cursor on desktop
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? '3rem' : isClicking ? '0.75rem' : '1rem',
          height: isHovering ? '3rem' : isClicking ? '0.75rem' : '1rem',
          borderRadius: '50%',
          border: isHovering ? '2px solid #fff' : isClicking ? '0px solid #fff' : '1px solid #fff',
          backgroundColor: isHovering ? 'transparent' : isClicking ? '#fff' : 'transparent',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {cursorText && (
          <motion.span
            className="absolute whitespace-nowrap text-xs font-medium"
            style={{
              color: '#fff',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Dot cursor */}
      <motion.div
        className="fixed w-1 h-1 rounded-full bg-white pointer-events-none z-50"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0 : 1,
        }}
      />

      {/* Trailing cursor */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-40"
        style={{
          background: 'radial-gradient(circle, rgba(108, 99, 255, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
          left: mousePosition.x,
          top: mousePosition.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? '150px' : '100px',
          height: isHovering ? '150px' : '100px',
          x: 0,
          y: 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />

      {/* Particles on click */}
      {isClicking && (
        <motion.div
          className="fixed pointer-events-none z-40"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ x: 0, y: 0 }}
              animate={{
                x: Math.cos(i * (Math.PI / 3)) * 20,
                y: Math.sin(i * (Math.PI / 3)) * 20,
                opacity: [1, 0],
              }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;
