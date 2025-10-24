import React, { useState, useCallback, useMemo } from 'react';
import { Heart, Eye, EyeOff, Loader2, Mail, Phone, Chrome, Facebook, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface FormErrors {
  loginId?: string;
  password?: string;
  submit?: string;
}

const Login = () => {
  const [loginId, setLoginId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState<string>('');
  const navigate = useNavigate();

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!loginId.trim()) newErrors.loginId = 'Login ID is required.';
    if (!password) newErrors.password = 'Password is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('');
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/register/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email: loginId, password })
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage(data.message);
        // Save token to localStorage if you want
        localStorage.setItem('token', data.token);
        // Redirect to dashboard or home
setTimeout(() => navigate('/biodata'), 1000);
      } else {
        setErrors({ submit: data.message });
      }
    } catch (err) {
      console.error(err);
      setErrors({ submit: 'Network error. Try again later.' });
    } finally {
      setIsLoading(false);
    }
  }, [loginId, password, navigate]);

  // Hearts animation
  const hearts = useMemo(() =>
    Array.from({ length: 15 }).map((_, i) => (
      <Heart
        key={i}
        className="absolute text-rose-300 opacity-50"
        fill="currentColor"
        style={{
          animation: `floatHeart 10s linear infinite ${Math.random() * 5}s`,
          left: `${Math.random() * 100}%`,
          top: `${100 + Math.random() * 50}vh`,
          width: `${10 + Math.random() * 20}px`,
          height: `${10 + Math.random() * 20}px`,
        }}
      />
    )), []);

  const customCss = `
    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

    @keyframes floatHeart {
      0% { transform: translateY(0) rotate(0deg); opacity:0.2; }
      100% { transform: translateY(-120vh) rotate(360deg); opacity:0; }
    }
    .shadow-3xl {
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2), 0 10px 10px -5px rgba(0,0,0,0.1);
    }
  `;

  const inputClass = (field: keyof FormErrors) => 
    `w-full px-4 py-1 bg-white/20 backdrop-blur-sm border rounded-xl outline-none transition text-white placeholder-white/60 focus:ring-2 
    ${errors[field] ? 'border-red-400 focus:ring-red-400' : 'border-white/30 focus:ring-rose-400 focus:border-transparent'}`;

  return (
    <div className="min-h-screen w-full relative overflow-hidden font-sans bg-gray-900 py-3">
      <style>{customCss}</style>
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80')` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 via-transparent to-pink-900/30"></div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">{hearts}</div>
      </div>

      <header className="relative z-20 w-full bg-white/10 backdrop-blur-sm shadow-md py-3 px-4 sm:px-8 flex justify-between items-center">
        <div className="text-sm font-semibold text-white/90 tracking-wider">Soulmate Finder</div>
        <div className="flex space-x-4 text-white/80 text-xs sm:text-sm">
          <a href="tel:+1234567890" className="flex items-center gap-1 hover:text-rose-300 transition-colors">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">+1 (234) 567-890</span>
          </a>
          <a href="mailto:support@soulmate.com" className="flex items-center gap-1 hover:text-rose-300 transition-colors">
            <Mail className="w-3 h-3 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">support@soulmate.com</span>
          </a>
        </div>
      </header>

      <div className="relative z-10 flex items-center justify-center pt-12 pb-8 sm:pt-16 sm:pb-10 px-4">
        <div className="w-full max-w-sm md:max-w-md">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-3xl p-3 sm:p-5 border border-white/30 transition-all duration-300 hover:shadow-rose-500/30">
            <div className="text-center mb-4"> 
              <div className="flex items-center justify-center gap-3 mb-2">
                <Heart className="w-6 h-6 text-rose-300" fill="currentColor" />
                <h1 className="text-4xl sm:text-5xl font-serif text-white drop-shadow-lg tracking-wide" style={{ fontFamily: 'Great Vibes, cursive' }}>
                  Find Your Soulmate
                </h1>
                <Heart className="w-6 h-6 text-rose-300" fill="currentColor" />
              </div>
              <p className="text-white/80 text-sm font-light tracking-widest uppercase">Where Hearts Unite</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="loginId" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-rose-300" /> Login ID
                </label>
                <input
                  type="text"
                  id="loginId"
                  value={loginId}
                  onChange={e => { setLoginId(e.target.value); if (errors.loginId) setErrors(prev => ({ ...prev, loginId: undefined, submit: undefined })); }}
                  className={inputClass('loginId')}
                  placeholder="Enter your email or ID"
                  disabled={isLoading}
                />
                {errors.loginId && <p className="mt-1 text-xs text-red-300 font-semibold">{errors.loginId}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-rose-300" /> Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: undefined, submit: undefined })); }}
                    className={inputClass('password')}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-300 font-semibold">{errors.password}</p>}
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-rose-500 bg-white/20 border-white/50 rounded focus:ring-rose-400 cursor-pointer"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-white/80 select-none">Remember me</label>
                </div>
                <a href="#" className="text-rose-300/90 hover:text-rose-200 transition drop-shadow hover:scale-[1.02] active:scale-[0.98]">Forgot Password?</a>
              </div>

              {(errors.submit || statusMessage) && (
                <div className={`p-2 rounded-lg text-center ${errors.submit ? 'bg-red-900/40 text-red-300' : 'bg-green-900/40 text-green-300'}`}>
                  {errors.submit || statusMessage}
                </div>
              )}

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
                ) : (<span>Login</span>)}
              </button>

              <div className="text-center pt-1">
                <p className="text-white/70 text-sm">
                  New User? 
                  <Link to="/register" className="ml-1 text-rose-300 hover:text-rose-200 transition font-medium drop-shadow">
                    Register Here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
