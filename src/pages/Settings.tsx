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
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-3xl">
          👤
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Profile Picture</h3>
          <p className="text-sm text-gray-500 mt-1">Update your profile picture</p>
          <button className="mt-3 text-sm text-green-600 hover:text-green-700 font-medium">
            Change Photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500"
            placeholder="Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500"
            placeholder="+91 1234567890"
          />
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Channels</h3>
        <div className="space-y-4">
          {[
            { key: "email", label: "Email Notifications" },
            { key: "push", label: "Push Notifications" },
            { key: "sms", label: "SMS Notifications" }
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">{label}</h4>
                <p className="text-sm text-gray-500">Receive updates via {key}</p>
              </div>
              <button
                onClick={() => handleNotificationChange(key, !notifications[key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifications[key] ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                    notifications[key] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Alert Preferences</h3>
        <div className="space-y-4">
          {[
            { key: "usage", label: "Usage Alerts", desc: "When consumption exceeds normal patterns" },
            { key: "billing", label: "Billing Updates", desc: "Payment reminders and receipts" },
            { key: "maintenance", label: "Maintenance Notices", desc: "System updates and maintenance schedules" }
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">{label}</h4>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
              <button
                onClick={() => handleNotificationChange(`alerts.${key}`, !notifications.alerts[key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifications.alerts[key] ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                    notifications.alerts[key] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
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
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Billing Settings</h3>
            <p className="text-gray-500 mt-2">Coming soon...</p>
          </div>
        )
      case "security":
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
            <p className="text-gray-500 mt-2">Coming soon...</p>
          </div>
        )
      case "preferences":
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Preferences</h3>
            <p className="text-gray-500 mt-2">Coming soon...</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-xl">
            <BoltIcon className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500">Manage your account preferences</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-1">
          <div className="flex space-x-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-green-50 text-green-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {renderContent()}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings 