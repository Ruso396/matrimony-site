import React, { useState, useEffect } from 'react';
import { Heart, User, Briefcase, Shield, Info, MapPin, Camera, X, Check, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

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
  age?: string;
  rulesAccepted?: string;
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
    profilePhoto: null as File | null,
    age: '',
    rule1: false,
    rule2: false,
    rule3: false,
    rule4: false,
    rule5: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
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

  useEffect(() => {
    if (isSuccess) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isSuccess]);

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
      if (!formData.age.trim()) newErrors.age = 'Age is required';
      else if (isNaN(Number(formData.age)) || Number(formData.age) < 18)
        newErrors.age = 'Enter a valid age (18 or above)';
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
      window.scrollTo({ top: 0, behavior: "smooth" }); // 👈 scroll to top
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 👈 scroll to top
  };


  const handleSubmit = async () => {
    // First validate step 3
    if (!validateStep(3)) return;

    // Then check if all rules are accepted
    const newErrors: FormErrors = {};

    if (!formData.rule1 || !formData.rule2 || !formData.rule3 || !formData.rule4 || !formData.rule5) {
      newErrors.rulesAccepted = 'Please accept all rules and regulations to proceed';
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append all form fields EXCEPT rules
      Object.keys(formData).forEach((key) => {
        if (key !== 'profilePhoto' && key !== 'termsAccepted' &&
          key !== 'rule1' && key !== 'rule2' && key !== 'rule3' &&
          key !== 'rule4' && key !== 'rule5') {
          formDataToSend.append(key, formData[key as keyof typeof formData] as string);
        }
      });

      // ✅ Append rules as boolean strings explicitly
      formDataToSend.append('rule1', formData.rule1.toString());
      formDataToSend.append('rule2', formData.rule2.toString());
      formDataToSend.append('rule3', formData.rule3.toString());
      formDataToSend.append('rule4', formData.rule4.toString());
      formDataToSend.append('rule5', formData.rule5.toString());

      // Append profile photo if exists
      if (formData.profilePhoto) {
        formDataToSend.append('profilePhoto', formData.profilePhoto);
      }

      const response = await fetch('http://localhost:5000/api/register/register', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        // Show success popup
        setIsSuccess(true);
        // Automatically redirect to login after 3 seconds
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      } else {
        setErrors({ submit: data.message || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field: keyof FormErrors) => `
    w-full px-4 py-3 rounded-lg border bg-gray-50 transition-all outline-none text-gray-800
    ${errors[field]
      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
      : 'border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100'
    }
  `;

  if (isSuccess) {
    return (
      <div className="min-h-screen flex bg-white">
        <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-rose-50 to-pink-50">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
              alt="Success"
              className="w-full max-w-lg rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full text-center">
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
            <button
              onClick={() => window.location.href = '/login'}
              className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition shadow-md hover:shadow-lg"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { num: 1, label: 'Personal Info', icon: User },
    { num: 2, label: 'Professional', icon: Briefcase },
    { num: 3, label: 'Contact', icon: MapPin },
    { num: 4, label: 'Rules', icon: Shield }
  ];

  return (
    <div className="min-h-screen flex bg-white mt-20">
      {/* Left Side - Image */}
      <div
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://www.eastwood-hall.co.uk/wp-content/uploads/2024/01/130-SaywellHQ-Picks-_-Lauren-Adam-_-09-10-2021-_-SaywellHQ.co_.uk-HQ300675_websize-2.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex items-center justify-center w-full h-full p-12">
          <div className="text-center text-white">
            <div className="mt-8">
              <h2 className="text-3xl font-bold mb-2 drop-shadow-md">
                Start Your Journey
              </h2>
              <p className="text-gray-100 drop-shadow-sm">
                Create your profile and find your perfect match
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
              <Heart className="w-8 h-8 text-rose-600" fill="currentColor" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Profile</h1>
            <p className="text-gray-600">Join thousands of happy couples</p>
          </div>

          {/* Step Indicators */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, idx) => (
                <React.Fragment key={step.num}>
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all border-2 ${currentStep >= step.num
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white text-gray-400 border-gray-300'
                      }`}>
                      {currentStep > step.num ? <Check className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${currentStep >= step.num ? 'text-gray-800' : 'text-gray-400'}`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 transition-all ${currentStep > step.num ? 'bg-rose-600' : 'bg-gray-300'
                      }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
            {currentStep === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-rose-600" />
                  Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
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
                    {errors.fullName && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.fullName}</p>}
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
                    {errors.dob && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.dob}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange}
                      className={inputClass('age')} placeholder="Enter your age" min="18" max="80" />
                    {errors.age && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.age}</p>}
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
                    {errors.caste && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.caste}</p>}
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

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Height (feet) *</label>
                    <select name="height" value={formData.height} onChange={handleChange} className={inputClass('height')}>
                      {options.heights.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    {errors.height && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.height}</p>}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-rose-600" />
                  Professional Details
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Education / Qualification *</label>
                    <input type="text" name="education" value={formData.education} onChange={handleChange}
                      className={inputClass('education')} placeholder="e.g., B.E., MBA, MBBS" />
                    {errors.education && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.education}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation / Job Title *</label>
                    <input type="text" name="occupation" value={formData.occupation} onChange={handleChange}
                      className={inputClass('occupation')} placeholder="e.g., Software Engineer" />
                    {errors.occupation && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.occupation}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Income *</label>
                    <input type="text" name="annualIncome" value={formData.annualIncome} onChange={handleChange}
                      className={inputClass('annualIncome')} placeholder="e.g., 5-10 Lakhs" />
                    {errors.annualIncome && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.annualIncome}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">About Me</label>
                    <textarea name="aboutMe" value={formData.aboutMe} onChange={handleChange} rows={4}
                      className={inputClass('aboutMe')}
                      placeholder="Write a brief introduction about yourself..." />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Profile Photo</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-rose-500 transition-colors bg-gray-50">
                      {photoPreview ? (
                        <div className="relative inline-block">
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-white shadow-lg"
                          />
                          <button
                            type="button"
                            onClick={removePhoto}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : formData.fullName ? (
                        // 🟢 Show first letter of name if profile photo is missing
                        <div className="w-32 h-32 flex items-center justify-center rounded-full mx-auto border-4 border-white shadow-lg text-white text-3xl font-bold bg-gradient-to-br from-rose-500 to-pink-500">
                          {formData.fullName.charAt(0).toUpperCase()}
                        </div>
                      ) : (
                        // Default camera icon if no name typed yet
                        <>
                          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                            id="photo-upload"
                          />
                          <label
                            htmlFor="photo-upload"
                            className="cursor-pointer text-rose-600 font-semibold hover:text-rose-700"
                          >
                            Choose Photo
                          </label>
                          <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
                        </>
                      )}

                    </div>
                    {errors.profilePhoto && <p className="text-red-600 text-xs mt-1">{errors.profilePhoto}</p>}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-rose-600" />
                  Contact & Security
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
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
                    {errors.state && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City / District *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange}
                      className={inputClass('city')} placeholder="Enter city" />
                    {errors.city && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email ID *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                      className={inputClass('email')} placeholder="your@email.com" />
                    {errors.email && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange}
                      className={inputClass('mobile')} placeholder="10-digit number" />
                    {errors.mobile && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.mobile}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange}
                      className={inputClass('password')} placeholder="Min 6 characters" />
                    {errors.password && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password *</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                      className={inputClass('confirmPassword')} placeholder="Re-enter password" />
                    {errors.confirmPassword && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div className="bg-rose-50 rounded-xl p-4 mt-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted}
                      onChange={handleChange} className="mt-1 w-5 h-5 text-rose-600 rounded border-gray-300 focus:ring-rose-500" />
                    <span className="text-sm text-gray-700">
                      I accept the <button type="button" className="text-rose-600 font-semibold hover:underline">Terms & Conditions</button> and <button type="button" className="text-rose-600 font-semibold hover:underline">Privacy Policy</button>
                    </span>
                  </label>
                  {errors.termsAccepted && <p className="text-red-600 text-xs mt-2 ml-8 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.termsAccepted}</p>}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-rose-600" />
                  Rules and Regulations
                </h2>

                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-200">
                  <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                    Please read and accept all the following rules and regulations to complete your registration:
                  </p>

                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.rule1}
                        onChange={(e) => setFormData({ ...formData, rule1: e.target.checked })}
                        className="mt-1 w-5 h-5 text-rose-600 rounded border-gray-300 focus:ring-rose-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">
                        <strong>Authenticity:</strong> I confirm that all information provided in my profile is accurate, truthful, and up-to-date. I understand that providing false information may result in account suspension.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.rule2}
                        onChange={(e) => setFormData({ ...formData, rule2: e.target.checked })}
                        className="mt-1 w-5 h-5 text-rose-600 rounded border-gray-300 focus:ring-rose-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">
                        <strong>Respectful Conduct:</strong> I agree to maintain respectful and appropriate behavior with all members. Any form of harassment, abuse, or inappropriate communication will not be tolerated.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.rule3}
                        onChange={(e) => setFormData({ ...formData, rule3: e.target.checked })}
                        className="mt-1 w-5 h-5 text-rose-600 rounded border-gray-300 focus:ring-rose-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">
                        <strong>No Refund Policy:</strong> I understand that all subscription fees and payments made are non-refundable. Once payment is processed, no refunds will be issued under any circumstances.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.rule4}
                        onChange={(e) => setFormData({ ...formData, rule4: e.target.checked })}
                        className="mt-1 w-5 h-5 text-rose-600 rounded border-gray-300 focus:ring-rose-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">
                        <strong>No Commercial Use:</strong> I will not use this platform for any commercial purposes, advertising, or promoting any business or services. This platform is strictly for matrimonial purposes only.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.rule5}
                        onChange={(e) => setFormData({ ...formData, rule5: e.target.checked })}
                        className="mt-1 w-5 h-5 text-rose-600 rounded border-gray-300 focus:ring-rose-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">
                        <strong>Age Verification:</strong> I confirm that I am at least 18 years of age and legally eligible to enter into a matrimonial relationship as per the laws of my country/region.
                      </span>
                    </label>
                  </div>

                  {errors.rulesAccepted && (
                    <p className="text-red-600 text-sm mt-4 flex items-center gap-2 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="w-4 h-4" />
                      {errors.rulesAccepted}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">Important Notice</p>
                      <p>By accepting these rules, you acknowledge that you have read, understood, and agree to comply with all the terms mentioned above. Violation of any rules may result in immediate account termination without prior notice.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <button type="button" onClick={handlePrev}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                  <ArrowLeft className="w-5 h-5" />
                  Previous
                </button>
              )}
              {currentStep < 4 ? (
                <button type="button" onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-2 bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition shadow-md hover:shadow-lg">
                  Next Step
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={isLoading}
                  className="flex-1 bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
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
              <p className="text-red-600 text-center mt-4 flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />{errors.submit}
              </p>
            )}
          </div>

          <p className="text-center text-gray-600 mt-6">
            Already have an account? <button onClick={() => window.location.href = '/login'} className="text-rose-600 font-semibold hover:underline">Login here</button>
          </p>
        </div>
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