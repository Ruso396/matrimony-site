import React from 'react';
import { CheckCircle2, MessageCircleMore, ShieldCheck, Award, Play } from 'lucide-react';

/*
  Replaces previous stats grid with an "About Us" section matching the provided screenshot:
  - Left: large circular image with a centered amber play button
  - Right: heading, description paragraph, four feature rows with icons, and a amber CTA button
  - Colors chosen to mirror screenshot (amber accent), while remaining accessible on white background
*/

const AboutFeature: React.FC<{ icon: React.ElementType; title: string; }> = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-md bg-amber-100 flex items-center justify-center ring-1 ring-amber-200">
      <Icon className="w-5 h-5 text-amber-900" />
    </div>
    <p className="text-text-primary font-semibold">{title}</p>
  </div>
);

const Stats: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: circular image with play button */}
        <div className="relative mx-auto w-full max-w-xl aspect-square">
          <div className="absolute inset-0 rounded-full overflow-hidden shadow-xl">
            <img
              src="https://crm.siddhimatrimonials.com/storage/blogs/1231124063735_4617.jpg"
              alt="About Us"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Centered play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
            <button
              aria-label="Play about video"
              onClick={() => window.open('#', '_blank')}
              className="w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-lg hover:bg-amber-500 transform hover:scale-105 transition-all"
            >
              <Play className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Right: text and features */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">About Us</h2>
          <p className="text-text-subtle leading-relaxed mb-6">
            Welcome to The International Matrimony. We are a premier matrimonial service located in Delhi. Our team consists of highly skilled professionals dedicated to helping you find your perfect match. Since our establishment, we have successfully matched countless couples from various backgrounds, including Muslim, Sikh, Christian, Hindu, and Jain. Our services include personalized matchmaking, background checks, and more. Our working hours are flexible and we are available to assist you at any time. Trust us to help you embark on your journey towards a happy and fulfilling marriage. Explore our services now.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            <AboutFeature icon={CheckCircle2} title="Contact genuine profiles" />
            <AboutFeature icon={MessageCircleMore} title="Find perfect match quite easily" />
            <AboutFeature icon={ShieldCheck} title="100% security for data and Profile" />
            <AboutFeature icon={Award} title="Trusted Matrimonial agency in the world" />
          </div>

          <button className="inline-flex items-center justify-center rounded-full bg-amber-600 text-white px-6 py-3 font-semibold shadow hover:bg-amber-500 transition-colors">
            See More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Stats;
