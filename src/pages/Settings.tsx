"use client"

import { useState } from "react"
import { BoltIcon } from "../components/Icons"

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile")
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    alerts: {
      usage: true,
      billing: true,
      maintenance: false
    }
  })

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "billing", label: "Billing", icon: "💳" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "preferences", label: "Preferences", icon: "⚙️" }
  ]

  const handleNotificationChange = (key, value) => {
    if (key.includes(".")) {
      const [parent, child] = key.split(".")
      setNotifications(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setNotifications(prev => ({
        ...prev,
        [key]: value
      }))
    }
  }

  const renderProfileSettings = () => (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl sm:text-3xl border border-white/20 shadow-lg">
            👤
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-xs sm:text-sm">📷</span>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-medium text-white">Profile Picture</h3>
          <p className="text-sm text-gray-300 mt-1">Update your profile picture</p>
          <button className="mt-3 text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
            Change Photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
          <input
            type="text"
            className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
          <input
            type="text"
            className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
            placeholder="Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
          <input
            type="tel"
            className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
            placeholder="+91 1234567890"
          />
        </div>
      </div>

      <div className="pt-4">
        <h4 className="text-md font-medium text-white mb-4">AI Communication Preferences</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-medium text-white">Auto-Response</h5>
                <p className="text-xs text-gray-400">Enable AI auto-responses</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none bg-purple-600 ml-3">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out translate-x-6" />
              </button>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-medium text-white">Smart Routing</h5>
                <p className="text-xs text-gray-400">AI-powered call routing</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none bg-gray-600 ml-3">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h3 className="text-lg font-medium text-white mb-4 sm:mb-6">Notification Channels</h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
            { key: "push", label: "Push Notifications", desc: "Real-time push notifications" },
            { key: "sms", label: "SMS Notifications", desc: "Text message alerts" }
          ].map(({ key, label, desc }) => (
            <div key={key} className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/10 hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 pr-3">
                  <h4 className="text-sm font-medium text-white">{label}</h4>
                  <p className="text-sm text-gray-400">{desc}</p>
                </div>
                <button
                  onClick={() => handleNotificationChange(key, !notifications[key])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none flex-shrink-0 ${
                    notifications[key] ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out shadow-lg ${
                      notifications[key] ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-white mb-4 sm:mb-6">AI Alert Preferences</h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { key: "usage", label: "Usage Alerts", desc: "When AI communication exceeds normal patterns" },
            { key: "billing", label: "Billing Updates", desc: "Credit purchase reminders and receipts" },
            { key: "maintenance", label: "System Updates", desc: "AI system updates and maintenance schedules" }
          ].map(({ key, label, desc }) => (
            <div key={key} className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/10 hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 pr-3">
                  <h4 className="text-sm font-medium text-white">{label}</h4>
                  <p className="text-sm text-gray-400">{desc}</p>
                </div>
                <button
                  onClick={() => handleNotificationChange(`alerts.${key}`, !notifications.alerts[key])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none flex-shrink-0 ${
                    notifications.alerts[key] ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out shadow-lg ${
                      notifications.alerts[key] ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileSettings()
      case "notifications":
        return renderNotificationSettings()
      case "billing":
        return (
          <div className="text-center py-8 sm:py-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-white/10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl sm:text-2xl">💳</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Billing Settings</h3>
              <p className="text-gray-400 text-sm sm:text-base">Advanced billing features coming soon...</p>
            </div>
          </div>
        )
      case "security":
        return (
          <div className="text-center py-8 sm:py-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-white/10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl sm:text-2xl">🔒</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Security Settings</h3>
              <p className="text-gray-400 text-sm sm:text-base">Enhanced security features coming soon...</p>
            </div>
          </div>
        )
      case "preferences":
        return (
          <div className="text-center py-8 sm:py-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-white/10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl sm:text-2xl">⚙️</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Preferences</h3>
              <p className="text-gray-400 text-sm sm:text-base">Customization options coming soon...</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden p-4 sm:p-6">
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

      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="bg-purple-500/20 backdrop-blur-sm p-2 sm:p-3 rounded-xl border border-purple-500/30">
            <BoltIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Settings</h1>
            <p className="text-gray-300 text-sm sm:text-base">Manage your AI communication preferences</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-lg p-1 border border-white/20">
          <div className="flex flex-wrap sm:flex-nowrap space-x-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-1 sm:space-x-2 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-400/30"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-sm sm:text-base">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 border border-white/20">
          {renderContent()}
        </div>

        {/* Save Button */}
        <div className="flex justify-center sm:justify-end">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg transform hover:scale-105 w-full sm:w-auto">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings 