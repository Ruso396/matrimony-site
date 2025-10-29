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
  Trash2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

// 🔹 Small helper components
const SectionTitle = ({ icon, title }: { icon: any; title: string }) => (
  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
    <span className="text-rose-500">{icon}</span> {title}
  </h2>
);

// EditableField now supports an optional `options` array to render a <select>
const EditableField = ({
  label,
  name,
  value,
  editing,
  onChange,
  icon,
  options,
  type,
}: any) => (
  <div className="flex items-start justify-between border-b pb-2">
    <span className="text-gray-600 font-medium flex items-center gap-2">
      {icon} {label}
    </span>
    {editing ? (
      options && Array.isArray(options) ? (
        <select name={name} value={value || ""} onChange={onChange} className="border rounded-md p-1 text-gray-800 w-44">
          {options.map((opt: string) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : type === 'date' ? (
        <input
          type="date"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="border rounded-md p-1 text-gray-800 w-44"
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="border rounded-md p-1 text-gray-800 w-44"
        />
      )
    ) : (
      <span className="text-gray-800 font-semibold text-right">
        {value || "-"}
      </span>
    )}
  </div>
);

// Options mirror the Register component so dropdowns match
const fieldOptions = {
  profileFor: ['Self', 'Son', 'Daughter', 'Brother', 'Sister', 'Relative', 'Friend'],
  genders: ['Male', 'Female'],
  religions: ['Hindu', 'Christian', 'Muslim', 'Sikh', 'Buddhist', 'Jain', 'Other'],
  motherTongues: ['Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Hindi', 'English', 'Marathi', 'Bengali', 'Other'],
  maritalStatuses: ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'],
  heights: ['4.0', '4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8', '4.9', '4.10', '4.11', '5.0', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9', '5.10', '5.11', '6.0', '6.1', '6.2', '6.3', '6.4', '6.5'],
  countries: ['India', 'USA', 'UK', 'Canada', 'Australia', 'Other']
};

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const userId = localStorage.getItem("userId");
  const { setUserName } = useAuth();

  // ✅ Fetch user details on load
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/register/users/${userId}`)
        .then((res) => {
          setProfile(res.data.user);
          setTempProfile(res.data.user);
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [userId]);

  const getPhotoUrl = (photo: string | null | undefined): string | undefined => {
    if (!photo) return undefined;
    // If backend already returned full URL, use it
    if (photo.startsWith('http://') || photo.startsWith('https://')) return `${photo}?t=${Date.now()}`;
    // Otherwise assume it's a filename and prepend uploads path
    return `http://localhost:5000/uploads/${photo}?t=${Date.now()}`;
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTempProfile({ ...tempProfile, [name]: value });
  };

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.entries(tempProfile).forEach(([key, value]) =>
        formData.append(key, value as string)
      );
      if (selectedFile) formData.append("profilePhoto", selectedFile);

      const res = await axios.put(
        `http://localhost:5000/api/register/update/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setProfile(res.data.user);
      setIsEditing(false);
      setSelectedFile(null);
      // update header username (AuthContext + localStorage)
      const newName = res.data.user.fullName;
      if (newName) {
        try {
          setUserName(newName);
          localStorage.setItem('userName', newName);
          // also dispatch a global event in case other parts listen
          window.dispatchEvent(new Event('userNameChanged'));
        } catch (e) {
          console.warn('Could not update header username in context/localStorage', e);
        }
      }
      // show success modal instead of alert
      setShowSuccessPopup(true);
      // auto-hide after 2.5s
      setTimeout(() => setShowSuccessPopup(false), 2500);
    } catch (err) {
      console.error(err);
      alert("Error updating profile.");
    }
  };

  // 🗑️ Delete profile handler
  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/register/users/${userId}`);
      alert("Account deleted successfully!");
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account.");
    }
  };

  if (!profile)
    return <div className="text-center mt-10">Loading profile...</div>;

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

      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden border border-white/30">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : getPhotoUrl(profile.profilePhoto) ?? "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-white/90 rounded-full p-1 cursor-pointer shadow">
                  <Camera className="text-rose-600 w-5 h-5" />
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
                {profile.city}, {profile.state}, {profile.country}
              </p>
            </div>
          </div>

          {/* Right side buttons */}
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
            <div className="flex gap-3">
              <button
                onClick={handleEditClick}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md text-white flex items-center gap-1"
              >
                <Pencil className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => setShowDeletePopup(true)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          )}
        </div>

        {/* Info section */}
        <div className="p-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <SectionTitle icon={<User />} title="Personal Info" />
            <EditableField label="Profile For" name="profileFor" value={tempProfile.profileFor} editing={isEditing} onChange={handleChange} options={fieldOptions.profileFor} />
            <EditableField label="Gender" name="gender" value={tempProfile.gender} editing={isEditing} onChange={handleChange} options={fieldOptions.genders} />
            <EditableField label="DOB" name="dob" value={tempProfile.dob} editing={isEditing} onChange={handleChange} type="date" />
            <EditableField label="Age" name="age" value={tempProfile.age} editing={isEditing} onChange={handleChange} />
            <EditableField label="Religion" name="religion" value={tempProfile.religion} editing={isEditing} onChange={handleChange} options={fieldOptions.religions} />
            <EditableField label="Mother Tongue" name="motherTongue" value={tempProfile.motherTongue} editing={isEditing} onChange={handleChange} options={fieldOptions.motherTongues} />
            <EditableField label="Marital Status" name="maritalStatus" value={tempProfile.maritalStatus} editing={isEditing} onChange={handleChange} options={fieldOptions.maritalStatuses} />
            <EditableField label="Caste" name="caste" value={tempProfile.caste} editing={isEditing} onChange={handleChange} />
            <EditableField label="Height" name="height" value={tempProfile.height} editing={isEditing} onChange={handleChange} options={fieldOptions.heights} />
            
          </div>

          <div className="space-y-4">
            <SectionTitle icon={<Briefcase />} title="Professional & Contact" />
            <EditableField label="Education" name="education" value={tempProfile.education} editing={isEditing} onChange={handleChange} />
            <EditableField label="Occupation" name="occupation" value={tempProfile.occupation} editing={isEditing} onChange={handleChange} />
            <EditableField label="Annual Income" name="annualIncome" value={tempProfile.annualIncome} editing={isEditing} onChange={handleChange} />
            <EditableField label="Country" name="country" value={tempProfile.country} editing={isEditing} onChange={handleChange} options={fieldOptions.countries} />
            <EditableField label="State" name="state" value={tempProfile.state} editing={isEditing} onChange={handleChange} />
            <EditableField label="City" name="city" value={tempProfile.city} editing={isEditing} onChange={handleChange} />
            <EditableField label="Email" name="email" value={tempProfile.email} editing={isEditing} onChange={handleChange} icon={<Mail />} />
            <EditableField label="Mobile" name="mobile" value={tempProfile.mobile} editing={isEditing} onChange={handleChange} icon={<Phone />} />
          </div>
        </div>
      </div>

      {/* 🧨 Delete confirmation popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Are you sure you want to delete your account?
            </h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeletePopup(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Success popup (shown after profile update) */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Profile Updated</h3>
            <p className="text-gray-600 mb-4">Your profile was updated successfully.</p>
            <div className="flex justify-center">
              <button onClick={() => setShowSuccessPopup(false)} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;






