import { FiDownload } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center text-white font-[Poppins] md:sticky top-0 z-50">
      <a href="#" className="text-2xl font-semibold text-gray-300 hover:text-lime-400 transition duration-300">Yoyodevc</a>
      <a href="/cv.pdf" download aria-label="Download my CV" className="text-white hover:text-lime-400 transition duration-300"><FiDownload size={24} /></a>
    </header>
  );
};

export default Header;
