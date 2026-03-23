import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import ProjectsSection from '../components/ProjectsSection';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <ProjectsSection />
      <Contact />
    </>
  );
};

export default Home;
