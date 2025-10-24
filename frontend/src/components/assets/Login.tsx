import React, { useState, useCallback, useMemo } from 'react';
import { Heart, Eye, EyeOff, Loader2, Mail, Phone, Chrome, Facebook, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
// Use a custom type for the error state
interface FormErrors {
  loginId?: string;
  password?: string;
  submit?: string;
}

// Main App Component
const Login = () => {
  const [loginId, setLoginId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState<string>('');

  // 1. Validation Logic
  const validateForm = (): boolean => {
    let newErrors: FormErrors = {};

    if (!loginId.trim()) {
      newErrors.loginId = 'Login ID is required.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 2. Handle Submit
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('');
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // --- Simulate API Call ---
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check credentials (Simulated)
      if (loginId === 'gemini' && password === '1234') {
        setStatusMessage('Login successful! Welcome back.');
      } else {
        setErrors({ submit: 'Invalid Login ID or Password. Please try again.' });
      }

    } catch (error) {
      console.error('Login Error:', error);
      setErrors({ submit: 'An unexpected error occurred during login.' });
    } finally {
      setIsLoading(false);
    }
  }, [loginId, password]);

  // 3. Floating Hearts generation (Memoized for performance)
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }).map((_, index) => (
      <Heart
        key={index}
        className="absolute text-rose-300 opacity-50"
        fill="currentColor"
        style={{
          // Apply custom CSS animation class and random initial properties
          animation: `floatHeart 10s linear infinite ${Math.random() * 5}s`,
          left: `${Math.random() * 100}%`,
          top: `${100 + Math.random() * 50}vh`, // Start below the screen
          width: `${10 + Math.random() * 20}px`,
          height: `${10 + Math.random() * 20}px`,
        }}
      />
    ));
  }, []);

  // Use a custom style tag for the necessary CSS keyframes
  const customCss = `
    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

    @keyframes floatHeart {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0.2;
      }
      100% {
        transform: translateY(-120vh) rotate(360deg);
        opacity: 0;
      }
    }
    .shadow-3xl {
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
    }
  `;

  // Dynamic input styling based on error state
  // Height Adjustment: Changed py-2 to py-1
  const inputClass = (field: keyof FormErrors) => 
    `w-full px-4 py-1 bg-white/20 backdrop-blur-sm border rounded-xl outline-none transition text-white placeholder-white/60 focus:ring-2 
    ${errors[field] ? 'border-red-400 focus:ring-red-400' : 'border-white/30 focus:ring-rose-400 focus:border-transparent'}`;


  return (
    <div className="min-h-screen w-full relative overflow-hidden font-sans bg-gray-900 py-3">
      
      {/* Custom CSS for Font and Animation */}
      <style>{customCss}</style>

      {/* Background Image and Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        {/* Subtle Gradient Overlay for Mood (Removed dark overlay for clarity) */}
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 via-transparent to-pink-900/30"></div>
        
        {/* Animated Floating Hearts Container */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {hearts}
        </div>
      </div>

      {/* --- TOP CONTACT HEADER --- */}
      <header className="relative z-20 w-full bg-white/10 backdrop-blur-sm shadow-md py-3 px-4 sm:px-8 flex justify-between items-center">
        <div className="text-sm font-semibold text-white/90 tracking-wider">
          Soulmate Finder
        </div>
        <div className="flex space-x-4 text-white/80 text-xs sm:text-sm">
          <a href="tel:+1234567890" className="flex items-center gap-1 hover:text-rose-300 transition-colors">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4" /> 
            <span className="hidden sm:inline">+1 (234) 567-890</span>
          </a>
          <a href="mailto:support@soulmate.com" className="flex items-center gap-1 hover:text-rose-300 transition-colors">
            <Mail className="w-3 h-3 sm:w-4 sm:h-4" /> 
            <span className="hidden sm:inline">support@soulmate.com</span>
          </a>
        </div>
      </header>

      {/* --- CONTENT AREA --- */}
      {/* Reduced vertical padding around the card container */}
      <div className="relative z-10 flex items-center justify-center pt-12 pb-8 sm:pt-16 sm:pb-10 px-4">
        <div className="w-full max-w-sm md:max-w-md">
          
          {/* Glass Morphism Card */}
          {/* Height Adjustment: Reduced p-4 sm:p-6 to p-3 sm:p-5 */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-3xl p-3 sm:p-5 border border-white/30 transition-all duration-300 hover:shadow-rose-500/30">
            
            {/* Title */}
            {/* Height Adjustment: Reduced mb-6 to mb-4 */}
            <div className="text-center mb-4"> 
              <div className="flex items-center justify-center gap-3 mb-2">
                <Heart className="w-6 h-6 text-rose-300" fill="currentColor" />
                <h1 
                  className="text-4xl sm:text-5xl font-serif text-white drop-shadow-lg tracking-wide" 
                  style={{ fontFamily: 'Great Vibes, cursive' }}
                >
                  Find Your Soulmate
                </h1>
                <Heart className="w-6 h-6 text-rose-300" fill="currentColor" />
              </div>
              <p className="text-white/80 text-sm font-light tracking-widest uppercase">
                Where Hearts Unite
              </p>
            </div>

            {/* Form */}
            {/* Height Adjustment: Reduced space-y-4 to space-y-3 */}
            <form onSubmit={handleSubmit} className="space-y-3"> 
              
              {/* Login ID */}
              <div>
                <label htmlFor="loginId" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-rose-300" /> Login ID
                </label>
                {/* Input class uses py-1 now, defined in inputClass function */}
                <input
                  type="text"
                  id="loginId"
                  value={loginId}
                  onChange={(e) => {
                    setLoginId(e.target.value);
                    // Real-time validation clear
                    if (errors.loginId) setErrors(prev => ({ ...prev, loginId: undefined, submit: undefined }));
                  }}
                  className={inputClass('loginId')}
                  placeholder="Enter your email or ID"
                  disabled={isLoading}
                />
                {errors.loginId && (
                  <p className="mt-1 text-xs text-red-300 font-semibold">{errors.loginId}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-rose-300" /> Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      // Real-time validation clear
                      if (errors.password) setErrors(prev => ({ ...prev, password: undefined, submit: undefined }));
                    }}
                    className={inputClass('password')}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  {/* Password Visibility Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-300 font-semibold">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-rose-500 bg-white/20 border-white/50 rounded focus:ring-rose-400 cursor-pointer"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-white/80 select-none">
                    Remember me
                  </label>
                </div>
                <a 
                  href="#" 
                  className="text-rose-300/90 hover:text-rose-200 transition drop-shadow hover:scale-[1.02] active:scale-[0.98]"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Status/Error Message */}
              {(errors.submit || statusMessage) && (
                <div className={`p-2 rounded-lg text-center ${errors.submit ? 'bg-red-900/40 text-red-300' : 'bg-green-900/40 text-green-300'}`}>
                    {errors.submit || statusMessage}
                </div>
              )}

              {/* Login Button */}
              {/* Keeping py-2 for good touch target size, but using smaller font text-base */}
              <button
                type="submit"
                className="w-full flex justify-center items-center space-x-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 rounded-xl font-semibold text-base hover:from-rose-600 hover:to-pink-600 transition duration-300 shadow-lg hover:shadow-rose-500/50 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </button>

              {/* Register Link */}
              <div className="text-center pt-1">
                <p className="text-white/70 text-sm">
                  New User? 
                   <Link 
    to="/register"
    className="ml-1 text-rose-300 hover:text-rose-200 transition font-medium drop-shadow"
  >
    Register Here
  </Link>
                </p>
              </div>
            </form>
            
            {/* Social Login Section */}
            {/* Height Adjustment: Reduced mt-8 pt-6 to mt-4 pt-2 */}
            <div className="mt-4 pt-2 border-t border-white/20">
                <p className="text-center text-white/80 text-sm mb-3">Or sign in with</p>
                <div className="flex justify-center space-x-4">
                    <button className="flex items-center justify-center p-2 w-1/2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all border border-white/20 hover:border-white/40 shadow-md text-sm">
                        <Chrome className="w-4 h-4 mr-2 text-rose-300" />
                        Google
                    </button>
                    <button className="flex items-center justify-center p-2 w-1/2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all border border-white/20 hover:border-white/40 shadow-md text-sm">
                        <Facebook className="w-4 h-4 mr-2 text-blue-300" />
                        Facebook
                    </button>
                </div>
            </div>

          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
