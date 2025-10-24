import React from "react";
import { Heart, Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-amber-900 to-amber-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-amber-600" fill="currentColor" />
              </div>
              <span className="text-2xl font-bold">Matrimony</span>
            </div>
            <p className="text-amber-100">Your Journey to Love Starts with Matrimony</p>
            <button className="bg-white text-amber-900 px-6 py-2 rounded-full hover:bg-amber-50 transition-all duration-300 hover:scale-105">
              Register Now
            </button>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">GET IN TOUCH</h3>
            <div className="space-y-3 text-amber-100">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" />
                <span>374 William S Cumming Blvd, Full
                  River MZ 2743, USA</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>+1 (289) 425-5364</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>support@Matrimony.app</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5" />
                <span>10:00 - 17:00</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">SOCIAL MEDIA</h3>
            <div className="flex space-x-4">
              {["in","fb","tw","yt"].map((i) => (
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
        <div className="border-t border-amber-600 mt-8 pt-8 text-center text-amber-100">
          <p>Copyright © 2025, Matrimony All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
