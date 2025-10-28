import React, { useState, useEffect } from "react";
import { Menu, X, LogIn, Trophy } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../components/assets/logo.png";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Pages where header starts transparent
  const transparentPages = ["/", "/contact"];
  const isTransparentPage = transparentPages.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      if (isTransparentPage) {
        setIsScrolled(window.scrollY > 80);
      } else {
        setIsScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTransparentPage, location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Brides", path: "/biodata" },
    { name: "Contact Us", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  const headerStyle = isTransparentPage
    ? isScrolled
      ? "bg-white shadow-md text-gray-800"
      : "bg-transparent text-white"
    : "bg-white text-gray-800 shadow-md";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${headerStyle}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Royal Delight" className="w-9 h-9" />
          <span className="font-bold text-lg tracking-tight">
            Royal Delight
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-1 transition ${
                isTransparentPage && !isScrolled
                  ? "hover:text-yellow-400"
                  : "hover:text-pink-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side - Trophy + Login */}
        <div className="hidden md:flex items-center gap-5">
          {/* Trophy Icon for Success Story */}
          <Link
            to="/success-stories"
            className="flex items-center justify-center"
          >
            <Trophy
              size={22}
              className={`${
                isTransparentPage && !isScrolled
                  ? "text-white hover:text-yellow-400"
                  : "text-gray-700 hover:text-yellow-500"
              } transition-transform duration-200 hover:scale-110`}
            />
          </Link>

          {/* Login Button */}
          <Link
            to="/login"
            className={`flex items-center gap-1 px-4 py-2 border rounded-full transition ${
              isTransparentPage && !isScrolled
                ? "border-white text-white hover:bg-white hover:text-pink-700"
                : "border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
            }`}
          >
            <LogIn className="w-4 h-4" /> Login
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden focus:outline-none p-1"
        >
          {isMenuOpen ? (
            <X
              className={`w-6 h-6 ${
                isTransparentPage && !isScrolled ? "text-white" : "text-gray-800"
              }`}
            />
          ) : (
            <Menu
              className={`w-6 h-6 ${
                isTransparentPage && !isScrolled ? "text-white" : "text-gray-800"
              }`}
            />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden px-6 py-4 space-y-3 transition ${
            isTransparentPage && !isScrolled
              ? "bg-black/70 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="block w-full py-2"
            >
              {link.name}
            </Link>
          ))}
         
          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full py-2"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
