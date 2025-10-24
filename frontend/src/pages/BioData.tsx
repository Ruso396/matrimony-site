import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";

interface BiodataProfile {
  id: number;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  biodataId: string;
  job: string;
  division: string;
  image: string;
}

const BioData: React.FC = () => {
  const navigate = useNavigate();
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 60]);
  const [biodataType, setBiodataType] = useState<string>('All');
  const [division, setDivision] = useState<string>('All');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const profiles: BiodataProfile[] = [
    { id: 1, name: 'Profile', age: 31, gender: 'Female', biodataId: 'Id: 1', job: 'Software Engineer', division: 'Dhaka', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    { id: 2, name: 'Profile', age: 32, gender: 'Female', biodataId: 'Id: 6', job: 'Architect', division: 'Barisal', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
    { id: 3, name: 'Profile', age: 31, gender: 'Female', biodataId: 'Id: 2', job: 'Marketing Manager', division: 'Khulna', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop' },
    { id: 4, name: 'Profile', age: 29, gender: 'Female', biodataId: 'Id: 4', job: 'Graphic Designer', division: 'Rajshahi', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop' },
    { id: 5, name: 'Profile', age: 35, gender: 'Female', biodataId: 'Id: 5', job: 'Doctor', division: 'Sylhet', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop' },
    { id: 6, name: 'Profile', age: 34, gender: 'Female', biodataId: 'Id: 8', job: 'Doctor', division: 'Sylhet', image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop' },
    { id: 7, name: 'Profile', age: 31, gender: 'Female', biodataId: 'Id: 10', job: 'Graphic Designer', division: 'Rajshahi', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop' },
    { id: 8, name: 'Profile', age: 35, gender: 'Male', biodataId: 'Id: 15', job: 'Lawyer', division: 'Dhaka', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    { id: 9, name: 'Profile', age: 33, gender: 'Male', biodataId: 'Id: 19', job: 'Data Scientist', division: 'Mymensingh', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
    { id: 10, name: 'Profile', age: 35, gender: 'Female', biodataId: 'Id: 24', job: 'Web Developer', division: 'Chittagong', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop' },
    { id: 11, name: 'Profile', age: 36, gender: 'Male', biodataId: 'Id: 33', job: 'Software Engineer', division: 'Sylhet', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
    { id: 12, name: 'Profile', age: 30, gender: 'Female', biodataId: 'Id: 36', job: 'Nurse', division: 'Barisal', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop' },
  ];

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) newFavorites.delete(id);
    else newFavorites.add(id);
    setFavorites(newFavorites);
  };

  const filteredProfiles = profiles.filter(profile => {
    // Age filter
    if (profile.age < ageRange[0] || profile.age > ageRange[1]) return false;
    // Division filter
    if (division !== 'All' && profile.division !== division) return false;
    // Biodata Type filter
    if (biodataType === 'Brides' && profile.gender !== 'Female') return false;
    if (biodataType === 'Grooms' && profile.gender !== 'Male') return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-3 py-30">

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Filter Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Age Range</label>
              <input type="range" min={18} max={60} value={ageRange[1]} onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])} className="w-full h-2 bg-orange-200 rounded-lg cursor-pointer accent-orange-600" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{ageRange[0]}</span>
                <span>{ageRange[1]}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Biodata Type</label>
              <select value={biodataType} onChange={(e) => setBiodataType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option>All</option>
                <option>Brides</option>
                <option>Grooms</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Division</label>
              <select value={division} onChange={(e) => setDivision(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option>All</option>
                {Array.from(new Set(profiles.map(p => p.division))).map(div => <option key={div}>{div}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map(profile => (
            <div key={profile.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 bg-gradient-to-br from-orange-100 to-amber-100">
                <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-800">{profile.gender === 'Female' ? 'Bride' : 'Groom'}</h3>
                    <p className="text-sm text-gray-600">{profile.biodataId}</p>
                  </div>
                  <button onClick={() => toggleFavorite(profile.id)}>
                    <Heart className={`w-6 h-6 ${favorites.has(profile.id) ? 'text-red-500' : 'text-gray-300'}`} />
                  </button>
                </div>
                <p className="text-gray-700">{profile.name}, {profile.age}</p>
                <p className="text-gray-700">{profile.job}</p>
                <p className="text-gray-700">{profile.division}</p>
                <button onClick={() => navigate(`/profile/${profile.id}`)} className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No profiles found matching your filters.</p>
        )}
      </div>
    </div>
  );
};

export default BioData;
