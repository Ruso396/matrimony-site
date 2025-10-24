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
    { name: "Brides/Grooms", path: "/matches" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50">
      <style>{`
        @keyframes slideDown { 0%{ opacity:0; transform: translateY(-8px);} 100%{ opacity:1; transform:none;} }
        .animate-slideDown { animation: slideDown .25s ease-out both }
      `}</style>
      <div className="hidden md:block bg-[linear-gradient(90deg,rgba(92,115,255,1),rgba(127,148,255,1))] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2"><ClockIcon /> Monday - Friday, 8:00am - 5:00 pm</span>
            <span className="inline-flex items-center gap-2"><Mail className="w-4 h-4" /> Matrimony@support.com</span>
            <span className="inline-flex items-center gap-2"><Phone className="w-4 h-4" /> +8801842535364</span>
          </div>
          <div className="flex items-center gap-4" />
        </div>
      </div>

  {/* Always show the scrolled/sticky header style */}
  <div className={`transition-all duration-300 bg-white/90 backdrop-blur-md shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 xs:py-4">
            <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow">
                <Heart className="w-5 h-5 text-brand-600" fill="currentColor" />
              </div>
              <span className="text-lg xs:text-xl font-bold text-brand-700">Matrimony</span>
            </Link>

            <div className="hidden md:flex items-center gap-2 bg-white/95 rounded-full px-3 py-1.5 ring-1 ring-slate-200 shadow-sm">
              <Search className="w-4 h-4 text-slate-500" />
              <input className="outline-none text-sm bg-transparent placeholder-slate-400 w-52 lg:w-64" placeholder="Search profiles" />
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((item) => (
                <Link key={item.name} to={item.path} className={`text-slate-700 hover:text-brand-600 transition-colors ${location.pathname === item.path ? 'font-semibold' : ''}`}>{item.name}</Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className={`text-brand-700 hover:text-brand-600 transition-colors`}><LogIn className="w-6 h-6" /></Link>
              <Link to="/register" className="rounded-full px-5 py-2 bg-gradient-to-r from-brand-600 to-accent-500 text-white font-semibold hover:shadow-glow transition-all">Get Premium</Link>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? (<X className={`text-slate-700 w-6 h-6`} />) : (<Menu className={`text-slate-700 w-6 h-6`} />)}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slideDown">
          <div className="px-4 py-6 space-y-4">
            <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 ring-1 ring-slate-200">
              <Search className="w-4 h-4 text-slate-500" />
              <input className="outline-none text-sm bg-transparent placeholder-slate-400 w-full" placeholder="Search profiles" />
            </div>
            {navLinks.map((item) => (
              <Link key={item.name} to={item.path} className={`block text-gray-700 hover:text-brand-600 transition-colors ${location.pathname === item.path ? 'font-semibold' : ''}`}>{item.name}</Link>
            ))}
            <div className="flex items-center justify-between">
              <Link to="/login" className="text-brand-700 hover:text-brand-600 transition-colors"><LogIn className="w-5 h-5" /></Link>
              <Link to="/register" className="rounded-full px-5 py-2 bg-gradient-to-r from-brand-600 to-accent-500 text-white font-semibold hover:shadow-glow transition-all">Get Premium</Link>
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
