import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" id="home">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
            Welcome to my creative space
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Jishnu T K</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 font-medium">
          Electronics Engineer • Full Stack Developer • System Builder          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400 mb-10">
          ECE undergraduate passionate about building intelligent systems and scalable web applications. 
I bridge hardware fundamentals with modern software to create efficient, real-world solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="#projects" className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center gap-2 w-full sm:w-auto justify-center">
              View My Work <ArrowRight size={18} />
            </a>
            <a href="/Core_ece.pdf" download className="px-8 py-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2 w-full sm:w-auto justify-center">
              Download Resume <Download size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
