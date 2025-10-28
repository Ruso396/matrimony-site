import React from "react";
import { Heart, Phone, Mail, MapPin } from "lucide-react";
import logo from "../components/assets/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden text-white py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <style>{`
        @keyframes float {0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .animate-float { animation: float 6s ease-in-out infinite }
      `}</style>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* ===== Brand Section ===== */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Royal Delight" className="w-10 h-10" />
              <span className="text-2xl font-bold text-pink-400">Royal Delight</span>
            </div>
            <p className="text-gray-300">
              Your Journey to Love Starts with Royal Delight.
            </p>
           
          </div>

          {/* ===== Contact Info ===== */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-pink-400">GET IN TOUCH</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 animate-float text-pink-500" />
                <span>
                  4th Floor, Square Building, Metro Train, MG Road, Tamil Nadu, India - 682016
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 animate-float text-pink-500" />
                <span>+91 7000066670, +91 9000018833</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 animate-float text-pink-500" />
                <span>info@royaldelightmatrimony.com</span>
              </div>
            </div>
          </div>

          {/* ===== Social Media ===== */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-pink-400">SOCIAL MEDIA</h3>
            <div className="flex space-x-4">
              {["fb", "tw", "ig", "yt"].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <Heart className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== Footer Bottom ===== */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© 2025 Royal Delight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
