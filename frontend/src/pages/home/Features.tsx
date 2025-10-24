import React, { useMemo, useState } from 'react';
import { Shield, Users, Lock, Star, Quote, ChevronDown, ChevronUp, PlayCircle, CheckCircle, Crown, Sparkles, BadgeCheck } from 'lucide-react';

/*
  Matrimony-style Features page replicating the uploaded screenshot structure in a single file:
  - Matrimony Advantage cards row
  - Stories carousel (image pairs with captions)
  - Testimonial highlight card
  - Two feature bands: The Matrimony Experience, Curated Matches (with images)
  - FAQ accordion
  Notes:
  - Uses open images from Unsplash/RandomUser sized similar to screenshot.
  - Colors align with accessible palette; primary accent shifted to indigo/teal that fits the rest of site.
*/

const AdvantageCard: React.FC<{ icon: React.ElementType; title: string; subtitle: string }> = ({ icon: Icon, title, subtitle }) => (
  <div className="relative rounded-2xl bg-white border border-amber-900 p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-indigo-600" />
    </div>
    <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
    <p className="text-sm text-text-subtle mt-1">{subtitle}</p>
    <span className="absolute inset-0 rounded-2xl pointer-events-none overlay-soft" />
  </div>
);

const StoryCard: React.FC<{ img: string; title: string; subtitle: string }> = ({ img, title, subtitle }) => (
  <div className="group">
    <div className="relative overflow-hidden rounded-2xl shadow-md">
      <img src={img} alt={title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
      
    </div>
    <div className="mt-3">
      <p className="font-semibold text-text-primary">{title}</p>
      <p className="text-sm text-text-subtle">{subtitle}</p>
    </div>
  </div>
);

const TestimonialHighlight: React.FC = () => (
  <div className="rounded-2xl bg-amber-50 p-6 md:p-8 shadow-sm border border-amber-200">
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
        <Quote className="w-5 h-5 text-amber-600" />
      </div>
      <div className="flex-1">
        <p className="text-text-subtle text-base md:text-lg leading-relaxed">
          Riya, a trained pastry chef in Delhi was introduced to Anand, a young entrepreneur by Matrimony Consultant Renuka. Riya knew she had found her soul mate when Anand ordered her favorite Dark Chocolate Cake on their first date.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Renuka" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-text-primary">Match by Renuka</p>
            <p className="text-xs text-text-muted">Matrimony Consultant — Delhi Team</p>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FAQItem: React.FC<{ q: string; a: string }>= ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left">
        <span className="font-semibold text-text-primary">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
      </button>
      {open && <p className="pb-4 text-text-subtle">{a}</p>}
      <div className="h-px bg-slate-200" />
    </div>
  );
};

const Features: React.FC = () => {
  const advantages = useMemo(() => ([
    { icon: Shield, title: 'Top Consultants', subtitle: 'Will manage your profile.' },
    { icon: Crown, title: '20+ Years', subtitle: 'Decades of matchmaking expertise.' },
    { icon: Users, title: '50000+ Matrimonys', subtitle: 'Have trusted us to find their match.' },
    { icon: Lock, title: '100% Privacy', subtitle: 'Your profile is confidential and secure.' },
  ]), []);

  const stories = useMemo(() => ([
    {
      img: 'https://goaskeve.com/wp-content/uploads/2024/05/KatherineSimonResized-322.jpg',
      title: 'Prerna & Apoorva',
      subtitle: 'We are grateful to the team for helping us through our journey.'
    },
    {
      img: 'https://pauljosephphotography.co.uk/wp-content/uploads/2021/10/Yorkshire-Garden-Wedding.jpg',
      title: 'Karamjeet & Shakti',
      subtitle: 'We found our soulmate with the help of the brilliant team!'
    }
  ]), []);

  const faq = useMemo(() => ([
    { q: 'What is MatrimonyShaadi.com?', a: 'A personalized, exclusive elite matchmaking service designed to find you a match befitting your stature.' },
    { q: 'What benefits do I get if I subscribe?', a: 'Dedicated consultant, curated matches, assured meetings, priority verification, and more.' },
    { q: 'How is privacy maintained?', a: 'Your details are kept confidential and shared only with your consent.' },
    { q: 'How do I get started?', a: 'Register, talk to a consultant, and receive handpicked matches.' },
    { q: 'What makes this different from others?', a: 'Human-led curation with a strong success track record and robust privacy.' }
  ]), []);

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Matrimony Advantage */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary">The Matrimony Advantage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {advantages.map((a, idx) => (
              <AdvantageCard key={idx} icon={a.icon} title={a.title} subtitle={a.subtitle} />
            ))}
          </div>
        </div>

        {/* Inspiring Stories */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary">Inspiring Stories</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {stories.map((s, idx) => (
              <StoryCard key={idx} img={s.img} title={s.title} subtitle={s.subtitle} />
            ))}
          </div>
        </div>

        {/* What our customers say */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary">What our customers say</h2>
            <button className="text-sm link">See all Reviews</button>
          </div>
          <div className="mt-6">
            <TestimonialHighlight />
          </div>
        </div>

        {/* Two-column feature bands */}
        <div className="mb-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-extrabold text-text-primary">The Matrimony Experience</h3>
            <p className="text-text-subtle mt-3">With over 20 years of expertise, we are pioneers of the matchmaking industry. We leverage our discreet global network to find you the right partner, befitting your stature.</p>
            <ul className="mt-4 space-y-2 text-text-subtle">
              <li className="inline-flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-indigo-600" /> Dedicated Relationship Manager</li>
              <li className="inline-flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-indigo-600" /> Assured Meetings</li>
              <li className="inline-flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-indigo-600" /> Verified & Private Profiles</li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md">
            <img src="https://static01.nyt.com/images/2023/05/14/multimedia/FAT-INDIAN-WEDDINGS-01-hptq/FAT-INDIAN-WEDDINGS-01-hptq-superJumbo.jpg" alt="Matrimony Experience" className="w-full h-72 object-cover" />
          </div>
        </div>

        <div className="mb-12 grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden shadow-md order-2 md:order-1">
            <img src="https://www.alfaazphotography.com/wp-content/uploads/2020/05/FW-_-SA-1621-1536x1024.jpg" alt="Curated Matches" className="w-full h-72 object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-2xl font-extrabold text-text-primary">Curated Matches</h3>
            <p className="text-text-subtle mt-3">Our Matchmaking Experts will send curated matches based on your unique requirements.</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {["Assured Meetings","Priority Shortlisting","High Success","Discreet Process"].map((t,i)=> (
                <div key={i} className="rounded-xl border border-slate-200 p-3 text-sm text-text-subtle flex items-center gap-2"><CheckCircle className="w-4 h-4 text-indigo-600" /> {t}</div>
              ))}
            </div>
          </div>
        </div>

  <div className="mb-10 text-center animate-fade-in-up">
  {/* Label */}
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold shadow-sm">
    FAQs
  </div>

  {/* Title */}
  <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
    Frequently Asked Questions
  </h2>

  {/* Subtitle */}
  <p className="mt-3 max-w-2xl mx-auto text-gray-600 text-sm md:text-base leading-relaxed">
    Quick answers to the most common questions.  
    Can’t find what you’re looking for?{" "}
    <span className="text-amber-600 font-medium hover:underline cursor-pointer">
      Reach out to our team.
    </span>
  </p>

  {/* FAQ Container */}
  <div className="mt-10 bg-gradient-to-r from-amber-600 to-amber-500 p-[2px] rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="rounded-3xl bg-white p-6 sm:p-8">
      {faq.map((f, i) => (
        <div
          key={i}
          className="border-b border-gray-100 last:border-none py-4 text-left hover:bg-gray-50 rounded-lg transition-all duration-200"
        >
          <FAQItem q={f.q} a={f.a} />
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
