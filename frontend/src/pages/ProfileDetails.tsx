import React, { useState, useEffect } from 'react';
import {
    Clock, Mail, Phone, MapPin, Cake, Ruler, Briefcase, Heart,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'; // ✅ NEW

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

const ProfileDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [user, setUser] = useState<UserProfile | null>(null); // ✅ Store user data
    const [loading, setLoading] = useState(true); // ✅ Loader state
    const [error, setError] = useState<string | null>(null);

    const [isFavorite, setIsFavorite] = useState(false);
    const [showContactInfo, setShowContactInfo] = useState(false);

    const [relatedProfiles, setRelatedProfiles] = useState<RelatedProfile[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/api/register/users/${id}`);
                setUser(res.data.user);

                // ✅ Fetch related profiles based on country
                const relatedRes = await axios.get(`http://localhost:5000/api/register/related/${id}`);
                setRelatedProfiles(relatedRes.data.relatedProfiles);


            } catch (err: any) {
                console.error(err);
                setError('Failed to load user details');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchUser();
    }, [id]);

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

    // ✅ Fetch user data from backend
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/api/register/users/${id}`);
                setUser(res.data.user); // 👈 Expecting backend to return { user: {...} }
            } catch (err: any) {
                console.error(err);
                setError('Failed to load user details');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchUser();
    }, [id]);

    if (loading) return <div className="text-center py-20 text-lg">Loading profile...</div>;
    if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
    if (!user) return <div className="text-center py-20 text-gray-600">User not found</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-20">
            <div className="max-w-6xl mx-auto px-4">
                <button
                 
                    onClick={() => navigate(-1)}
                    className="mb-6 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Go Back
                </button>

                {/* ===== PROFILE DETAILS SECTION ===== */}
                <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Left Side - Image */}
                    <div className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-400 p-8">
                        <div className="relative z-10 flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                                    <span className="text-teal-700 font-bold text-sm">✓ Verified Profile</span>
                                </div>
                                <button
                                 
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className="bg-white/95 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                                >
                                    <Heart
                                        className="w-6 h-6"
                                        fill={isFavorite ? '#ef4444' : 'none'}
                                        stroke={isFavorite ? '#ef4444' : '#0f766e'}
                                        strokeWidth={2}
                                    />
                                </button>
                            </div>

                            <div className="relative mx-auto mb-6">
                                <div className="relative bg-white p-3 rounded-3xl shadow-2xl">
                                    <div className="w-80 h-96 rounded-2xl overflow-hidden">
                                        <img
                                            src={user.profilePhoto || 'https://via.placeholder.com/400'}
                                            alt={user.fullName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                 
                                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold hover:scale-105 transition">
                                    Send Request
                                </button>
                                <button 
                                 
                                className="flex-1 bg-white text-teal-700 py-4 rounded-xl font-semibold hover:bg-gray-50 border-2 border-white hover:scale-105 transition">
                                    Add Favourite
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Details */}
                    <div className="p-8">
                        <div className="mb-6">
                            <h1 className="text-4xl font-bold text-teal-900 mb-2">{user.fullName}</h1>
                            <div className="flex items-center gap-4">
                                <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                                    {user.gender}
                                </span>
                                <span className="text-gray-600 font-medium">Biodata ID : {user.id}</span>
                            </div>
                        </div>

                        {/* Info Cards */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                                <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                <div className="text-xs text-gray-600 mb-1">state:</div>
                                <div className="text-lg font-bold text-teal-900">{user.state}</div>
                            </div>

                            <div className="bg-cyan-50 rounded-xl p-4 text-center border border-cyan-100">
                                <Cake className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                                <div className="text-xs text-gray-600 mb-1">Age:</div>
                                <div className="text-lg font-bold text-teal-900">{user.age}</div>
                            </div>

                            <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100">
                                <Ruler className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                                <div className="text-xs text-gray-600 mb-1">Height:</div>
                                <div className="text-lg font-bold text-teal-900">{user.height}</div>
                            </div>

                            <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
                                <Briefcase className="w-6 h-6 text-red-600 mx-auto mb-2" />
                                <div className="text-xs text-gray-600 mb-1">Occupation:</div>
                                <div className="text-lg font-bold text-teal-900">{user.occupation}</div>
                            </div>
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
                                        <span className="text-sm">{user.mobile}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Mail className="w-4 h-4" />
                                        <span className="text-sm">{user.email}</span>
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

                {/* Related Profiles */}
                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-teal-900 mb-8">Related Profiles</h2>
                    <div className="relative">
                        <button
                         
                         onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 transition shadow-lg">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="overflow-hidden">
                            <div className="flex gap-4 transition-transform duration-300"
                                style={{ transform: `translateX(-${currentSlide * (100 / profilesPerView)}%)` }}>
                                {relatedProfiles.map((profile) => (
                                    <div key={profile.id} className="flex-shrink-0 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
                                        style={{ width: `calc(${100 / profilesPerView}% - 12px)` }}>
                                        <div className="relative h-64">
                                            <img src={profile.profilePhoto} alt={profile.name} className="w-full h-full object-cover" />
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
                         
                        onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 transition shadow-lg">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
