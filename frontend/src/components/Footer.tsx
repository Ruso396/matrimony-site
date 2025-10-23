import React from "react";
import { Heart, Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-teal-700 to-teal-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-teal-600" fill="currentColor" />
              </div>
              <span className="text-2xl font-bold">WedMate</span>
            </div>
            <p className="text-teal-100">Your Journey to Love Starts with WedMate</p>
            <button className="bg-white text-teal-700 px-6 py-2 rounded-full hover:bg-teal-50 transition-all duration-300 hover:scale-105">
              Register Now
            </button>
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-xl font-bold mb-4">GET IN TOUCH</h3>
            <div className="space-y-3 text-teal-100">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" />
                <span>214, 125th S Crossing Blvd, Full Moon, USA</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>+00(123)456789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>wedmate@email.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5" />
                <span>10:00 - 17:00</span>
              </div>
            </div>
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-xl font-bold mb-4">SOCIAL MEDIA</h3>
            <div className="flex space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <Heart className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-teal-600 mt-8 pt-8 text-center text-teal-100">
          <p>Copyright © 2025, WedMate All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
