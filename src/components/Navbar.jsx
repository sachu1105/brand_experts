import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Search, ShoppingCart, User, ChevronDown, Tag, Menu, X } from "lucide-react";
import logo from "../assets/images/br_logo.png";


const Navbar = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [currentBanner, setCurrentBanner] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const userDropdownRef = useRef(null)

  const bannerMessages = ["FREE SHIPPING ON ORDERS OVER $85", "SPECIAL OFFER: 20% OFF ALL TEMPLATES"]

  const bannerSubtext =
    'Eligible for ground shipping within the contiguous US. Excludes products over 36" and freight shipping.'

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
  ]

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="w-full">
      {/* Top Banner */}
      <div className="relative w-full bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="flex justify-center items-center py-2 px-4">
          <button
            className="absolute left-4 hover:bg-white/10 p-1 rounded-full transition-colors cursor-pointer"
            onClick={() => setCurrentBanner((prev) => (prev > 0 ? prev - 1 : bannerMessages.length - 1))}
            aria-label="Previous announcement"
          >
            <ChevronDown className="h-5 w-5 transform rotate-90" />
          </button>

          <div className="text-center">
            <div className="font-bold text-sm">{bannerMessages[currentBanner]}</div>
            <div className="text-xs mt-0.5 px-8 md:px-0">{bannerSubtext}</div>
          </div>

          <button
            className="absolute right-4 hover:bg-white/10 p-1 rounded-full transition-colors cursor-pointer"
            onClick={() => setCurrentBanner((prev) => (prev + 1) % bannerMessages.length)}
            aria-label="Next announcement"
          >
            <ChevronDown className="h-5 w-5 transform -rotate-90" />
          </button>
        </div>
      </div>

      {/* Special Offers Navigation */}
      <div className="hidden md:flex justify-end space-x-6 px-6 py-2 text-sm bg-gray-50">
        <div className="flex items-center">
          <Tag className="mr-2 h-5 w-5 text-red-500" />
          <Link to="/special-deals" className="text-red-600 hover:text-red-700">
            Special deals
          </Link>
        </div>
        <Link to="/products" className="text-gray-700 hover:text-gray-900">
          Products
        </Link>
        <Link to="/templates" className="text-gray-600 hover:text-gray-900">
          Templates
        </Link>
        <Link to="/corporate-offers" className="text-gray-700 hover:text-gray-900">
          Corporate Offers
        </Link>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-300 shadow-sm">
        <div className="max-w-screen-2xl mx-auto">
          {/* Upper Navbar */}
          <div className="flex items-center justify-between px-4 py-2 md:px-8 md:py-2">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={logo}
                alt="Brand Experts Logo"
                className="w-32 h-16 md:w-40 md:h-20 object-contain"
                loading="lazy"
              />
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-grow max-w-2xl mx-12">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products or templates"
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ease-in-out hover:shadow-md"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Mobile Search Toggle */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              aria-label="Toggle search"
            >
              <Search className="h-6 w-6 text-gray-700" />
            </button>

            {/* Right Section - Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="px-4 py-2 border border-red-500 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out hover:shadow-md font-medium cursor-pointer">
                Design Tool
              </button>

              <Link to="/cart" className="relative group">
                <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-gray-900" />
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>

              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-1 group cursor-pointer"
                >
                  <User className="h-6 w-6 text-gray-700 group-hover:text-gray-900" />
                  <span className="text-sm group-hover:text-gray-900">My Account</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/signin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
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
                <Link to="/special-deals" className="flex items-center text-red-600 py-2 hover:text-red-700">
                  <Tag className="mr-2 h-5 w-5" />
                  Special deals
                </Link>
                <Link to="/products" className="block py-2 text-gray-700 hover:text-gray-900">
                  Products
                </Link>
                <Link to="/templates" className="block py-2 text-blue-600 hover:text-blue-700">
                  Templates
                </Link>
                <Link to="/corporate-offers" className="block py-2 text-gray-700 hover:text-gray-900">
                  Corporate Offers
                </Link>
              </div>

              {/* Mobile Navigation Links */}
              <div className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center justify-between py-2 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    {item.title}
                    {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="border-t p-4 space-y-4">
                <button className="w-full px-4 py-2 border border-red-500 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors">
                  Design Tool
                </button>
                <Link to="/cart" className="flex items-center justify-between py-2 text-gray-700 hover:text-gray-900">
                  Cart
                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </Link>
                <div className="space-y-2">
                  <Link to="/signin" className="block py-2 text-gray-700 hover:text-gray-900">
                    Sign In
                  </Link>
                  <Link to="/signup" className="block py-2 text-gray-700 hover:text-gray-900">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Lower Navbar */}
          <div className="hidden md:flex items-center justify-between px-6 py-3 overflow-x-auto whitespace-nowrap bg-gray-50">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="font-medium text-gray-700 hover:text-red-600 transition-all duration-300 ease-in-out flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-white"
              >
                <span>{item.title}</span>
                {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

