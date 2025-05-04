import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ParticlesComponent from './components/Particles';
import Header from './components/Header';
import Header1 from './components/Header1';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Blogs from './components/Blogs';
import FullBlog from './components/FullBlog';
import Footer from './components/Footer';
import Certifications from './components/Certifications';

import certs from './data/certs';
import blogEntries from './data/blogs';

const App = () => {
  useEffect(() => {
    const preloadImages = () => {
      const certImages = certs.map(cert => cert.image); 
      const blogImages = blogEntries.map(blog => blog.thumbnail);

      const imagesToPreload = [...certImages, ...blogImages];

      imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => console.log(`${src} loaded`);
        img.onerror = () => console.log(`Error loading ${src}`);
      });
    };

    preloadImages();
  }, []);

  return (
    <Router>
      <div className="relative w-full min-h-screen scroll-smooth">
        <ParticlesComponent id="particles" className="absolute top-0 left-0 -z-20 h-full w-full" />
        <Routes>
          {/* normal view */}
          <Route path="/" element={<><Header /><Hero /><AboutMe /><Projects /><Certifications /><Blogs /><Footer /></>} />
          {/* fullblog route */}
          <Route path="/blog/:id" element={<><Header1 /><FullBlog /><Footer /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
