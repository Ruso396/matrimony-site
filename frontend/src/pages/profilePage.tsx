import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  MapPin,
  Heart,
  Briefcase,
  Phone,
  Globe,
  Pencil,
  Check,
  X,
  Camera,
} from "lucide-react";

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const userId = userData?.id;

  // 🔹 Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${userId}`);
        setProfile(res.data);
        setTempProfile(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleEditClick = () => setIsEditing(true);
  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
    setPhotoFile(null);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTempProfile({ ...tempProfile, [name]: value });
  };

  const handleFileChange = (e: any) => {
    setPhotoFile(e.target.files[0]);
  };

  // 🔹 Save changes to backend
  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.entries(tempProfile).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      if (photoFile) formData.append("profilePhoto", photoFile);

      const res = await axios.put(
        `http://localhost:5000/api/user/update/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProfile(res.data.user);
      setIsEditing(false);
      setPhotoFile(null);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("❌ Error updating profile!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading profile...
      </div>
    );

  if (!profile)
    return (
      <div className="text-center mt-20 text-red-500">
        No profile data found 😢
      </div>
    );

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6 py-30">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=80')`,
          filter: "blur(8px)",
          transform: "scale(1.1)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900/70 via-pink-800/60 to-purple-900/70" />

      {/* Profile Card */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden border border-white/30 transition-all duration-300">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={photoFile ? URL.createObjectURL(photoFile) : profile.profilePhoto}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-white/80 p-1 rounded-full cursor-pointer">
                  <Camera className="w-5 h-5 text-rose-600" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={tempProfile.fullName}
                  onChange={handleChange}
                  className="text-3xl font-bold bg-white/20 border-b border-white/50 focus:outline-none px-2 rounded-md"
                />
              ) : (
                <h1 className="text-3xl font-bold">{profile.fullName}</h1>
              )}
              <p className="text-white/90">{profile.occupation}</p>
              <p className="text-white/80 text-sm mt-1">
                {profile.city}, {profile.state}
              </p>
            </div>
          </div>

          {/* Buttons */}
          {isEditing ? (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md text-white flex items-center gap-1"
              >
                <Check className="w-4 h-4" /> Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded-md text-gray-800 flex items-center gap-1"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md text-white flex items-center gap-1"
            >
              <Pencil className="w-4 h-4" /> Edit
            </button>
          )}
        </div>

        {/* Body Section */}
        <div className="p-8 grid md:grid-cols-2 gap-8">
          {/* Personal Info */}
          <div className="space-y-4">
            <SectionTitle icon={<User />} title="Personal Info" />
            <EditableField
              label="Gender"
              name="gender"
              value={tempProfile.gender}
              editing={isEditing}
              onChange={handleChange}
            />
            <EditableField
              label="Age"
              name="age"
              value={tempProfile.age}
              editing={isEditing}
              onChange={handleChange}
            />
            <EditableField
              label="Date of Birth"
              name="dob"
              value={tempProfile.dob}
              editing={isEditing}
              onChange={handleChange}
            />
            <EditableField
              label="Religion"
              name="religion"
              value={tempProfile.religion}
              editing={isEditing}
              onChange={handleChange}
            />
            <EditableField
              label="Caste"
              name="caste"
              value={tempProfile.caste}
              editing={isEditing}
              onChange={handleChange}
            />
          </div>

          {/* Professional Info */}
          <div className="space-y-4">
            <SectionTitle icon={<Briefcase />} title="Professional & Contact" />
            <EditableField
              label="Education"
              name="education"
              value={tempProfile.education}
              editing={isEditing}
              onChange={handleChange}
            />
            <EditableField
              label="Occupation"
              name="occupation"
              value={tempProfile.occupation}
              editing={isEditing}
              onChange={handleChange}
            />
            <EditableField
              label="Email"
              name="email"
              value={tempProfile.email}
              editing={isEditing}
              onChange={handleChange}
              icon={<Mail className="w-4 h-4" />}
            />
            <EditableField
              label="Mobile"
              name="mobile"
              value={tempProfile.mobile}
              editing={isEditing}
              onChange={handleChange}
              icon={<Phone className="w-4 h-4" />}
            />
            <EditableField
              label="Location"
              name="city"
              value={`${tempProfile.city}, ${tempProfile.state}, ${tempProfile.country}`}
              editing={false}
              icon={<MapPin className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* About Me */}
        <div className="px-8 pb-8">
          <SectionTitle icon={<Heart />} title="About Me" />
          {isEditing ? (
            <textarea
              name="aboutMe"
              value={tempProfile.aboutMe}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800"
              rows={3}
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{profile.aboutMe}</p>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t p-4 text-center text-sm text-gray-600">
          <Globe className="inline-block w-4 h-4 text-rose-500 mr-1" />
          Member since 2025 | Matrimony Profile
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ icon, title }: any) => (
  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
    <span className="text-rose-500">{icon}</span> {title}
  </h2>
);

const EditableField = ({ label, value, name, editing, onChange, icon }: any) => (
  <div className="flex items-start justify-between border-b pb-2">
    <span className="text-gray-600 font-medium flex items-center gap-2">
      {icon} {label}
    </span>
    {editing ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="border rounded-md p-1 text-gray-800 w-40"
      />
    ) : (
      <span className="text-gray-800 font-semibold text-right">{value}</span>
    )}
  </div>
);

export default ProfilePage;
