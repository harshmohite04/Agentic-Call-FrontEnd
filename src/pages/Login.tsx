"use client"

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BoltIcon } from "../components/Icons";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login-otp");
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
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 text-center">Welcome Back</h2>
          <p className="text-center text-gray-300 text-sm mb-6 sm:mb-8">
            Sign in to your AI communication account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-white/20 text-purple-600 focus:ring-purple-500 bg-white/10"
                />
                <span className="ml-2 text-gray-300">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm text-gray-300">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
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

export default Login;

