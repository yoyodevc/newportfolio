import React, { useEffect, useState } from 'react';
import { FiExternalLink, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import blogEntries from '../data/blogs';

const Blogs = () => {
  const [inView, setInView] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [animatedCards, setAnimatedCards] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [imageAnimationState, setImageAnimationState] = useState({});

  const initialDisplayCount = 6;
  const totalBlogs = blogEntries.length;
  const hasMoreBlogs = totalBlogs > initialDisplayCount;
  const displayedBlogs = showAll ? blogEntries : blogEntries.slice(0, initialDisplayCount);

  // Function to load images with delay
  const loadImageWithDelay = (id, src, delay) => {
    setTimeout(() => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
        // Set a slight delay before starting the animation
        setTimeout(() => {
          setImageAnimationState(prev => ({ ...prev, [id]: true }));
        }, 50);
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
            displayedBlogs.forEach((blog, index) => {
              loadImageWithDelay(blog.id, blog.thumbnail || '/placeholder-blog.jpg', index * 500);
            });
          }
        },
        { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
      );
      observer.observe(section);
      return () => observer.disconnect();
    };

    const observerSetup = () => {
      const cleanupBlogs = createObserver('blogs', setInView);
      return () => cleanupBlogs?.();
    };

    const rafId = requestAnimationFrame(observerSetup);
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [displayedBlogs]);

  const toggleShowAll = () => {
    if (!showAll) {
      setShowAll(true);
      setTimeout(() => {
        const newAnimated = [];
        for (let i = initialDisplayCount; i < blogEntries.length; i++) {
          newAnimated.push(i);
          loadImageWithDelay(blogEntries[i].id, blogEntries[i].thumbnail || '/placeholder-blog.jpg', (i - initialDisplayCount) * 150);
        }
        setAnimatedCards(newAnimated);
      }, 50);
    } else {
      setShowAll(false);
      setAnimatedCards([]);
    }
  };

  return (
    <div className="font-[Poppins] text-white">
      <section 
        id="blogs" 
        className="py-1 md:py-12 lg:py-12 xl:py-12 px-4 sm:px-6 md:px-16 relative z-10"
      >
        <div className={`max-w-6xl mx-auto transition-opacity duration-700 ease-out ${inView ? 'opacity-100 animate-fade-up' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold text-center mb-16 text-lime-400">
            Blogs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedBlogs.map((blog, index) => (
              <div 
                key={blog.id}
                id={`blog-card-${index}`}
                className={`flex flex-col rounded-3xl bg-white/5 backdrop-blur-md p-7 shadow-lg shadow-black/20 hover:bg-white/8 transition-all duration-500 h-full ${
                  inView && (index < initialDisplayCount || animatedCards.includes(index)) ? 'animate-fade-up' : ''
                }`}
                style={{
                  animationDelay: `${(index < initialDisplayCount ? index : index - initialDisplayCount) * 0.15}s`,
                  animationFillMode: 'both',
                  opacity: (index < initialDisplayCount || animatedCards.includes(index)) ? 1 : 0
                }}
              >
                {/* Blog Image with loading state and animation */}
                <div className="w-full h-48 overflow-hidden rounded-2xl border border-white/10 shadow-md shadow-black/30 mb-4 bg-gray-800/50">
                  {loadedImages[blog.id] ? (
                    <img
                      src={blog.thumbnail || '/placeholder-blog.jpg'}
                      alt={blog.title}
                      className={`w-full h-full object-cover hover:scale-105 transition-all duration-500 ${
                        imageAnimationState[blog.id] 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-105'
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800/30 animate-pulse">
                      <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
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

export default Blogs;