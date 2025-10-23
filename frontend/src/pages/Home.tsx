import React, { useState, useEffect } from 'react';
import { Heart, Users, MessageCircle, CheckCircle, Menu, X, Phone, Mail, MapPin, Clock, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [headingIndex, setHeadingIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const headings = [
    'Life Partner',
    'Perfect Match',
    'Soulmate',
    'True Love'
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  }, [displayText, isDeleting, headingIndex, headings]);

  const profiles = [
    { name: 'Arun Kumar', age: 28, location: 'Madurai', profession: 'Software Engineer', gender: 'Male', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Priya Sharma', age: 26, location: 'Chennai', profession: 'Doctor', gender: 'Female', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Ananya Reddy', age: 27, location: 'Coimbatore', profession: 'Teacher', gender: 'Female', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { name: 'Karthik Prasad', age: 30, location: 'Trichy', profession: 'Business Owner', gender: 'Male', img: 'https://randomuser.me/api/portraits/men/46.jpg' },
    { name: 'Divya Lakshmi', age: 25, location: 'Salem', profession: 'Software Developer', gender: 'Female', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
    { name: 'Rajesh Kumar', age: 29, location: 'Madurai', profession: 'Architect', gender: 'Male', img: 'https://randomuser.me/api/portraits/men/52.jpg' },
    { name: 'Meera Rani', age: 24, location: 'Thanjavur', profession: 'Interior Designer', gender: 'Female', img: 'https://randomuser.me/api/portraits/women/72.jpg' },
    { name: 'Vikram Singh', age: 31, location: 'Chennai', profession: 'CA', gender: 'Male', img: 'https://randomuser.me/api/portraits/men/54.jpg' },
  ];

  const testimonials = [
    { name: 'Divya & Rajesh', date: '30/01/2023', text: 'We found each other through WedMate and couldn\'t be happier. The platform made it so easy to connect. Forever grateful!', rating: 5 },
    { name: 'Lakshmi & Arun', date: '15/03/2023', text: 'Best decision we ever made! The matching algorithm is spot-on. We got married last month and it\'s all thanks to WedMate.', rating: 5 },
    { name: 'Meera & Vikram', date: '22/05/2023', text: 'An amazing experience! We were skeptical at first, but WedMate helped us find our perfect match. Highly recommend!', rating: 5 },
  ];

  const stats = [
    { icon: Users, count: '500', label: 'PAIRED' },
    { icon: Heart, count: '300', label: 'LOVE' },
    { icon: CheckCircle, count: '433', label: 'COUPLES' },
    { icon: MessageCircle, count: '3,843', label: 'REGISTERED' },
  ];

  const howItWorks = [
    { step: 1, title: 'Register', desc: 'Begin by creating an account on our platform. Fill out your profile details, including personal information and interests.', color: 'bg-teal-500' },
    { step: 2, title: 'Find Your Match', desc: 'Use our algorithm to find potential matches based on your preferences. Browse profiles using search filters to discover compatible partners with shared interests.', color: 'bg-green-600' },
    { step: 3, title: 'Send Interest', desc: 'Express your interest to someone by sending a message. Break the ice and start a conversation with potential matches to show genuine interest.', color: 'bg-orange-400' },
    { step: 4, title: 'Get Profile Information', desc: 'Access detailed information about your match\'s profile to learn about their background, interests, and partner preferences.', color: 'bg-emerald-500' },
    { step: 5, title: 'Start Meetups', desc: 'Plan meetups in a safe environment to get to know each other better. Face-to-face interactions are essential for building strong relationships.', color: 'bg-blue-500' },
    { step: 6, title: 'Getting Marriage', desc: 'As you progress in your relationship, our platform provides tips and resources to help you prepare for a lifelong commitment.', color: 'bg-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slideInLeft">
              <p className="text-teal-600 font-medium text-sm">Welcome to WedMate</p>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                Discover Your </h1>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                <span className="text-teal-600">{displayText}<span className="animate-pulse"></span></span> Here
              </h1>
              <p className="text-gray-600 text-base">Join WedMate and find your ideal partner. Connect with people who share your values and interests. Start your journey to lasting happiness today!</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-teal-600 text-white px-8 py-4 rounded-full hover:bg-teal-700 transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2">
                  <span>Register Now</span>
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <img src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-600">Over +500 Users who joined WedMate recently</p>
              </div>
            </div>
            <div className="relative animate-slideInRight">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-3xl overflow-hidden h-64 hover:scale-105 transition-transform duration-300 shadow-xl">
                    <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500&h=600&fit=crop" alt="Couple" className="object-cover w-full h-full" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl overflow-hidden h-72 hover:scale-105 transition-transform duration-300 shadow-xl">
                    <img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&h=700&fit=crop" alt="Bride" className="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-teal-200 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Profiles */}
      {/* <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shining a <span className="text-teal-600">Spotlight</span> on Some Premium <span className="text-teal-600">Profiles</span>
            </h2>
            <p className="text-gray-600">Welcome to our premium profile showcase! Explore and celebrate these exceptional individuals who are looking for their life partner.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profiles.map((profile, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="relative h-48 overflow-hidden">
                  <img src={profile.img} alt={profile.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-teal-600">Premium</div>
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{profile.name}</h3>
                    <p className="text-sm text-gray-500">{profile.location}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span className="bg-teal-50 px-3 py-1 rounded-full">{profile.age} yrs</span>
                    <span className="bg-pink-50 px-3 py-1 rounded-full">{profile.gender}</span>
                  </div>
                  <p className="text-sm text-gray-600">{profile.profession}</p>
                  <button className="w-full bg-teal-600 text-white py-2 rounded-full hover:bg-teal-700 transition-all duration-300 hover:shadow-lg">View Profile</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 animate-fadeIn">How It Works</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Finding your perfect match is easier than ever. Follow these simple steps to begin your journey to lifelong happiness.</p>
          <div className="flex justify-center mb-12">
            <div className="w-64 h-16 relative">
              <svg viewBox="0 0 256 64" className="w-full animate-drawPath">
                <path d="M20,32 Q64,10 128,32 T236,32" fill="none" stroke="#14b8a6" strokeWidth="2" />
                {[0, 1, 2, 3, 4].map(i => (
                  <circle key={i} cx={20 + i * 54} cy={32} r={8} fill="#ffc0cb" className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </svg>
            </div>
          </div>
          <div className="space-y-8">
            {howItWorks.map((item, i) => (
              <div key={i} className={`flex flex-col md:flex-row gap-6 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''} animate-fadeInUp`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg hover:scale-110 transition-transform duration-300 animate-bounce`} style={{ animationDelay: `${i * 0.2}s` }}>
                  {item.step}
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Success in Numbers</h2>
            <p className="text-gray-600">Join thousands of happy couples who found their perfect match through WedMate</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mb-4 animate-pulse">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-teal-600 mb-2">{stat.count}</h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Heartwarming <span className="text-teal-600">Success Stories</span><br />of Love <span className="text-teal-600">and Commitment</span>
            </h2>
            <p className="text-gray-600">Discover beautiful love stories on WedMate, the inspiring journeys of couples who discovered true love and happiness through our community.</p>
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                {testimonials.map((test, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-2xl p-8 shadow-lg mx-auto max-w-2xl">
                      <div className="flex justify-center mb-4">
                        {[...Array(test.rating)].map((_, j) => (
                          <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 text-center italic">"{test.text}"</p>
                      <div className="text-center">
                        <p className="font-bold text-gray-900">{test.name}</p>
                        <p className="text-sm text-gray-500">{test.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setActiveTestimonial((activeTestimonial - 1 + testimonials.length) % testimonials.length)} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-teal-50 transition-colors">
              <ChevronLeft className="w-6 h-6 text-teal-600" />
            </button>
            <button onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-teal-50 transition-colors">
              <ChevronRight className="w-6 h-6 text-teal-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes drawPath {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 1s ease-out; }
        .animate-slideInRight { animation: slideInRight 1s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .animate-drawPath { stroke-dasharray: 1000; animation: drawPath 2s ease-out; }
      `}</style>
    </div>
  );
};

export default Home;