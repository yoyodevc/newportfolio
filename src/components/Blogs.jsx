import React, { useEffect, useState, useRef } from 'react';
import { FiExternalLink, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import blogEntries from '../data/blogs';

const Blogs = () => {
  const [inView, setInView] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [shouldAnimateNewCards, setShouldAnimateNewCards] = useState(false);
  const animationTriggered = useRef(false);

  const initialDisplayCount = 6;
  const totalBlogs = blogEntries.length;
  const hasMoreBlogs = totalBlogs > initialDisplayCount;
  const displayedBlogs = showAll ? blogEntries : blogEntries.slice(0, initialDisplayCount);

  useEffect(() => {
    const createObserver = (id, setInView) => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry], obs) => {
          if (entry.isIntersecting && !animationTriggered.current) {
            setInView(true);
            animationTriggered.current = true;
            obs.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(section);
      return () => observer.disconnect();
    };
    const cleanupBlogs = createObserver('blogs', setInView);
    return () => {
      cleanupBlogs?.();
    };
  }, []);

  const toggleShowAll = () => {
    if (!showAll) {
      setShouldAnimateNewCards(true);
      setShowAll(true);
      setTimeout(() => {
        setShouldAnimateNewCards(false);
      }, 1000);
    } else {
      setShowAll(false);
    }
  };

  return (
    <div className="font-[Poppins] text-white">
      <section 
        id="blogs" 
        className="min-h-[60vh] py-14 md:py-1 lg:py-0 xl:py-4 px-4 sm:px-6 md:px-16 relative z-10 2xl:pb-[1vh] pb-[1vh] sm:pb-[1vh] md:pb-[1vh] lg:pb-[1vh] xl:pb-[1vh]"
      >
        <div className={`max-w-6xl mx-auto transition-opacity duration-700 ease-out ${inView ? 'animate-fade-up opacity-100' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold text-center mb-16 text-lime-400">Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedBlogs.map((blog, index) => (
              <div 
                key={blog.id}
                id={`blog-${index}`}
                className={`flex flex-col rounded-3xl bg-white/5 backdrop-blur-md p-7 shadow-lg shadow-black/20 hover:bg-white/8 transition-all duration-500 h-full ${
                  (inView && index < initialDisplayCount) || 
                  (showAll && index >= initialDisplayCount && shouldAnimateNewCards)
                    ? 'animate-fade-up' 
                    : ''
                }`}
                style={{ 
                  animationDelay: 
                    (inView && index < initialDisplayCount) 
                      ? `${index * 0.2 + 0.4}s` 
                      : (showAll && index >= initialDisplayCount && shouldAnimateNewCards)
                        ? '0.1s'
                        : '0s'
                }}
              >
                {/* Blog Image */}
                <div className="w-full h-48 overflow-hidden rounded-2xl shadow-md shadow-black/30 mb-4">
                  <img 
                    src={blog.thumbnail || '/placeholder-blog.jpg'} 
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Blog Details */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-300">{blog.title}</h3>
                  <p className="text-sm font-medium text-gray-300 bg-white/5 inline-block px-3 py-1 rounded-full mt-2 mb-2 self-start">{blog.date}</p>
                  <p className="text-gray-400 text-base text-justify mb-4 flex-grow">{blog.description}</p>
                  
                  {/* Blog Link */}
                  <a
                    href={`/blog/${blog.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-lime-600/80 hover:bg-lime-500/90 text-white transition-all duration-300 text-sm font-medium active:scale-95 self-start mt-auto"
                    >
                    <FiExternalLink /> Read More
                </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* Show More/Less Button */}
          {hasMoreBlogs && (
            <div className="flex justify-center mt-10">
              <button
                onClick={toggleShowAll}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-md shadow-sm shadow-black/20 hover:shadow-black/20 hover:bg-white/10 transition-all duration-300 font-medium active:scale-95"
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

export default Blogs;