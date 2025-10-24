import React, { useState } from 'react';
import { Heart, Mail, Phone, MapPin, Clock, Building2, Users, Award, Headphones, Star, ArrowRight } from 'lucide-react';

export default function MatrimonyContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.phone && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', inquiry: '', message: '' });
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactCards = [
    {
      icon: Phone,
      title: 'Call Us',
      info: '+91 98765 43210',
      subtext: 'Mon-Sat, 9AM-7PM',
      gradient: 'from-emerald-500 to-teal-600',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600'
    },
    {
      icon: Mail,
      title: 'Email Us',
      info: 'hello@soulmatch.com',
      subtext: 'We reply in 2-4 hours',
      gradient: 'from-blue-500 to-indigo-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      info: 'New York, USA',
      subtext: '123, Manhattan Street',
      gradient: 'from-red-500 to-rose-600',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      info: 'Mon-Sat: 9AM-7PM',
      subtext: 'Sun: 10AM-4PM',
      gradient: 'from-purple-500 to-pink-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Couples', color: 'from-rose-500 to-pink-600' },
    { icon: Award, value: '100%', label: 'Verified Profiles', color: 'from-blue-500 to-cyan-600' },
    { icon: Headphones, value: '24/7', label: 'Support', color: 'from-emerald-500 to-teal-600' },
    { icon: Star, value: '4.9', label: 'User Rating', color: 'from-amber-500 to-yellow-600' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
  {/* Hero Section with Background Image */}
<div className="relative bg-white text-gray-900 overflow-hidden min-h-screen">
  {/* Background Image with Dark Overlay */}
  <div className="absolute inset-0">
    <img 
      src="https://media.istockphoto.com/id/866987706/photo/indian-wedding-hands.jpg?s=612x612&w=0&k=20&c=6L-u9qhFPv9MjDnF4UK4AqjVbDKM4_8Xad72IHhwPZE=" 
      alt="Couple Background"
      className="w-full h-full object-cover object-center brightness-75"  // 🔹 darken image slightly
    />
    {/* Dark romantic overlay for clarity */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
  </div>

  {/* Content on top of image */}
  <div className="relative max-w-7xl mx-auto px-4 pt-40 pb-24 text-center text-white">
    {/* Badge */}
    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-8 border border-white/30 shadow-lg animate-[fadeInDown_1s_ease-out]">
      <Heart className="text-pink-400 animate-pulse" size={20} />
      <span className="font-semibold text-pink-300">Connect With Us</span>
    </div>
    
    {/* Heading */}
    <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.7)]">
      <span className="inline-block bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-500 bg-clip-text text-transparent animate-[slideInLeft_1s_ease-out_0.3s_both]">
        Let's Start Your
      </span>
      <br />
      <span className="inline-block bg-gradient-to-r from-fuchsia-500 via-rose-500 to-pink-400 bg-clip-text text-transparent animate-[slideInRight_1s_ease-out_0.6s_both]">
        Journey Together
      </span>
    </h1>

    {/* Paragraph */}
    <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-12 leading-relaxed font-medium animate-[fadeIn_1s_ease-out_0.9s_both] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
      Have questions? Need help? Want to share feedback? 
      We're just a message away from making your dream come true!
    </p>
  </div>
</div>


      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20 mb-16">
          {contactCards.map((card, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 group"
            >
              <div className={`w-20 h-20 ${card.iconBg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className={card.iconColor} size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-800 font-semibold mb-1 text-lg">{card.info}</p>
              <p className="text-sm text-gray-600">{card.subtext}</p>
              <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${card.gradient}`}></div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 flex flex-col justify-center bg-white">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-blue-700 font-bold mb-8 w-fit shadow-md border-2 border-blue-200">
                <Building2 size={22} />
                <span className="text-lg">Visit Our Office</span>
              </div>
              
              <h3 className="text-5xl font-bold bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6">Come Meet Us!</h3>
              <p className="text-gray-600 text-xl mb-10 leading-relaxed">
                Drop by our New York office for a friendly consultation. We'd love to help you find your perfect match!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-5 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md border-2 border-blue-100">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-2 text-lg">Office Address</p>
                    <p className="text-gray-600 text-lg">123, Manhattan Street<br />New York, NY 10001, USA</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md border-2 border-blue-100">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-2 text-lg">Office Hours</p>
                    <p className="text-gray-600 text-lg">Mon - Sat: 9:00 AM - 7:00 PM<br />Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
              
              <button className="mt-10 px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3 w-fit group">
                <MapPin size={22} />
                <span>Get Directions</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="h-96 lg:h-auto relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596073366!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}