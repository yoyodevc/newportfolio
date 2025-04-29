import React from 'react';
import ParticlesComponent from './components/Particles';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';

function App() {
  return (
    <div className="relative w-full min-h-screen scroll-smooth">
      {/* Particles component with a lower z-index */}
      <ParticlesComponent id="particles" className="absolute top-0 left-0 -z-20 h-full w-full" />
      <Header />
      <Hero />
      <AboutMe />
    </div>
  );
}

export default App;
