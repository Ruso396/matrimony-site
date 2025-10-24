import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Aarav & Diya',
    quote:
      'We matched through curated recommendations and instantly connected over our shared interests. The team made the entire process effortless and truly personal.',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Rahul & Isha',
    quote:
      'From the first meeting to our engagement, everything felt just right. The privacy and professionalism stood out for us.',
    image:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
  },
];

const TestimonialCard: React.FC<{ name: string; quote: string; image: string; i: number }> = ({ name, quote, image, i }) => (
  <div className={`relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 stagger-${(i % 4) + 1}`}>
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-200/50 rounded-full blur-3xl" />
    <div className="flex items-start gap-4">
      <div className="w-14 h-14 rounded-xl overflow-hidden shadow">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, idx) => (
            <Star key={idx} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <p className="mt-3 text-text-subtle leading-relaxed">{quote}</p>
        <div className="mt-3 font-semibold text-text-strong">{name}</div>
      </div>
      <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center">
        <Quote className="w-5 h-5 text-brand-600" />
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="py-14 xs:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white">
      <style>{`
        @keyframes staggerFade { 0%{opacity:0; transform: translateY(8px);} 100%{opacity:1; transform:none;} }
        .stagger-1 { animation: staggerFade .6s ease-out .05s both }
        .stagger-2 { animation: staggerFade .6s ease-out .15s both }
        .stagger-3 { animation: staggerFade .6s ease-out .25s both }
        .stagger-4 { animation: staggerFade .6s ease-out .35s both }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold shadow-sm">Testimonials</div>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 via-brand-400 to-accent-500 bg-clip-text text-transparent">Loved by thousands of couples</h2>
          <p className="mt-3 max-w-2xl mx-auto text-gray-600 text-sm md:text-base leading-relaxed">Real stories from members who found meaningful connections through our curated matches.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 xs:gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} name={t.name} quote={t.quote} image={t.image} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
