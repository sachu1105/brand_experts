import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, ChevronDown, Tag, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/images/br_logo.png";

const Navbar = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const bannerMessages = [
    "FREE SHIPPING ON ORDERS OVER $85",
    "SPECIAL OFFER: 20% OFF ALL TEMPLATES",
  ];

  const bannerSubtext =
    'Eligible for ground shipping within the contiguous US. Excludes products over 36" and freight shipping.';

  const menuItems = [
    { title: "All Products", path: "/all-products", hasDropdown: true },
    { title: "Rigid Signs", path: "/rigid-signs" },
    { title: "Banners & Displays", path: "/banners-displays" },
    { title: "Decals & Magnets", path: "/decals-magnets" },
    { title: "Trade Shows & Events", path: "/trade-shows" },
    { title: "Office Signs", path: "/office-signs" },
    { title: "Outdoor Signs", path: "/outdoor-signs" },
    { title: "Photo & Decor", path: "/photo-decor" },
    { title: "Wedding & Parties", path: "/wedding-parties" },
  ];

  return (
    <div className="w-full">
      {/* Top Banner */}
      <div className="relative w-full bg-gradient-to-r from-red-500 to-pink-500 text-white">
        <div className="flex justify-center items-center py-2 px-4">
          <button
            className="absolute left-4"
            onClick={() =>
              setCurrentBanner((prev) =>
                prev > 0 ? prev - 1 : bannerMessages.length - 1
              )
            }
          >
            <ChevronDown className="h-5 w-5 transform rotate-90" />
          </button>

          <div className="text-center">
            <div className="font-bold text-sm">
              {bannerMessages[currentBanner]}
            </div>
            <div className="text-xs mt-0.5 px-8 md:px-0">{bannerSubtext}</div>
          </div>

          <button
            className="absolute right-4"
            onClick={() =>
              setCurrentBanner((prev) => (prev + 1) % bannerMessages.length)
            }
          >
            <ChevronDown className="h-5 w-5 transform -rotate-90" />
          </button>
        </div>
      </div>

      {/* Special Offers Navigation - Hidden on mobile, shown in menu */}
      <div className="hidden md:flex justify-end space-x-6 px-6 py-2 text-sm bg-gray-100">
        <Tag className="mr-2 h-5 w-5 text-red-500" />
        <Link to="/special-deals" className="text-red-600 hover:text-red-700">
          Special deals
        </Link>
        <Link to="/products" className="text-gray-700 hover:text-gray-900">
          Products
        </Link>
        <Link to="/templates" className="text-blue-600 hover:text-blue-700">
          Templates
        </Link>
        <Link to="/corporate-offers" className="text-gray-700 hover:text-gray-900">
          Corporate Offers
        </Link>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white">
        <div className="max-w-screen-2xl mx-auto">
          {/* Upper Navbar */}
          <div className="flex items-center justify-between px-4 py-2 md:px-6 md:py-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <div className="w-32 h-16 md:w-40 md:h-20">
                <img
                  src={logo}
                  alt="Brand Experts Logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            </Link>

            {/* Mobile Search Toggle */}
            <button
              className="md:hidden"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            >
              <Search className="h-6 w-6 text-gray-700" />
            </button>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-grow max-w-2xl mx-12">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products or templates"
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Right Section - Hidden on Mobile */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="px-4 py-2 border border-red-500 text-red-600 rounded-full hover:bg-red-600 hover:text-white">
                Design Tool
              </button>

              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>

              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-1"
                >
                  <User className="h-6 w-6 text-gray-700" />
                  <span className="text-sm">My Account</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/signin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign in
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchVisible && (
            <div className="p-4 border-t md:hidden">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products or templates"
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t">
              {/* Mobile Special Offers */}
              <div className="bg-gray-50 p-4 space-y-2">
                <Link to="/special-deals" className="flex items-center text-red-600 py-2">
                  <Tag className="mr-2 h-5 w-5" />
                  Special deals
                </Link>
                <Link to="/products" className="block py-2 text-gray-700">Products</Link>
                <Link to="/templates" className="block py-2 text-blue-600">Templates</Link>
                <Link to="/corporate-offers" className="block py-2 text-gray-700">Corporate Offers</Link>
              </div>

              {/* Mobile Navigation Links */}
              <div className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center justify-between py-2 text-gray-700 hover:text-red-600"
                  >
                    {item.title}
                    {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="border-t p-4 space-y-4">
                <button className="w-full px-4 py-2 border border-red-500 text-red-600 rounded-full hover:bg-red-600 hover:text-white">
                  Design Tool
                </button>
                <Link to="/cart" className="flex items-center justify-between py-2 text-gray-700">
                  Cart
                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </Link>
                <div className="space-y-2">
                  <Link to="/signin" className="block py-2 text-gray-700">Sign In</Link>
                  <Link to="/signup" className="block py-2 text-gray-700">Sign Up</Link>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Lower Navbar - Hidden on Mobile */}
          <div className="hidden md:flex items-center space-x-8 px-6 py-2 overflow-x-auto whitespace-nowrap border-b border-gray-100">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="font-semibold hover:text-red-600 flex items-center space-x-1"
              >
                <span>{item.title}</span>
                {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;