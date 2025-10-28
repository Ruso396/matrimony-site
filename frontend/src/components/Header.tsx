import React, { useState, useEffect } from "react";
import { Menu, X, LogIn, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../components/assets/logo.png";
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, setUserName } = useAuth();

  // 👇 Scroll behavior
  const transparentPages = ["/", "/contact"];
  const isTransparentPage = transparentPages.includes(location.pathname);

  useEffect(() => {
    setIsScrolled(false);
    const handleScroll = () => {
      if (isTransparentPage) setIsScrolled(window.scrollY > 80);
      else setIsScrolled(true);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTransparentPage, location.pathname]);

  // 👇 Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUserName(null);
    setShowDropdown(false);
    // Dispatch event for logout
    window.dispatchEvent(new Event('userLoginChange'));
    navigate("/login");
  };

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
              key={link.name}
              to={link.path}
              className={`transition ${
                isTransparentPage && !isScrolled
                  ? "hover:text-yellow-400"
                  : "hover:text-pink-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side - Login/User */}
        <div className="hidden md:flex items-center gap-4 relative">
          {userName ? (
           <div className="relative">
  <button
    onClick={() => setShowDropdown(!showDropdown)}
    onMouseEnter={() => setShowDropdown(true)}
    className="flex items-center gap-2 px-4 py-2 border rounded-full text-pink-600 border-pink-600 bg-pink-50 cursor-pointer hover:bg-pink-100 transition"
  >
    <span className="font-semibold">{userName}</span>
  </button>

  {showDropdown && (
    <div
      className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg py-2 z-50"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <Link
        to="/profile"
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-pink-50 transition"
        onClick={() => setShowDropdown(false)}
      >
        <User className="w-4 h-4 text-pink-600" /> Profile
      </Link>
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-pink-50 transition text-left"
      >
        <LogOut className="w-4 h-4 text-pink-600" /> Logout
      </button>
    </div>
  )}
</div>

          ) : (
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
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden focus:outline-none p-1"
        >
          {isMenuOpen ? (
            <X
              className={`w-6 h-6 ${
                isTransparentPage && !isScrolled
                  ? "text-white"
                  : "text-gray-800"
              }`}
            />
          ) : (
            <Menu
              className={`w-6 h-6 ${
                isTransparentPage && !isScrolled
                  ? "text-white"
                  : "text-gray-800"
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
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="block w-full py-2"
            >
              {link.name}
            </Link>
          ))}

          {userName ? (
            <>
              <div className="pt-2 text-center font-semibold text-pink-600">
                Hi, {userName.split(" ")[0]}
              </div>
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full py-2 text-center border border-pink-600 rounded-full text-pink-600 hover:bg-pink-600 hover:text-white transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full py-2 text-center border border-pink-600 rounded-full text-pink-600 hover:bg-pink-600 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full py-2 text-center border border-pink-600 text-pink-600 rounded-full hover:bg-pink-600 hover:text-white transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
