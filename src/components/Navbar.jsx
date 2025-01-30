import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/images/br_logo.png';
import { motion } from "framer-motion"


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
       <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
      <nav className="bg-white shadow-lg">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} alt="Brand Experts Logo" className="h-8" loading="lazy" />
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                Brand Experts
              </span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation Links, Search, and Icons - Responsive Container */}
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } w-full lg:flex lg:w-auto lg:items-center`}
          >
            {/* Navigation Links */}
            <ul className="flex flex-col lg:flex-row lg:space-x-6 mt-4 lg:mt-0">
            <li className="text-gray-800 font-semibold hover:text-red-600 hover:underline cursor-pointer">
                  <Link to="/">Home</Link>
                </li>
              <li className="text-gray-800 font-semibold hover:text-red-600 hover:underline cursor-pointer">
                All Products
              </li>
              <li className="text-gray-800 font-semibold hover:text-red-600 hover:underline cursor-pointer">
                  <Link to="/templates">Templates</Link>
                </li>
              <li className="text-gray-800 font-semibold hover:text-red-600 hover:underline cursor-pointer">
                Corporate Offer
              </li>
            </ul>

            {/* Add space between Navigation Links and Search Bar */}
            <div className="lg:ml-12 lg:flex lg:items-center">
              {/* Search Bar */}
              <div className="relative w-full lg:w-64 mt-4 lg:mt-0">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>

              {/* Add space between Search Bar and Action Buttons */}
              <div className="flex items-center space-x-6 mt-4 lg:mt-0 lg:ml-8">
                <button className="border border-red-700 px-4 py-2 rounded-md text-red-700 hover:bg-red-700 hover:text-white">
                  Dashboard
                </button>
                <ShoppingCart className="h-6 w-6 text-gray-900 cursor-pointer hover:text-gray-700" />
                <User className="h-6 w-6 text-gray-900 cursor-pointer hover:text-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </motion.div>
    </div>
  );
};

export default Navbar;
