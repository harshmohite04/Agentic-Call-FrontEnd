"use client"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoltIcon } from "../components/Icons";

const ProfileSetupOrg = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    organizationName: "",
    industry: "",
    size: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    website: "",
    description: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Contact Details" },
    { number: 3, title: "Additional Info" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/profile-setup-contact");
    }, 1500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Organization Name *
              </label>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
                placeholder="Enter organization name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Industry *
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              >
                <option value="" className="text-gray-800">Select industry</option>
                <option value="technology" className="text-gray-800">Technology</option>
                <option value="healthcare" className="text-gray-800">Healthcare</option>
                <option value="finance" className="text-gray-800">Finance</option>
                <option value="education" className="text-gray-800">Education</option>
                <option value="retail" className="text-gray-800">Retail</option>
                <option value="manufacturing" className="text-gray-800">Manufacturing</option>
                <option value="other" className="text-gray-800">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Organization Size *
              </label>
              <select
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              >
                <option value="" className="text-gray-800">Select size</option>
                <option value="1-10" className="text-gray-800">1-10 employees</option>
                <option value="11-50" className="text-gray-800">11-50 employees</option>
                <option value="51-200" className="text-gray-800">51-200 employees</option>
                <option value="201-500" className="text-gray-800">201-500 employees</option>
                <option value="500+" className="text-gray-800">500+ employees</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
                placeholder="Enter street address"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter state"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter ZIP code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400 resize-none"
                placeholder="Tell us about your organization..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
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

      <div className="w-full max-w-lg sm:max-w-2xl flex flex-col items-center relative animate-fade-in">
        <div className="mb-6 sm:mb-8 transform hover:scale-110 transition-transform duration-300 flex flex-col items-center">
          <div className="relative">
            <BoltIcon className="w-16 h-16 sm:w-20 sm:h-20 text-purple-400 animate-pulse mb-3 sm:mb-4 drop-shadow-lg" />
            <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 bg-purple-500/20 rounded-full blur-xl animate-ping"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">AgenticCall</h1>
          <p className="text-xs sm:text-sm mt-1 sm:mt-2 text-gray-300 font-medium">Organization Setup</p>
        </div>

        <div className="w-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300 hover:shadow-3xl border border-white/20">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="relative">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold transition-all duration-300 ${
                    step.number <= currentStep
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-white/20 text-gray-300"
                  }`}>
                    {step.number}
                  </div>
                  {step.number < 3 && (
                    <div className="absolute top-1/2 left-full transform -translate-y-1/2 w-8 sm:w-12 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"></div>
                  )}
                </div>
                {step.number < 3 && (
                  <div className="hidden sm:block ml-2">
                    <span className="text-xs text-gray-300">{step.title}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 text-center">
            {steps[currentStep - 1].title}
          </h2>

          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 sm:mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-300 hover:text-white disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? "Processing..." : currentStep === 3 ? "Complete Setup" : "Next"}
            </button>
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

export default ProfileSetupOrg;

