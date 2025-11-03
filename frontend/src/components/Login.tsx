import React, { useState, useCallback } from 'react';
import { Heart, Eye, EyeOff, Loader2, User, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
  const { setUserName } = useAuth();

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
        body: JSON.stringify({ email: loginId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage(data.message);

        const userNameFromDB = data.user?.fullName || "User";
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', userNameFromDB);
        localStorage.setItem('userId', data.user?.id);
        setUserName(userNameFromDB);

  // navigate to biodata; use the returned user id if available
  setTimeout(() => navigate(`/biodata?userId=${data.user?.id || ''}`), 1000);
      } else {
        setErrors({ submit: data.message });
      }
    } catch (err) {
      console.error(err);
      setErrors({ submit: 'Network error. Try again later.' });
    } finally {
      setIsLoading(false);
    }
  }, [loginId, password, navigate, setUserName]);

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 bg-gray-50 border rounded-lg outline-none transition text-gray-800 placeholder-gray-400 
    ${errors[field]
      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
      : 'border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100'}`;

  return (
    <div className="min-h-screen w-full flex bg-white mt-10">
      {/* Left Side - Image */}
     <div
  className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage:
      "url('https://www.eastwood-hall.co.uk/wp-content/uploads/2024/01/130-SaywellHQ-Picks-_-Lauren-Adam-_-09-10-2021-_-SaywellHQ.co_.uk-HQ300675_websize-2.jpg')",
  }}
>
  <div className="absolute inset-0 bg-black/30"></div> {/* Optional dark overlay for better text contrast */}

  <div className="relative z-10 flex items-center justify-center w-full h-full p-12">
    <div className="text-center text-white">
      
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-2 drop-shadow-md">
          Find Your Perfect Match
        </h2>
        <p className="text-gray-100 drop-shadow-sm">
          Join thousands of happy couples who found their soulmate
        </p>
      </div>
    </div>
  </div>
</div>


      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
              <Heart className="w-8 h-8 text-rose-600" fill="currentColor" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="loginId" className="block text-sm font-semibold text-gray-700 mb-2">
                Login ID
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="loginId"
                  value={loginId}
                  onChange={e => { setLoginId(e.target.value); if (errors.loginId) setErrors(prev => ({ ...prev, loginId: undefined, submit: undefined })); }}
                  className={`${inputClass('loginId')} pl-11`}
                  placeholder="Enter your email or ID"
                  disabled={isLoading}
                />
              </div>
              {errors.loginId && <p className="mt-1 text-sm text-red-600">{errors.loginId}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: undefined, submit: undefined })); }}
                  className={`${inputClass('password')} pl-11 pr-11`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
            
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">Remember me</label>
              </div>
              <a href="#" className="text-sm text-rose-600 hover:text-rose-700 font-medium">Forgot Password?</a>
            </div>

            {(errors.submit || statusMessage) && (
              <div className={`p-3 rounded-lg text-sm text-center ${errors.submit ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                {errors.submit || statusMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                New User?
                <Link to="/register" className="ml-1 text-rose-600 hover:text-rose-700 font-semibold">
                  Register Here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
