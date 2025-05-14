import { FiDownload } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center text-white font-[Poppins] [@media(min-width:1500px)]:sticky top-0 z-50">
      <a href="#" className="text-2xl font-semibold text-gray-300 hover:text-lime-400 transition duration-300">
        Yoyodevc
      </a>
      <div className="relative group">
        <a
          href="/JFL Resume.pdf"
          download
          aria-label="Download my CV"
          className="text-white hover:text-lime-400 transition duration-300"
        >
          <FiDownload size={24} />
        </a>
        <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-normal text-center pointer-events-none">
          Download<br />Resume
        </span>
      </div>
    </header>
  );
};

export default Header;