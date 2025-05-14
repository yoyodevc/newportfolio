import React, { useEffect, useState } from 'react';
import certs from '../data/certs';

const Certifications = () => {
  const [inView, setInView] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    const section = document.getElementById('certifications');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(entry.target);

          // Initialize loading states
          const initialLoadingStates = {};
          certs.forEach(cert => {
            initialLoadingStates[cert.id] = false;
          });
          setLoadingStates(initialLoadingStates);

          // Load images one by one with delay
          certs.forEach((cert, index) => {
            setTimeout(() => {
              setLoadingStates(prev => ({ ...prev, [cert.id]: true }));
              
              const img = new Image();
              img.src = cert.image;
              img.onload = () => {
                setLoadedImages(prev => ({ ...prev, [cert.id]: true }));
                setLoadingStates(prev => ({ ...prev, [cert.id]: false }));
              };
              img.onerror = () => {
                setLoadedImages(prev => ({ ...prev, [cert.id]: false }));
                setLoadingStates(prev => ({ ...prev, [cert.id]: false }));
              };
            }, index * 300); // 300ms delay between each image load
          });
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-[Poppins] text-white">
      <section
        id="certifications"
        className="py-16 md:py-6 lg:py- xl:py-6 px-4 sm:px-6 md:px-16 relative z-10"
      >
        <div
          className={`max-w-6xl mx-auto transition-opacity duration-700 ease-out ${
            inView ? 'opacity-100 animate-fade-up' : 'opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-lime-400">
            Certifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certs.map((cert, index) => (
              <div
                key={cert.id}
                className={`rounded-3xl bg-white/5 backdrop-blur-md p-4 shadow-lg shadow-black/20 transition-all duration-500 hover:bg-white/8 ${
                  inView ? 'animate-fade-up' : ''
                }`}
                style={{
                  animationDelay: `${index * 0.4}s`,
                  animationFillMode: 'both',
                  opacity: inView ? 1 : 0,
                }}
              >
                <div className="w-full h-64 overflow-hidden rounded-xl border border-white/10 shadow-md shadow-black/30 bg-gray-800/50 mb-4 relative">
                  {loadedImages[cert.id] ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800/30 to-gray-900/50">
                      <svg
                        className="w-10 h-10 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-200 text-center">
                  {cert.title}
                </h3>
                <p className="text-sm text-gray-400 text-center mt-2">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certifications;