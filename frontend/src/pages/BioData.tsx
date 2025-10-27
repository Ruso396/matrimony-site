import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, MapPin, Briefcase, User, Sparkles } from 'lucide-react';
import { useNavigate } from "react-router-dom";

interface UserProfile {
  id: number;
  fullName: string;
  gender: string;
  age: number;
  occupation: string;
  state: string;
  profilePhoto: string;
}

const BioData: React.FC = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 60]);
  const [biodataType, setBiodataType] = useState<string>('All');
  const [division, setDivision] = useState<string>('All');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch data from backend API
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/register/users');
        console.log("API Response:", res.data);
        const result = Array.isArray(res.data)
          ? res.data
          : res.data.users || res.data.data || [];
        setProfiles(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profiles:', error);
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) newFavorites.delete(id);
    else newFavorites.add(id);
    setFavorites(newFavorites);
  };

  // ✅ Apply filters
  const filteredProfiles = profiles.filter(profile => {
    if (profile.age < ageRange[0] || profile.age > ageRange[1]) return false;
    if (division !== 'All' && profile.state !== division) return false;
    if (biodataType === 'Brides' && profile.gender !== 'Female') return false;
    if (biodataType === 'Grooms' && profile.gender !== 'Male') return false;
    return true;
  });

  // ✅ Handle loading
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 text-lg">Loading profiles...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-30">
      <div className="container mx-auto px-4 py-8">

        {/* Filter Options */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-10 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-blue-600">✦</span> Filter Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Age Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Age Range</label>
              <input
                type="range"
                min={18}
                max={60}
                value={ageRange[1]}
                onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-blue-200 rounded-lg cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span className="font-medium">{ageRange[0]}</span>
                <span className="font-medium">{ageRange[1]}</span>
              </div>
            </div>

            {/* Biodata Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Biodata Type</label>
              <select
                value={biodataType}
                onChange={(e) => setBiodataType(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all bg-white"
              >
                <option>All</option>
                <option>Brides</option>
                <option>Grooms</option>
              </select>
            </div>

            {/* Division (U.S. States) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Division (State)</label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all bg-white"
              >
                <option>All</option>
                {[
                  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
                  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana",
                  "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
                  "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
                  "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
                  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
                  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
                  "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
                ].map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20">
          {filteredProfiles.map(profile => (
            <div key={profile.id} className="group bg-white rounded-2xl shadow-md border border-blue-100">
              <div className="relative h-60 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-100 to-indigo-100 opacity-40"></div>

                {/* Profile Image */}
                <div className="absolute inset-3 flex items-center justify-center">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={profile.profilePhoto || 'https://via.placeholder.com/400x400?text=No+Image'}
                      alt={profile.fullName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60"></div>
                  </div>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(profile.id)}
                  className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-200 z-10 border-2 border-blue-100"
                >
                  <Heart
                    className={`w-4 h-4 transition-all ${favorites.has(profile.id)
                      ? 'fill-red-500 text-red-500 scale-110'
                      : 'text-gray-400'
                      }`}
                  />
                </button>

                {/* Biodata ID */}
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 border border-white/30">
                    <Sparkles className="w-3 h-3" />
                    ID: {profile.id}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    {profile.gender === 'Female' ? 'Bride' : 'Groom'}
                  </h3>
                  <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-1">
                    {profile.age} years
                  </p>
                </div>

                <div className="space-y-1.5 mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-500" />
                    <span>{profile.occupation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>{profile.state}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/profiledetails/${profile.id}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProfiles.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💔</div>
            <p className="text-gray-500 text-lg font-medium">No profiles found matching your filters.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BioData;
