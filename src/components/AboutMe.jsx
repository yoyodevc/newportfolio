import React, { useEffect, useState } from 'react';
import { FiFacebook, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import ContactModal from './insidecomponents/ContactModal';

const AboutMe = () => {
  const [inView, setInView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section
      id="about"
      className={`min-h-[90vh] px-4 sm:px-6 md:px-16 text-white font-[Poppins] bg-transparent relative z-10 flex items-center justify-center transition-opacity duration-700 ease-out ${inView ? 'animate-fade-up' : 'opacity-0'}`}
      style={{ animationDelay: '0.2s' }}
    >
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-6 md:gap-12">
        {/* Profile Image */}
        <div className={`w-40 h-40 sm:w-52 sm:h-52 md:w-72 md:h-72 rounded-full overflow-hidden shadow-lg shadow-black/30 border-4 border-white/10 backdrop-blur-sm shrink-0 ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <img
            src="/profile.jpg"
            alt="Fred's Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Content */}
        <div className={`flex-1 space-y-6 text-center md:text-left ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <h2 className="text-4xl sm:text-5xl font-bold text-lime-400">Fred</h2>
          <p className="text-lg sm:text-xl text-gray-300">4th Year Student — BS Information Technology</p>
          <p className="text-gray-400 leading-relaxed text-base sm:text-lg text-justify">
            I'm a passionate front-end developer and tech enthusiast who enjoys building accessible, user-focused we interfaces while continuously improvingh my skills through learning and experimentation. Outside of coding, I explore UI/UX designs, dive into
            IT analysis and computer hobbyist activities, and gaming. This enhances my problem-solving abilities and technical insightsm giving me a well-rounded perspective when approaching complex challenges.
          </p>

          {/* Social Icons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-4 md:gap-4 lg:gap-4 mt-6">
            <a href="https://www.facebook.com/john.fredrick.lim.2025/" target="_blank" rel="noopener noreferrer" className="p-4 sm:p-4 md:px-4 md:py-4 rounded-2xl bg-white/5 backdrop-blur-md shadow-sm shadow-black/20 hover:bg-white/10 transition-all duration-300 active:scale-95">
              <FiFacebook className="text-white w-7 h-7 sm:w-7 sm:h-7" />
            </a>
            <a href="https://github.com/yoyodevc" target="_blank" rel="noopener noreferrer" className="p-4 sm:p-4 md:px-4 md:py-4 rounded-2xl bg-white/5 backdrop-blur-md shadow-sm shadow-black/20 hover:bg-white/10 transition-all duration-300 active:scale-95">
              <FiGithub className="text-white w-7 h-7 sm:w-7 sm:h-7" />
            </a>
            <a href="https://www.linkedin.com/in/john-fredrick-lim-4b9171361/" target="_blank" rel="noopener noreferrer" className="p-4 sm:p-4 md:px-4 md:py-4 rounded-2xl bg-white/5 backdrop-blur-md shadow-sm shadow-black/20 hover:bg-white/10 transition-all duration-300 active:scale-95">
              <FiLinkedin className="text-white w-7 h-7 sm:w-7 sm:h-7" />
            </a>
            <button onClick={openModal} className="relative p-4 sm:p-4 md:px-4 md:py-4 rounded-2xl bg-white/5 backdrop-blur-md shadow-sm shadow-black/20 hover:bg-white/10 transition-all duration-300 active:scale-95 cursor-pointer">
              <FiMail className="text-white w-7 h-7 sm:w-7 sm:h-7" />
              <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
              <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default AboutMe;
