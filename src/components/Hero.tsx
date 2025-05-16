'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';

// Dynamically import ThreeBackground to avoid SSR issues
const ThreeBackground = dynamic(() => import('./ThreeBackground'), { ssr: false });

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();

  // Transform values based on scroll
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    // Simulate loading sequence
    const loadingSequence = async () => {
      await controls.start({
        opacity: 1,
        transition: { duration: 1.5, ease: "easeOut" }
      });
      setIsLoaded(true);
    };

    loadingSequence();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Particle animation
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle) => {
      gsap.to(particle, {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        opacity: `random(0.1, 0.5)`,
        duration: `random(10, 20)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [controls]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0B0B0B' }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ThreeBackground />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full particle"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0
                ? 'var(--neon-blue)'
                : i % 3 === 1
                  ? 'var(--neon-purple)'
                  : 'var(--neon-pink)',
              opacity: Math.random() * 0.3,
              filter: 'blur(1px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: Math.random() * 0.3 + 0.1 }}
            transition={{ duration: 2 }}
          />
        ))}
      </div>

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 z-10 opacity-30"
        style={{
          background: 'radial-gradient(circle at center, rgba(108, 99, 255, 0.2) 0%, rgba(0, 0, 0, 0) 70%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 z-20 relative"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          className="max-w-4xl mx-auto"
        >
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 100
              }}
              className="text-center"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.span
                  className="block text-white mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Hi, I'm
                </motion.span>
                <motion.span
                  className="gradient-text neon-text"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Perminus Karanja
                </motion.span>
              </motion.h1>

              <motion.div
                className="relative mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <motion.p
                  className="text-xl md:text-2xl text-gray-300 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  Full-Stack Web Developer
                </motion.p>
                <motion.div
                  className="absolute inset-0 blur-lg opacity-30 bg-primary rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <Link
                  href="#projects"
                  className="relative group overflow-hidden"
                >
                  <span className="absolute inset-0 bg-primary opacity-80 rounded-lg blur-md group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative block bg-black border border-primary text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 group-hover:translate-y-[-2px] group-hover:shadow-[0_0_15px_rgba(108,99,255,0.5)]">
                    View My Work
                  </span>
                </Link>
                <Link
                  href="#contact"
                  className="relative group overflow-hidden"
                >
                  <span className="absolute inset-0 bg-transparent opacity-80 rounded-lg blur-md group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative block bg-transparent border border-white text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 group-hover:border-primary-light group-hover:translate-y-[-2px]">
                    Contact Me
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <motion.p className="text-gray-400 text-sm mb-2">Scroll Down</motion.p>
          <motion.div
            className="w-6 h-10 border border-gray-500 rounded-full flex justify-center"
            animate={{ boxShadow: ["0 0 0px rgba(108, 99, 255, 0)", "0 0 10px rgba(108, 99, 255, 0.5)", "0 0 0px rgba(108, 99, 255, 0)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
