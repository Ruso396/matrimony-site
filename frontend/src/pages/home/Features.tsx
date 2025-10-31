import React, { useMemo, useState } from "react";
import {
  Shield,
  Users,
  Lock,
  UserCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  MessageCircle,
  Clock4,
  Crown,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import rightIMG from "../../components/assets/Gemini_Generated_Image_c5nswvc5nswvc5ns (1).png";
import couple from "../../components/assets/generated-image.png";

// ---------- Advantage Card ----------
const AdvantageCard: React.FC<{
  icon: React.ElementType;
  title: string;
  subtitle: string;
}> = ({ icon: Icon, title, subtitle }) => (
  <div className="relative rounded-2xl bg-white/95 backdrop-blur-md border border-slate-100 p-5 sm:p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-500 advantage-card">
    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-brand-50 flex items-center justify-center mb-3 sm:mb-4 shadow-sm">
      <Icon className="w-6 h-6 text-brand-600" />
    </div>
    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
    <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
  </div>
);

// ---------- FAQ (optional toggle section) ----------
const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 sm:py-4 text-left"
      >
        <span className="font-semibold text-gray-900">{q}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-slate-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500" />
        )}
      </button>
      {open && <p className="pb-3 text-gray-600 text-sm">{a}</p>}
      <div className="h-px bg-slate-200" />
    </div>
  );
};

const Features: React.FC = () => {
  const navigate = useNavigate();
  const advantages = useMemo(
    () => [
      { icon: Shield, title: "Top Consultants", subtitle: "Will manage your profile." },
      { icon: Crown, title: "20+ Years", subtitle: "Decades of matchmaking expertise." },
      { icon: Users, title: "50000+ Matrimonys", subtitle: "Have trusted us to find their match." },
      { icon: Lock, title: "100% Privacy", subtitle: "Your profile is confidential and secure." },
    ],
    []
  );

  return (
    <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-6 lg:px-10 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden relative">
      {/* ---------- Animations ---------- */}
      <style>{`
        @keyframes fadeUp { 0% {opacity:0; transform:translateY(16px);} 100% {opacity:1; transform:none;} }
        @keyframes floatY { 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(-6px);} }
        @keyframes blob { 0%{transform:scale(1) translate(0,0);} 33%{transform:scale(1.05) translate(10px,-10px);} 66%{transform:scale(.95) translate(-8px,10px);} 100%{transform:scale(1) translate(0,0);} }
        .animate-fadeUp { animation: fadeUp .7s ease-out both; }
        .animate-floatY { animation: floatY 6s ease-in-out infinite; }
        .animate-blob { animation: blob 12s ease-in-out infinite; }
      `}</style>

      {/* ---------- Soft Animated Background ---------- */}
      <div className="pointer-events-none absolute -left-16 top-20 w-60 h-60 bg-brand-200/40 rounded-full mix-blend-multiply blur-3xl opacity-50 animate-blob"></div>
      <div className="pointer-events-none absolute -right-16 bottom-10 w-64 h-64 bg-accent-200/40 rounded-full mix-blend-multiply blur-3xl opacity-50 animate-blob"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ---------- MATRIMONY ADVANTAGE ---------- */}
        <div className="mb-14 text-center">
          <h2 className="text-[1.6rem] xs:text-[1.8rem] sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 via-brand-400 to-accent-500 bg-clip-text text-transparent mb-8 animate-fadeUp">
            The Matrimony Advantage
          </h2>

          <div className="grid grid-cols-1 xs5:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {advantages.map((a, i) => (
              <div key={i} className="animate-fadeUp" style={{ animationDelay: `${i * 0.15}s` }}>
                <AdvantageCard icon={a.icon} title={a.title} subtitle={a.subtitle} />
              </div>
            ))}
          </div>
        </div>

        {/* ---------- ASSISTED SERVICE ---------- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 py-10 md:py-16 px-4 sm:px-6 bg-white/60 rounded-3xl shadow-inner backdrop-blur-sm animate-fadeUp">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-[1.6rem] xs:text-[1.8rem] sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
              Find your perfect match{" "}
              <span className="text-green-600">faster & smarter</span>
            </h2>
            <p className="text-gray-700 mt-3 text-sm sm:text-base max-w-md mx-auto md:mx-0">
              Personalized, white-glove matchmaking by experienced Relationship Managers who respect your preferences and family values.
            </p>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 mb-6 max-w-md mx-auto md:mx-0">
              {[
                { icon: <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />, label: "Guaranteed matches" },
                { icon: <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />, label: "Better response" },
                { icon: <Clock4 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />, label: "Save time" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center bg-white border border-green-100 rounded-xl py-3 sm:py-4 shadow-sm hover:shadow-md transition-all animate-floatY"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-green-50 rounded-full mb-2">
                    {item.icon}
                  </div>
                  <span className="text-[12px] sm:text-sm text-gray-700 text-center font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

        
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center md:justify-end mt-6 md:mt-0">
            <img
              src={rightIMG}
              alt="Assisted Service"
              className="max-w-[260px] xs:max-w-[300px] sm:max-w-[340px] md:max-w-sm w-full object-contain animate-floatY"
            />
          </div>
        </div>

        {/* ---------- MATRIMONY EXPERIENCE ---------- */}
        <div className="w-full py-14 sm:py-16 px-3 sm:px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 animate-fadeUp">
          {/* Left Image */}
          <div className="flex-1 flex justify-center">
            <img
              src={couple}
              alt="Elite Matrimony Couple"
              className="w-[300px] xs:w-[340px] sm:w-[380px] md:w-[440px] object-cover rounded-3xl shadow-lg transition-transform duration-700 hover:scale-105 animate-floatY"
            />
          </div>

          {/* Right Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <div className="bg-[#ff4d4d] w-8 h-8 flex items-center justify-center rounded-full shadow-sm">
                <img
                  src="https://img.icons8.com/ios-filled/50/ffffff/wedding-rings.png"
                  alt="Elite Icon"
                  className="w-5 h-5"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Matrimony</h2>
            </div>

            <h3 className="text-lg sm:text-xl text-red-600 font-semibold mb-5 leading-snug">
              The Largest And Most Successful Matrimony Service
            </h3>

            <div className="space-y-5 text-left">
              {[
                {
                  icon: <Users className="text-gray-800 w-5 h-5 sm:w-6 sm:h-6 mt-1" />,
                  title: "Largest pool of elite profiles",
                  desc: "Access the most exclusive and verified set of elite matches for higher compatibility.",
                },
                {
                  icon: <UserCheck className="text-gray-800 w-5 h-5 sm:w-6 sm:h-6 mt-1" />,
                  title: "Experienced Relationship Managers",
                  desc: "Dedicated Relationship Managers shortlist profiles that align with your preferences.",
                },
                {
                  icon: <Lock className="text-gray-800 w-5 h-5 sm:w-6 sm:h-6 mt-1" />,
                  title: "100% Confidential Service",
                  desc: "Your personal details remain private and shared only with your consent.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 sm:gap-4 animate-fadeUp" style={{ animationDelay: `${i * 0.15}s` }}>
                  {item.icon}
                  <div>
                    <h4 className="text-sm sm:text-lg font-bold text-gray-900">{item.title}</h4>
                    <p className="text-[13px] sm:text-sm text-gray-700 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
