import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Full Stack Development ",
    skills: [
      "React", "Node.js", "MongoDB", "Express.js",
      "Tailwind CSS", "TypeScript", "Next.js", "Git"
    ],
  },
  {
    title: "Core Electronics & VLSI ",
    skills: [
      "Digital Electronics", "VLSI Design", "Verilog / HDL",
      "FPGA Development", "CMOS Fundamentals",
      "Signal Processing", "Analog Circuits"
    ],
  },
  {
    title: "Programming & Problem Solving ",
    skills: [
      "C", "C++", "Data Structures & Algorithms"
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl text-gray-900 dark:text-white">
            Core Expertise & Technologies
          </h2>
          <div className="mt-2 w-20 h-1 bg-blue-600 mx-auto rounded"></div>
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                {category.title}
              </h3>

              <div className="flex flex-wrap justify-center gap-3">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium hover:scale-105 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Skills;