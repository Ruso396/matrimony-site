import React, { useState, useEffect } from "react";
import {
  Heart,
  Menu,
  X,
  Mail,
  Phone,
  Globe2,
  Search,
  LogIn,
} from "lucide-react";
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Brides/Grooms", path: "/biodata" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Top info bar */}
      <div className="hidden md:block bg-amber-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <ClockIcon /> Monday - Friday, 8:00am - 5:00 pm
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail className="w-4 h-4" /> Matrimony@support.com
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> +8801842535364
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Only Language button (Light/Dark removed) */}
           
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div
        className={`transition-all duration-300 ${
          scrollY > 50 ? "bg-white shadow-md" : "bg-amber-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 hover:scale-105 transition-transform"
            >
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                <Heart
                  className={`w-5 h-5 ${
                    scrollY > 50 ? "text-amber-700" : "text-amber-600"
                  }`}
                  fill="currentColor"
                />
              </div>
              <span
                className={`text-xl font-bold ${
                  scrollY > 50 ? "text-amber-700" : "text-white"
                }`}
              >
                Matrimony
              </span>
            </Link>

            {/* Search (desktop only) */}
            <div className="hidden md:flex items-center gap-2 bg-white/95 rounded-full px-3 py-1.5 ring-1 ring-slate-200 shadow-sm">
              <Search className="w-4 h-4 text-slate-500" />
              <input
                className="outline-none text-sm bg-transparent placeholder-slate-400 w-64"
                placeholder="Search profiles"
              />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${
                    scrollY > 50
                      ? "text-slate-700 hover:text-amber-600"
                      : "text-white hover:text-amber-200"
                  } transition-colors ${
                    location.pathname === item.path ? "font-semibold" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side — Login icon + Get Premium button */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className={`${
                  scrollY > 50 ? "text-amber-700" : "text-white"
                } hover:text-amber-600 transition-colors`}
              >
                <LogIn className="w-6 h-6" />
              </Link>

              <Link
                to="/register"
                className="rounded-full px-5 py-2 bg-amber-700 text-white font-semibold hover:bg-amber-800 transition-colors"
              >
                Get Premium
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? (
                <X
                  className={`${
                    scrollY > 50 ? "text-slate-700" : "text-white"
                  } w-6 h-6`}
                />
              ) : (
                <Menu
                  className={`${
                    scrollY > 50 ? "text-slate-700" : "text-white"
                  } w-6 h-6`}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slideDown">
          <div className="px-4 py-6 space-y-4">
            <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 ring-1 ring-slate-200">
              <Search className="w-4 h-4 text-slate-500" />
              <input
                className="outline-none text-sm bg-transparent placeholder-slate-400 w-full"
                placeholder="Search profiles"
              />
            </div>
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block text-gray-700 hover:text-amber-600 transition-colors ${
                  location.pathname === item.path ? "font-semibold" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center justify-between">
              <Link
                to="/login"
                className="text-amber-700 hover:text-amber-600 transition-colors"
              >
                <LogIn className="w-5 h-5" />
              </Link>
              <Link
                to="/register"
                className="rounded-full px-5 py-2 bg-amber-700 text-white font-semibold hover:bg-amber-800 transition-colors"
              >
                Get Premium
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );

  function ClockIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
};

export default Header;
