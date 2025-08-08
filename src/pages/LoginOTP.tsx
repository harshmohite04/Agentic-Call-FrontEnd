"use client"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BoltIcon } from "../components/Icons";

const LoginOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOTPChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[data-index="${index - 1}"]`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResendOTP = () => {
    setTimeLeft(30);
    // Add resend logic here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.some(digit => !digit)) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-5 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Modern animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/20 rounded-full -top-10 sm:-top-20 -left-10 sm:-left-20 animate-pulse blur-xl"></div>
        <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full -bottom-16 sm:-bottom-32 -right-16 sm:-right-32 animate-pulse delay-300 blur-xl"></div>
        <div className="absolute w-32 h-32 sm:w-48 sm:h-48 bg-indigo-500/20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500 blur-xl"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center relative animate-fade-in">
        <div className="mb-6 sm:mb-8 transform hover:scale-110 transition-transform duration-300 flex flex-col items-center">
          <div className="relative">
            <BoltIcon className="w-16 h-16 sm:w-20 sm:h-20 text-purple-400 animate-pulse mb-3 sm:mb-4 drop-shadow-lg" />
            <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 bg-purple-500/20 rounded-full blur-xl animate-ping"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">AgenticCall</h1>
          <p className="text-xs sm:text-sm mt-1 sm:mt-2 text-gray-300 font-medium">AI-Powered Communication Platform</p>
        </div>

        <div className="w-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300 hover:shadow-3xl border border-white/20">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 text-center">Verify OTP</h2>
          <p className="text-center text-gray-300 text-sm mb-6 sm:mb-8">
            We've sent a verification code to your email
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="flex justify-center space-x-2 sm:space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  data-index={index}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-semibold bg-white/10 rounded-lg border-2 border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-300 text-white backdrop-blur-sm"
                  maxLength={1}
                />
              ))}
            </div>

            <div className="text-center">
              {timeLeft > 0 ? (
                <p className="text-sm text-gray-300">
                  Resend code in <span className="font-semibold text-purple-400">{timeLeft}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={otp.some(digit => !digit) || isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="text-center">
              <button
                onClick={() => navigate(-1)}
                className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
              >
                ← Back to Login
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 sm:mt-8 flex space-x-4 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
        </div>
      </div>
    </div>
  );
};

export default LoginOTP;

