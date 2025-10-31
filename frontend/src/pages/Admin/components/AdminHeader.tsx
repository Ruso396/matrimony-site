import React, { useState } from "react";
import { Heart, Bell, Paintbrush, LogOut } from "lucide-react";
import { useAdmin } from "../../../context/AdminContext";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const AdminHeader: React.FC = () => {
  const { adminName } = useAdmin();
  const { setThemeColor, bgColor } = useTheme();
  const [showPalette, setShowPalette] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // 🧹 clear login data
    navigate("/admin/login"); // 🔁 redirect to login page
  };

  const colors = [
    { name: "blue", class: "bg-blue-500" },
    { name: "pink", class: "bg-pink-500" },
    { name: "purple", class: "bg-purple-500" },
    { name: "green", class: "bg-green-500" },
    { name: "orange", class: "bg-orange-500" },
  ];

  return (
    <header
      className={`${bgColor} ${
        bgColor.includes("purple") ? "text-black" : "text-white"
      } shadow-md relative`}
    >
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 ${
              ["purple", "yellow", "amber", "lime", "sky", "fuchsia"].some((c) =>
                bgColor.includes(c)
              )
                ? "bg-black bg-opacity-10 text-black"
                : "bg-white bg-opacity-20 text-white"
            } rounded-lg flex items-center justify-center`}
          >
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Royal Delight</h1>
            <p className="text-xs opacity-90">Admin Dashboard</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 relative">
          {/* 🎨 Theme Palette */}
          <div className="relative">
            <button
              onClick={() => setShowPalette(!showPalette)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg relative"
            >
              <Paintbrush className="w-5 h-5" />
            </button>
            {showPalette && (
              <div className="absolute right-0 mt-3 bg-white text-black shadow-xl rounded-xl p-3 grid grid-cols-5 gap-2 z-50 animate-fadeIn">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`${color.class} w-6 h-6 rounded-full border-2 border-white hover:scale-110 hover:shadow-lg transition-all`}
                    onClick={() => {
                      setThemeColor(color.name);
                      setShowPalette(false);
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Notification */}
          <button className="relative p-2 hover:bg-white hover:bg-opacity-20 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  ["purple", "yellow", "amber", "lime", "sky", "fuchsia"].some(
                    (c) => bgColor.includes(c)
                  )
                    ? "bg-black bg-opacity-10 text-black"
                    : "bg-white bg-opacity-20 text-white"
                }`}
              >
                {adminName ? adminName.charAt(0).toUpperCase() : "A"}
              </div>
              <span className="text-sm">{adminName || "Admin"}</span>
            </button>

            {/* 🔻 Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
