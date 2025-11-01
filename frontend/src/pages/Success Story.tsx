import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Heart, Quote, Calendar, MapPin, Star, Share2,
  Facebook, Instagram, MessageCircle, Upload, X, Medal, Send
} from 'lucide-react';
import couple1 from '../components/assets/couple2.png';

// ✅ Add Google Fonts for cursive headings
const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Caveat:wght@400;700&display=swap');
  .font-cursive { font-family: 'Dancing Script', cursive; }
  .font-cursive-alt { font-family: 'Caveat', cursive; }
`;
document.head.appendChild(style);

interface Story {
  id: number;
  names: string;
  location: string;
  marriedDate: string;
  story: string;
  testimonial: string;
  image: string;
  isFeatured?: boolean;
  color: string;
}

// ✅ FormData Type
interface FormDataType {
  names: string;
  email: string;
  location: string;
  date: string;
  story: string;
  imagePreview: string;
  imageFile: File | null;
}

const SuccessStory: React.FC = () => {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState<FormDataType>({
    names: '',
    email: '',
    location: '',
    date: '',
    story: '',
    imagePreview: '',
    imageFile: null
  });
  const [stories, setStories] = useState<Story[]>([]);

  const heroBannerImages = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1920&h=1080&fit=crop"
  ];

  // ✅ Auto-slide hero background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Fetch stories from backend
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/stories/getstories');
        setStories(res.data || []);
      } catch (err) {
        console.error("Error fetching stories:", err);
      }
    };
    fetchStories();
  }, []);

  const colors = [
    "from-rose-500 to-pink-600",
    "from-purple-500 to-indigo-600",
    "from-orange-500 to-red-600",
    "from-teal-500 to-cyan-600",
    "from-violet-500 to-purple-600",
    "from-emerald-500 to-green-600"
  ];

  // ✅ Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, imagePreview: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  // ✅ Submit story to backend API
  const handleSubmit = async () => {
    if (!formData.names || !formData.location || !formData.story) {
      alert('Please fill in all required fields (Names, Location, Story)!');
      return;
    }

    try {
      const form = new FormData();
      form.append('names', formData.names);
      form.append('location', formData.location);
      form.append('date', formData.date);
      form.append('story', formData.story);
      if (formData.imageFile) {
        form.append('image', formData.imageFile);
      }

      const res = await axios.post('http://localhost:5000/api/stories/submitstory', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.status === 201) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
        alert('🎉 Thank you for sharing your story!');
        setStories([res.data.story, ...stories]);
        setShowSubmitForm(false);
        setFormData({
          names: '',
          email: '',
          location: '',
          date: '',
          story: '',
          imagePreview: '',
          imageFile: null
        });
      }
    } catch (err) {
      console.error('Error submitting story:', err);
      alert('Failed to submit story. Please try again.');
    }
  };

  // ✅ Featured story (first one)
  const featuredStory = {
  names: "Michael & Angel",
  location: "Chennai, Tamil Nadu",
  marriedDate: "January 2025",
  story: "We matched and instantly felt the spark...",
  testimonial: "Thanks to this platform, I met my soulmate!",
  image: couple1,
  color: "from-rose-500 to-pink-600",
  isFeatured: true,
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-20">
      
      {/* ✅ Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {[...Array(100)].map((_, i) => {
            const colors = ['#ff69b4', '#ffd700', '#ff6347', '#9370db', '#00ced1'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomX = Math.random() * 100;
            const randomDelay = Math.random() * 0.5;
            const randomDuration = 2 + Math.random() * 2;
            return (
              <div
                key={i}
                className="absolute w-3 h-3 animate-confetti"
                style={{
                  left: `${randomX}%`,
                  top: '-20px',
                  backgroundColor: randomColor,
                  animationDelay: `${randomDelay}s`,
                  animationDuration: `${randomDuration}s`
                }}
              />
            );
          })}
        </div>
      )}
      <style>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti { animation: confetti linear forwards; }
      `}</style>

      {/* ✅ Hero Section */}
      <div className="relative overflow-hidden py-24 min-h-[600px]">
        {heroBannerImages.map((img, idx) => (
          <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <img src={img} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/60 to-purple-600/60"></div>
          </div>
        ))}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight font-cursive">
            Success Stories from Our <br />
            <span className="text-yellow-300">Happy Couples</span>
          </h1>
          <p className="text-lg text-white">
            Every love story deserves to be celebrated. Here are couples who found their perfect match.
          </p>
        </div>
      </div>

      {/* ✅ Featured Story */}
    <div className="max-w-4xl mx-auto py-16 px-6">
  {/* Title Section */}
  <div className="text-center mb-10">
    <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-2.5 rounded-full shadow-md text-sm font-semibold tracking-wide transition-transform duration-300 hover:scale-105">
      <Medal className="w-4 h-4 mr-2" /> COUPLE OF THE MONTH
    </div>
  </div>

  {/* Main Card */}
  <div
    className="group relative bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2 border border-transparent 
    hover:border-pink-400 hover:shadow-2xl transition-all duration-500"
  >
    {/* Gradient border glow */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-300 via-rose-300 to-yellow-300 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700"></div>

    {/* Left Image */}
    <img
      src={featuredStory.image}
      alt={featuredStory.names}
      className="object-cover w-full h-64 md:h-full transform group-hover:scale-105 transition-transform duration-700"
    />

    {/* Right Content */}
    <div className="relative p-8 md:p-10 flex flex-col justify-center bg-white/90 backdrop-blur-sm z-10 animate-fadeIn">
      <h3 className="text-3xl font-cursive text-pink-600 mb-3 tracking-wide">
        {featuredStory.names}
      </h3>

      {/* Location & Date */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div
          className={`px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r ${featuredStory.color} text-white flex items-center shadow-sm`}
        >
          <MapPin className="w-3.5 h-3.5 mr-1" />
          {featuredStory.location}
        </div>

        <div className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold flex items-center shadow-sm">
          <Calendar className="w-3.5 h-3.5 mr-1" /> {featuredStory.marriedDate}
        </div>
      </div>

      {/* Story & Testimonial */}
      <p className="text-gray-600 italic text-sm mb-3 leading-relaxed">
        "{featuredStory.story}"
      </p>
      <p className="text-gray-900 font-semibold text-sm">{featuredStory.testimonial}</p>
    </div>
  </div>
</div>


      {/* ✅ Stories Grid */}
     {/* ✅ Stories Section */}
<div className="max-w-7xl mx-auto px-6 py-20">
  <h2 className="text-3xl font-cursive text-center text-pink-600 mb-10">
    More Love Stories ❤️
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
    {stories.map((story) => (
      <div key={story.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:-translate-y-3 transition">
<img
  src={story.image.startsWith('http') ? story.image : `http://localhost:5000/${story.image}`}
  alt={story.names}
  className="w-full h-72 object-cover"
/>
        <div className="p-6">
          <h3 className="text-2xl font-cursive text-pink-600">{story.names}</h3>
          <p className="text-gray-600 text-sm mb-2">{story.location}</p>
          <p className="text-gray-700 text-sm line-clamp-3">{story.story}</p>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* ✅ CTA */}
      <div className="bg-gradient-to-br from-pink-600 to-purple-600 text-center py-20 text-white">
        <h2 className="text-4xl font-cursive mb-6">Share Your Love Story ❤️</h2>
        <button
          onClick={() => setShowSubmitForm(true)}
          className="bg-white text-pink-600 px-10 py-4 rounded-full font-black hover:scale-105 transition">
          <Upload className="inline w-6 h-6 mr-2" /> Submit Your Story
        </button>
      </div>

      {/* ✅ Submit Form Modal */}
      {showSubmitForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowSubmitForm(false)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-cursive text-pink-600">Share Your Story</h3>
              <button onClick={() => setShowSubmitForm(false)} className="bg-gray-200 p-2 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Names *"
                value={formData.names}
                onChange={(e) => setFormData({ ...formData, names: e.target.value })}
                className="w-full border px-4 py-3 rounded-xl"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border px-4 py-3 rounded-xl"
              />
              <input
                type="text"
                placeholder="City, State *"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full border px-4 py-3 rounded-xl"
              />
              <input
                type="text"
                placeholder="Marriage Date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full border px-4 py-3 rounded-xl"
              />
              <textarea
                placeholder="Your Love Story *"
                rows={4}
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                className="w-full border px-4 py-3 rounded-xl resize-none"
              />
              <div className="text-center">
                <input type="file" id="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <label htmlFor="file" className="cursor-pointer inline-block bg-pink-100 px-6 py-3 rounded-xl hover:bg-pink-200">
                  {formData.imagePreview ? 'Change Image' : 'Upload Image'}
                </label>
                {formData.imagePreview && (
                  <img src={formData.imagePreview} alt="preview" className="w-32 h-32 mx-auto mt-4 rounded-xl object-cover" />
                )}
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-full font-black flex justify-center items-center gap-2">
                <Send className="w-5 h-5" /> Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStory;
