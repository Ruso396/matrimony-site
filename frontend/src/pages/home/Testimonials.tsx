import React from "react";
import { Star, Quote, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const testimonials = [
  {
    name: "Aarav & Diya",
    quote:
      "We matched through curated recommendations and instantly connected over our shared interests. The team made the process effortless and personal.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Rahul & Isha",
    quote:
      "From the first meeting to our engagement, everything felt perfect. The privacy and professionalism truly stood out for us.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Karan & Meera",
    quote:
      "Personalized matches and respectful family coordination — we felt supported at every step.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Vikram & Sanya",
    quote:
      "Verified profiles, caring approach, and a matchmaker who really understood our culture and priorities.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Rohan & Priya",
    quote:
      "We found each other within weeks! The modern yet traditional approach made it feel natural and meant to be.",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Dev & Kavya",
    quote:
      "Their genuine verification system and premium support helped us find trust in online matchmaking again.",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=800&auto=format&fit=crop",
  },
];

const Testimonials: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-16 sm:py-20 px-3 xs:px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      {/* Inline Animations */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes glow {
          0%,100% { box-shadow: 0 0 0 rgba(255,120,180,0); }
          50% { box-shadow: 0 0 15px rgba(255,120,180,.3); }
        }
        @keyframes slideIn {
          0% { opacity:0; transform:translateX(-40px); }
          100% { opacity:1; transform:translateX(0); }
        }
        .animate-fadeUp { animation: fadeUp 1s ease-out both; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-slideIn { animation: slideIn 1.2s cubic-bezier(.3,.8,.3,1) both; }
      `}</style>

      {/* Decorative Blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 w-64 h-64 bg-pink-200/40 rounded-full blur-3xl opacity-60 animate-float" />
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl opacity-60 animate-float" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center animate-fadeUp">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs sm:text-sm font-semibold shadow-sm animate-glow">
            Hear from Couples
          </div>
          <h2 className="mt-4 text-[1.8rem] xs:text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 via-brand-400 to-accent-500 bg-clip-text text-transparent">
            Real Stories — Real Matches
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-gray-600 text-sm xs:text-base leading-relaxed">
            Our verified members have shared these beautiful stories that began
            on our platform. Each one is proof that the right match is just a
            click away.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-100 p-5 sm:p-6 shadow-md hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 animate-fadeUp`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-accent-200/30 rounded-full blur-3xl" />

              <div className="flex items-start gap-3 xs:gap-4">
                {/* Profile Image */}
                <div className="w-14 h-14 xs:w-16 xs:h-16 rounded-xl overflow-hidden shadow-md flex-shrink-0 animate-slideIn">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                  />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-3.5 h-3.5 text-yellow-400 animate-float"
                        style={{ animationDelay: `${idx * 0.2}s` }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                    {t.quote}
                  </p>
                  <div className="mt-2 font-semibold text-gray-900 text-sm">
                    {t.name}
                  </div>
                </div>

                {/* Quote Icon */}
                <div className="w-8 h-8 xs:w-9 xs:h-9 rounded-full bg-brand-50 flex items-center justify-center">
                  <Quote className="w-4 h-4 text-brand-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call-to-Action */}
        <div className="mt-12 text-center animate-fadeUp">
          <div className="inline-flex items-center gap-3 bg-white/90 px-4 py-2.5 rounded-full shadow-sm text-sm sm:text-base">
            <div className="text-gray-600">Trusted by</div>
            <div className="font-bold text-brand-600">50,000+</div>
            <div className="text-gray-600">verified members</div>
          </div>

          <button
            onClick={() => navigate('/contact')}
            className="mt-6 px-5 xs:px-6 py-2.5 xs:py-3 bg-gradient-to-r from-brand-600 to-accent-500 text-white rounded-full font-semibold text-sm sm:text-base shadow-md hover:shadow-2xl transition-all hover:scale-105 animate-float flex items-center gap-2 justify-center"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Your Story</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
