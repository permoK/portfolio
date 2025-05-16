'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Project data
const projects = [
  {
    id: 1,
    title: 'Ecofarm',
    description: 'Predicts methane emissions from cows based on environmental and feed data.',
    image: '/projects/ecofarm.jpg',
    tags: ['Flask', 'Python', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://ecofarm.cecilgachie.tech',
    github: 'https://github.com/permoK/ecofarm',
    category: 'web',
  },
  {
    id: 2,
    title: 'Fivestarsewer',
    description: 'Drain & sewer service website for a local business, built with Next.js and hosted on EC2.',
    image: '/projects/fivestarsewer.jpg',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'AWS EC2'],
    link: 'https://fivestarsewer.com',
    github: 'https://github.com/permoK/fivestarsewer',
    category: 'web',
  },
  {
    id: 3,
    title: 'CZ Supply',
    description: 'E-commerce site on Squarespace with custom theme modifications.',
    image: '/projects/czsupply.jpg',
    tags: ['Squarespace', 'CSS', 'JavaScript'],
    link: 'https://czsupply.com',
    github: '',
    category: 'web',
  },
  {
    id: 4,
    title: 'Jadi DBMS SDK',
    description: 'A database management system SDK built with Python.',
    image: '/projects/jadi.jpg',
    tags: ['Python', 'SQL', 'Database'],
    link: '',
    github: 'https://github.com/permoK/jadi-DBMS-SDK',
    category: 'backend',
  },
  {
    id: 5,
    title: 'Django Daraja App',
    description: 'Integration of M-Pesa payment gateway with Django.',
    image: '/projects/django-daraja.jpg',
    tags: ['Django', 'Python', 'API', 'Payments'],
    link: '',
    github: 'https://github.com/permoK/django_daraja_app',
    category: 'backend',
  },
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All' },
  { id: 'web', name: 'Web Development' },
  { id: 'backend', name: 'Backend' },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background with glassmorphism effect */}
      <div className="absolute inset-0 bg-black opacity-90 z-0"></div>
      
      {/* Animated neon lights in background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              width: Math.random() * 400 + 200,
              height: Math.random() * 400 + 200,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 
                ? `radial-gradient(circle, var(--neon-blue), transparent 70%)`
                : `radial-gradient(circle, var(--neon-pink), transparent 70%)`,
              filter: 'blur(80px)',
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
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
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-transparent border border-gray-600 text-gray-300 hover:border-primary'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-xl overflow-hidden"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-48 overflow-hidden">
                {/* Placeholder for project image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-80"></div>
                <div className="w-full h-full flex items-center justify-center text-white font-bold">
                  {project.title}
                </div>
                
                {/* Overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center"
                >
                  <div className="flex gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-white hover:border-primary text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs bg-black bg-opacity-30 text-gray-300 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
