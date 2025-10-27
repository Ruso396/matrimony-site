import React, { useState, useEffect } from "react";
import axios from "axios";
import { Heart, Filter, X } from "lucide-react";
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
  const [biodataType, setBiodataType] = useState<string>("All");
  const [division, setDivision] = useState<string>("All");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch from API
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/register/users");
        const result = Array.isArray(res.data)
          ? res.data
          : res.data.users || res.data.data || [];
        setProfiles(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profiles:", error);
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

  const filtered = profiles.filter((p) => {
    if (p.age < ageRange[0] || p.age > ageRange[1]) return false;
    if (biodataType === "Brides" && p.gender !== "Female") return false;
    if (biodataType === "Grooms" && p.gender !== "Male") return false;
    if (division !== "All" && p.state !== division) return false;
    return true;
  });

  const handleViewDetails = (id: number) => {
    console.log(`Viewing profile ${id}`);
  };

  // ✅ Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Loading profiles...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 text-gray-800 mt-20 py-10">
      {/* ===== HEADER ===== */}
      <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl font-bold">All Biodatas</h1>
            <p className="text-xs text-gray-500">
              {filtered.length} profiles available
            </p>
          </div>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-xs font-semibold hover:shadow-md transition"
          >
            <Filter size={14} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* ===== FILTER MODAL ===== */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-xl shadow-xl animate-slide-up max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
              <h2 className="text-base font-bold">Filter Profiles</h2>
              <button
                onClick={() => setFiltersOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-4 space-y-4 text-sm">
              {/* Age Range */}
              <div>
                <label className="block text-xs font-medium mb-2">
                  Age Range: {ageRange[0]} - {ageRange[1]}
                </label>
                <input
                  type="range"
                  min={18}
                  max={60}
                  value={ageRange[1]}
                  onChange={(e) =>
                    setAgeRange([ageRange[0], parseInt(e.target.value)])
                  }
                  className="w-full accent-orange-500"
                />
              </div>

              {/* Biodata Type */}
              <div>
                <label className="block text-xs font-medium mb-2">
                  Biodata Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["All", "Brides", "Grooms"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setBiodataType(type)}
                      className={`py-2 text-xs rounded font-semibold transition ${
                        biodataType === type
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Division */}
              <div>
                <label className="block text-xs font-medium mb-2">
                  Division (State)
                </label>
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="w-full px-3 py-2 border text-xs rounded focus:ring-1 focus:ring-orange-500"
                >
                  {[
                    "All",
                    "Alabama",
                    "Alaska",
                    "Arizona",
                    "California",
                    "Florida",
                    "Texas",
                    "New York",
                    "Illinois",
                    "Ohio",
                    "Washington",
                    "Virginia",
                  ].map((div) => (
                    <option key={div}>{div}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded font-semibold hover:shadow-md transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== PROFILES GRID ===== */}
      <main className="max-w-7xl mx-auto px-3 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {filtered.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition flex flex-col overflow-hidden group"
            >
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-square overflow-hidden">
                <img
                  src={
                    profile.profilePhoto ||
                    "https://via.placeholder.com/400x400?text=No+Image"
                  }
                  alt={profile.fullName}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <button
                  onClick={() => toggleFavorite(profile.id)}
                  className={`absolute top-2 right-2 p-1.5 lg:p-2 rounded-full transition ${
                    favorites.has(profile.id)
                      ? "bg-red-500 text-white"
                      : "bg-white/90 text-red-400 hover:bg-white"
                  }`}
                >
                  <Heart
                    size={14}
                    className="lg:w-4 lg:h-4"
                    fill={favorites.has(profile.id) ? "white" : "none"}
                  />
                </button>
              </div>

              <div className="p-2 lg:p-3 text-[11px] lg:text-sm flex flex-col gap-1 lg:gap-2 flex-grow">
                <h3 className="font-bold text-gray-800 lg:text-base">
                  {profile.fullName}
                </h3>
                <p className="text-gray-500 text-[10px] lg:text-xs">
                  ID: {profile.id}
                </p>
                <p className="text-gray-600 text-[10px] lg:text-xs">
                  {profile.occupation}, {profile.state}
                </p>
                <p className="text-orange-600 font-semibold text-[10px] lg:text-xs">
                  Age: {profile.age}
                </p>

                <button
                 onClick={() => navigate(`/profiledetails/${profile.id}`)}
                  className="mt-auto w-full py-1.5 lg:py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] lg:text-sm font-semibold rounded hover:shadow-md transition lg:w-4/5 lg:mx-auto"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">No profiles found</p>
          </div>
        )}
      </main>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
        @media (max-width: 475px) {
          h1 { font-size: 1rem; }
          .text-xs { font-size: 0.65rem; }
          .text-[10px] { font-size: 0.6rem; }
          .text-[11px] { font-size: 0.68rem; }
          .py-1, .py-1\\.5 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
          .p-2 { padding: 0.4rem; }
        }
      `}</style>
    </div>
  );
};

export default BioData;
