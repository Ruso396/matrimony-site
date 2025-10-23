import React, { useState, useEffect } from "react";
import { Heart, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change (for mobile)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Brides/Grooms", path: "/matches" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? "bg-white shadow-lg" : "bg-teal-700"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 animate-fadeIn hover:scale-105 transition-transform"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <span
              className={`text-xl font-bold ${
                scrollY > 50 ? "text-teal-700" : "text-white"
              }`}
            >
              WedMate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`transition-all duration-300 hover:scale-105 ${
                  scrollY > 50
                    ? location.pathname === item.path
                      ? "text-teal-600 font-semibold"
                      : "text-gray-700 hover:text-teal-600"
                    : location.pathname === item.path
                    ? "text-teal-200 font-semibold"
                    : "text-white hover:text-teal-200"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className={`transition-all duration-300 hover:scale-105 ${
                scrollY > 50
                  ? "text-gray-700 hover:text-teal-600"
                  : "text-white hover:text-teal-200"
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? (
              <X
                className={`w-6 h-6 ${
                  scrollY > 50 ? "text-gray-700" : "text-white"
                }`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 ${
                  scrollY > 50 ? "text-gray-700" : "text-white"
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slideDown">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block text-gray-700 hover:text-teal-600 transition-colors ${
                  location.pathname === item.path ? "font-semibold" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="block text-gray-700 hover:text-teal-600 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
