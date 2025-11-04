import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Clock, Heart } from "lucide-react";
import { format } from "date-fns";

interface Story {
  id: number;
  names: string;
  location: string;
  date: string;
  story: string;
  image: string;
  createdAt: string;
}

const StoryDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const story = location.state?.story as Story;

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Story not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-brand-600 to-accent-500 text-white rounded-full font-semibold hover:scale-105 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "/placeholder-image.jpg";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    const cleanPath = imagePath.startsWith("/") ? imagePath.substring(1) : imagePath;
    return `http://localhost:5000/${cleanPath}`;
  };

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy 'at' hh:mm a");
    } catch {
      return dateString;
    }
  };

  return (
    <section className="min-h-screen relative py-12 sm:py-16 px-3 xs:px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      {/* Inline Animations */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeUp { animation: fadeUp 0.8s ease-out both; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out both; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out both; }
        .animate-scaleIn { animation: scaleIn 0.6s ease-out both; }
      `}</style>

      {/* Decorative Blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl opacity-60 animate-float" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl opacity-60 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 text-gray-700 font-medium animate-fadeUp"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Stories
        </button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image */}
          <div className="animate-slideInLeft">
            <div className="sticky top-8">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-gradient-to-br from-brand-100 to-accent-100">
                <img
                  src={getImageUrl(story.image)}
                  alt={story.names}
                  className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-image.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Floating Hearts */}
                <div className="absolute top-6 right-6 animate-float">
                  <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                  </div>
                </div>
              </div>

              {/* Image Caption */}
              <div className="mt-6 text-center animate-fadeUp" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
                  {story.names}
                </h3>
                <div className="mt-3 flex items-center justify-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-500" />
                    <span className="text-sm">{story.location}</span>
                  </div>
                  {story.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent-500" />
                      <span className="text-sm">{story.date}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Story Content */}
          <div className="animate-slideInRight">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl">
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-100 to-accent-100 text-brand-700 text-sm font-semibold mb-6 animate-scaleIn">
                <Heart className="w-4 h-4 fill-current" />
                Love Story
              </div>

              {/* Story Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight animate-fadeUp" style={{ animationDelay: '0.1s' }}>
                Our Journey Together
              </h1>

              {/* Story Content */}
              <div className="prose prose-lg max-w-none animate-fadeUp" style={{ animationDelay: '0.2s' }}>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base sm:text-lg space-y-4">
                  {story.story.split('\n').map((paragraph, idx) => (
                    paragraph.trim() && (
                      <p key={idx} className="mb-4">
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

              {/* Story Metadata */}
              <div className="space-y-4 animate-fadeUp" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-brand-50 to-accent-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-brand-700 uppercase tracking-wide">Location</div>
                    <div className="text-gray-800 font-medium mt-1">{story.location}</div>
                  </div>
                </div>

                {story.date && (
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-accent-50 to-pink-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-accent-700 uppercase tracking-wide">Marriage Date</div>
                      <div className="text-gray-800 font-medium mt-1">{story.date}</div>
                    </div>
                  </div>
                )}

                {story.createdAt && (
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl">
                    <Clock className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Shared On</div>
                      <div className="text-gray-800 font-medium mt-1">{formatDateTime(story.createdAt)}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Decorative Quote */}
              <div className="mt-8 p-6 bg-gradient-to-br from-brand-500 to-accent-500 rounded-2xl text-white animate-scaleIn" style={{ animationDelay: '0.4s' }}>
                <div className="text-4xl font-serif mb-2">"</div>
                <p className="text-lg italic leading-relaxed">
                  Every love story is beautiful, but ours is my favorite.
                </p>
                <div className="text-4xl font-serif text-right">"</div>
              </div>

              {/* Action Button */}
              <div className="mt-8 text-center animate-fadeUp" style={{ animationDelay: '0.5s' }}>
                <button
                  onClick={() => navigate(-1)}
                  className="px-8 py-3 bg-gradient-to-r from-brand-600 to-accent-500 text-white rounded-full font-bold text-base shadow-lg hover:shadow-2xl transition-all hover:scale-105 inline-flex items-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Read More Stories
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Section */}
        <div className="mt-16 text-center animate-fadeUp" style={{ animationDelay: '0.6s' }}>
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
            <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-float" />
            <span className="text-gray-700 font-medium">Made with love on our platform</span>
            <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-float" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryDetail;
