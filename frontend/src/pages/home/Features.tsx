import React, { useMemo, useState } from "react";
import {
  Shield,
  Users,
  Lock,
  UserCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle2, MessageCircle, Clock4,
  Crown,

} from "lucide-react";
import rightIMG from "../../components/assets/Gemini_Generated_Image_c5nswvc5nswvc5ns (1).png";
import couple from  "../../components/assets/generated-image.png";
const AdvantageCard: React.FC<{
  icon: React.ElementType;
  title: string;
  subtitle: string;
}> = ({ icon: Icon, title, subtitle }) => (
  <div className="relative rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
    <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center mb-4 shadow-sm">
      <Icon className="w-6 h-6 text-brand-600" />
    </div>
    <h3 className="text-lg font-semibold text-text-strong">{title}</h3>
    <p className="text-sm text-text-subtle mt-1">{subtitle}</p>
  </div>
);

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-semibold text-text-primary">{q}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-slate-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500" />
        )}
      </button>
      {open && <p className="pb-4 text-text-subtle">{a}</p>}
      <div className="h-px bg-slate-200" />
    </div>
  );
};

const Features: React.FC = () => {
  const advantages = useMemo(
    () => [
      { icon: Shield, title: "Top Consultants", subtitle: "Will manage your profile." },
      { icon: Crown, title: "20+ Years", subtitle: "Decades of matchmaking expertise." },
      { icon: Users, title: "50000+ Matrimonys", subtitle: "Have trusted us to find their match." },
      { icon: Lock, title: "100% Privacy", subtitle: "Your profile is confidential and secure." },
    ],
    []
  );

  const faq = useMemo(
    () => [
      {
        q: "What is MatrimonyShaadi.com?",
        a: "A personalized, exclusive elite matchmaking service designed to find you a match befitting your stature.",
      },
      {
        q: "What benefits do I get if I subscribe?",
        a: "Dedicated consultant, curated matches, assured meetings, priority verification, and more.",
      },
      {
        q: "How is privacy maintained?",
        a: "Your details are kept confidential and shared only with your consent.",
      },
      {
        q: "How do I get started?",
        a: "Register, talk to a consultant, and receive handpicked matches.",
      },
    ],
    []
  );

  return (
    <section className="py-14 xs:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white">
      <style>{`
        @keyframes staggerFade {
          0% {opacity:0; transform: translateY(8px);}
          100% {opacity:1; transform:none;}
        }
        .stagger-1 { animation: staggerFade .6s ease-out .05s both }
        .stagger-2 { animation: staggerFade .6s ease-out .15s both }
        .stagger-3 { animation: staggerFade .6s ease-out .25s both }
        .stagger-4 { animation: staggerFade .6s ease-out .35s both }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* MATRIMONY ADVANTAGE */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 via-brand-400 to-accent-500 bg-clip-text text-transparent">
            The Matrimony Advantage
          </h2>
          <div className="grid grid-cols-1 xs5:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {advantages.map((a, idx) => (
              <div key={idx} className={`stagger-${(idx % 4) + 1}`}>
                <AdvantageCard
                  icon={a.icon}
                  title={a.title}
                  subtitle={a.subtitle}
                />
              </div>
            ))}
          </div>
        </div>

        {/* === ASSISTED SERVICE SECTION (from screenshot) === */}

        <div
          className=" px-6 md:px-10 py-10 md:py-16 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14"

        >
          {/* Left Content */}
          <div className="flex-1">
            {/* Header */}



            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
              Find your match <span className="text-green-600">10x faster</span>
            </h2>
            <p className="text-gray-700 mt-3 max-w-md">
              Personalized matchmaking service through expert Relationship Manager
            </p>

            {/* Feature Icons Section */}
            <div className="grid grid-cols-3 gap-4 mt-6 mb-6 max-w-md">
              {[
                {
                  icon: <CheckCircle2 className="w-6 h-6 text-green-600" />,
                  label: "Guaranteed matches",
                },
                {
                  icon: <MessageCircle className="w-6 h-6 text-green-600" />,
                  label: "Better response",
                },
                {
                  icon: <Clock4 className="w-6 h-6 text-green-600" />,
                  label: "Save time & effort",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center bg-white border border-green-100 rounded-xl py-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-green-50 rounded-full mb-2">
                    {item.icon}
                  </div>
                  <span className="text-sm text-gray-700 text-center font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Button */}
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all">
              Know More →
            </button>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src={rightIMG}
              alt="Assisted Service"
              className="max-w-sm w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* --- MATRIMONY EXPERIENCE --- */}

        <div
          className="w-full  py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20"
        >
          {/* Left Image Section */}
          <div className="flex-1 flex justify-center">
            <img
              src={couple}
              alt="Elite Matrimony Couple"
              className="w-[400px] md:w-[460px] object-cover"
            />
          </div>

          {/* Right Content Section */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#ff4d4d] w-8 h-8 flex items-center justify-center rounded-full">
                <img
                  src="https://img.icons8.com/ios-filled/50/ffffff/wedding-rings.png"
                  alt="Elite Icon"
                  className="w-5 h-5"
                />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900">Elite Matrimony</h2>
            </div>

            <h3 className="text-xl text-red-600 font-semibold mb-6 leading-snug">
              The largest and most successful matrimony service for elites
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <Users className="text-gray-800 w-6 h-6 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Largest pool of truly elite profiles
                  </h4>
                  <p className="text-gray-700 text-sm mt-1">
                    Increased chances of finding the right match through our largest and most exclusive database of elite matches.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <UserCheck className="text-gray-800 w-6 h-6 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Experienced Relationship Managers
                  </h4>
                  <p className="text-gray-700 text-sm mt-1">
                    A dedicated Relationship Manager will be shortlisting and sharing matches as per your preferences.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Lock className="text-gray-800 w-6 h-6 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    100% Confidential Service
                  </h4>
                  <p className="text-gray-700 text-sm mt-1">
                    Strict privacy & confidentiality ensured throughout the service.
                  </p>
                </div>
              </div>
            </div>

            <button className="mt-8 bg-[#E53E30] hover:bg-[#c53026] text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all">
              Know More →
            </button>
          </div>
        </div>      </div>
    </section>
  );
};

export default Features;
