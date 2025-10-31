import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Briefcase,
  Phone,
  Pencil,
  Check,
  X,
  Camera,
  Trash2,
  BadgeCheck,
  Crown,
  Lock,  
  Globe, 
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

/* -------------------- Small helpers -------------------- */
const SectionTitle = ({ icon, title }: { icon: any; title: string }) => (
  <h2 className="text-base md:text-xl font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
    <span className="text-rose-500">{icon}</span> {title}
  </h2>
);

// EditableField supports optional select & date
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
    <span className="text-gray-600 font-medium flex items-center gap-2 text-[12px] sm:text-[13px]">
      {icon} {label}
    </span>
    {editing ? (
      options && Array.isArray(options) ? (
        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          className="border rounded-md px-2.5 py-2 text-gray-800 w-40 sm:w-48 text-[12px] sm:text-[13px]"
        >
          {options.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : type === "date" ? (
        <input
          type="date"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="border rounded-md px-2.5 py-2 text-gray-800 w-40 sm:w-48 text-[12px] sm:text-[13px]"
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="border rounded-md px-2.5 py-2 text-gray-800 w-40 sm:w-48 text-[12px] sm:text-[13px]"
        />
      )
    ) : (
      <span className="text-gray-900 font-semibold text-right text-[12px] sm:text-[13px]">
        {value || "-"}
      </span>
    )}
  </div>
);

// ✅ New Component for Privacy Toggle
const PrivacyToggle = ({ isPublic, editing, onChange }: any) => (
  <div className="flex items-start justify-between border-b pb-2">
    <span className="text-gray-600 font-medium flex items-center gap-2 text-[12px] sm:text-[13px]">
      {isPublic ? (
        <Globe className="w-4 h-4 text-green-600" />
      ) : (
        <Lock className="w-4 h-4 text-red-600" />
      )}
      Profile Status
    </span>
    {editing ? (
      <button
        onClick={() => onChange({ target: { name: "isPublic", value: !isPublic } })}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
          isPublic ? "bg-green-600" : "bg-gray-400"
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
            isPublic ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    ) : (
      <span
        className={`font-semibold text-right text-[12px] sm:text-[13px] ${
          isPublic ? "text-green-600" : "text-red-600"
        }`}
      >
        {isPublic ? "Public" : "Private"}
      </span>
    )}
  </div>
);

/* -------------------- Options -------------------- */
// profilePage.tsx

// ... (lines 1 - 104)

/* -------------------- Options -------------------- */
// **FIX: Explicitly define the type for fieldOptions to resolve TS2339 errors**
type FieldOptionsType = {
  profileFor: string[];
  genders: string[];
  religions: string[];
  motherTongues: string[];
  maritalStatuses: string[];
  heights: string[];
  countries: string[];
};

const fieldOptions: FieldOptionsType = {
  profileFor: ["Self", "Son", "Daughter", "Brother", "Sister", "Relative", "Friend"],
  genders: ["Male", "Female"],
  religions: ["Hindu", "Christian", "Muslim", "Sikh", "Buddhist", "Jain", "Other"],
  motherTongues: [
    "Tamil",
    "Telugu",
    "Malayalam",
    "Kannada",
    "Hindi",
    "English",
    "Marathi",
    "Bengali",
    "Other",
  ],
  maritalStatuses: ["Never Married", "Divorced", "Widowed", "Awaiting Divorce"],
  heights: [
    "4.0","4.1","4.2","4.3","4.4","4.5","4.6","4.7","4.8","4.9","4.10","4.11",
    "5.0","5.1","5.2","5.3","5.4","5.5","5.6","5.7","5.8","5.9","5.10","5.11",
    "6.0","6.1","6.2","6.3","6.4","6.5",
  ],
  countries: ["India", "USA", "UK", "Canada", "Australia", "Other"],
};

/* -------------------- Device Frames (larger laptop screen, stable inner scroll) -------------------- */
// ... (rest of the file)
/* -------------------- Device Frames -------------------- */
const DeviceLaptop: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  // ... (no changes)
  <div className="hidden md:flex flex-col items-center">
    {/* bezel + screen */}
    <div className="relative bg-neutral-900 rounded-[1.75rem] p-3 shadow-2xl ring-1 ring-black/10 w-[1080px] max-w-[96vw]">
      {/* camera dot */}
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-neutral-800 rounded-full" />
      <div className="bg-black rounded-[1.25rem] p-2">
        <div className="bg-white rounded-xl overflow-hidden">
          {/* taller screen — scroll inside only */}
          <div className="h-[720px] overflow-y-auto">{children}</div>
          
        </div>
      </div>
    </div>
    {/* base/keyboard */}
    <div className="h-6 w-[900px] max-w-[78vw] bg-neutral-900 rounded-b-[1.5rem] mt-1 shadow-xl" />
  </div>
);

const DevicePhone: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  // ... (no changes)
  <div className="md:hidden flex items-center justify-center">
    {/* compact phone for 320/375/420/475 */}
    <div className="relative bg-neutral-900 rounded-[2.2rem] p-3 shadow-2xl ring-1 ring-black/10 w-[300px] sm:w-[340px]">
      {/* notch */}
      <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-neutral-900 rounded-b-2xl" />
      <div className="bg-black rounded-[1.7rem] p-2 overflow-hidden">
        <div className="bg-white rounded-xl overflow-hidden">
          {/* fixed height — phone frame always visible */}
          <div className="h-[600px] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  </div>
);

/* -------------------- Profile Card -------------------- */
const ProfileCard = ({
  profile,
  tempProfile,
  isEditing,
  setIsEditing,
  handleChange,
  handleFileChange,
  selectedFile,
  getPhotoUrl,
  handleSave,
  handleCancel,
  setShowDeletePopup,
}: any) => {
  const keysToCheck = [
    "fullName","profileFor","gender","dob","age","religion","motherTongue",
    "maritalStatus","caste","height","education","occupation","annualIncome",
    "country","state","city","email","mobile",
  ];
  const filled = keysToCheck.filter((k) => !!(tempProfile?.[k] ?? "")).length;
  const completion = Math.round((filled / keysToCheck.length) * 100);

  // stepper (1: personal, 2: professional)
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <div className="relative">
      
      {/* header */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-3 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
        {/* ... (header content no changes) ... */}
        {/* left cluster */}
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          {/* avatar – always perfectly round */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : getPhotoUrl(profile.profilePhoto) ?? "https://via.placeholder.com/300"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {isEditing && (
              <label className="absolute -bottom-1 -right-1 bg-white/95 rounded-full p-1.5 cursor-pointer shadow">
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

          {/* name + meta — allow wrap, prevent cut */}
          <div className="min-w-0">
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={tempProfile.fullName || ""}
                onChange={handleChange}
                className="text-lg sm:text-2xl md:text-3xl font-bold bg-white/20 border-b border-white/50 focus:outline-none px-2 rounded-md w-full"
              />
            ) : (
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold flex items-center gap-2 leading-tight break-words">
                <span className="truncate max-w-[160px] sm:max-w-[260px] md:max-w-none">
                  {profile.fullName}
                </span>
                <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300 shrink-0" />
              </h1>
            )}
            <p className="text-white/90 text-[11px] sm:text-sm break-words">
              {profile.occupation}
            </p>
            <p className="text-white/80 text-[10px] sm:text-sm mt-1 break-words">
              {profile.city}, {profile.state}, {profile.country}
            </p>
          </div>
        </div>

        {/* right cta (hide on tiny) */}
        <div className="hidden sm:flex flex-col items-end gap-3">
          <div className="flex items-center gap-2 bg-amber-100/20 px-3 py-1 rounded-full">
            <Crown className="w-4 h-4 text-yellow-300" />
            <span className="text-sm">Premium Member</span>
          </div>
          <button className="bg-white text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-full font-semibold shadow">
            Contact Now
          </button>
        </div>
      </div>

      {/* stepper */}
      <div className="px-3 sm:px-6 pt-3">
        {/* ... (stepper buttons no changes) ... */}
        <div className="w-full flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full border text-[11px] sm:text-sm font-semibold transition
              ${step === 1 ? "bg-rose-600 text-white border-rose-600" : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold
              ${step === 1 ? "bg-white text-rose-600" : "bg-white text-gray-700"}`}>1</span>
            Personal Info
          </button>
          <button
            onClick={() => setStep(2)}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full border text-[11px] sm:text-sm font-semibold transition
              ${step === 2 ? "bg-rose-600 text-white border-rose-600" : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold
              ${step === 2 ? "bg-white text-rose-600" : "bg-white text-gray-700"}`}>2</span>
            Professional & Contact
          </button>
        </div>
      </div>

      {/* content */}
      <div className="px-3 sm:px-6 pb-6 sm:pb-8 pt-4">
        {step === 1 ? (
          <>
            <SectionTitle icon={<User />} title="Personal Info" />
            {/* 👉 two columns on laptop; one on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-4">
                {/* ✅ ADD THE PRIVACY TOGGLE HERE */}
                <PrivacyToggle
                  isPublic={tempProfile.isPublic}
                  editing={isEditing}
                  onChange={handleChange}
                />
                <EditableField label="Profile For" name="profileFor" value={tempProfile.profileFor} editing={isEditing} onChange={handleChange} options={fieldOptions.profileFor} />
                <EditableField label="Gender" name="gender" value={tempProfile.gender} editing={isEditing} onChange={handleChange} options={fieldOptions.genders} />
                <EditableField label="DOB" name="dob" value={tempProfile.dob} editing={isEditing} onChange={handleChange} type="date" />
                <EditableField label="Age" name="age" value={tempProfile.age} editing={isEditing} onChange={handleChange} />
                <EditableField label="Height" name="height" value={tempProfile.height} editing={isEditing} onChange={handleChange} options={fieldOptions.heights} />
              </div>
              <div className="space-y-4">
                <EditableField label="Religion" name="religion" value={tempProfile.religion} editing={isEditing} onChange={handleChange} options={fieldOptions.religions} />
                <EditableField label="Mother Tongue" name="motherTongue" value={tempProfile.motherTongue} editing={isEditing} onChange={handleChange} options={fieldOptions.motherTongues} />
                <EditableField label="Marital Status" name="maritalStatus" value={tempProfile.maritalStatus} editing={isEditing} onChange={handleChange} options={fieldOptions.maritalStatuses} />
                <EditableField label="Caste" name="caste" value={tempProfile.caste} editing={isEditing} onChange={handleChange} />
              </div>
            </div>
          </>
        ) : (
          <>
            <SectionTitle icon={<Briefcase />} title="Professional & Contact" />
            {/* 👉 two columns on laptop; one on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* ... (step 2 content no changes) ... */}
              <div className="space-y-4">
                <EditableField label="Education" name="education" value={tempProfile.education} editing={isEditing} onChange={handleChange} />
                <EditableField label="Occupation" name="occupation" value={tempProfile.occupation} editing={isEditing} onChange={handleChange} />
                <EditableField label="Annual Income" name="annualIncome" value={tempProfile.annualIncome} editing={isEditing} onChange={handleChange} />
                <EditableField label="Country" name="country" value={tempProfile.country} editing={isEditing} onChange={handleChange} options={fieldOptions.countries} />
              </div>
              <div className="space-y-4">
                <EditableField label="State" name="state" value={tempProfile.state} editing={isEditing} onChange={handleChange} />
                <EditableField label="City" name="city" value={tempProfile.city} editing={isEditing} onChange={handleChange} />
                <EditableField label="Email" name="email" value={tempProfile.email} editing={isEditing} onChange={handleChange} icon={<Mail />} />
                <EditableField label="Mobile" name="mobile" value={tempProfile.mobile} editing={isEditing} onChange={handleChange} icon={<Phone />} />
              </div>
            </div>
          </>
        )}

        {/* completion + action buttons */}
        <div className="mt-6 sm:mt-8">
          {/* ... (completion bar no changes) ... */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs sm:text-sm text-gray-600">Completion</span>
            <span className="text-xs sm:text-sm font-semibold text-gray-800">{completion}%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-rose-500" style={{ width: `${completion}%` }} />
          </div>

          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
            {/* ... (action buttons no changes) ... */}
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md text-white flex items-center gap-2 text-sm"
                >
                  <Check className="w-4 h-4" /> Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-gray-900 flex items-center gap-2 text-sm"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-md text-white flex items-center gap-2 text-sm"
                >
                  <Pencil className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => setShowDeletePopup(true)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white flex items-center gap-2 text-sm"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </>
            )}
          </div>
        </div>

        {/* premium block for mobile */}
        <div className="sm:hidden mt-6 sm:mt-8 flex flex-col items-center gap-3">
          {/* ... (no changes) ... */}
          <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full text-amber-700 text-sm">
            <Crown className="w-4 h-4" /> Premium Member
          </div>
          <button className="bg-rose-600 text-white hover:bg-rose-700 px-4 py-2 rounded-full font-semibold shadow text-sm">
            Contact Now
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   MAIN PAGE
   ========================================================= */
const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const userId = localStorage.getItem("userId");
  const { setUserName } = useAuth();

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
    if (photo.startsWith("http://") || photo.startsWith("https://"))
      return `${photo}?t=${Date.now()}`;
    return `http://localhost:5000/uploads/${photo}?t=${Date.now()}`;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTempProfile({ ...tempProfile, [name]: value });
  };
  const handleFileChange = (e: any) => setSelectedFile(e.target.files[0]);

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
    setSelectedFile(null);
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
      setTempProfile(res.data.user); // ✅ Sync tempProfile with saved data
      setIsEditing(false);
      setSelectedFile(null);

      const newName = res.data.user.fullName;
      if (newName) {
        try {
          setUserName(newName);
          localStorage.setItem("userName", newName);
          window.dispatchEvent(new Event("userNameChanged"));
        } catch (e) {}
      }

      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 2500);
    } catch (err) {
      console.error(err);
      alert("Error updating profile.");
    }
  };

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

  if (!profile) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ... (background and titles no changes) ... */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-pink-50" />
      <div className="relative max-w-[1400px] mx-auto px-4 py-8 md:py-14 flex flex-col items-center gap-6">
        {/* title */}
        <div className="text-center space-y-2 mt-18">
          <h1 className="text-xl md:text-3xl font-extrabold text-gray-900">
            Your Matrimony Profile
          </h1>
        </div>

        {/* DEVICE: Laptop on md+, Phone on mobile */}
        <DeviceLaptop>
          <ProfileCard
            profile={profile}
            tempProfile={tempProfile}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            selectedFile={selectedFile}
            getPhotoUrl={getPhotoUrl}
            handleSave={handleSave}
            handleCancel={handleCancel}
            setShowDeletePopup={setShowDeletePopup}
          />
        </DeviceLaptop>

        <DevicePhone>
          <ProfileCard
            profile={profile}
            tempProfile={tempProfile}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            selectedFile={selectedFile}
            getPhotoUrl={getPhotoUrl}
            handleSave={handleSave}
            handleCancel={handleCancel}
            setShowDeletePopup={setShowDeletePopup}
          />
        </DevicePhone>
      </div>

      {/* Delete confirmation popup */}
      {showDeletePopup && (
        // ... (no changes)
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

      {/* Success popup */}
      {showSuccessPopup && (
        // ... (no changes)
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Profile Updated
            </h3>
            <p className="text-gray-600 mb-4">
              Your profile was updated successfully.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;