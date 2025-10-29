import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, MapPin, Briefcase, User, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";
import { Filter, X } from "lucide-react";

interface UserProfile {
  id: number;
  fullName: string;
  gender: string;
  age: number;
  occupation: string;
  state: string;
  profilePhoto: string;
  imageSrc?: string; // blob or direct url used in <img>
}


const BioData: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userIdFromUrl = queryParams.get('userId');

  const userId = userIdFromUrl || localStorage.getItem('userId');

  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 60]);
  const [biodataType, setBiodataType] = useState<string>("All");
  const [division, setDivision] = useState<string>("All");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch from API
// ✅ Fetch profiles once
useEffect(() => {
  const fetchProfiles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/register/users");
      const result = Array.isArray(res.data)
        ? res.data
        : res.data.users || res.data.data || [];

      // Initialize profiles without imageSrc
      const initProfiles = result.map((p: any) => ({ ...p, imageSrc: undefined }));
      setProfiles(initProfiles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      if (!userId) return;
      const res = await axios.get(`http://localhost:5000/api/favorites/${userId}`);
      const favs = res.data?.favorites || [];
      const favSet = new Set<number>(favs.map((f: any) => Number(f.favoriteUserId)));
      setFavorites(favSet);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  fetchProfiles();
  fetchFavorites();
}, [userId]);


// ✅ Load images once *after* profiles fetched, not every time profiles change
useEffect(() => {
  if (profiles.length === 0) return;
  const token = localStorage.getItem('token');
  let isMounted = true;

  const loadImages = async () => {
    const updatedProfiles = await Promise.all(
      profiles.map(async (p) => {
        if (!p.profilePhoto) return p;

        const parts = p.profilePhoto.split('/');
        const filename = parts[parts.length - 1];
        const endpoint = `http://localhost:5000/api/register/profile-photo/${filename}`;

        try {
          if (token) {
            const resp = await fetch(endpoint, { headers: { Authorization: `Bearer ${token}` } });
            if (!resp.ok) throw new Error('Image fetch failed');
            const blob = await resp.blob();
            const url = URL.createObjectURL(blob);
            return { ...p, imageSrc: url };
          } else {
            return { ...p, imageSrc: endpoint };
          }
        } catch {
          return { ...p, imageSrc: p.profilePhoto };
        }
      })
    );

    if (isMounted) setProfiles(updatedProfiles);
  };

  loadImages();

  return () => {
    isMounted = false;
  };
  // 👇 Dependency should be empty! Not [profiles]
}, []); 


  // Fetch profile images as blobs when token exists so Authorization header is included.
  // useEffect(() => {
  //   let active = true;
  //   const token = localStorage.getItem('token');

  //   const loadImages = async () => {
  //     if (!profiles || profiles.length === 0) return;

  //     const updated = await Promise.all(profiles.map(async (p) => {
  //       if (!p.profilePhoto) return p;

  //       // Extract filename (stored by backend as full URL sometimes)
  //       const parts = p.profilePhoto.split('/');
  //       const filename = parts[parts.length - 1];

  //       const endpoint = `http://localhost:5000/api/register/profile-photo/${filename}`;

  //       try {
  //         if (token) {
  //           const resp = await fetch(endpoint, { headers: { Authorization: `Bearer ${token}` } });
  //           if (!resp.ok) throw new Error('Image fetch failed');
  //           const blob = await resp.blob();
  //           const url = URL.createObjectURL(blob);
  //           return { ...p, imageSrc: url };
  //         } else {
  //           // Guest: use public endpoint directly (backend will return blurred image)
  //           return { ...p, imageSrc: endpoint };
  //         }
  //       } catch (err) {
  //         console.error('Error loading image for', p.id, err);
  //         return { ...p, imageSrc: p.profilePhoto || undefined };
  //       }
  //     }));

  //     if (active) setProfiles(updated as UserProfile[]);
  //   };

  //   loadImages();

  //   return () => {
  //     active = false;
  //     // Revoke any object URLs we created
  //     profiles.forEach(p => {
  //       if (p.imageSrc && p.imageSrc.startsWith('blob:')) URL.revokeObjectURL(p.imageSrc);
  //     });
  //   };
  // }, []);


  const toggleFavorite = async (favoriteUserId: number) => {
  try {
    const loggedInUserId = Number(userId);
    if (!loggedInUserId) {
      alert('Please log in to add favorites.');
      navigate('/login');
      return;
    }

    const isFav = favorites.has(favoriteUserId);
    if (isFav) {
      await axios.post('http://localhost:5000/api/favorites/remove', {
        userId: loggedInUserId,
        favoriteUserId,
      });
      const updated = new Set(favorites);
      updated.delete(favoriteUserId);
      setFavorites(updated);
      alert('Removed from favorites');
    } else {
      await axios.post('http://localhost:5000/api/favorites/add', {
        userId: loggedInUserId,
        favoriteUserId,
      });
      const updated = new Set(favorites);
      updated.add(favoriteUserId);
      setFavorites(updated);
      alert('Added to favorites');
    }
  } catch (err: any) {
    console.error(err);
    alert(err.response?.data?.message || 'Error updating favorites');
  }
};


  const handleViewDetails = async (id: number) => {
    const token = localStorage.getItem('token');
    const currentUserId = userIdFromUrl || userId;

    if (!currentUserId || !token) {
      alert("Please log in to view profile details.");
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/premiumpayment/status/${currentUserId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const isPremium = response.data?.user?.isPremium || false;

      if (isPremium) {
        navigate(`/profiledetails/${id}?userId=${currentUserId}`);
      } else {
        alert("Only Premium members can view detailed profiles.");
        navigate(`/premiumpayment?userId=${currentUserId}`);
      }
    } catch (error) {
      console.error("Error verifying premium status:", error);
      alert("Please complete your Premium payment to access profile details.");
      navigate(`/premiumpayment?userId=${currentUserId}`);
    }
  };

const filtered = profiles.filter((p) => {
  // 🚫 Hide logged-in user's profile
  if (userId && Number(p.id) === Number(userId)) return false;

  if (p.age < ageRange[0] || p.age > ageRange[1]) return false;
  if (biodataType === "Brides" && p.gender !== "Female") return false;
  if (biodataType === "Grooms" && p.gender !== "Male") return false;
  if (division !== "All" && p.state !== division) return false;
  return true;
});


  // ✅ Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Loading profiles...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 text-gray-800 mt-13 py-10">
      {/* ===== HEADER ===== */}
      <div className="sticky top-0 z-30  ">
        <div className="max-w-7xl mx-auto px-3 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl font-bold">All Profiles</h1>
            {/* <p className="text-xs text-gray-500">
              {filtered.length} profiles available
            </p> */}
          </div>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-xs font-semibold hover:shadow-md transition"
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
                className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                 
              >
                <X className="w-4 h-4" />
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
                      className={`py-2 text-xs rounded font-semibold transition ${biodataType === type
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
                {/* Show blurred image for guests/non-premium, clear for premium */}
                <img
                  src={profile.imageSrc || profile.profilePhoto || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                  alt={profile.fullName}
                  className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110`}
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
  fill={favorites.has(profile.id) ? "white" : "none"}
/>

                </button>

              </div>

              <div className="p-2 lg:p-3 text-[11px] lg:text-sm flex flex-col gap-1 lg:gap-2 flex-grow">
                <h3 className="font-bold text-gray-800 lg:text-base">
                  {profile.fullName}
                </h3>
                {/* <p className="text-gray-500 text-[10px] lg:text-xs">
                  ID: {profile.id}
                </p> */}
                <p className="text-gray-600 text-[10px] lg:text-xs">
                  {profile.occupation}, {profile.state}
                </p>
                <p className="text-orange-600 font-semibold text-[10px] lg:text-xs">
                  Age: {profile.age}
                </p>

                <button
                  onClick={() => handleViewDetails(profile.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  View Details
                </button>
                {/* 
                <button
                 onClick={() => navigate(`/profiledetails/${profile.id}`)}
                  className="mt-auto w-full py-1.5 lg:py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] lg:text-sm font-semibold rounded hover:shadow-md transition lg:w-4/5 lg:mx-auto"
                >
                  View Profile
                </button> */}
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
