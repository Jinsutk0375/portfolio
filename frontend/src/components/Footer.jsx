import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 py-8 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
              Portfolio
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://github.com/Jinsutk0375https://www.linkedin.com/in/jishnu-t-k-795685284/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <span className="sr-only">GitHub</span>
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/jishnu-t-k-795685284/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
