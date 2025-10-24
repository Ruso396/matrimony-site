import React, { useState } from 'react';
import { Clock, Mail, Phone, MapPin, Cake, Ruler, Briefcase, Heart, Sun, Facebook, Twitter, Instagram, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, useNavigate } from "react-router-dom";

interface Profile {
    id: number;
    name: string;
    age: number;
    city: string;
    image: string;
}

const ProfileDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const [showContactInfo, setShowContactInfo] = useState(false);

    const relatedProfiles: Profile[] = [
        { id: 1, name: 'Olivia Martinez', age: 32, city: 'Barisal', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
        { id: 2, name: 'Jane Smith', age: 31, city: 'Khulna', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop' },
        { id: 3, name: 'Emily Davis', age: 29, city: 'Rajshahi', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop' },
        { id: 4, name: 'Sophia Brown', age: 35, city: 'Sylhet', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop' },
        { id: 5, name: 'Emma Wilson', age: 34, city: 'Sylhet', image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop' },
        { id: 6, name: 'Ava Johnson', age: 31, city: 'Rajshahi', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop' },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const profilesPerView = 4;

    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev + profilesPerView >= relatedProfiles.length ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? Math.max(0, relatedProfiles.length - profilesPerView) : prev - 1
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-30">

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4">
               <button
                    onClick={() => navigate(-1)}
                    className="mb-6 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Go Back
                </button>
                <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Left Side - Image */}
                    <div className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-400 p-8">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>
                        <div className="absolute top-20 right-10 w-20 h-20 border-4 border-white/20 rounded-full"></div>
                        <div className="absolute bottom-32 left-10 w-16 h-16 border-4 border-white/20 rounded-lg rotate-45"></div>

                        {/* Profile Image Container */}
                        <div className="relative z-10 flex flex-col justify-between">
                            {/* Top Badge */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                                    <span className="text-teal-700 font-bold text-sm">✓ Verified Profile</span>
                                </div>
                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className="bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                                >
                                    <Heart
                                        className="w-6 h-6"
                                        fill={isFavorite ? '#ef4444' : 'none'}
                                        stroke={isFavorite ? '#ef4444' : '#0f766e'}
                                        strokeWidth={2}
                                    />
                                </button>
                            </div>

                            {/* Main Profile Image with Frame */}
                            <div className="relative mx-auto mb-6">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-400 rounded-3xl rotate-6 scale-105 opacity-50 blur-xl"></div>
                                <div className="relative bg-white p-3 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                                    <div className="w-80 h-96 rounded-2xl overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop"
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Corner Decorations */}
                                    <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-teal-500 rounded-tl-xl"></div>
                                    <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-teal-500 rounded-tr-xl"></div>
                                    <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-teal-500 rounded-bl-xl"></div>
                                    <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-teal-500 rounded-br-xl"></div>
                                </div>
                            </div>
                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition shadow-xl hover:shadow-2xl hover:scale-105 transform duration-300">
                                    Send Request
                                </button>
                                <button className="flex-1 bg-white text-teal-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition shadow-xl hover:shadow-2xl hover:scale-105 transform duration-300 border-2 border-white">
                                    Add Favourite
                                </button>
                            </div>
                        </div>

                        {/* Floating Particles */}
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-white/30 rounded-full animate-pulse delay-100"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-white/40 rounded-full animate-pulse delay-200"></div>
                    </div>

                    {/* Right Side - Details */}
                    <div className="p-8">
                        <div className="mb-6">
                            <h1 className="text-4xl font-bold text-teal-900 mb-2">Jenny Zara</h1>
                            <div className="flex items-center gap-4">
                                <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                                    Female
                                </span>
                                <span className="text-gray-600 font-medium">Biodata Id : 1</span>
                            </div>
                        </div>

                        {/* Info Cards */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                                <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                <div className="text-xs text-gray-600 mb-1">City:</div>
                                <div className="text-lg font-bold text-teal-900">Dhaka</div>
                            </div>

                            <div className="bg-cyan-50 rounded-xl p-4 text-center border border-cyan-100">
                                <Cake className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                                <div className="text-xs text-gray-600 mb-1">Age:</div>
                                <div className="text-lg font-bold text-teal-900">31</div>
                            </div>

                            <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100">
                                <Ruler className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                                <div className="text-xs text-gray-600 mb-1">Height:</div>
                                <div className="text-lg font-bold text-teal-900">5.91 ft</div>
                            </div>

                            <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
                                <Briefcase className="w-6 h-6 text-red-600 mx-auto mb-2" />
                                <div className="text-xs text-gray-600 mb-1">Job:</div>
                                <div className="text-lg font-bold text-teal-900">Software Engineer</div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">About</h2>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                John is a passionate software engineer with over 10 years of experience in the tech industry. He enjoys problem-solving and creating innovative solutions. In his free time, he loves hiking, reading tech blogs, and exploring new cuisines. John is looking for a partner who shares his enthusiasm for life and values meaningful connections.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-800">Contact Info</h3>
                                <span className="text-sm text-gray-600">Want to view Contact Info?</span>
                            </div>

                            {showContactInfo ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Phone className="w-4 h-4" />
                                        <span className="text-sm">+880 1234567890</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Mail className="w-4 h-4" />
                                        <span className="text-sm">jenny.zara@email.com</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-gray-500">
                                            <Phone className="w-4 h-4" />
                                            <span className="text-sm">Phone : ********</span>
                                        </div>
                                        <button
                                            onClick={() => setShowContactInfo(true)}
                                            className="text-orange-600 text-xs font-semibold hover:underline"
                                        >
                                            Request Info
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-gray-500">
                                            <Mail className="w-4 h-4" />
                                            <span className="text-sm">Email : ********</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Personal Information & Expecting Sections */}
                <div className="grid lg:grid-cols-2 gap-8 mt-8">
                    {/* Personal Information */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-2">
                            <span className="text-orange-500">👤</span> Personal Information
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600 text-sm">▸ Name :</span>
                                <span className="text-gray-800 font-medium">Jenny Zara</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600 text-sm">▸ Fathers Name :</span>
                                <span className="text-gray-800 font-medium">Robert Doe</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600 text-sm">▸ Mothers Name :</span>
                                <span className="text-gray-800 font-medium">Alice Doe</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600 text-sm">▸ Age :</span>
                                <span className="text-gray-800 font-medium">31</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600 text-sm">▸ Gender :</span>
                                <span className="text-gray-800 font-medium">Female</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600 text-sm">▸ Date Of Birth :</span>
                                <span className="text-gray-800 font-medium">1990-05-15</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600 text-sm">▸ Height :</span>
                                <span className="text-gray-800 font-medium">180 cm</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600 text-sm">▸ Weight :</span>
                                <span className="text-gray-800 font-medium">75 kg</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600 text-sm">▸ Race :</span>
                                <span className="text-gray-800 font-medium">Caucasian</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600 text-sm">▸ Occupation :</span>
                                <span className="text-gray-800 font-medium">Software Engineer</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600 text-sm">▸ Present Division :</span>
                                <span className="text-gray-800 font-medium">Chattagram</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-gray-600 text-sm">▸ Permanent Division :</span>
                                <span className="text-gray-800 font-medium">Dhaka</span>
                            </div>
                        </div>
                    </div>

                    {/* Expecting */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-2">
                            <span className="text-blue-500">📋</span> Expecting
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 py-3 border-b border-gray-100">
                                <span className="w-3 h-3 rounded-full bg-green-500 mt-1"></span>
                                <div>
                                    <span className="text-gray-800 font-medium block">Expected Partner Age : 25-35</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 py-3 border-b border-gray-100">
                                <span className="w-3 h-3 rounded-full bg-green-500 mt-1"></span>
                                <div>
                                    <span className="text-gray-800 font-medium block">Expected Partner Height : 160-180 cm</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 py-3">
                                <span className="w-3 h-3 rounded-full bg-green-500 mt-1"></span>
                                <div>
                                    <span className="text-gray-800 font-medium block">Expected Partner Weight : 50-70 kg</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Profiles */}
                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-teal-900 mb-8">Related Profiles</h2>

                    <div className="relative">
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 transition shadow-lg"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <div className="overflow-hidden">
                            <div
                                className="flex gap-4 transition-transform duration-300"
                                style={{ transform: `translateX(-${currentSlide * (100 / profilesPerView)}%)` }}
                            >
                                {relatedProfiles.map((profile) => (
                                    <div
                                        key={profile.id}
                                        className="flex-shrink-0 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
                                        style={{ width: `calc(${100 / profilesPerView}% - 12px)` }}
                                    >
                                        <div className="relative h-64">
                                            <img
                                                src={profile.image}
                                                alt={profile.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                                                {profile.age} Years Old
                                            </div>
                                        </div>
                                        <div className="p-4 text-center">
                                            <h3 className="font-bold text-gray-800 mb-1">{profile.name}</h3>
                                            <p className="text-sm text-gray-600">City : {profile.city}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={nextSlide}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 transition shadow-lg"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="flex justify-center gap-2 mt-6">
                        {Array.from({ length: Math.ceil(relatedProfiles.length / profilesPerView) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition ${currentSlide === index ? 'bg-teal-600 w-6' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;