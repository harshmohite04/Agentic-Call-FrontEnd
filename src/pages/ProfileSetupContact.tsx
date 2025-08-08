"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BoltIcon } from "../components/Icons"

const ProfileSetupContact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    alternatePhone: "",
    alternateEmail: ""
  })
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const designations = ["CEO", "Director", "Manager", "Executive", "Other"]
  const departments = ["Administration", "Operations", "Finance", "Technical", "Other"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/dashboard")
  }

  const isStepComplete = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone
      case 2:
        return formData.designation && formData.department
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <label className="block text-sm font-semibold text-white mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full py-4 px-5 bg-white/10 rounded-xl text-base outline-none border-2 border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-300 hover:border-white/40 text-white placeholder-gray-300 backdrop-blur-sm"
                  placeholder="Enter first name"
                />
              </div>

              <div className="relative group">
                <label className="block text-sm font-semibold text-white mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full py-4 px-5 bg-white/10 rounded-xl text-base outline-none border-2 border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-300 hover:border-white/40 text-white placeholder-gray-300 backdrop-blur-sm"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-4 px-5 bg-white/10 rounded-xl text-base outline-none border-2 border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-300 hover:border-white/40 text-white placeholder-gray-300 backdrop-blur-sm"
                placeholder="Enter email address"
              />
            </div>

            <div className="relative group">
              <label className="block text-sm font-semibold text-white mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full py-4 px-5 bg-white/10 rounded-xl text-base outline-none border-2 border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-300 hover:border-white/40 text-white placeholder-gray-300 backdrop-blur-sm"
                placeholder="Enter phone number"
                maxLength={10}
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="relative group">
              <label className="block text-sm font-semibold text-white mb-2">Designation</label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full py-4 px-5 bg-white/10 rounded-xl text-base outline-none border-2 border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-300 hover:border-white/40 text-white backdrop-blur-sm"
              >
                <option value="" className="text-gray-800">Select designation</option>
                {designations.map(designation => (
                  <option key={designation} value={designation} className="text-gray-800">{designation}</option>
                ))}
              </select>
            </div>

            <div className="relative group">
              <label className="block text-sm font-semibold text-white mb-2">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full py-4 px-5 bg-white/10 rounded-xl text-base outline-none border-2 border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-300 hover:border-white/40 text-white backdrop-blur-sm"
              >
                <option value="" className="text-gray-800">Select department</option>
                {departments.map(department => (
                  <option key={department} value={department} className="text-gray-800">{department}</option>
                ))}
              </select>
            </div>

            <div className="relative group">
              <label className="block text-sm font-semibold text-white mb-2">Alternate Phone (Optional)</label>
              <input
                type="tel"
                name="alternatePhone"
                value={formData.alternatePhone}
                onChange={handleChange}
                className="w-full py-4 px-5 bg-white/10 rounded-xl text-base outline-none border-2 border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-300 hover:border-white/40 text-white placeholder-gray-300 backdrop-blur-sm"
                placeholder="Enter alternate phone number"
                maxLength={10}
              />
            </div>

            <div className="relative group">
              <label className="block text-sm font-semibold text-white mb-2">Alternate Email (Optional)</label>
              <input
                type="email"
                name="alternateEmail"
                value={formData.alternateEmail}
                onChange={handleChange}
                className="w-full py-4 px-5 bg-white/10 rounded-xl text-base outline-none border-2 border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-300 hover:border-white/40 text-white placeholder-gray-300 backdrop-blur-sm"
                placeholder="Enter alternate email"
              />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Modern animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full -top-20 -left-20 animate-pulse blur-xl"></div>
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full -bottom-32 -right-32 animate-pulse delay-300 blur-xl"></div>
        <div className="absolute w-48 h-48 bg-indigo-500/20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500 blur-xl"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="w-full max-w-4xl flex flex-col items-center relative animate-fade-in">
        <div className="mb-8 transform hover:scale-110 transition-transform duration-300 flex flex-col items-center">
          <div className="relative">
            <BoltIcon className="w-20 h-20 text-purple-400 animate-pulse mb-4 drop-shadow-lg" />
            <div className="absolute inset-0 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-ping"></div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">AgenticCall</h1>
          <p className="text-sm text-gray-300 mt-2 font-medium">Contact Information</p>
        </div>

        <div className="w-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 transform transition-all duration-300 hover:shadow-3xl border border-white/20">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 relative">
            {/* Connecting lines container */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
                         <div className={`absolute top-5 left-0 h-0.5 bg-purple-500 transition-all duration-500 ease-in-out -z-10 ${
               step >= 2 ? 'w-full' : 'w-0'
             }`}></div>
            
            {[1, 2].map((stepNumber) => (
              <div
                key={stepNumber}
                className="flex flex-col items-center relative group cursor-pointer"
                onClick={() => isStepComplete(stepNumber - 1) && setStep(stepNumber)}
              >
                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 border-2 ${
                   step === stepNumber
                     ? 'bg-purple-600 text-white border-purple-600 scale-110 shadow-lg'
                     : step > stepNumber || isStepComplete(stepNumber)
                     ? 'bg-purple-100 text-purple-600 border-purple-300'
                     : 'bg-white/20 text-gray-400 border-gray-300'
                 }`}>
                  {stepNumber}
                </div>
                                 <div className={`mt-3 text-sm font-medium transition-colors duration-300 ${
                   step === stepNumber ? 'text-purple-400' : 'text-gray-300'
                 }`}>
                  {stepNumber === 1 ? 'Basic Info' : 'Additional Info'}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            {renderStep()}

            <div className="flex justify-between mt-10">
              <button
                type="button"
                onClick={() => step === 1 ? navigate(-1) : setStep(1)}
                className="px-8 py-3 rounded-xl text-gray-300 hover:text-white transition-all duration-200 font-medium"
              >
                ← Back
              </button>
              
              {step < 2 ? (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!isStepComplete(step)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isStepComplete(step)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  Complete Setup →
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mt-6 flex space-x-4 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
        </div>
      </div>
    </div>
  )
}

export default ProfileSetupContact

