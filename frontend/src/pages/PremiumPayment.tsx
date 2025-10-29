import React, { useState } from 'react';
import { Crown, Check, CreditCard, Smartphone, Building2, ArrowRight, Shield, Star, Users, MessageCircle, Heart, Sparkles, Lock, Zap } from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";
const PremiumPayment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: '',
    bankName: 'State Bank of India'
  });

  const premiumPrice = 2999;
  const premiumDuration = '1 Year';

  const premiumFeatures = [
    'Unlimited profile views',
    'Send unlimited interests',
    'Advanced search filters',
    'Profile highlighting',
    'See who viewed your profile',
    'Verified badge ✓',
    'Priority chat support',
    'Video call enabled',
    '3x Profile visibility boost',
    'Top search priority',
    'Background verification',
    'Astrology matching'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to continue with payment.');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('http://localhost:5000/api/premiumpayment/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // 🔥 add this line
        },
        body: JSON.stringify({
          userId: userId,
          amount: premiumPrice,
          duration: premiumDuration,
          paymentMethod
        })

      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
      } else {
        alert(data.message || 'Payment failed.');
      }

    } catch (err) {
      console.error('Payment error:', err);
      alert('Error processing payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };


  const floatingHearts = [];
  for (let i = 0; i < 10; i++) {
    floatingHearts.push(
      <Heart
        key={i}
        className="absolute text-white/20"
        fill="currentColor"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${20 + Math.random() * 30}px`,
          height: `${20 + Math.random() * 30}px`,
          animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`
        }}
      />
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')`,
            filter: 'blur(8px)',
            transform: 'scale(1.1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/70 via-pink-800/60 to-purple-900/70" />

        <div className="relative max-w-md w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center animate-fadeIn">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Payment Successful! 🎉</h1>
          <p className="text-gray-600 mb-6 text-lg">
            Welcome to Premium Membership!
          </p>
          <div className="bg-gradient-to-r from-yellow-50 to-pink-50 rounded-2xl p-6 mb-6 border-2 border-yellow-200">
            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-3" />
            <p className="text-xl font-bold text-gray-800 mb-1">
              Premium Membership Activated
            </p>
            <p className="text-sm text-gray-600">{premiumDuration} • ₹{premiumPrice}</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600 font-semibold">
              <Check className="w-4 h-4" />
              Profile Upgraded Successfully
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-3">You're all set — enjoy premium features.</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                // Navigate to biodata after user acknowledges
                if (userId) navigate(`/biodata?userId=${userId}`);
                else navigate('/biodata');
              }}
              className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-semibold"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden py-6 px-4">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920&q=80')`,
          filter: 'blur(10px)',
          transform: 'scale(1.1)'
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/80 via-pink-800/70 to-rose-900/80" />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {floatingHearts}
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-3xl mb-4 shadow-2xl animate-pulse">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-2xl">
            Upgrade to Premium
          </h1>
          <p className="text-white/90 text-xl drop-shadow-lg flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Find your perfect match faster!
            <Sparkles className="w-5 h-5" />
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          <div className="space-y-6">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-pink-600 rounded-3xl mb-4 shadow-xl">
                  <Crown className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Premium Membership</h2>
                <p className="text-gray-600">Unlock all exclusive features</p>

                <div className="mt-6 inline-block">
                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl px-6 py-4 border-2 border-rose-200">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
                        ₹{premiumPrice}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{premiumDuration} Membership</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" fill="currentColor" />
                  All Premium Features Included
                </h3>
                <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-2">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 bg-green-50 rounded-lg p-3 border border-green-200">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Why Choose Premium?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-white/90">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">3x More Visibility</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm">Priority Support</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm">Verified Badge</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Heart className="w-5 h-5 text-pink-400" />
                  <span className="text-sm">Better Matches</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30 lg:sticky lg:top-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-rose-500" />
              Complete Payment
            </h2>

            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-4 mb-6 border-2 border-rose-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">You're getting</p>
                  <p className="text-xl font-bold text-gray-800">Premium Membership</p>
                  <p className="text-xs text-gray-600">{premiumDuration}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
                    ₹{premiumPrice}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Payment Method</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border-2 transition-all ${paymentMethod === 'card'
                        ? 'border-rose-500 bg-rose-50 shadow-lg'
                        : 'border-gray-200 hover:border-rose-300 bg-white'
                      }`}
                  >
                    <CreditCard className={`w-6 h-6 mx-auto mb-2 ${paymentMethod === 'card' ? 'text-rose-500' : 'text-gray-400'}`} />
                    <p className="text-xs font-medium text-gray-700">Card</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-xl border-2 transition-all ${paymentMethod === 'upi'
                        ? 'border-rose-500 bg-rose-50 shadow-lg'
                        : 'border-gray-200 hover:border-rose-300 bg-white'
                      }`}
                  >
                    <Smartphone className={`w-6 h-6 mx-auto mb-2 ${paymentMethod === 'upi' ? 'text-rose-500' : 'text-gray-400'}`} />
                    <p className="text-xs font-medium text-gray-700">UPI</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-4 rounded-xl border-2 transition-all ${paymentMethod === 'netbanking'
                        ? 'border-rose-500 bg-rose-50 shadow-lg'
                        : 'border-gray-200 hover:border-rose-300 bg-white'
                      }`}
                  >
                    <Building2 className={`w-6 h-6 mx-auto mb-2 ${paymentMethod === 'netbanking' ? 'text-rose-500' : 'text-gray-400'}`} />
                    <p className="text-xs font-medium text-gray-700">Banking</p>
                  </button>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={formData.cardholderName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="animate-fadeIn">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">UPI ID</label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    placeholder="yourname@upi"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition"
                  />
                  <p className="text-xs text-gray-500 mt-2">Enter your UPI ID (Google Pay, PhonePe, Paytm, etc.)</p>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="animate-fadeIn">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Your Bank</label>
                  <select
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition"
                  >
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Punjab National Bank</option>
                    <option>Bank of Baroda</option>
                    <option>Canara Bank</option>
                    <option>Other Banks</option>
                  </select>
                </div>
              )}

              <div className="bg-blue-50 rounded-xl p-4 my-6 flex items-start gap-3 border border-blue-200">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">100% Secure Payment.</span> Your data is encrypted with 256-bit SSL. We never store card details.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Pay ₹{premiumPrice} Securely
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                By proceeding, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => alert('Redirecting to basic features...')}
            className="text-white/90 hover:text-white text-sm font-semibold underline hover:scale-105 transition-transform"
          >
            Skip and explore basic features →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PremiumPayment;