import React from "react";
import { MessageCircle, UserCircle, Heart, Crown, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import bannerImgDesktop from "../../components/assets/generated-image2.png";
import bannerImgMobile from "../../components/assets/mobilebanner.jpg";

const Banner: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-[90vh] sm:min-h-[85vh] md:min-h-[90vh] flex items-center justify-end md:justify-center bg-cover bg-center overflow-hidden">
      {/* Mobile Background Image (320px, 375px, 425px) */}
      <div 
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: `url(${bannerImgMobile})` }}
      ></div>
      
      {/* Desktop Background Image (768px and above) */}
      <div 
        className="absolute inset-0 bg-cover bg-center hidden md:block"
        style={{ backgroundImage: `url(${bannerImgDesktop})` }}
      ></div>

      <style>{`
        @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(217, 179, 140, 0.3); } 50% { box-shadow: 0 0 40px rgba(217, 179, 140, 0.6); } }
        @keyframes scaleIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes iconBounce { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-8px) scale(1.1); } }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s linear infinite; background-size: 200% 100%; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-scaleIn { animation: scaleIn 0.6s ease-out forwards; }
        .animate-iconBounce { animation: iconBounce 2s ease-in-out infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
      `}</style>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/70"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 rounded-full bg-yellow-600/10 blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 rounded-full bg-orange-600/10 blur-3xl animate-float delay-200" style={{ animationDelay: '1s' }}></div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-0">
        <div className="flex flex-col items-center md:items-end justify-center md:justify-end gap-6 md:gap-12">
          
          {/* Right Side Content */}
          <div className="w-full md:w-[420px] lg:w-[480px] text-center md:text-right space-y-3 sm:space-y-4 md:space-y-5 animate-fadeInUp md:mr-6 lg:mr-12 md:mt-16">
            
            {/* Main Heading */}
            
            {/* Subheading */}
            <p className="text-xs sm:text-sm md:text-base text-amber-100/90 tracking-widest uppercase animate-fadeInUp delay-200 md:ml-auto" style={{ letterSpacing: '0.15em' }}>
              Privileged Matrimony
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-3 mt-6 sm:mt-8 md:mt-8 max-w-[480px] md:ml-0 md:-mr-20 lg:-mr-32">
              {/* Card 1 */}
              <div className="bg-black/40 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-4 border border-amber-200/20 animate-scaleIn delay-300 hover:bg-black/50 transition-all duration-300 animate-glow">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-amber-600/20 flex items-center justify-center animate-iconBounce">
                    <MessageCircle className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-300" />
                  </div>
                  <div className="text-center">
                    <p className="text-white text-xs sm:text-sm md:text-base font-semibold">Dedicated</p>
                    <p className="text-amber-200/80 text-[10px] sm:text-xs">personal advisor</p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-black/40 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-4 border border-amber-200/20 animate-scaleIn delay-400 hover:bg-black/50 transition-all duration-300 animate-glow" style={{ animationDelay: '0.5s' }}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-amber-600/20 flex items-center justify-center animate-iconBounce delay-100">
                    <UserCircle className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-300" />
                  </div>
                  <div className="text-center">
                    <p className="text-white text-xs sm:text-sm md:text-base font-semibold">Highlighted</p>
                    <p className="text-amber-200/80 text-[10px] sm:text-xs">profile in website</p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-black/40 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-4 border border-amber-200/20 animate-scaleIn delay-500 hover:bg-black/50 transition-all duration-300 animate-glow" style={{ animationDelay: '0.7s' }}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-amber-600/20 flex items-center justify-center animate-iconBounce delay-200">
                    <Heart className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-300 fill-amber-300" />
                  </div>
                  <div className="text-center">
                    <p className="text-white text-xs sm:text-sm md:text-base font-semibold">Verified</p>
                    <p className="text-amber-200/80 text-[10px] sm:text-xs">matching profiles</p>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-black/40 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-4 border border-amber-200/20 animate-scaleIn delay-600 hover:bg-black/50 transition-all duration-300 animate-glow" style={{ animationDelay: '0.9s' }}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-amber-600/20 flex items-center justify-center animate-iconBounce delay-300">
                    <Crown className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-300" />
                  </div>
                  <div className="text-center">
                    <p className="text-white text-xs sm:text-sm md:text-base font-semibold">Premium</p>
                    <p className="text-amber-200/80 text-[10px] sm:text-xs">profile listing in magazine</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Text */}
            <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed animate-fadeInUp delay-700 mt-4 sm:mt-6 md:ml-auto">
              We offer you premium services designed to make your<br className="hidden md:block" /> experience a privileged one.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center md:justify-end">
                         
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
