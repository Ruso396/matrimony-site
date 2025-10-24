import React from "react";
import { Heart, Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden text-white py-12 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top_left,rgba(92,115,255,.25),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(255,92,38,.18),transparent_40%)]">
      <style>{`
        @keyframes float {0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .animate-float { animation: float 6s ease-in-out infinite }
      `}</style>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(33,45,128,0.95),rgba(92,115,255,0.95))]" />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow">
                <Heart className="w-6 h-6 text-accent-500" fill="currentColor" />
              </div>
              <span className="text-2xl font-bold">Matrimony</span>
            </div>
            <p className="text-white/80">Your Journey to Love Starts with Matrimony</p>
            <button className="bg-gradient-to-r from-brand-600 to-accent-500 text-white px-6 py-2 rounded-full hover:shadow-glow transition-all duration-300 hover:scale-105">
              Register Now
            </button>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">GET IN TOUCH</h3>
            <div className="space-y-3 text-white/80">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 animate-float" />
                <span>374 William S Cumming Blvd, Full River MZ 2743, USA</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 animate-float" />
                <span>+1 (289) 425-5364</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 animate-float" />
                <span>support@Matrimony.app</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 animate-float" />
                <span>10:00 - 17:00</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">SOCIAL MEDIA</h3>
            <div className="flex space-x-4">
              {["in","fb","tw","yt"].map((i) => (
                <div key={i} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 cursor-pointer">
                  <Heart className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80">
          <p>Copyright © 2025, Matrimony All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
