import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/images/br_logo.png";

const Navbar = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWarrantyDropdownOpen, setIsWarrantyDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const warrantyDropdownRef = useRef(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const bannerMessages = [
    "Buy more, save more! Flat 5% off on all products 10,000+",
    "FREE SHIPPING ON ORDERS OVER $85",
    "SPECIAL OFFER: 20% OFF ALL TEMPLATES",
  ];

  const categories = [
    { title: "All products", path: "/products" },
    { title: "Rigid signs", path: "/rigid-signs" },
    { title: "Banners & displays", path: "/banners-displays" },
    { title: "Decals & magnets", path: "/decals-magnets" },
    { title: "Trade shows & events", path: "/trade-shows" },
    { title: "Office signs", path: "/office-signs" },
    { title: "Outdoor signs", path: "/outdoor-signs" },
    { title: "Photo & decor", path: "/photo-decor" },
    { title: "Wedding & parties", path: "/wedding-parties" },
  ];

  const requiredOptions = [
    { title: "Warranty", path: "/special-deals" },
    { title: "Products", path: "/products" },
    { title: "Templates", path: "/templates" },
    { title: "Corporate Offers", path: "/corporate-offers" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerMessages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        warrantyDropdownRef.current &&
        !warrantyDropdownRef.current.contains(event.target)
      ) {
        setIsWarrantyDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const scrollContainer = document.querySelector(".hide-scrollbar");
    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener("mousedown", (e) => {
      isDown = true;
      scrollContainer.classList.add("active");
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener("mouseleave", () => {
      isDown = false;
      scrollContainer.classList.remove("active");
    });

    scrollContainer.addEventListener("mouseup", () => {
      isDown = false;
      scrollContainer.classList.remove("active");
    });

    scrollContainer.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainer.scrollLeft = scrollLeft - walk;
    });
  }, []);

  // Handle warranty dropdown hover
  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsWarrantyDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const newTimeoutId = setTimeout(() => {
      setIsWarrantyDropdownOpen(false);
    }, 300); // 300ms delay before closing
    setTimeoutId(newTimeoutId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full z-50 "
    >
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <button
              className="text-white p-2"
              onClick={() =>
                setCurrentBanner(
                  (prev) =>
                    (prev - 1 + bannerMessages.length) % bannerMessages.length
                )
              }
            >
              <ChevronDown className="w-5 h-5 transform rotate-90" />
            </button>
            <p className="text-sm font-medium text-center flex-1">
              {bannerMessages[currentBanner]}
            </p>
            <button
              className="text-white p-2"
              onClick={() =>
                setCurrentBanner((prev) => (prev + 1) % bannerMessages.length)
              }
            >
              <ChevronDown className="w-5 h-5 transform -rotate-90" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-gray-50 hidden sm:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-end space-x-6 py-2 text-sm">
            <div
              className="relative group"
              ref={warrantyDropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to=""
                className="text-red-600 hover:text-red-700 flex items-center"
              >
                <BadgeCheck className="w-5 h-5 mr-1" />
                Warranty
                <ChevronDown className="w-4 h-4 ml-1" />
              </Link>
              <AnimatePresence>
                {isWarrantyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to="/create-warranty"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Create Warranty
                    </Link>
                    <Link
                      to="/register-warranty"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Register Warranty
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link to="/products" className="text-gray-600 hover:text-gray-900">
              Products
            </Link>
            <Link to="/templates" className="text-gray-600 hover:text-gray-900">
              Templates
            </Link>
            <Link
              to="/corporate-offers"
              className="text-gray-600 hover:text-gray-900"
            >
              Corporate Offers
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={logo || "/placeholder.svg"}
                alt="Logo"
                className="h-12 "
              />
            </Link>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-xl px-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products or templates"
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-6">
              <button className="hidden md:block px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 cursor-pointer">
                Design tool
              </button>

              {/* Cart */}
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* User Menu */}
              <div className="relative hidden md:block" ref={userDropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-1 cursor-pointer"
                >
                  <User className="w-6 h-6 text-gray-700 " />
                  <ChevronDown className="w-4 h-4 text-gray-700" />
                </button>

                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        My Orders
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <Link
                        to="/signin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Sign In
                      </Link>
                      <a
                        href="https://api.brandexperts.ae/admin_dash/admin_function/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Sign Up
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="hidden md:flex space-x-6 py-4 ">
            <div className="relative group">
              <button className="flex items-center ml-2 space-x-6 font-semibold text-gray-700 text-sm hover:text-red-600 whitespace-nowrap cursor-pointer">
                All products
                <ChevronDown className="ml-1 w-4 h-4 transform transition-transform group-hover:rotate-180" />
              </button>

              {/* Added padding-top to create hover gap */}
              <div className="hidden group-hover:block absolute top-full left-0 pt-2">
                {/* Actual dropdown content */}
                <div className="w-64 bg-white shadow-lg rounded-lg py-2 z-50">
                  {categories.slice(1).map((category) => (
                    <Link
                      key={category.title}
                      to={category.path}
                      className="flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-red-600"
                    >
                      {category.title}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block relative flex-1 ">
              <div className="flex-1 overflow-x-auto hide-scrollbar md:overflow-x-auto px-4">
                <div className="flex space-x-8 min-w-max pb-2">
                  {categories.slice(1).map((category) => (
                    <Link
                      key={category.title}
                      to={category.path}
                      className="text-gray-600 hover:text-red-600 text-sm font-medium"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="container mx-auto px-4 py-2">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              {requiredOptions.map((option) => (
                <Link
                  key={option.title}
                  to={option.path}
                  className="block py-2 text-gray-700 hover:text-red-600 z-10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {option.title}
                </Link>
              ))}
              <div className="border-t border-gray-100 my-4"></div>
              <div className="block py-2 text-gray-700 font-semibold">
                All products
              </div>
              {categories.slice(1).map((category) => (
                <Link
                  key={category.title}
                  to={category.path}
                  className="block py-2 pl-4 text-gray-700 hover:text-red-600 z-10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.title}
                </Link>
              ))}
              <div className="border-t border-gray-100 my-4"></div>
              <Link
                to="/signin"
                className="block py-2 text-gray-700 hover:text-red-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <a
                href="https://api.brandexperts.ae/admin_dash/admin_function/"
                className="block py-2 text-gray-700 hover:text-red-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
