import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import certs from '../data/certs';

const Certifications = () => {
  const [inView, setInView] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [animatedCards, setAnimatedCards] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [imageAnimationState, setImageAnimationState] = useState({});
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);
  
  const initialDisplayCount = 9;
  const totalCerts = certs.length;
  const hasMoreCerts = totalCerts > initialDisplayCount;
  const displayedCerts = showAll ? certs : certs.slice(0, initialDisplayCount);

  const loadImageWithDelay = (id, src, delay) => {
    setTimeout(() => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
        setTimeout(() => {
          setImageAnimationState(prev => ({ ...prev, [id]: true }));
        }, 200); //animation delay
      };
      img.onerror = () => {
        setLoadedImages(prev => ({ ...prev, [id]: false }));
      };
    }, delay);
  };

  useEffect(() => {
    const createObserver = (id, setInView) => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry], obs) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.unobserve(entry.target);
            displayedCerts.forEach((cert, index) => {
              loadImageWithDelay(cert.id, cert.image, index * 300);
            });
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      observer.observe(section);
      return () => observer.disconnect();
    };

    const observerSetup = () => {
      const cleanupCerts = createObserver('certifications', setInView);
      return () => cleanupCerts?.();
    };

    const rafId = requestAnimationFrame(observerSetup);
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [displayedCerts]);
  
  const toggleShowAll = () => {
    if (!showAll) {
      setShowAll(true);
      if (!hasAnimatedOnce) {
        setTimeout(() => {
          const newAnimated = [];
          for (let i = initialDisplayCount; i < certs.length; i++) {
            newAnimated.push(i);
            loadImageWithDelay(certs[i].id, certs[i].image, (i - initialDisplayCount) * 300);
          }
          setAnimatedCards(newAnimated);
          setHasAnimatedOnce(true);
        }, 50);
      }
    } else {
      setShowAll(false);
    }
  };

  return (
    <div className="font-[Poppins] text-white">
      <section
        id="certifications"
        className="py-16 md:py-6 lg:py-12 xl:py-6 px-4 sm:px-6 md:px-16 relative z-10"
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
            {displayedCerts.map((cert, index) => (
              <div
                key={cert.id}
                id={`cert-card-${index}`}
                className={`rounded-3xl bg-white/5 backdrop-blur-md p-4 shadow-lg shadow-black/20 transition-all duration-500 hover:bg-white/8 ${
                  inView && (index < initialDisplayCount || (animatedCards.includes(index) && !hasAnimatedOnce)) ? 'animate-fade-up' : ''
                }`}
                style={{
                  animationDelay: `${(index < initialDisplayCount ? index : index - initialDisplayCount) * 0.4}s`,
                  animationFillMode: 'both',
                  opacity: (index < initialDisplayCount || animatedCards.includes(index)) ? 1 : 0,
                }}
              >
                <div className="w-full h-64 overflow-hidden rounded-xl border border-white/10 shadow-md shadow-black/30 bg-gray-800/50 mb-4 relative">
                  {loadedImages[cert.id] ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className={`w-full h-full object-cover hover:scale-105 transition-all duration-500 ${
                        imageAnimationState[cert.id] 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-105'
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800/30 to-gray-900/50 animate-pulse">
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
          
          {/* Show More/Less Button */}
          {hasMoreCerts && (
            <div className="flex justify-center mt-10">
              <button
                onClick={toggleShowAll}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-md shadow-sm shadow-black/20 hover:shadow-black/20 hover:bg-white/10 transition-all duration-300 font-medium active:scale-95 ${
                  inView ? 'animate-fade-up' : ''
                }`}
                style={{ 
                  animationDelay: '1s',
                  animationFillMode: 'both' 
                }}
              >
                {showAll ? (
                  <>
                    Show Less <FiChevronUp className="text-lg" />
                  </>
                ) : (
                  <>
                    Show More <FiChevronDown className="text-lg" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Certifications;