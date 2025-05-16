'use client';

import { motion } from 'framer-motion';

// Skill categories with their respective skills
const skillCategories = [
  {
    name: 'Languages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'Java', level: 70 },
      { name: 'PHP', level: 65 },
      { name: 'C', level: 60 },
      { name: 'C++', level: 55 },
    ],
  },
  {
    name: 'Frameworks & Tools',
    skills: [
      { name: 'Flask', level: 85 },
      { name: 'Next.js', level: 80 },
      { name: 'Django', level: 75 },
      { name: 'Squarespace', level: 90 },
      { name: 'Docker', level: 70 },
      { name: 'Coolify', level: 65 },
      { name: 'Gunicorn', level: 75 },
    ],
  },
  {
    name: 'Web & UI',
    skills: [
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 90 },
      { name: 'SCSS', level: 80 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'jQuery', level: 75 },
    ],
  },
  {
    name: 'APIs & Databases',
    skills: [
      { name: 'REST API', level: 85 },
      { name: 'Django REST Framework', level: 80 },
      { name: 'MySQL', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'SQLite', level: 90 },
      { name: 'Supabase', level: 75 },
    ],
  },
];

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-black z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, var(--neon-green), var(--neon-blue))`,
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
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
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              className="glass p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-6 gradient-text">{category.name}</h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + skillIndex * 0.1 }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, var(--primary) 0%, var(--neon-${
                            categoryIndex % 5 === 0 ? 'blue' : 
                            categoryIndex % 5 === 1 ? 'purple' : 
                            categoryIndex % 5 === 2 ? 'green' : 
                            categoryIndex % 5 === 3 ? 'pink' : 'yellow'
                          }) 100%)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
