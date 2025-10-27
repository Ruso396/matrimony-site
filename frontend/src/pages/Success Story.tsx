// import React, { useState, useEffect } from 'react';
// import { Heart, Quote, Calendar, MapPin, Sparkles, Star, Globe, Share2, Facebook, Instagram, MessageCircle, Upload, X, Medal, TrendingUp, Send } from 'lucide-react';
// import couple1 from '../components/assets/couple2.png';
// // Add Google Font for cursive style
// const style = document.createElement('style');
// style.textContent = `
//   @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Caveat:wght@400;500;600;700&display=swap');
  
//   .font-cursive {
//     font-family: 'Dancing Script', cursive;
//   }
  
//   .font-cursive-alt {
//     font-family: 'Caveat', cursive;
//   }
// `;
// document.head.appendChild(style);

// interface Story {
//   id: number;
//   names: string;
//   location: string;
//   marriedDate: string;
//   story: string;
//   testimonial: string;
//   image: string;
//   isFeatured?: boolean;
//   color: string;
// }

// const SuccessStory: React.FC = () => {
//   const [showSubmitForm, setShowSubmitForm] = useState<boolean>(false);
//   const [showConfetti, setShowConfetti] = useState<boolean>(false);
//   const [currentSlide, setCurrentSlide] = useState<number>(0);
//   const [formData, setFormData] = useState({
//     names: '',
//     email: '',
//     location: '',
//     date: '',
//     story: '',
//     imagePreview: ''
//   });
//   const [userStories, setUserStories] = useState<Story[]>([]);

//   // Hero banner images
//   const heroBannerImages = [
//     "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop",
//     "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&h=1080&fit=crop",
//     "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920&h=1080&fit=crop",
//     "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920&h=1080&fit=crop",
//     "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1920&h=1080&fit=crop"
//   ];

//   // Auto-slide effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroBannerImages.length);
//     }, 4000); // Change slide every 4 seconds
    
//     return () => clearInterval(interval);
//   }, []);

//   const defaultStories: Story[] = [
//    {
//       id: 1,
//       names: "Michael & Angel",
//       location: "Chennai, Tamil Nadu",
//       marriedDate: "January 2025",
//       story: "We matched in January 2025, started chatting for a few weeks, and soon realized we were meant for each other. From our first video call to meeting our families, every step felt perfect.",
//       testimonial: "Thanks to this platform, I met my soulmate! Our journey from strangers to life partners has been magical.",
//       image: couple1,
//       isFeatured: true,
//       color: "from-rose-500 to-pink-600"
//     },
//     {
//       id: 2,
//       names: "Arjun & Neha",
//       location: "Mumbai, Maharashtra",
//       marriedDate: "December 2024",
//       story: "We connected through common interests in music and art. After months of meaningful conversations, we knew this was it. Our families met, and everyone could see the connection we had.",
//       testimonial: "Best decision ever! This platform brought us together and changed our lives forever.",
//       image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop",
//       color: "from-purple-500 to-indigo-600"
//     },
//     {
//       id: 3,
//       names: "Vikram & Anjali",
//       location: "Bangalore, Karnataka",
//       marriedDate: "November 2024",
//       story: "Distance wasn't a barrier when hearts are meant to meet. We connected across cities, shared our dreams, and built a beautiful relationship based on trust and understanding.",
//       testimonial: "We're grateful to have found each other through this wonderful platform. Highly recommended!",
//       image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=600&fit=crop",
//       color: "from-orange-500 to-red-600"
//     },
//     {
//       id: 4,
//       names: "Karthik & Divya",
//       location: "Hyderabad, Telangana",
//       marriedDate: "October 2024",
//       story: "We both were looking for someone who understood our career ambitions. This platform's detailed profiles helped us find exactly that. From our first conversation, we clicked instantly.",
//       testimonial: "Finding the perfect match seemed impossible until we found each other here. Thank you!",
//       image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=600&fit=crop",
//       color: "from-teal-500 to-cyan-600"
//     },
//     {
//       id: 5,
//       names: "Arun & Lakshmi",
//       location: "Coimbatore, Tamil Nadu",
//       marriedDate: "September 2024",
//       story: "Traditional values with modern thinking - we both wanted the same thing. The platform's filters made it easy to find someone who shared our values. Our families are thrilled!",
//       testimonial: "We couldn't be happier! This platform understood what we were looking for.",
//       image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
//       color: "from-violet-500 to-purple-600"
//     },
//     {
//       id: 6,
//       names: "Nishant & Shreya",
//       location: "Pune, Maharashtra",
//       marriedDate: "August 2024",
//       story: "Our shared love for adventure and travel brought us together. We've already explored 5 countries together as husband and wife. This platform made finding my travel partner for life so easy!",
//       testimonial: "From chatting online to exploring the world together - incredible journey! Thank you!",
//       image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop",
//       color: "from-emerald-500 to-green-600"
//     }
//   ];

//   const stories = [...userStories, ...defaultStories];
//   const featuredStory = stories.find(s => s.isFeatured);

//   const colors = [
//     "from-rose-500 to-pink-600",
//     "from-purple-500 to-indigo-600",
//     "from-orange-500 to-red-600",
//     "from-teal-500 to-cyan-600",
//     "from-violet-500 to-purple-600",
//     "from-emerald-500 to-green-600"
//   ];

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({...formData, imagePreview: reader.result as string});
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = () => {
//     if (!formData.names || !formData.location || !formData.story) {
//       alert('Please fill in all required fields (Names, Location, Story)!');
//       return;
//     }

//     const newStory: Story = {
//       id: Date.now(),
//       names: formData.names,
//       location: formData.location,
//       marriedDate: formData.date || 'Recently',
//       story: formData.story,
//       testimonial: formData.story,
//       image: formData.imagePreview || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
//       color: colors[Math.floor(Math.random() * colors.length)]
//     };

//     setUserStories([newStory, ...userStories]);
//     setShowConfetti(true); // 🎉 trigger confetti
    
//     setTimeout(() => {
//       setShowConfetti(false);
//       alert('🎉 Thank you for sharing your story! Your card has been created and added to the page.');
//     }, 4000); // stop after 4s
    
//     setShowSubmitForm(false);
//     setFormData({ names: '', email: '', location: '', date: '', story: '', imagePreview: '' });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-25">
//       {/* Confetti Animation */}
//       {showConfetti && (
//         <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
//           {[...Array(100)].map((_, i) => {
//             const colors = ['#ff69b4', '#ff1493', '#ffd700', '#ff6347', '#9370db', '#00ced1', '#32cd32', '#ff4500'];
//             const randomColor = colors[Math.floor(Math.random() * colors.length)];
//             const randomX = Math.random() * 100;
//             const randomDelay = Math.random() * 0.5;
//             const randomDuration = 2 + Math.random() * 2;
//             const randomRotation = Math.random() * 360;
            
//             return (
//               <div
//                 key={i}
//                 className="absolute w-3 h-3 animate-confetti"
//                 style={{
//                   left: `${randomX}%`,
//                   top: '-20px',
//                   backgroundColor: randomColor,
//                   animationDelay: `${randomDelay}s`,
//                   animationDuration: `${randomDuration}s`,
//                   transform: `rotate(${randomRotation}deg)`,
//                 }}
//               />
//             );
//           })}
//         </div>
//       )}
      
//       <style>{`
//         @keyframes confetti {
//           0% {
//             transform: translateY(0) rotate(0deg);
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(100vh) rotate(720deg);
//             opacity: 0;
//           }
//         }
//         .animate-confetti {
//           animation: confetti linear forwards;
//         }
//       `}</style>
//       {/* Hero Section */}
//       <div className="relative overflow-hidden py-24 min-h-[600px]">
//         {/* Animated Background Slider */}
//         <div className="absolute inset-0">
//           {heroBannerImages.map((img, idx) => (
//             <div
//               key={idx}
//               className={`absolute inset-0 transition-opacity duration-1000 ${
//                 idx === currentSlide ? 'opacity-100' : 'opacity-0'
//               }`}
//             >
//               <img
//                 src={img}
//                 alt={`Couple ${idx + 1}`}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-r from-pink-600/60 via-rose-600/50 to-purple-600/60"></div>
//             </div>
//           ))}
//         </div>

//         {/* Decorative blur effects */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl"></div>
//           <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-yellow-300 blur-3xl"></div>
//         </div>
        
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
//           <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/30">
//             <Heart className="w-5 h-5 text-white animate-pulse" fill="currentColor" />
//             <span className="text-white font-semibold">Real Love, Real Stories</span>
//           </div>
          
//           <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight font-cursive drop-shadow-2xl">
//             Success Stories from Our
//             <br />
//             <span className="text-yellow-300">Happy Couples</span>
//           </h1>
          
//           <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
//             <strong className="text-white">Because every match is a beautiful story.</strong> We're proud to have brought thousands of hearts together. Here are a few couples who found their perfect match through our platform.
//           </p>
//         </div>
//       </div>

      

//       {/* Featured Story - Heart Shape */}
//       {featuredStory && (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-8 py-4 rounded-full mb-6 shadow-xl">
//               <Medal className="w-8 h-8" />
//               <span className="text-xl font-black">COUPLE OF THE MONTH</span>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 font-cursive">Featured Love Story</h2>
//           </div>
          
//           <div className="relative max-w-5xl mx-auto">
//             {/* Heart-shaped container */}
//             <div className="relative group">
//               <div className={`absolute -inset-8 bg-gradient-to-r ${featuredStory.color} opacity-20 blur-3xl rounded-full group-hover:opacity-30 transition-all`}></div>
              
//               <div className="relative bg-white rounded-[4rem] shadow-2xl overflow-hidden border-4 border-white">
//                 <div className="grid md:grid-cols-2 gap-0">
//                   {/* Image without any shape - transparent background supported */}
//                   <div className="relative flex items-center justify-center p-8">
//                     <div className="relative flex items-center justify-center w-full max-w-6xl mx-auto">                     
//                       <img 
//                         src={featuredStory.image}
//                         alt={featuredStory.names}
//                         className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-700"
//                         style={{ maxHeight: '900px' }}
//                       />
//                     </div>
//                   </div>
                  
//                   {/* Content */}
//                   <div className="p-10 md:p-12 flex flex-col justify-center">
//                     <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full mb-6 w-fit">
//                       <Star className="w-5 h-5 text-yellow-600" fill="currentColor" />
//                       <span className="font-bold text-yellow-600">Featured</span>
//                     </div>
                    
//                     <h3 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent font-cursive">
//                       {featuredStory.names}
//                     </h3>
                    
//                     <div className="flex flex-wrap gap-3 mb-6">
//                       <div className={`flex items-center gap-2 bg-gradient-to-r ${featuredStory.color} text-white px-4 py-2 rounded-full shadow-lg`}>
//                         <MapPin className="w-4 h-4" />
//                         <span className="font-semibold text-sm">{featuredStory.location}</span>
//                       </div>
//                       <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
//                         <Calendar className="w-4 h-4 text-gray-600" />
//                         <span className="font-semibold text-sm text-gray-700">{featuredStory.marriedDate}</span>
//                       </div>
//                     </div>
                    
//                     <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 mb-6">
//                       <Quote className="w-10 h-10 text-pink-400 mb-3" />
//                       <p className="text-gray-700 leading-relaxed mb-4">
//                         {featuredStory.story}
//                       </p>
//                       <p className="text-lg font-bold text-gray-900 italic">
//                         "{featuredStory.testimonial}"
//                       </p>
//                     </div>
                    
//                     <div className="flex gap-2">
//                       <button className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-all hover:scale-110">
//                         <Facebook className="w-5 h-5 text-blue-600" />
//                       </button>
//                       <button className="p-3 bg-pink-100 rounded-full hover:bg-pink-200 transition-all hover:scale-110">
//                         <Instagram className="w-5 h-5 text-pink-600" />
//                       </button>
//                       <button className="p-3 bg-green-100 rounded-full hover:bg-green-200 transition-all hover:scale-110">
//                         <MessageCircle className="w-5 h-5 text-green-600" />
//                       </button>
//                       <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 px-6 py-3 rounded-full hover:bg-gray-200 transition-all font-bold">
//                         <Share2 className="w-5 h-5" />
//                         Share
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Mirror Effect Cards Grid */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 font-cursive">
//             More Success Stories
//           </h2>
//           <p className="text-xl text-gray-600">Every couple has a unique journey to love</p>
//         </div>
        
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {stories.filter(s => !s.isFeatured).map((story, idx) => (
//             <div key={story.id} className="group relative">
//               {/* Mirror reflection effect */}
//               <div className="absolute -bottom-10 left-0 right-0 h-32 opacity-20 blur-sm" style={{
//                 background: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))`,
//                 transform: 'scaleY(-1)'
//               }}>
//                 <img src={story.image} alt="" className="w-full h-full object-cover rounded-t-[3rem]" />
//               </div>
              
//               {/* Main Card */}
//               <div className="relative bg-white rounded-[3rem] shadow-2xl overflow-hidden border-4 border-white transform transition-all duration-500 hover:-translate-y-4 hover:shadow-3xl">
//                 {/* Background pattern */}
//                 <div className="absolute inset-0 opacity-5">
//                   <div className="absolute top-0 right-0 w-40 h-40">
//                     <Heart className="w-full h-full text-pink-500" fill="currentColor" />
//                   </div>
//                   <div className="absolute bottom-0 left-0 w-32 h-32">
//                     <Heart className="w-full h-full text-purple-500" fill="currentColor" />
//                   </div>
//                 </div>
                
//                 {/* Image section */}
//                 <div className="relative h-80 overflow-hidden">
//                   <img 
//                     src={story.image}
//                     alt={story.names}
//                     className="w-full h-full object-cover transform group-hover:scale-125 transition-transform duration-700"
//                   />
                  
//                   {/* Heart overlay */}
//                   <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl group-hover:scale-125 transition-transform">
//                     <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
//                   </div>
                  
//                   {/* Names on image */}
//                   <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
//                     <h3 className="text-2xl md:text-3xl font-black text-white mb-2 font-cursive">
//                       {story.names}
//                     </h3>
//                     <div className="flex items-center gap-2 text-white/90 text-sm">
//                       <MapPin className="w-4 h-4" />
//                       <span>{story.location}</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Content */}
//                 <div className="relative p-6">
//                   <div className="flex items-center gap-2 text-gray-600 mb-4">
//                     <Calendar className="w-4 h-4" />
//                     <span className="text-sm font-semibold">Married {story.marriedDate}</span>
//                   </div>
                  
//                   <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-4">
//                     <p className="text-gray-700 leading-relaxed text-sm line-clamp-3">
//                       {story.story}
//                     </p>
//                   </div>
                  
//                   <div className="bg-pink-50 border-l-4 border-pink-500 rounded-lg p-4 mb-4">
//                     <Quote className="w-5 h-5 text-pink-400 mb-2" />
//                     <p className="text-xs italic text-gray-700 font-medium line-clamp-2">
//                       "{story.testimonial}"
//                     </p>
//                   </div>
                  
//                   <div className="flex gap-2">
//                     <button className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-all">
//                       <Facebook className="w-4 h-4 text-blue-600" />
//                     </button>
//                     <button className="p-2 bg-pink-100 rounded-full hover:bg-pink-200 transition-all">
//                       <Instagram className="w-4 h-4 text-pink-600" />
//                     </button>
//                     <button className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition-all">
//                       <MessageCircle className="w-4 h-4 text-green-600" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Share Your Story CTA */}
//       <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 py-20">
//         <div className="absolute inset-0 opacity-10">
//           <Heart className="absolute top-10 left-10 w-64 h-64" fill="currentColor" />
//           <Heart className="absolute bottom-10 right-10 w-96 h-96" fill="currentColor" />
//         </div>
        
//         <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-8 animate-pulse">
//             <Heart className="w-14 h-14 text-white" fill="currentColor" />
//           </div>
          
//           <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-cursive">
//             Share Your Love Story
//           </h2>
          
//           <p className="text-xl text-pink-100 mb-10 max-w-2xl mx-auto">
//             Did you find your perfect match through our platform? We'd love to hear your story and celebrate your happiness!
//           </p>
          
//           <button 
//             onClick={() => setShowSubmitForm(true)}
//             className="bg-white text-pink-600 px-10 py-5 rounded-full text-xl font-black shadow-2xl hover:scale-105 transform transition-all inline-flex items-center gap-3"
//           >
//             <Upload className="w-6 h-6" />
//             Submit Your Story
//           </button>
//         </div>
//       </div>

//       {/* Submit Form Modal */}
//       {showSubmitForm && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setShowSubmitForm(false)}>
//           <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
//             <div className="p-8">
//               <div className="flex items-center justify-between mb-8">
//                 <div>
//                   <h3 className="text-3xl font-black text-gray-900 font-cursive">Share Your Story</h3>
//                   <p className="text-gray-600 mt-2">Help inspire other couples!</p>
//                 </div>
//                 <button 
//                   onClick={() => setShowSubmitForm(false)}
//                   className="bg-gray-100 text-gray-800 w-12 h-12 rounded-full hover:bg-gray-200 transition-all flex items-center justify-center"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>
              
//               <div className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-bold text-gray-700 mb-2">Your Names *</label>
//                     <input 
//                       type="text" 
//                       value={formData.names}
//                       onChange={(e) => setFormData({...formData, names: e.target.value})}
//                       placeholder="e.g., Rahul & Priya"
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-all"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
//                     <input 
//                       type="email" 
//                       value={formData.email}
//                       onChange={(e) => setFormData({...formData, email: e.target.value})}
//                       placeholder="your@email.com"
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-all"
//                     />
//                   </div>
//                 </div>
                
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-bold text-gray-700 mb-2">City, State *</label>
//                     <input 
//                       type="text" 
//                       value={formData.location}
//                       onChange={(e) => setFormData({...formData, location: e.target.value})}
//                       placeholder="e.g., Chennai, Tamil Nadu"
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-all"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-bold text-gray-700 mb-2">Marriage Date</label>
//                     <input 
//                       type="text" 
//                       value={formData.date}
//                       onChange={(e) => setFormData({...formData, date: e.target.value})}
//                       placeholder="e.g., January 2025"
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-all"
//                     />
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-bold text-gray-700 mb-2">Your Love Story *</label>
//                   <textarea 
//                     rows={5}
//                     value={formData.story}
//                     onChange={(e) => setFormData({...formData, story: e.target.value})}
//                     placeholder="Tell us how you met, what made you click, and your journey together..."
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-all resize-none"
//                   ></textarea>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-bold text-gray-700 mb-2">Upload Photo (Optional)</label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-pink-500 transition-all cursor-pointer bg-gradient-to-br from-pink-50 to-purple-50">
//                     <input 
//                       type="file" 
//                       accept="image/*" 
//                       onChange={handleImageUpload}
//                       className="hidden" 
//                       id="photo-upload"
//                     />
//                     <label htmlFor="photo-upload" className="cursor-pointer">
//                       {formData.imagePreview ? (
//                         <div>
//                           <img src={formData.imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-xl mx-auto mb-3" />
//                           <p className="text-gray-600 font-semibold">Click to change photo</p>
//                         </div>
//                       ) : (
//                         <div>
//                           <Upload className="w-12 h-12 text-pink-400 mx-auto mb-3" />
//                           <p className="text-gray-600 font-semibold">Click to upload or drag and drop</p>
//                           <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
//                         </div>
//                       )}
//                     </label>
//                   </div>
//                 </div>
                
//                 <button 
//                   onClick={handleSubmit}
//                   className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black py-4 px-8 rounded-full hover:shadow-xl transform hover:scale-105 transition-all text-lg flex items-center justify-center gap-3"
//                 >
//                   <Send className="w-6 h-6" />
//                   Submit Your Story
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SuccessStory;

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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      
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
      <div className="max-w-7xl mx-auto py-20 px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-8 py-3 rounded-full">
            <Medal className="w-6 h-6 mr-2" /> COUPLE OF THE MONTH
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
          <img src={featuredStory.image} alt={featuredStory.names} className="object-cover w-full h-full" />
          <div className="p-10 flex flex-col justify-center">
            <h3 className="text-4xl font-cursive text-pink-600 mb-4">{featuredStory.names}</h3>
            <div className="flex gap-3 mb-4">
              <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${featuredStory.color} text-white`}>
                <MapPin className="w-4 h-4 inline mr-2" />
                {featuredStory.location}
              </div>
              <div className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold">
                <Calendar className="w-4 h-4 inline mr-2" /> {featuredStory.marriedDate}
              </div>
            </div>
            <p className="text-gray-700 italic mb-4">"{featuredStory.story}"</p>
            <p className="font-bold text-gray-900">{featuredStory.testimonial}</p>
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
