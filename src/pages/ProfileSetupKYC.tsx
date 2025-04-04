"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BoltIcon } from "../components/Icons"

const ProfileSetupKYC = () => {
  const [formData, setFormData] = useState({
    idType: "",
    idNumber: "",
    idFront: null,
    idBack: null,
    addressProofType: "",
    addressProof: null,
    companyDoc: null,
    signature: null
  })
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const idTypes = ["Aadhaar Card", "PAN Card", "Driving License", "Passport"]
  const addressProofTypes = ["Utility Bill", "Bank Statement", "Rent Agreement", "Property Tax Receipt"]

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/dashboard")
  }

  const isStepComplete = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return formData.idType && formData.idNumber && formData.idFront && formData.idBack
      case 2:
        return formData.addressProofType && formData.addressProof
      case 3:
        return formData.companyDoc && formData.signature
      default:
        return false
    }
  }

  const renderFileInput = (name, label, accept = "image/*") => (
    <div className="relative group">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="file"
          name={name}
          onChange={handleChange}
          accept={accept}
          className="hidden"
          id={name}
        />
        <label
          htmlFor={name}
          className="w-full py-3 px-4 bg-gray-50 rounded-lg text-base outline-none border border-gray-200 hover:border-green-500 focus:border-green-500 transition-all duration-300 flex items-center justify-center cursor-pointer group"
        >
          <div className="flex items-center space-x-2">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📎</span>
            <span className="text-gray-600">
              {formData[name] ? formData[name].name : `Choose ${label}`}
            </span>
          </div>
        </label>
      </div>
    </div>
  )

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
              <select
                name="idType"
                value={formData.idType}
                onChange={handleChange}
                className="w-full py-3 px-4 bg-gray-50 rounded-lg text-base outline-none border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
              >
                <option value="">Select ID type</option>
                {idTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="w-full py-3 px-4 bg-gray-50 rounded-lg text-base outline-none border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
                placeholder="Enter ID number"
              />
            </div>

            {renderFileInput("idFront", "ID Front")}
            {renderFileInput("idBack", "ID Back")}
          </div>
        )
      case 2:
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Proof Type</label>
              <select
                name="addressProofType"
                value={formData.addressProofType}
                onChange={handleChange}
                className="w-full py-3 px-4 bg-gray-50 rounded-lg text-base outline-none border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
              >
                <option value="">Select address proof type</option>
                {addressProofTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {renderFileInput("addressProof", "Address Proof Document")}
          </div>
        )
      case 3:
        return (
          <div className="space-y-4 animate-fade-in">
            {renderFileInput("companyDoc", "Company Registration Document", ".pdf,.doc,.docx")}
            {renderFileInput("signature", "Digital Signature")}
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
          <p className="text-sm text-gray-500 mt-2">KYC Verification</p>
        </div>

        <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((stepNumber) => (
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
                  {stepNumber === 1 ? 'ID Proof' : stepNumber === 2 ? 'Address Proof' : 'Company Docs'}
                </div>
                {stepNumber < 3 && (
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
                onClick={() => step === 1 ? navigate(-1) : setStep(prev => prev - 1)}
                className="px-6 py-2 rounded-lg text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                ← Back
              </button>
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(prev => prev + 1)}
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

export default ProfileSetupKYC

