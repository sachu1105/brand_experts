import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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
import { useAuth } from "../context/AuthContext";
import CategoryDropdown from "./CategoryDropdown";
import { useQuery } from "@tanstack/react-query";
import { getParentCategories } from "../services/categoryApi";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  let dropdownTimeout = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    state: { items },
    dispatch: cartDispatch,
  } = useCart();

  const bannerMessages = [
    "Buy more, save more! Flat 5% off on all products 10,000+",
    "FREE SHIPPING ON ORDERS OVER $85",
    "SPECIAL OFFER: 20% OFF ALL TEMPLATES",
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80); // Adjust this value based on the top banner + secondary nav height
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setIsUserDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setIsUserDropdownOpen(false);
    }, 200); // 200ms delay before closing
  };

  const handleLogout = () => {
    // Clear cart first
    cartDispatch({ type: "CLEAR_ON_LOGOUT" });
    // Then logout
    logout();
    setIsUserDropdownOpen(false);
    toast.success("Successfully logged out!");
    navigate("/");
  };

  // Replace the static categories array with API data
  const { data: parentCategories } = useQuery({
    queryKey: ["parentCategories"],
    queryFn: getParentCategories,
    // Transform the data to match the expected format
    select: (data) => [
      { title: "All products", path: "/products" },
      ...data.map((cat) => ({
        title: cat.name,
        path: `/category/${cat.id}`,
      })),
    ],
  });

  // Use parentCategories || [] as a fallback when data is loading
  const categories = parentCategories || [
    { title: "All products", path: "/products" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full z-50 relative"
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
            <div className="relative group">
              <Link
                to="/warranty"
                className="text-red-600 hover:text-red-700 flex items-center"
              >
                <BadgeCheck className="w-5 h-5 mr-1" />
                Warranty
              </Link>
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

      {/* Sticky Navigation Section */}
      <div
        className={`${
          isScrolled ? "fixed top-0 left-0 right-0 shadow-lg" : ""
        } bg-white z-50 transition-all duration-300`}
      >
        <div className="container mx-auto px-4">
          {/* Main Navigation */}
          <div className="flex items-center justify-between py-4">
            {/* Logo Section */}
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

              {/* Cart with badge */}
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>

              {/* User Menu - Fixed Version */}
              <div
                className="relative hidden md:block"
                ref={userDropdownRef}
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="flex items-center space-x-2 cursor-pointer p-2 hover:text-red-600">
                  <User className="w-6 h-6" />
                  {user ? (
                    <span className="text-sm font-medium">{user.name}</span>
                  ) : null}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isUserDropdownOpen && (
                  <div
                    className="absolute right-0 top-[calc(100%-8px)] w-48 pt-4"
                    style={{ zIndex: 1000 }}
                  >
                    <div className="bg-white rounded-lg shadow-lg py-1 border border-gray-100">
                      {user ? (
                        <>
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>
                          <Link
                            to="/profile"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                          >
                            My Profile
                          </Link>
                          <Link
                            to="/orders"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                          >
                            My Orders
                          </Link>
                          <Link
                            to="/shared-orders"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                          >
                            Shared Orders
                          </Link>
                          <Link
                            to="/my-designs"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                          >
                            My Designs
                          </Link>
                          <Link
                            to="/address-book"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                          >
                            Address Book
                          </Link>
                          <Link
                            to="/payment-methods"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                          >
                            Payment Methods
                          </Link>
                          <Link
                            to="/email-notifications"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                          >
                            Email Notifications
                          </Link>
                          <Link
                            to="/profile-password"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                          >
                            Profile & Password
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                          >
                            Login
                          </Link>
                          <Link
                            to="/register"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                          >
                            Register
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
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
          <div className="hidden md:flex space-x-6 py-4">
            <div className="relative group">
              <button className="flex items-center ml-2 space-x-6 font-semibold text-gray-700 text-sm hover:text-red-600 whitespace-nowrap cursor-pointer">
                All products
                <ChevronDown className="ml-1 w-4 h-4 transform transition-transform group-hover:rotate-180" />
              </button>

              {/* First level dropdown */}
              <div className="hidden group-hover:block absolute top-full left-0 pt-2 z-50">
                <div className="w-64 bg-white shadow-lg rounded-lg py-2">
                  {categories.slice(1).map((category) => (
                    <div key={category.title} className="relative group/item">
                      <Link
                        to={category.path}
                        className="flex items-center justify-between px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-50 w-full"
                      >
                        {category.title}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                      {/* Second level dropdown will only show when hovering over the parent item */}
                      <div className="invisible group-hover/item:visible absolute left-full top-0">
                        <CategoryDropdown category={category} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block relative flex-1">
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
                to="/login"
                className="block py-2 text-gray-700 hover:text-red-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <a
                href="/register"
                className="block py-2 text-gray-700 hover:text-red-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
