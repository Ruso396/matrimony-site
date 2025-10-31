import React, { useState } from "react";
import { Heart, Bell, Paintbrush } from "lucide-react";
import { useAdmin } from "../../../context/AdminContext";
import { useTheme } from "../../../context/ThemeContext";

const AdminHeader: React.FC = () => {
  const { adminName } = useAdmin();
  const { setThemeColor, bgColor } = useTheme();
  const [showPalette, setShowPalette] = useState(false);

  // ✅ Explicit Tailwind color mapping
  const colors = [
    { name: "blue", class: "bg-blue-500" },
    { name: "pink", class: "bg-pink-500" },
    { name: "purple", class: "bg-purple-500" },
    { name: "green", class: "bg-green-500" },
    { name: "orange", class: "bg-orange-500" },
    { name: "red", class: "bg-red-500" },
    { name: "teal", class: "bg-teal-500" },
    { name: "indigo", class: "bg-indigo-500" },
    { name: "yellow", class: "bg-yellow-400" },
    { name: "cyan", class: "bg-cyan-500" },
    { name: "rose", class: "bg-rose-500" },
    { name: "lime", class: "bg-lime-500" },
    { name: "amber", class: "bg-amber-500" },
    { name: "emerald", class: "bg-emerald-500" },
    { name: "violet", class: "bg-violet-500" },
    { name: "sky", class: "bg-sky-500" },
    { name: "fuchsia", class: "bg-fuchsia-500" },
    { name: "slate", class: "bg-slate-500" },
  ];

  return (
    <header
      className={`${bgColor} ${bgColor.includes("purple") ? "text-black" : "text-white"
        } shadow-md relative`}
    >

      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 ${["purple", "yellow", "amber", "lime", "sky", "fuchsia"].some(c =>
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
          {/* 🎨 Theme Palette Button */}
          <div className="relative">
            <button
              onClick={() => setShowPalette(!showPalette)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg relative"
            >
              <Paintbrush className="w-5 h-5" />
            </button>

            {showPalette && (
              <div
                className="absolute right-0 mt-3 bg-white text-black shadow-xl rounded-xl p-3 
                grid grid-cols-6 gap-2 z-50 animate-fadeIn"
                style={{
                  width: "200px",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`${color.class} w-6 h-6 rounded-full border-2 border-white 
                    hover:scale-110 hover:shadow-lg transition-all`}
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

          {/* Profile */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${["purple", "yellow", "amber", "lime", "sky", "fuchsia"].some(c =>
                bgColor.includes(c)
              )
                  ? "bg-black bg-opacity-10 text-black"
                  : "bg-white bg-opacity-20 text-white"
                }`}
            >
              {adminName ? adminName.charAt(0).toUpperCase() : "A"}
            </div>

            <span className="text-sm">{adminName || "Admin"}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
