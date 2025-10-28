import React, { useState, useEffect } from 'react';
import {
    Mail, Phone, MapPin, Cake, Ruler, Briefcase, Heart,
    ChevronLeft, ChevronRight, GraduationCap, DollarSign, Globe,
    Users, BookOpen, Clock
} from 'lucide-react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

// Interface definitions remain the same
interface UserProfile {
    id: number;
    profileFor: string;
    fullName: string;
    gender: string;
    dob: string;
    age: number;
    religion: string;
    motherTongue: string;
    maritalStatus: string;
    caste: string;
    height: string;
    education: string;
    occupation: string;
    annualIncome: string;
    country: string;
    state: string;
    city: string;
    email: string;
    mobile: string;
    profilePhoto: string | null;
    createdAt: string;
}

interface RelatedProfile {
    id: number;
    name: string;
    age: number;
    city: string;
    profilePhoto: string;
}

// Helper component for detail items
interface DetailItemProps {
    icon: React.ElementType;
    label: string;
    value: string | number;
    color: string; // Tailwind color class for icon
}

const DetailItem: React.FC<DetailItemProps> = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-start p-3 sm:p-4 border-b border-gray-100 last:border-b-0">
        <Icon className={`w-5 h-5 ${color} flex-shrink-0 mt-0.5`} />
        <div className="ml-4 flex flex-col min-w-0">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider truncate">{label}</span>
            <span className="text-sm sm:text-base font-semibold text-gray-800 break-words">{value}</span>
        </div>
    </div>
);

// Helper component for Info Cards in the Hero Section
interface InfoCardProps {
    icon: React.ElementType;
    label: string;
    value: string | number;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, label, value }) => (
    <div className="bg-white rounded-lg p-3 shadow-md border border-gray-100 text-center flex flex-col justify-center items-center min-h-[90px] w-full">
        <Icon className="w-5 h-5 text-indigo-600 mb-1" />
        <div className="text-xs font-medium text-gray-500 uppercase truncate">{label}</div>
        <div className="text-sm sm:text-lg font-bold text-gray-900 truncate">{value}</div>
    </div>
);


const ProfileDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // State management remains the same
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isFavorite, setIsFavorite] = useState(false); // Unused, but kept for future functionality
    const [showContactInfo, setShowContactInfo] = useState(false);

    const [relatedProfiles, setRelatedProfiles] = useState<RelatedProfile[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const profilesPerView = 2; // For mobile
    const smProfilesPerView = 3; // For small screens
    const lgProfilesPerView = 4; // For large screens

    const getProfilesPerView = () => {
        if (window.innerWidth >= 1024) return lgProfilesPerView;
        if (window.innerWidth >= 640) return smProfilesPerView;
        return profilesPerView;
    };

    const fetchProfileData = async () => {
        if (!id) return;
        try {
            setLoading(true);
            setError(null);

            // Fetch main user profile
            const userRes = await axios.get(`http://localhost:5000/api/register/users/${id}`);
            setUser(userRes.data.user);

            // Fetch related profiles
            const relatedRes = await axios.get(`http://localhost:5000/api/register/related/${id}`);
            setRelatedProfiles(relatedRes.data.relatedProfiles);

        } catch (err: any) {
            console.error('Fetch error:', err);
            setError('Failed to load profile details or related profiles.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, [id]); // Re-fetch when ID changes

    // Carousel controls
    const nextSlide = () => {
        const currentPpv = getProfilesPerView();
        const maxIndex = relatedProfiles.length - currentPpv;
        setCurrentSlide((prev) => {
            if (prev + currentPpv >= relatedProfiles.length) {
                return 0; // Loop to start
            }
            return prev + 1;
        });
    };

    const prevSlide = () => {
        const currentPpv = getProfilesPerView();
        const maxIndex = relatedProfiles.length - currentPpv;
        setCurrentSlide((prev) => {
            if (prev === 0) {
                return Math.max(0, maxIndex);
            }
            return prev - 1;
        });
    };

    // Handle responsiveness for carousel size on window resize
    useEffect(() => {
        const handleResize = () => {
            // Reset slide index on resize to prevent empty space
            setCurrentSlide(0);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Loader/Error States
    if (loading) return <div className="text-center py-20 text-lg text-gray-600">Loading professional profile...</div>;
    if (error) return <div className="text-center py-20 text-red-600 font-semibold">{error}</div>;
    if (!user) return <div className="text-center py-20 text-gray-600">Profile data not found.</div>;

    // Determine card width for different screen sizes (Responsive Carousel)
    const getCardWidthStyle = () => {
        const ppv = getProfilesPerView();
        // Calculate the percentage width for each card, minus a small margin (e.g., 10px) to account for gap-4
        // The width is dynamically calculated based on the profilesPerView
        return {
            width: `calc(${100 / ppv}% - ${((ppv - 1) * 4) / ppv}px)`, // Adjust for gap-4 (16px total margin for 4 cards, so 4px per card)
        };
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans mt-17">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium transition-colors flex items-center gap-2 text-sm shadow-sm"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Listings
                </button>

                {/* ===== PROFILE DETAILS HERO SECTION ===== */}
                <div className="bg-white rounded-xl shadow-2xl shadow-gray-200 overflow-hidden border border-gray-100">
                    <div className="grid md:grid-cols-3 lg:grid-cols-4">
                        {/* Left Side - Image and Primary Info (Col 1 of 4) */}
                        <div className="md:col-span-1 bg-gray-800 p-6 flex flex-col items-center justify-center text-white space-y-4">
                            <div className="relative p-1 bg-white rounded-lg shadow-xl">
                                <div className="w-40 h-48 sm:w-56 sm:h-64 rounded-md overflow-hidden">
                                    <img
                                        src={user.profilePhoto || 'https://via.placeholder.com/300?text=No+Photo'}
                                        alt={user.fullName}
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-center mt-2 truncate max-w-full">{user.fullName}</h1>
                            <p className="text-sm font-light opacity-80">{user.occupation}</p>
                            <div className="flex items-center space-x-2 text-sm">
                                <MapPin className="w-4 h-4" />
                                <span>{user.city}, {user.country}</span>
                            </div>
                            <div className="flex items-center justify-center space-x-4 pt-2">
                                {/* Action Buttons */}
                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`p-2 rounded-full transition-colors ${isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                                    aria-label="Toggle Favorite"
                                >
                                    <Heart className="w-5 h-5" fill={isFavorite ? 'white' : 'none'} color="white" />
                                </button>
                                <button
                                    onClick={() => setShowContactInfo(true)}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold text-sm transition-colors shadow-lg"
                                >
                                    View Contact
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Quick Info Cards & Contact (Cols 2-4) */}
                        <div className="md:col-span-2 lg:col-span-3 p-6 sm:p-8">
                            <div className="flex justify-between items-start border-b pb-4 mb-6">
                                <div className="space-y-1">
                                    <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">
                                        {user.profileFor} Profile
                                    </span>
                                    
                                </div>
                                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                    ✓ Verified
                                </div>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <InfoCard icon={Cake} label="Age" value={`${user.age} Years`} />
                                <InfoCard icon={Ruler} label="Height" value={user.height} />
                                <InfoCard icon={Briefcase} label="Status" value={user.maritalStatus} />
                                <InfoCard icon={MapPin} label="Location" value={user.state} />
                            </div>

                            {/* Contact & Detailed Information Sections */}
                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Detailed Information Panel */}
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <h3 className="text-lg font-bold text-gray-800 p-4 border-b bg-gray-50">Detailed Information</h3>
                                    <div className="divide-y divide-gray-100">
                                        <DetailItem icon={Users} label="Gender" value={user.gender} color="text-pink-600" />
                                        <DetailItem icon={BookOpen} label="Religion" value={user.religion} color="text-amber-600" />
                                        <DetailItem icon={GraduationCap} label="Education" value={user.education} color="text-indigo-600" />
                                        <DetailItem icon={DollarSign} label="Income" value={user.annualIncome} color="text-green-600" />
                                        <DetailItem icon={Globe} label="Mother Tongue" value={user.motherTongue} color="text-blue-600" />
                                        <DetailItem icon={Clock} label="Profile Date" value={new Date(user.createdAt).toLocaleDateString()} color="text-gray-600" />
                                    </div>
                                </div>

                                {/* Contact Info Panel */}
                                <div className="border border-gray-200 rounded-lg overflow-hidden h-fit">
                                    <h3 className="text-lg font-bold text-gray-800 p-4 border-b bg-gray-50">Private Contact Details</h3>
                                    <div className="p-4 space-y-4">
                                        {showContactInfo ? (
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-gray-700">
                                                    <Phone className="w-5 h-5 text-indigo-600" />
                                                    <span className="text-base font-medium">{user.mobile}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-700">
                                                    <Mail className="w-5 h-5 text-indigo-600" />
                                                    <span className="text-base font-medium">{user.email}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-4 text-center">
                                                <div className="flex items-center justify-center gap-6">
                                                    <div className="flex items-center gap-3 text-gray-500">
                                                        <Phone className="w-5 h-5" />
                                                        <span className="text-sm font-mono">Phone: ********</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-gray-500">
                                                        <Mail className="w-5 h-5" />
                                                        <span className="text-sm font-mono">Email: ********</span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setShowContactInfo(true)}
                                                    className="w-full sm:w-auto px-6 py-2 bg-indigo-100 text-indigo-700 rounded-md font-semibold text-sm hover:bg-indigo-200 transition"
                                                >
                                                    Reveal Contact Information
                                                </button>
                                                <p className="text-xs text-gray-500 mt-2">A small fee may apply to view full contact details.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- */}

                {/* Related Profiles Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Similar Profiles</h2>
                    {relatedProfiles.length > 0 ? (
                        <div className="relative">
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 sm:-translate-x-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition shadow-lg opacity-80 hover:opacity-100 disabled:opacity-50"
                                disabled={currentSlide === 0}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div className="overflow-hidden">
                                <div className="flex gap-4 transition-transform duration-300 ease-in-out"
                                    style={{ transform: `translateX(-${currentSlide * 100 / getProfilesPerView()}%)` }}>
                                    {relatedProfiles.map((profile) => (
                                        <div
                                            key={profile.id}
                                            className="flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition cursor-pointer"
                                            style={getCardWidthStyle()}
                                            onClick={() => navigate(`/profile/${profile.id}`)} // Navigate to the related profile
                                        >
                                            <div className="relative h-48 sm:h-56">
                                                <img
                                                    src={profile.profilePhoto || 'https://via.placeholder.com/300?text=No+Photo'}
                                                    alt={profile.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center">
                                                    <span className="text-sm font-semibold">{profile.age} Years Old</span>
                                                </div>
                                            </div>
                                            <div className="p-3 text-center">
                                                <h3 className="font-bold text-gray-800 mb-1 truncate">{profile.name}</h3>
                                                <p className="text-xs text-gray-600">Location: {profile.city}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 sm:translate-x-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition shadow-lg opacity-80 hover:opacity-100 disabled:opacity-50"
                                disabled={currentSlide >= relatedProfiles.length - getProfilesPerView()}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <p className="text-center py-8 text-gray-500">No similar profiles found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;