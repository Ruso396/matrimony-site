import React, { useState, useEffect } from "react";
import { Menu, X, LogIn, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../components/assets/logo.png";
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // logical open/close request
  const [menuVisible, setMenuVisible] = useState(false); // actually mounted panel
  const [menuAnim, setMenuAnim] = useState<"in" | "out">("in"); // which animation to play
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, setUserName } = useAuth();

  // Pages that use transparent header initially
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

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUserName(null);
    setShowDropdown(false);
    window.dispatchEvent(new Event("userLoginChange"));
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

  // Animation length must match CSS animation-duration
  const ANIM_MS = 300;

  // Toggle menu: when opening, mount panel then animate in.
  // When closing, animate out then unmount after timeout.
  const toggleMenu = () => {
    if (!isMenuOpen) {
      setMenuVisible(true);
      setMenuAnim("in");
      setIsMenuOpen(true);
    } else {
      // start slide-out to right
      setMenuAnim("out");
      setIsMenuOpen(false);
      // after animation, unmount
      setTimeout(() => {
        setMenuVisible(false);
      }, ANIM_MS);
    }
  };

  // Close panel with animation (used for nav click too)
  const closeMenuWithAnimation = () => {
    if (!isMenuOpen) return;
    setMenuAnim("out");
    setIsMenuOpen(false);
    setTimeout(() => {
      setMenuVisible(false);
    }, ANIM_MS);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${headerStyle}`}
    >
      {/* Inline keyframes and small helper classes for the sliding panel */}
      <style>{`
        @keyframes slideInFromLeft {
          0% { transform: translateX(-110%); opacity: 0; }
          100% { transform: translateX(0%); opacity: 1; }
        }
        @keyframes slideOutToRight {
          0% { transform: translateX(0%); opacity: 1; }
          100% { transform: translateX(110%); opacity: 0; }
        }
        .anim-slide-in {
          animation: slideInFromLeft ${ANIM_MS}ms ease forwards;
        }
        .anim-slide-out {
          animation: slideOutToRight ${ANIM_MS}ms ease forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Royal Delight" className="w-9 h-9" />
          <span className="font-bold text-lg tracking-tight">Royal Delight</span>
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
                data-no-gradient
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
                    data-no-gradient
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
          onClick={toggleMenu}
          className="md:hidden focus:outline-none p-1"
          data-no-gradient
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

      {/* Sliding Mobile Panel (mounted only while menuVisible) */}
      {menuVisible && (
        // Panel sits below header (so header remains visible). Adjust top if you prefer it to overlay header.
        <div
          className={`md:hidden fixed top-0 left-0 h-screen z-40 ${
            // Ensure it's white and full-height; text styles are default dark
            "bg-white text-gray-800"
          } ${menuAnim === "in" ? "anim-slide-in" : "anim-slide-out"}`}
          style={{ width: "100%", paddingTop: "64px" /* make room for header height */ }}
        >
          {/* Panel inner content */}
          <div className="px-6 py-4 space-y-3">
            {/* Close button on the left inside the panel */}
            <div className="flex items-center justify-start">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md focus:outline-none"
                aria-label="Close menu"
                data-no-gradient
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenuWithAnimation}
                  className="block w-full py-3 text-lg"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="pt-2">
              {userName ? (
                <>
                  <div className="pb-2 text-center font-semibold text-pink-600">
                    Hi, {userName.split(" ")[0]}
                  </div>
                  <Link
                    to="/profile"
                    onClick={closeMenuWithAnimation}
                    className="block w-full py-3 text-center border border-pink-600 rounded-full text-pink-600 hover:bg-pink-600 hover:text-white transition"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      // animate close visually for mobile as well
                      closeMenuWithAnimation();
                    }}
                    className="mt-3 block w-full py-3 text-center border border-pink-600 rounded-full text-pink-600 hover:bg-pink-600 hover:text-white transition"
                    data-no-gradient
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenuWithAnimation}
                  className="block w-full py-3 text-center border border-pink-600 text-pink-600 rounded-full hover:bg-pink-600 hover:text-white transition"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
