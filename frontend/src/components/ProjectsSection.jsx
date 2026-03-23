import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import axios from '../api/axios';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('/projects');
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <div className="mt-2 w-20 h-1 bg-blue-600 mx-auto rounded"></div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={40} />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No projects found. Check back later!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800 flex flex-col group"
              >
                <div className="relative overflow-hidden h-48 sm:h-56">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white/50 group-hover:scale-105 transition-transform duration-500">
                      <span className="text-4xl font-bold">{project.title.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-sm text-white transition-colors">
                        <Github size={20} />
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-sm text-white transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-2">
                    {project.techStack?.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
