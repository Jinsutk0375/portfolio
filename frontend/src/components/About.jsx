import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl text-gray-900 dark:text-white">
            About Me
          </h2>
          <div className="mt-2 w-20 h-1 bg-blue-600 mx-auto rounded"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <img 
              src="https://media.licdn.com/dms/image/v2/D5612AQGmzuadE5DbGw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1704024061385?e=2147483647&v=beta&t=aVrlexX5aKcUQFikObir9jiIFwpGY5yhUdgbk19emaI" 
              alt="world of vlsi"
              className="w-full h-auto object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            <p>
  I'm Jishnu T K, a 3rd year Electronics and Communication Engineering undergraduate at IIT (ISM) Dhanbad. 
  I have a strong foundation in core electronics, communication systems, signal processing, and VLSI design, 
  along with a growing expertise in full stack web development.
</p>

<p>
  My interests lie in digital system design, FPGA-based implementations, and semiconductor technologies, 
  while also building scalable web applications using modern frameworks. I enjoy working at the intersection 
  of hardware and software, creating efficient and real-world impactful systems.
</p>

<p>
  Currently exploring VLSI design, system-level thinking, and full stack architectures to build 
  high-performance and scalable solutions.
</p>
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div>
                <strong className="block text-gray-900 dark:text-white">Location:</strong>
                <span>Dhanbad ,IN</span>
              </div>
              <div>
                <strong className="block text-gray-900 dark:text-white">Email:</strong>
                <span>jishnutk2004@gmail.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
