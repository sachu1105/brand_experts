import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Search, ShoppingCart, User, ChevronDown, Menu, X, Tag, ChevronRight } from "lucide-react"
import logo from "../assets/images/br_logo.png"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [currentBanner, setCurrentBanner] = useState(0)
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProductsDropdownHovered, setIsProductsDropdownHovered] = useState(false)
  const userDropdownRef = useRef(null)
  const productsDropdownRef = useRef(null)

  const bannerMessages = [
    "Buy more, save more! Flat 5% off on all products 10,000+",
    "FREE SHIPPING ON ORDERS OVER $85",
    "SPECIAL OFFER: 20% OFF ALL TEMPLATES",
  ]
  // Auto rotate banner messages
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerMessages.length)
    }, 5000) // Change message every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const menuCategories = [
    {
      title: "Rigid signs",
      items: [
        "Rigid signs offer unmatched durability and a professional finish, making them a cost-effective solution for branding, advertising, and decoration.",
      ],
    },
    { title: "Banners & Displays", path: "/banners-displays" },
    { title: "Decals & magnets", path: "/decals-magnets" },
    { title: "Trade shows & events", path: "/trade-shows" },
    { title: "Office signs", path: "/office-signs" },
    { title: "Outdoor signs", path: "/outdoor-signs" },
    { title: "Photo & decor", path: "/photo-decor" },
    { title: "Wedding & parties", path: "/wedding-parties" },
  ]


  const menuItems = [
    { title: "Home", path: "/" },
    { title: "All products", hasDropdown: true },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false)
      }
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target)) {
        setIsProductsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const ProductsDropdown = () => (
    <div
      className="absolute left-0 w-64 bg-white shadow-lg z-50 border border-gray-200 rounded-lg mt-1"
      ref={productsDropdownRef}
    >
      <div className="py-2">
        {menuCategories.map((category) => (
          <Link
            key={category.title}
            to={category.path || "#"}
            className="flex items-center justify-between px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-gray-50"
          >
            {category.title}
            <ChevronRight className="h-4 w-4" />
          </Link>
        ))}
      </div>
    </div>
  )

  const MobileMenu = () => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden fixed inset-x-0 top-[144px] bg-white border-b border-gray-200 shadow-lg overflow-y-auto max-h-[calc(100vh-144px)]"
    >
      <div className="p-4">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Important Links Section */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-2 text-red-600">
            <Tag size={16} className="mr-2" />
            <Link to="/special-deals" className="font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Special deals
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/products"
              className="text-gray-700 hover:text-red-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/templates"
              className="text-gray-700 hover:text-red-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Templates
            </Link>
            <Link
              to="/corporate-offers"
              className="text-gray-700 hover:text-red-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Corporate Offers
            </Link>
          </div>
        </div>

        {/* Main Menu Items */}
        <div className="space-y-4">
          {menuItems.map((item) => (
            <div key={item.path}>
              <Link
                to={item.path}
                className="block py-2 text-gray-700 hover:text-red-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            </div>
          ))}
        </div>

        {/* Auth Section */}
        <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
          <Link
            to="/signin"
            className="block py-2 text-gray-700 hover:text-red-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="block py-2 text-gray-700 hover:text-red-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </motion.div>
  )

  const TopBanner = () => (
    <div className="relative w-full bg-gradient-to-r from-red-600 to-pink-600 text-white overflow-hidden">
      <div className="flex justify-center items-center py-2 px-4">
        <button
          className="hidden sm:block absolute left-4 hover:bg-white/10 p-1 rounded-full transition-colors"
          onClick={() => setCurrentBanner((prev) => (prev > 0 ? prev - 1 : bannerMessages.length - 1))}
        >
          <ChevronDown className="h-5 w-5 transform rotate-90" />
        </button>
        
        <div className="text-sm font-medium truncate">{bannerMessages[currentBanner]}</div>
      
        <button
          className="hidden sm:block absolute right-4 hover:bg-white/10 p-1 rounded-full transition-colors"
          onClick={() => setCurrentBanner((prev) => (prev + 1) % bannerMessages.length)}
        >
          <ChevronDown className="h-5 w-5 transform -rotate-90" />
        </button>
      </div>
    </div>
  )

  const DesktopControls = () => (
    <div className="hidden md:flex items-center space-x-6">
      <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-100 hover:border-red-500 transition-all duration-200 cursor-pointer hover:shadow-md">
        Design tool
      </button>

      <Link to="/cart" className="relative hover:text-red-600 transition-colors duration-200">
        <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-red-600" />
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          0
        </span>
      </Link>

      <div className="relative" ref={userDropdownRef}>
        <button
          onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          className="flex items-center space-x-2 hover:text-red-600 transition-colors duration-200"
        >
          <User className="h-6 w-6 text-gray-700" />
          <ChevronDown className="h-4 w-4 text-gray-700" />
        </button>

        <AnimatePresence>
          {isUserDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100"
            >
              <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">
                My Profile
              </Link>
              <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">
                My Orders
              </Link>
              <div className="border-t border-gray-100 my-1"></div>
              <Link to="/signin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">
                Sign In
              </Link>
              <Link to="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600">
                Sign Up
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )

  const MobileControls = () => (
    <div className="md:hidden flex items-center space-x-4">
      <Link to="/cart" className="relative">
        <ShoppingCart className="h-6 w-6 text-gray-700" />
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          0
        </span>
      </Link>

      <button className="text-sm px-3 py-1 border border-red-300 text-red-600 rounded-lg">Design</button>

      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 hover:text-red-600">
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
        <TopBanner />

        {/* Top Navigation */}
        <div className="hidden sm:flex justify-end space-x-6 px-6 py-2 text-sm bg-gray-100">
          <Tag size={16} className="mr-1 text-red-600" />
          <Link to="/special-deals" className="text-red-600 hover:text-red-700">
            Special deals
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-gray-900">
            Products
          </Link>
          <Link to="/templates" className="text-gray-700 hover:text-gray-900">
            Templates
          </Link>
          <Link to="/corporate-offers" className="text-gray-700 hover:text-gray-900">
            Corporate Offers
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="border-b border-gray-200">
          <div className="max-w-screen-2xl mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0">
                <img src={logo || "/placeholder.svg"} alt="Brand Logo" className="h-6 sm:h-8" />
              </Link>

              {/* Menu Items - Desktop */}
              <div className="hidden md:flex items-center space-x-8">
                {menuItems.map((item) => (
                  <div key={item.path} className="relative">
                    <button
                      onClick={() => {
                        if (item.hasDropdown) {
                          setIsProductsDropdownOpen(!isProductsDropdownOpen)
                        }
                      }}
                      className={`text-gray-700 hover:text-red-600 flex items-center transition-colors duration-200`}
                    >
                      {item.title}
                      {item.hasDropdown && (
                        <ChevronDown
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                            isProductsDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                    {item.hasDropdown && isProductsDropdownOpen && <ProductsDropdown />}
                  </div>
                ))}
              </div>

              {/* Search Bar - Desktop */}
              <div className="hidden lg:flex flex-1 max-w-xl px-8">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search for products or templates"
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  />
                  <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              {/* Desktop Controls */}
              <DesktopControls />

              {/* Mobile Controls */}
              <MobileControls />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>{isMobileMenuOpen && <MobileMenu />}</AnimatePresence>
      </nav>
    </motion.div>
  )
}

export default Navbar

