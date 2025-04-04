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
    navigate("/profile-setup-kyc")
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
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full py-3 px-4 bg-gray-50 rounded-lg text-base outline-none border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
                  placeholder="Enter first name"
                />
              </div>

              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full py-3 px-4 bg-gray-50 rounded-lg text-base outline-none border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-3 px-4 bg-gray-50 rounded-lg text-base outline-none border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
                placeholder="Enter email address"
              />
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full py-3 px-4 bg-gray-50 rounded-lg text-base outline-none border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full py-3 px-4 bg-gray-50 rounded-lg text-base outline-none border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
              >
                <option value="">Select designation</option>
                {designations.map(designation => (
                  <option key={designation} value={designation}>{designation}</option>
                ))}
              </select>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full py-3 px-4 bg-gray-50 rounded-lg text-base outline-none border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
              >
                <option value="">Select department</option>
                {departments.map(department => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone (Optional)</label>
              <input
                type="tel"
                name="alternatePhone"
                value={formData.alternatePhone}
                onChange={handleChange}
                className="w-full py-3 px-4 bg-gray-50 rounded-lg text-base outline-none border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
                placeholder="Enter alternate phone number"
                maxLength={10}
              />
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Email (Optional)</label>
              <input
                type="email"
                name="alternateEmail"
                value={formData.alternateEmail}
                onChange={handleChange}
                className="w-full py-3 px-4 bg-gray-50 rounded-lg text-base outline-none border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
                placeholder="Enter alternate email"
              />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 bg-gradient-to-br from-green-50 to-green-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 bg-green-200/30 rounded-full -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-green-200/30 rounded-full -bottom-32 -right-32 animate-pulse delay-300"></div>
      </div>

      <div className="w-full max-w-2xl flex flex-col items-center relative animate-fade-in">
        <div className="mb-8 transform hover:scale-110 transition-transform duration-300 flex flex-col items-center">
          <BoltIcon className="w-16 h-16 text-green-600 animate-pulse mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">POWERNETPRO</h1>
          <p className="text-sm text-gray-500 mt-2">Contact Information</p>
        </div>

        <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2].map((stepNumber) => (
              <div
                key={stepNumber}
                className="flex flex-col items-center relative group cursor-pointer"
                onClick={() => isStepComplete(stepNumber - 1) && setStep(stepNumber)}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step === stepNumber
                    ? 'bg-green-600 text-white scale-110'
                    : step > stepNumber || isStepComplete(stepNumber)
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {stepNumber}
                </div>
                <div className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                  step === stepNumber ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {stepNumber === 1 ? 'Basic Info' : 'Additional Info'}
                </div>
                {stepNumber < 2 && (
                  <div className={`absolute w-[calc(200%-1rem)] h-0.5 top-5 left-1/2 -z-10 transition-colors duration-300 ${
                    step > stepNumber ? 'bg-green-200' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            {renderStep()}

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => step === 1 ? navigate(-1) : setStep(1)}
                className="px-6 py-2 rounded-lg text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                ← Back
              </button>
              
              {step < 2 ? (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!isStepComplete(step)}
                  className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isStepComplete(step)}
                  className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Complete Setup →
                </button>
              )}
            </div>
          </form>
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

export default ProfileSetupContact

