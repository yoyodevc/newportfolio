import React, { useEffect, useState } from 'react';
import { FiExternalLink, FiGithub, FiCalendar, FiBriefcase } from 'react-icons/fi';
import { projects, education } from '../data/projects';

const Projects = () => {
  const [inViewp, setInViewp] = useState(false);
  const [experienceInView, setExperienceInView] = useState(false);

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
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      observer.observe(section);

      return () => observer.disconnect();
    };

    const cleanupProjects = createObserver('projects', setInViewp);
    const cleanupExperience = createObserver('experience', setExperienceInView);

    return () => {
      cleanupProjects?.();
      cleanupExperience?.();
    };
  }, []);

  return (
    <div className="font-[Poppins] text-white">
      {/* Projects Section */}
      <section 
        id="projects" 
        className="pt-24 px-4 sm:px-6 md:px-16 relative z-10 pb-16 md:pb-4"
      >
        <div className={`max-w-6xl mx-auto transition-opacity duration-700 ease-out ${inViewp ? 'opacity-100 animate-fade-up' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold text-center mb-16 text-lime-400">Projects</h2>

          <div className="space-y-12">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className={`flex flex-col md:flex-row items-center gap-6 rounded-3xl bg-white/5 backdrop-blur-md p-7 shadow-lg shadow-black/20 hover:bg-white/8 transition-all duration-500 ${
                  inViewp ? 'animate-fade-up' : ''
                }`}
                style={{ animationDelay: `${Math.min(index * 0.2 + 0.4, 1)}s`, animationFillMode: 'both' }}
              >
                {/* Project Image */}
                <div className="w-full md:w-2/5 h-56 overflow-hidden rounded-2xl border border-white/10 shadow-md shadow-black/30">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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

      {/* education changed to work */}
      <section 
        id="experience" 
        className="py-1 md:py-12 lg:py-16 xl:py-16 px-4 sm:px-6 md:px-16 relative z-10"
      >
        <div className={`max-w-6xl mx-auto transition-opacity duration-700 ease-out ${experienceInView ? 'opacity-100 animate-fade-up' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold text-center mb-16 text-lime-400">Work Experience</h2>
          <div className="relative">
            {/* timeline line */}
            <div className="absolute left-2 h-full w-0.5 bg-white/20 transform -translate-x-1/2 z-0"></div>
            <div className="space-y-12">
              {education.map((exp, index) => (
                <div 
                  key={exp.id}
                  className={`relative flex flex-col items-start ${
                    experienceInView ? 'animate-fade-up' : ''
                  }`}
                  style={{ animationDelay: `${Math.min(index * 0.2 + 0.4, 1)}s`, animationFillMode: 'both' }}
                >
                  {/* dot*/}
                  <div className="absolute left-2 top-8 w-4 h-4 rounded-full bg-white border-2 border-white/20 transform -translate-x-1/2 z-10"></div>
                  <div className="absolute left-2 top-8 w-4 h-4 rounded-full bg-white border-2 border-white/20 transform -translate-x-1/2 z-10 animate-ping opacity-75"></div>
                  <div className="hidden md:flex w-full justify-center mb-4">
                    <div className="bg-white/10 text-gray-300 text-sm px-4 py-1 rounded-full backdrop-blur-sm">
                      <FiCalendar className="inline mr-2" /> {exp.period}
                    </div>
                  </div>
                  {/* card */}
                  <div className="w-full pl-8">
                    <div className="rounded-3xl bg-white/5 backdrop-blur-md p-7 shadow-lg shadow-black/20 hover:bg-white/8 transition-all duration-500">
                      <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 shadow-md shadow-black/30 shrink-0 flex items-center justify-center bg-white/5 mx-auto md:mx-0">
                          <img 
                            src={exp.logo} 
                            alt={exp.institution} 
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-3 text-center md:text-left">
                          {/* mobile date */}
                          <div className="md:hidden flex items-center justify-center gap-2 text-sm text-gray-300 mb-2 bg-white/10 px-3 py-1 rounded-full w-fit mx-auto">
                            <FiCalendar />
                            <span>{exp.period}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-300">{exp.institution}</h3>
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <p className="text-lg font-medium text-gray-300 flex items-center justify-center md:justify-start gap-2">
                              <FiBriefcase /> {exp.degree}
                            </p>
                          </div>
                          <p className="text-gray-400 text-base text-justify">{exp.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;