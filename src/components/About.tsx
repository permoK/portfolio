'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0a0a] opacity-90 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, var(--neon-purple), var(--neon-blue))`,
              filter: 'blur(60px)',
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="w-full h-[400px] relative rounded-lg overflow-hidden">
              {/* Replace with your actual image */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-70 z-10"></div>
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-2xl text-gray-400">Your Photo</span>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-5 w-40 h-40 border-4 border-accent z-20"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">Computer Science Student & Full-Stack Developer</h3>
            <p className="text-gray-300 mb-6">
              I'm a Computer Science student specializing in full-stack web development with hands-on experience in Flask, Next.js, and Squarespace. Eager to join a dynamic team to build scalable applications and drive innovation.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="font-bold text-primary mb-1">Name:</p>
                <p className="text-gray-300">Perminus Karanja</p>
              </div>
              <div>
                <p className="font-bold text-primary mb-1">Email:</p>
                <p className="text-gray-300">perminusk21@gmail.com</p>
              </div>
              <div>
                <p className="font-bold text-primary mb-1">Education:</p>
                <p className="text-gray-300">BSc in Computer Science</p>
              </div>
              <div>
                <p className="font-bold text-primary mb-1">Location:</p>
                <p className="text-gray-300">Kenya</p>
              </div>
            </div>

            <div className="flex gap-4">
              <a 
                href="/resume.pdf" 
                className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
              <a 
                href="https://github.com/permoK" 
                className="border border-white hover:border-primary text-white font-bold py-2 px-6 rounded-full transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
