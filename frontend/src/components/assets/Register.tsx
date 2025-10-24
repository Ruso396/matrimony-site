import React, { useState } from 'react';
import { Heart, User, Lock, Check, AlertCircle, Camera, X } from 'lucide-react';

type FormErrors = {
  profileFor?: string;
  fullName?: string;
  gender?: string;
  dob?: string;
  religion?: string;
  motherTongue?: string;
  maritalStatus?: string;
  caste?: string;
  height?: string;
  education?: string;
  occupation?: string;
  annualIncome?: string;
  country?: string;
  state?: string;
  city?: string;
  email?: string;
  mobile?: string;
  password?: string;
  confirmPassword?: string;
  aboutMe?: string;
  termsAccepted?: string;
  profilePhoto?: string;
  submit?: string;
};

const ModernRegister = () => {
  const [formData, setFormData] = useState({
    profileFor: 'Self',
    fullName: '',
    gender: 'Male',
    dob: '',
    religion: 'Hindu',
    caste: '',
    motherTongue: 'Tamil',
    maritalStatus: 'Never Married',
    height: '5.0',
    education: '',
    occupation: '',
    annualIncome: '',
    country: 'India',
    state: '',
    city: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    aboutMe: '',
    termsAccepted: false,
    profilePhoto: null as File | null
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const options = {
    profileFor: ['Self', 'Son', 'Daughter', 'Brother', 'Sister', 'Relative', 'Friend'],
    genders: ['Male', 'Female'],
    religions: ['Hindu', 'Christian', 'Muslim', 'Sikh', 'Buddhist', 'Jain', 'Other'],
    motherTongues: ['Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Hindi', 'English', 'Marathi', 'Bengali', 'Other'],
    maritalStatuses: ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'],
    heights: ['4.0', '4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8', '4.9', '4.10', '4.11', 
              '5.0', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9', '5.10', '5.11',
              '6.0', '6.1', '6.2', '6.3', '6.4', '6.5']
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5000000) {
        setErrors(prev => ({ ...prev, profilePhoto: 'File size should be less than 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, profilePhoto: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, profilePhoto: '' }));
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, profilePhoto: null }));
    setPhotoPreview(null);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
      if (!formData.caste.trim()) newErrors.caste = 'Caste/Sub-caste is required';
      if (!formData.height) newErrors.height = 'Height is required';
    }
    
    if (step === 2) {
      if (!formData.education.trim()) newErrors.education = 'Education is required';
      if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required';
      if (!formData.annualIncome.trim()) newErrors.annualIncome = 'Annual income is required';
    }
    
    if (step === 3) {
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.mobile.trim()) newErrors.mobile = 'Mobile is required';
      else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile must be 10 digits';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept terms & conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field: keyof FormErrors) => `
    w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-200 outline-none
    ${errors[field]
      ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
      : 'border-gray-200 bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-100'
    }
  `;

  if (isSuccess) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
        {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')`,
            filter: 'blur(8px)',
            transform: 'scale(1.1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/60 via-pink-800/50 to-purple-900/60" />
        
        <div className="relative max-w-md w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Registration Successful!</h1>
          <p className="text-gray-600 mb-6">
            Welcome to our matrimony family! Your profile has been created successfully.
          </p>
          <div className="bg-rose-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              A verification link has been sent to <span className="font-semibold text-rose-600">{formData.email}</span>
            </p>
          </div>
          <button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden py-8 px-4">
      {/* Background Image with Blur */}
      <div 
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80')`,
          filter: 'blur(10px)',
          transform: 'scale(1.1)'
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-rose-900/70 via-pink-800/60 to-purple-900/70" />
      
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-4 shadow-lg border border-white/30">
            <Heart className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Create Your Profile
          </h1>
          <p className="text-white/90 drop-shadow">Join thousands of happy couples</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2 ${
                    currentStep >= step 
                      ? 'bg-white text-rose-600 border-white shadow-lg scale-110' 
                      : 'bg-white/20 backdrop-blur-sm text-white border-white/30'
                  }`}>
                    {currentStep > step ? <Check className="w-6 h-6" /> : step}
                  </div>
                  <span className={`text-xs mt-2 font-medium drop-shadow ${currentStep >= step ? 'text-white' : 'text-white/60'}`}>
                    {step === 1 ? 'Basic Info' : step === 2 ? 'Professional' : 'Contact'}
                  </span>
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                    currentStep > step ? 'bg-white shadow-sm' : 'bg-white/20 backdrop-blur-sm'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-rose-500" />
                Personal Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Profile For</label>
                  <select name="profileFor" value={formData.profileFor} onChange={handleChange} className={inputClass('profileFor')}>
                    {options.profileFor.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} 
                    className={inputClass('fullName')} placeholder="Enter full name" />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass('gender')}>
                    {options.genders.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={inputClass('dob')} />
                  {errors.dob && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.dob}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Religion</label>
                  <select name="religion" value={formData.religion} onChange={handleChange} className={inputClass('religion')}>
                    {options.religions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Caste / Sub-caste *</label>
                  <input type="text" name="caste" value={formData.caste} onChange={handleChange} 
                    className={inputClass('caste')} placeholder="Enter caste/sub-caste" />
                  {errors.caste && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.caste}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mother Tongue</label>
                  <select name="motherTongue" value={formData.motherTongue} onChange={handleChange} className={inputClass('motherTongue')}>
                    {options.motherTongues.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Marital Status</label>
                  <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className={inputClass('maritalStatus')}>
                    {options.maritalStatuses.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Height (feet) *</label>
                  <select name="height" value={formData.height} onChange={handleChange} className={inputClass('height')}>
                    {options.heights.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  {errors.height && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.height}</p>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-rose-500" />
                Professional Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Education / Qualification *</label>
                  <input type="text" name="education" value={formData.education} onChange={handleChange} 
                    className={inputClass('education')} placeholder="e.g., B.E., MBA, MBBS" />
                  {errors.education && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.education}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation / Job Title *</label>
                  <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} 
                    className={inputClass('occupation')} placeholder="e.g., Software Engineer" />
                  {errors.occupation && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.occupation}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Income *</label>
                  <input type="text" name="annualIncome" value={formData.annualIncome} onChange={handleChange} 
                    className={inputClass('annualIncome')} placeholder="e.g., 5-10 Lakhs" />
                  {errors.annualIncome && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.annualIncome}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">About Me</label>
                  <textarea name="aboutMe" value={formData.aboutMe} onChange={handleChange} rows={4}
                    className={inputClass('aboutMe')} 
                    placeholder="Write a brief introduction about yourself..." />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Profile Photo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-rose-400 transition-colors bg-white">
                    {photoPreview ? (
                      <div className="relative inline-block">
                        <img src={photoPreview} alt="Preview" className="w-32 h-32 object-cover rounded-full mx-auto" />
                        <button type="button" onClick={removePhoto} 
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" id="photo-upload" />
                        <label htmlFor="photo-upload" className="cursor-pointer text-rose-600 font-semibold hover:text-rose-700">
                          Choose Photo
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
                      </>
                    )}
                  </div>
                  {errors.profilePhoto && <p className="text-red-500 text-xs mt-1">{errors.profilePhoto}</p>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Lock className="w-6 h-6 text-rose-500" />
                Contact & Security
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <select name="country" value={formData.country} onChange={handleChange} className={inputClass('country')}>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} 
                    className={inputClass('state')} placeholder="Enter state" />
                  {errors.state && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City / District *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} 
                    className={inputClass('city')} placeholder="Enter city" />
                  {errors.city && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email ID *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} 
                    className={inputClass('email')} placeholder="your@email.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} 
                    className={inputClass('mobile')} placeholder="10-digit number" />
                  {errors.mobile && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.mobile}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} 
                    className={inputClass('password')} placeholder="Min 6 characters" />
                  {errors.password && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password *</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} 
                    className={inputClass('confirmPassword')} placeholder="Re-enter password" />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="bg-rose-50 rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} 
                    onChange={handleChange} className="mt-1 w-5 h-5 text-rose-600 rounded border-gray-300 focus:ring-rose-500" />
                  <span className="text-sm text-gray-700">
                    I accept the <a href="#" className="text-rose-600 font-semibold hover:underline">Terms & Conditions</a> and <a href="#" className="text-rose-600 font-semibold hover:underline">Privacy Policy</a>
                  </span>
                </label>
                {errors.termsAccepted && <p className="text-red-500 text-xs mt-2 ml-8 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.termsAccepted}</p>}
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <button type="button" onClick={handlePrev}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300">
                Previous
              </button>
            )}
            {currentStep < 3 ? (
              <button type="button" onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Next Step
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Profile...
                  </>
                ) : (
                  'Complete Registration'
                )}
              </button>
            )}
          </div>

          {errors.submit && (
            <p className="text-red-500 text-center mt-4 flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4" />{errors.submit}
            </p>
          )}
        </div>

        <p className="text-center text-white drop-shadow-lg mt-6">
          Already have an account? <a href="#" className="font-semibold hover:underline">Login here</a>
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ModernRegister;