"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BoltIcon } from "../components/Icons"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/login-otp")
  }

  const handleVerify = async () => {
    if (username) {
      setIsVerifying(true)
      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsVerifying(false)
      navigate("/login-otp")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 bg-gradient-to-br from-green-50 to-green-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 bg-green-200/30 rounded-full -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-green-200/30 rounded-full -bottom-32 -right-32 animate-pulse delay-300"></div>
      </div>

      <div className="w-full max-w-md flex flex-col items-center relative animate-fade-in">
        <div className="mb-8 transform hover:scale-110 transition-transform duration-300 flex flex-col items-center">
          <BoltIcon className="w-16 h-16 text-green-600 animate-pulse mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">POWERNETPRO</h1>
          <p className="text-sm text-gray-500 mt-2">For Better Tomorrow</p>
        </div>

        <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Welcome Back</h2>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="relative group">
              <input
                type="text"
                className="w-full py-3 px-4 bg-gray-50 rounded-lg text-base outline-none border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
                placeholder="Mail-Id/Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                type="button"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isVerifying 
                    ? 'bg-green-100 text-green-600 cursor-wait'
                    : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
                }`}
                onClick={handleVerify}
                disabled={isVerifying || !username}
              >
                {isVerifying ? (
                  <span className="flex items-center">
                    <span className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin mr-2"></span>
                    Verifying
                  </span>
                ) : (
                  'Verify'
                )}
              </button>
            </div>

            <div className="relative group">
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="w-full py-3 px-4 bg-gray-50 rounded-lg text-base outline-none border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 transition-colors duration-200" />
                <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200">Remember me</span>
              </label>
              <a href="#" className="text-sm text-green-600 hover:text-green-700 transition-colors duration-200">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!username || !password}
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200">
                Sign up
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 flex space-x-4 text-sm text-gray-600">
          <a href="#" className="hover:text-gray-800 transition-colors duration-200">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-gray-800 transition-colors duration-200">Terms of Service</a>
        </div>
      </div>
    </div>
  )
}

export default Login

