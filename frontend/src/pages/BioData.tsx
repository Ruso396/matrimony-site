import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, Filter, X } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";

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

  // ✅ new states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isPremiumUser, setIsPremiumUser] = useState<boolean>(false);

  // ✅ Fetch profiles & favorites
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/register/users");
        const result = Array.isArray(res.data)
          ? res.data
          : res.data.users || res.data.data || [];

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

  // ✅ Check login + premium status
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!userId || !token) {
      setIsLoggedIn(false);
      setIsPremiumUser(false);
      return;
    }

    setIsLoggedIn(true);

    const checkPremium = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/premiumpayment/status/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsPremiumUser(res.data?.user?.isPremium || false);
      } catch (err) {
        console.error("Error checking premium:", err);
        setIsPremiumUser(false);
      }
    };

    checkPremium();
  }, [userId]);

  // ✅ Load images safely
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
    return () => { isMounted = false; };
  }, []);

  // ✅ Toggle favorites
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

  // ✅ Handle view details
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

  // ✅ Filter profiles
  const filtered = profiles.filter((p) => {
    if (userId && Number(p.id) === Number(userId)) return false;
    if (p.age < ageRange[0] || p.age > ageRange[1]) return false;
    if (biodataType === "Brides" && p.gender !== "Female") return false;
    if (biodataType === "Grooms" && p.gender !== "Male") return false;
    if (division !== "All" && p.state !== division) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Loading profiles...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 text-gray-800 mt-13 py-10">
      <div className="sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 py-3 flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-bold">All Profiles</h1>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-xs font-semibold hover:shadow-md transition"
          >
            <Filter size={14} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* PROFILES GRID */}
      <main className="max-w-7xl mx-auto px-3 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {filtered.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition flex flex-col overflow-hidden group"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={profile.imageSrc || profile.profilePhoto || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                  alt={profile.fullName}
                  className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                    !isLoggedIn || !isPremiumUser ? 'blur-sm brightness-75' : ''
                  }`}
                />

                {/* 🔒 Overlay for non-premium */}
                {/* {(!isLoggedIn || !isPremiumUser) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xs font-semibold">
                    🔒 Premium Members Only
                  </div>
                )} */}

                <button
                  onClick={() => toggleFavorite(profile.id)}
                  className={`absolute top-2 right-2 p-1.5 rounded-full transition ${
                    favorites.has(profile.id)
                      ? "bg-red-500 text-white"
                      : "bg-white/90 text-red-400 hover:bg-white"
                  }`}
                >
                  <Heart size={14} fill={favorites.has(profile.id) ? "white" : "none"} />
                </button>
              </div>

              <div className="p-2 text-[11px] lg:text-sm flex flex-col gap-1 flex-grow">
                <h3 className="font-bold text-gray-800">{profile.fullName}</h3>
                <p className="text-gray-600 text-[10px]">{profile.occupation}, {profile.state}</p>
                <p className="text-orange-600 font-semibold text-[10px]">
                  Age: {profile.age}
                </p>

                <button
                  onClick={() => handleViewDetails(profile.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-sm text-gray-500">
            No profiles found
          </div>
        )}
      </main>
    </div>
  );
};

export default BioData;
