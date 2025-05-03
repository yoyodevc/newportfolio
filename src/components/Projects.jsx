import React, { useEffect, useState } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { projects, education } from '../data/projects';

const Projects = () => {
  const [inViewp, setInViewp] = useState(false);
  const [educationInView, setEducationInView] = useState(false);

  useEffect(() => {
    const createObserver = (id, setInView) => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry], obs) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(section);

      return () => observer.disconnect();
    };

    const cleanupProjects = createObserver('projects', setInViewp);
    const cleanupEducation = createObserver('education', setEducationInView);

    return () => {
      cleanupProjects?.();
      cleanupEducation?.();
    };
  }, []);

  return (
    <div className="font-[Poppins] text-white">
      {/* Projects Section */}
      <section 
        id="projects" 
        className="pt-24 px-4 sm:px-6 md:px-16 relative z-10 pb-16 md:pb-4"
      >
        <div className={`max-w-6xl mx-auto transition-opacity duration-700 ease-out ${inViewp? 'animate-fade-up opacity-100' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold text-center mb-16 text-lime-400">Projects</h2>
          
          <div className="space-y-12">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className={`flex flex-col md:flex-row items-center gap-6 rounded-3xl bg-white/5 backdrop-blur-md p-7 shadow-lg shadow-black/20 hover:bg-white/8 transition-all duration-500 animate-fade-up`} 
                style={{ animationDelay: `${index * 0.2 + 0.4}s` }}
              >
                {/* Project Image */}
                <div className="w-full md:w-2/5 h-56 overflow-hidden rounded-2xl border border-white/10 shadow-md shadow-black/30">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title} 
                    className="w-full h-full object-fit hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Project Details */}
                <div className="w-full md:w-3/5 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-300">{project.title}</h3>
                  <p className="text-sm font-medium text-gray-300 bg-white/5 inline-block px-3 py-1 rounded-full">{project.tech}</p>
                  <p className="text-gray-400 text-base text-justify">{project.description}</p>
                  
                  {/* Project Links */}
                  <div className="flex gap-4 pt-2">
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-lime-600/80 hover:bg-lime-500/90 text-white transition-all duration-300 text-sm font-medium active:scale-95"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 text-sm font-medium active:scale-95"
                    >
                      <FiGithub /> Source Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section 
        id="education" 
        className="py-1 md:py-12 lg:py-12 xl:py-12 px-4 sm:px-6 md:px-16 relative z-10"
        >
        <div className={`max-w-6xl mx-auto transition-opacity duration-700 ease-out ${educationInView ? 'animate-fade-up opacity-100' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold text-center mb-16 text-lime-400">Education</h2>
          
          <div className="space-y-12">
            {education.map((edu, index) => (
              <div 
                key={edu.id} 
                className={`flex flex-col md:flex-row items-center gap-6 rounded-3xl bg-white/5 backdrop-blur-md p-7 shadow-lg shadow-black/20 hover:bg-white/8 transition-all duration-500 animate-fade-up`}
                style={{ animationDelay: `${index * 0.2 + 0.4}s` }}
              >
                {/* School Logo */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/10 shadow-md shadow-black/30 shrink-0 flex items-center justify-center bg-white/5">
                  <img 
                    src={edu.logo} 
                    alt={edu.institution} 
                    className="w-full h-full object-fill"
                  />
                </div>
                
                {/* Education Details */}
                <div className="flex-1 space-y-3 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-300">{edu.institution}</h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <p className="text-lg font-medium text-gray-200">{edu.degree}</p>
                    <span className="hidden md:block text-gray-400">•</span>
                    <p className="text-sm font-medium text-gray-400">{edu.period}</p>
                  </div>
                  <p className="text-gray-400 text-base text-justify">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;