import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

const FullBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await import(`../data/blogs/day${id}.js`);
        setBlog(data.default);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        console.error('Blog not found:', err);
        setBlog(null);
      }
    };
    loadBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="text-white p-4 md:p-8 font-[Poppins]">
        Blog not found or still loading...
      </div>
    );
  }

  const handleDayChange = (day) => {
    navigate(`/blog/${day}`);
  };

  return (
    <div className="font-[Poppins] text-white min-h-screen px-4 py-6 md:py-8 lg:py-12 px-3 sm:px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="w-full rounded-xl md:rounded-3xl bg-black shadow-lg shadow-black/20 overflow-hidden mb-6 md:mb-8 animate-fade-up">
          <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={blog.heroImage}
                alt={blog.title}
                loading="lazy"
                className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 md:p-6 lg:p-8">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300">{blog.title}</h1>
              <div className="flex flex-wrap gap-3 md:gap-4 mt-2 md:mt-3 text-gray-200 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <FiCalendar className="text-lime-400" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiMapPin className="text-lime-400" />
                  <span>{blog.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="rounded-xl md:rounded-3xl bg-white/5 p-4 sm:p-6 md:p-8 shadow-lg shadow-black/20 mb-6 md:mb-8 animate-fade-up animation-delay-200">
          {/* Morning Trip */}
          <section className="mb-8 md:mb-12 animate-fade-up animation-delay-300">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-lime-400">{blog.morningTrip.title}</h2>
            <div className="my-4 md:my-8 overflow-hidden rounded-lg md:rounded-2xl shadow-md shadow-black/30">
              <div className="relative w-full [&>img]:aspect-auto">
                <img
                  src={blog.morningTrip.image}
                  alt={blog.morningTrip.title}
                  loading="lazy"
                  className="w-full h-full object-contain opacity-100 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            {blog.morningTrip.paragraphs.map((p, idx) => (
              <p key={idx} className="mb-4 md:mb-5 text-gray-300 text-sm md:text-base leading-relaxed text-justify">
                {p}
              </p>
            ))}
          </section>
          
          {/* Divider */}
          <div className="flex items-center justify-center my-6 md:my-10">
            <div className="h-px bg-gradient-to-r from-transparent via-lime-400/30 to-transparent w-full"></div>
          </div>

          {/* Afternoon Trip */}
          <section className="animate-fade-up animation-delay-400">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-lime-400">{blog.afternoonTrip.title}</h2>
            <div className="mb-4 md:mb-8 overflow-hidden rounded-lg md:rounded-2xl shadow-md">
              <div className="relative w-full [&>img]:aspect-auto">
                <img
                  src={blog.afternoonTrip.image}
                  alt={blog.afternoonTrip.title}
                  loading="lazy"
                  className="w-full h-full object-fill opacity-100 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            {blog.afternoonTrip.paragraphs.map((p, idx) => (
              <p key={idx} className="mb-4 md:mb-5 text-gray-300 text-sm md:text-base leading-relaxed text-justify">
                {p}
              </p>
            ))}
          </section>
        </div>

        {/* Pagination Navigation */}
        <div className="flex justify-between items-center mt-6 md:mt-10 animate-fade-up animation-delay-500">
          <button
            onClick={() => handleDayChange(Math.max(1, parseInt(id) - 1))}
            disabled={parseInt(id) <= 1}
            className={`px-2 sm:px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-lg ${
              parseInt(id) <= 1
                ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                : 'bg-white/10 hover:bg-white/20'
            } transition-all duration-300`}
          >
            Previous
          </button>
          
          <div className="flex gap-1 md:gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <button
                key={day}
                onClick={() => handleDayChange(day)}
                className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg text-xs sm:text-sm md:text-base ${
                  parseInt(id) === day
                    ? 'bg-lime-600/80 font-bold'
                    : 'bg-white/5 hover:bg-white/10'
                } transition-all duration-300`}
              >
                {day}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => handleDayChange(Math.min(7, parseInt(id) + 1))}
            disabled={parseInt(id) >= 7}
            className={`px-2 sm:px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-lg ${
              parseInt(id) >= 7
                ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                : 'bg-white/10 hover:bg-white/20'
            } transition-all duration-300`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;