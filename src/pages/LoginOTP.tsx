"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BoltIcon } from "../components/Icons"

const LoginOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(30)
  const [isResending, setIsResending] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/profile-setup-org")
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    setTimeLeft(30)
    // Simulate OTP resend
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsResending(false)
  }

  const handleOTPChange = (index, value) => {
    if (value.length > 1) value = value[0]
    if (!/^\d*$/.test(value)) return

    const newOTP = [...otp]
    newOTP[index] = value
    setOtp(newOTP)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=otp-${index - 1}]`)
      if (prevInput) prevInput.focus()
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Verify OTP</h2>
          <p className="text-center text-gray-600 text-sm mb-8">
            We've sent a verification code to your email
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  name={`otp-${index}`}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-semibold bg-gray-50 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
                  maxLength={1}
                />
              ))}
            </div>

            <div className="text-center">
              {timeLeft > 0 ? (
                <p className="text-sm text-gray-600">
                  Resend code in <span className="font-semibold text-green-600">{timeLeft}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isResending}
                  className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResending ? (
                    <span className="flex items-center justify-center">
                      <span className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin mr-2"></span>
                      Resending...
                    </span>
                  ) : (
                    "Resend Code"
                  )}
                </button>
              )}
            </div>

            <button 
              type="submit" 
              className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={otp.some(digit => !digit)}
            >
              Verify & Continue
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => navigate(-1)}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              ← Back to Login
            </button>
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

export default LoginOTP

