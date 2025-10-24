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
    // முக்கிய கண்டெய்னர் (Container) - படத்தில் உள்ள மென்மையான background நிறத்துடன்
    <div className="relative flex flex-col items-center w-full py-16 bg-[#FFFBF5] overflow-hidden">
      
      {/* --- இடதுபுற ரங்கோலி டிசைன் --- */}
      <img
        src={left}
        alt="Decorative Corner Design"
        className="absolute top-0 left-0 w-48 h-auto opacity-70 z-0"
      />
      
      {/* --- வலதுபுற ரங்கோலி டிசைன் (இடதுபுற படத்தை திருப்பிப் பயன்படுத்துகிறோம்) --- */}
      <img
        src={right}
        alt="Decorative Corner Design"
        className="absolute top-0 right-0 w-48 h-auto opacity-70 z-0 transform scale-x-[-1]"
      />

      {/* --- தலைப்பு --- */}
      <h2 className="text-4xl font-serif italic text-amber-900 mb-12 relative z-10">
        How it works?
      </h2>

      {/* --- 3 கார்டுகளின் கண்டெய்னர் --- */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl px-4">
        
        {cardData.map((card, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col text-center"
          >
            {/* கார்டு படம் */}
            <img 
              src={card.imageSrc} 
              alt={card.title} 
              className="w-full h-48 object-cover" 
            />
            
            {/* கார்டு உள்ளடக்கம் (Text) */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}

      </div>

      {/* --- சிவப்பு பட்டன் --- */}
      <button 
        className="relative z-10 mt-12 bg-amber-800 text-white font-bold text-lg py-3 px-10 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300"
      >
        Interested in Elite Service?
      </button>

    </div>
  );
};

export default CTA;