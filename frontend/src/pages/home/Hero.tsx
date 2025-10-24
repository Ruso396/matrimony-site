import React, { useState, useEffect } from 'react';
import { Heart, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const [headingIndex, setHeadingIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const headings = ['Life Partner', 'Perfect Match', 'Soulmate', 'True Love'];
  const heroImages = [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1000&crop=entropy&cs=tinysrgb&fit=crop',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&crop=entropy&cs=tinysrgb&fit=crop'
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
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 1s ease-out;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <section className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-amber-50/30 to-pink-50/30">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute -right-32 -bottom-32 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slideInLeft">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-amber-100 shadow-sm">
                <CheckCircle className="w-4 h-4 text-amber-600" />
                <span className="text-sm text-gray-600 font-medium">Trusted Matrimony Platform</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Discover Your <br />
                  <span className="bg-gradient-to-r from-amber-900 to-amber-500 bg-clip-text text-transparent">
                    {displayText}
                    <span className="animate-pulse ml-1">|</span>
                  </span>
                </h1>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Join Matrimony and find your ideal partner. Connect with people who share your values and interests. Start your journey to lasting happiness today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-700 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                  Register Now
                  <Heart className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold border border-gray-200 hover:border-amber-200 hover:bg-amber-50/50 transition-all duration-300">
                  Browse Profiles
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <span className="section-eyebrow">Trusted by 10k+ members</span>
                  <span className="hidden sm:inline-block badge">Secure & Verified</span>
                </div>
                
                
                
              </div>
              
              {/* Social Proof */}
              <div className="flex items-center gap-3 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <img 
                        src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-text-muted">
                  <span className="font-semibold text-text-subtle">500+ users</span> joined recently
                </p>
              </div>
            </div>

            {/* Right Content - Hero Images */}
            <div className="relative animate-slideInRight">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative rounded-3xl overflow-hidden h-64 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                    <img 
                      src="https://www.wedinspire.com/wp-content/uploads/2020/07/outdoor-wedding-venues.jpg"
                      alt="Happy Couple" 
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative rounded-3xl overflow-hidden h-72 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                    <img 
                      src="https://www.oxfordtownhall.co.uk/wp-content/uploads/2021/04/oth-your-wedding-scaled.jpg" 
                      alt="Wedding" 
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
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
