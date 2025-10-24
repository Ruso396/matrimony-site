// Filename: CTA.tsx

import React from 'react';
import  left from '../../components/assets/whyelite-left.svg';
import  right from '../../components/assets/whyelite-left.svg';

// கார்டுகளில் உள்ள தகவல்களை இங்கே வரையறுக்கலாம்
const cardData = [
  {
    imageSrc: "https://brookshire.biz/wp-content/uploads/2025/04/featured-amandaeloise-500x383.jpg",
    title: "Understanding Your Preferences",
    description: "A dedicated Relationship Manager from your region will thoroughly understand your preferences, lifestyle and cultural nuances that will help in finding the best possible matches for you."
  },
  {
    imageSrc: "https://images.squarespace-cdn.com/content/v1/581b5c19e3df28f244eaf150/750b0750-21bc-4a8c-b842-674a172a3666/W146561%2C+W146559%2C+W146557%2C+W146556.jpg",
    title: "Recommending Matches",
    description: "Your Relationship Manager will recommend matches by consistently searching and shortlisting profiles based on your preferences."
  },
  {
    imageSrc: "https://pros.weddingpro.com/wp-content/uploads/2020/10/How-to-Close-a-Sale_Sultan-Shah_shutterstock.com_.png",
    title: "Connecting with Prospects",
    description: "After exploring mutual interests, your Relationship Manager will schedule meetings with your matches and families, saving your time and helping you find the right partner."
  }
];

// ரங்கோலி டிசைன் (Placeholder - உங்களுக்கு சரியான படம் இருந்தால் மாற்றவும்)
const rangoliImageUrl = "https://png.pngtree.com/png-vector/20220608/ourmid/pngtree-golden-floral-corner-frame-border-design-png-image_4901309.png";


const CTA: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center w-full py-14 xs:py-16 bg-[radial-gradient(circle_at_0%_0%,rgba(92,115,255,.08),transparent_35%),radial-gradient(circle_at_100%_0%,rgba(255,92,38,.08),transparent_35%)] overflow-hidden">
      <style>{`
        @keyframes blob { 0%{ transform: translate(0,0) scale(1);} 33%{ transform: translate(10px,-10px) scale(1.04);} 66%{ transform: translate(-8px,10px) scale(.96);} 100%{ transform: translate(0,0) scale(1);} }
        @keyframes shimmer { 0%{ background-position:0% 50%; } 100%{ background-position:100% 50%; } }
        .animate-blob { animation: blob 12s ease-in-out infinite; }
        .animate-shimmer { background-size:200% 200%; animation: shimmer 3s linear infinite; }
      `}</style>

      <img src={left} alt="Decorative Corner Design" className="absolute top-0 left-0 w-40 xs:w-48 h-auto opacity-70 z-0" />
      <img src={right} alt="Decorative Corner Design" className="absolute top-0 right-0 w-40 xs:w-48 h-auto opacity-70 z-0 -scale-x-100" />

      <h2 className="text-3xl xs:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 via-brand-400 to-accent-500 bg-clip-text text-transparent mb-10 relative z-10">
        How it works?
      </h2>

      <div className="pointer-events-none absolute -left-20 top-20 w-56 h-56 bg-brand-200/50 rounded-full mix-blend-multiply blur-3xl opacity-50 animate-blob" />
      <div className="pointer-events-none absolute -right-20 bottom-10 w-64 h-64 bg-accent-200/50 rounded-full mix-blend-multiply blur-3xl opacity-50 animate-blob" />

      <div className="relative z-10 grid grid-cols-1 xs5:grid-cols-3 gap-4 xs:gap-6 max-w-6xl px-4">
        {cardData.map((card, index) => (
          <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col text-center">
            <img src={card.imageSrc} alt={card.title} className="w-full h-44 xs:h-48 object-cover" />
            <div className="p-5 xs:p-6 flex flex-col flex-grow">
              <h3 className="text-lg xs:text-xl font-semibold text-text-strong mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="relative z-10 mt-10 xs:mt-12 bg-gradient-to-r from-brand-600 to-accent-500 text-white font-semibold text-base xs:text-lg py-3 px-8 xs:px-10 rounded-full shadow-glow hover:shadow-2xl transition-all duration-300 hover:scale-105">
        Interested in Elite Service?
      </button>
    </div>
  );
};

export default CTA;