import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-7rem)] text-center text-white font-[Poppins] px-4">
      <h1 className="text-4xl md:text-4xl lg:text-5xl mb-2 md:mb-4 animate-fade-up text-gray-300">
        Hi, I'm <span className="font-bold text-lime-400">Fred</span>
      </h1>
      <h2 className="text-xl md:text-2xl animate-fade-up text-gray-300" style={{ animationDelay: '0.5s' }}>
        <span>A </span>
        <span>
          <Typewriter
            words={['Front-End Developer', 'Web Designer', 'Student Developer']}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </h2>
        {/* buttons part */}
      <div className="mt-6 md:mt-8 lg:mt-10 flex flex-wrap justify-center gap-2 md:gap-4 animate-fade-up" style={{ animationDelay: '0.8s' }}>
        {[{ label: 'About Me', href: '#about' }, { label: 'View Projects', href: '#projects' }, { label: 'View Blogs', href: '#blogs' }, ].map((item) => (
          <a key={item.label} href={item.href} className="px-4 py-1.5 md:px-6 md:py-2 rounded-xl md:rounded-2xl text-sm md:text-base font-medium bg-white/5 backdrop-blur-md shadow-sm shadow-black/20 hover:shadow-black/20 hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-0 active:scale-95">{item.label}</a>
        ))}
      </div>
    </div>
  );
};

export default Hero;