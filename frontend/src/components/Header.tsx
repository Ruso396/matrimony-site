import React, { useState, useEffect } from "react";
import { Menu, X, LogIn, User, LogOut, Bell, Heart, Trophy, Home, Users, Phone, HelpCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "../components/Avatar";

import logoWhite from "../components/assets/logowhite.png";
import logoBlack from "../components/assets/logoblack.png";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnim, setMenuAnim] = useState<"in" | "out">("in");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [sentCount, setSentCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const { userName, setUserName } = useAuth();

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

  useEffect(() => {
    const fetchCounts = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const [notifRes, sentRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/request/notifications/${userId}`),
          axios.get(`http://localhost:5000/api/request/sentcount/${userId}`),
        ]);

        console.log("📊 Notification Count (Received):", notifRes.data.count);
        console.log("📊 Sent Interest Count:", sentRes.data.count);

        setNotificationCount(notifRes.data.count);
        setSentCount(sentRes.data.count);
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
    } catch (e) {}
    setUserName(null);
    setShowDropdown(false);
    window.dispatchEvent(new Event("userLoginChange"));
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Brides/Grooms", path: "/biodata", icon: Users },
    { name: "Contact Us", path: "/contact", icon: Phone },
    { name: "FAQ", path: "/faq", icon: HelpCircle },
  ];

  const headerStyle = isTransparentPage
    ? isScrolled
      ? "bg-white shadow-md text-gray-800"
      : "bg-transparent text-white"
    : "bg-white text-gray-800 shadow-md";

  const ANIM_MS = 300;

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setMenuVisible(true);
      setMenuAnim("in");
      setIsMenuOpen(true);
    } else {
      setMenuAnim("out");
      setIsMenuOpen(false);
      setTimeout(() => setMenuVisible(false), ANIM_MS);
    }
  };

  const closeMenuWithAnimation = () => {
    if (!isMenuOpen) return;
    setMenuAnim("out");
    setIsMenuOpen(false);
    setTimeout(() => setMenuVisible(false), ANIM_MS);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${headerStyle}`}
    >
      <style>{`
        @keyframes slideInFromLeft {
          0% { transform: translateX(-110%); opacity: 0; }
          100% { transform: translateX(0%); opacity: 1; }
        }
        @keyframes slideOutToRight {
          0% { transform: translateX(0%); opacity: 1; }
          100% { transform: translateX(110%); opacity: 0; }
        }
        .anim-slide-in { animation: slideInFromLeft ${ANIM_MS}ms ease forwards; }
        .anim-slide-out { animation: slideOutToRight ${ANIM_MS}ms ease forwards; }
      `}</style>

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src={isTransparentPage && !isScrolled ? logoWhite : logoBlack}
            alt="WedAura"
            className="h-8 w-auto object-contain transition-all duration-300 sm:h-9 md:h-10 lg:h-11 xl:h-12"
          />
        </Link>

        {/* Desktop Nav */}
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

          {/* 🏆 Trophy icon now inside nav, next to FAQ */}
          <Link to="/successStory" className="flex items-center">
            <Trophy
              size={18}
              className={`${
                isTransparentPage && !isScrolled
                  ? "text-white hover:text-yellow-400"
                  : "text-gray-700 hover:text-pink-600"
              } transition-transform duration-200 hover:scale-110`}
            />
          </Link>
        </nav>

        {/* Right Side - Login/User */}
        <div className="hidden md:flex items-center gap-4 relative">
          {userName ? (
            <div className="relative flex items-center gap-3">
              {/* 🔔 Notification Icon */}
              <div className="relative">
                <Bell
                  className={`w-5 h-5 cursor-pointer transition ${
                    isTransparentPage && !isScrolled
                      ? "text-white hover:text-yellow-400"
                      : "text-pink-600 hover:text-pink-700"
                  }`}
                  onClick={() => navigate("/requestmanager")}
                />
                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
                    {notificationCount}
                  </span>
                )}
              </div>

              {/* 👤 User + Name */}
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                onMouseEnter={() => setShowDropdown(true)}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition font-semibold
                  ${
                    isTransparentPage && !isScrolled
                      ? "text-white hover:text-pink-700"
                      : "text-pink-600 hover:text-pink-700"
                  }`}
              >
                <Avatar
                  name={userName}
                  photo={localStorage.getItem("profilePhoto")}
                  size={36}
                />
                <span>{userName}</span>
              </button>

              {/* 🔽 Dropdown */}
              {showDropdown && (
                <div
                  className="absolute right-0 top-full mt-1 w-44 bg-white border rounded-lg shadow-lg py-2 z-50"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <Link
                    to="/profilePage"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-pink-50 transition"
                    onClick={() => setShowDropdown(false)}
                  >
                    <User className="w-4 h-4 text-pink-600" /> Profile
                  </Link>

                  {/* <Link
                    to="/requestmanager"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-pink-50 transition"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Heart className="w-4 h-4 text-pink-600" /> Requests
                  </Link> */}

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

        {/* Mobile menu toggle */}
        <button onClick={toggleMenu} className="md:hidden focus:outline-none p-1">
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

      {/* Mobile panel */}
      {menuVisible && (
        <div
          className={`md:hidden fixed top-0 left-0 h-screen z-40 bg-white text-gray-800 ${
            menuAnim === "in" ? "anim-slide-in" : "anim-slide-out"
          }`}
          style={{ width: "100%", paddingTop: "64px" }}
        >
          <div className="px-6 py-4 space-y-4">
            {/* Close Button */}
            <div className="flex items-start justify-start">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md focus:outline-none"
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            {/* Navigation Links with Icons - Left Aligned */}
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={closeMenuWithAnimation}
                    className="flex items-center gap-3 py-3 px-2 text-base text-gray-800 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              {/* Trophy - Success Stories */}
              <Link
                to="/successStory"
                onClick={closeMenuWithAnimation}
                className="flex items-center gap-3 py-3 px-2 text-base text-gray-800 hover:bg-gray-100 rounded-lg transition"
              >
                <Trophy className="w-5 h-5 text-gray-600" />
                <span>Success Stories</span>
              </Link>

              {/* Request Manager with Badge */}
              <Link
                to="/requestmanager"
                onClick={closeMenuWithAnimation}
                className="flex items-center gap-3 py-3 px-2 text-base text-gray-800 hover:bg-gray-100 rounded-lg transition relative"
              >
                <div className="relative">
                  <Heart className="w-5 h-5 text-gray-600" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 min-w-[18px] h-[18px] flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </div>
                <span>Requests</span>
              </Link>
            </nav>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* User Section - Left Aligned */}
            <div className="pt-2">
              {userName ? (
                <div className="space-y-2">
                  {/* Profile Link */}
                  <Link
                    to="/profilePage"
                    onClick={closeMenuWithAnimation}
                    className="flex items-center gap-3 py-3 px-2 text-base text-gray-800 hover:bg-gray-100 rounded-lg transition"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span>Profile</span>
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenuWithAnimation();
                    }}
                    className="w-full flex items-center gap-3 py-3 px-2 text-base text-gray-800 hover:bg-gray-100 rounded-lg transition"
                  >
                    <LogOut className="w-5 h-5 text-gray-600" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenuWithAnimation}
                  className="flex items-center gap-3 py-3 px-2 text-base text-gray-800 hover:bg-gray-100 rounded-lg transition"
                >
                  <LogIn className="w-5 h-5 text-gray-600" />
                  <span>Login</span>
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
