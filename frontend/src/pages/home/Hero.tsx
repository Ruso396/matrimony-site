import React, { useState, useEffect } from 'react';
import { Heart, CheckCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [headingIndex, setHeadingIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const headings = ['Life Partner', 'Perfect Match', 'Soulmate', 'True Love'];
  const heroImages = [
    'https://i.ibb.co/M5PgnYc/hero-img-1.png',
    'https://i.ibb.co/ccNznGB/hero-img-2.png'
  ];

  useEffect(() => {
    const currentHeading = headings[headingIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText !== currentHeading) {
        setDisplayText(currentHeading.substring(0, displayText.length + 1));
      } else if (isDeleting && displayText !== '') {
        setDisplayText(currentHeading.substring(0, displayText.length - 1));
      } else if (!isDeleting && displayText === currentHeading) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setHeadingIndex((prevIndex) => (prevIndex + 1) % headings.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, headingIndex]);

  return (
    <>
      <style>{`
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-50px);} to { opacity: 1; transform: translateX(0);} }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(50px);} to { opacity: 1; transform: translateX(0);} }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:.5;} }
        @keyframes glow { 0% { box-shadow: 0 0 0 rgba(92,115,255,0);} 100% { box-shadow: 0 10px 30px rgba(92,115,255,.35);} }
        @keyframes blob { 0%{ transform: translate(0,0) scale(1);} 33%{ transform: translate(12px,-18px) scale(1.05);} 66%{ transform: translate(-10px,10px) scale(.96);} 100%{ transform: translate(0,0) scale(1);} }
        .animate-slideInLeft { animation: slideInLeft 1s ease-out; }
        .animate-slideInRight { animation: slideInRight 1s ease-out; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-glow { animation: glow .8s ease-in-out both; }
        .animate-blob { animation: blob 12s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      <section className="relative min-h-[75vh] xs:min-h-[85vh] md:min-h-screen pt-20 xs:pt-32 pb-8 xs:pb-20 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_20%_10%,rgba(92,115,255,.08),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(255,92,38,.08),transparent_40%)]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 -top-24 w-56 h-56 bg-amber-200/50 rounded-full mix-blend-multiply blur-3xl opacity-50 animate-blob" />
          <div className="absolute -right-16 -bottom-24 w-60 h-60 bg-pink-200/60 rounded-full mix-blend-multiply blur-3xl opacity-50 animate-blob animation-delay-2000" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-200/50 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 xs:space-y-7 animate-slideInLeft">
              <div className="inline-flex items-center gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-white/80 backdrop-blur-sm rounded-full border border-amber-100 shadow-sm animate-glow">
                <CheckCircle className="w-4 h-4 text-amber-600" />
                <span className="text-xs xs:text-sm text-gray-700 font-medium">Trusted Matrimony Platform</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-gray-900">
                  Discover Your <br/>
                  <span className="bg-gradient-to-r from-brand-600 via-brand-400 to-accent-500 bg-clip-text text-transparent">
                    {displayText}
                    <span className="animate-pulse ml-1">|</span>
                  </span>
                </h1>
              </div>

              <p className="text-base xs:text-lg text-gray-600 leading-relaxed max-w-xl">
                Join Matrimony and find your ideal partner. Connect with people who share your values and interests. Start your journey to lasting happiness today.
              </p>

              <div className="flex flex-col xs5:flex-row gap-3 xs:gap-4 lg:gap-2">
                <button
                  onClick={() => navigate('/register')}
                  className="w-[200px] mx-auto xs5:w-auto lg:w-auto px-5 xs:px-8 lg:px-10 py-2.5 xs:py-4 lg:py-4 bg-gradient-to-r from-brand-600 to-accent-500 text-white rounded-full font-semibold text-sm xs:text-base lg:text-lg shadow-glow hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 lg:mx-0"
                >
                  <Heart className="w-4 h-4 xs:w-5 xs:h-5" />
                  <span>Register Now</span>
                </button>

                <button
                  onClick={() => navigate('/biodata')}
                  className="w-[200px] mx-auto xs5:w-auto lg:w-auto px-5 xs:px-8 lg:px-10 py-2.5 xs:py-4 lg:py-4 bg-gradient-to-r from-brand-600 to-accent-500 text-white rounded-full font-semibold text-sm xs:text-base lg:text-lg hover:opacity-90 transition-all duration-300 lg:mx-0 flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4 xs:w-5 xs:h-5 text-white" />
                  <span>Browse Profiles</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs xs:text-sm text-gray-700 font-medium">Trusted by 10k+ members</span>
                  <span className="hidden sm:inline-block text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Secure & Verified</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 xs:w-10 xs:h-10 rounded-full border-2 border-white overflow-hidden shadow-sm animate-float">
                      <img src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-xs xs:text-sm text-text-muted"><span className="font-semibold text-text-subtle">500+ users</span> joined recently</p>
              </div>
            </div>

            <div className="relative animate-slideInRight -mb-8">
              <div className="grid grid-cols-2 gap-2 xs:gap-4">
                <div className="space-y-2 xs:space-y-4">
                  {/* Plain image (no rounded card, border or shadow) so full PNG is visible */}
                  <div className="relative h-60 xs:h-80">
                    <img src={heroImages[0]} alt="Happy Couple" className="object-contain w-full h-full transition-transform duration-500" />
                  </div>
                </div>
                <div className="space-y-2 xs:space-y-4 pt-4 xs:pt-8">
                  {/* Plain image (no rounded card, border or shadow) so full PNG is visible */}
                  <div className="relative h-64 xs:h-96">
                    <img src={heroImages[1]} alt="Wedding" className="object-contain w-full h-full transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
