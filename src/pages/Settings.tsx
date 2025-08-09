"use client"

import { useState } from "react"
import { BoltIcon } from "../components/Icons"

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile")
  const [notifications, setNotifications] = useState<{
    email: boolean;
    push: boolean;
    sms: boolean;
    alerts: {
      usage: boolean;
      billing: boolean;
      maintenance: boolean;
    };
  }>({
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

  const handleNotificationChange = (key: string, value: boolean) => {
    if (key.includes(".")) {
      const [parent, child] = key.split(".")
      setNotifications(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
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
                  onClick={() => handleNotificationChange(key, !(notifications as any)[key])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none flex-shrink-0 ${
                    (notifications as any)[key] ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out shadow-lg ${
                      (notifications as any)[key] ? "translate-x-6" : "translate-x-1"
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
                  onClick={() => handleNotificationChange(`alerts.${key}`, !(notifications.alerts as any)[key])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none flex-shrink-0 ${
                    (notifications.alerts as any)[key] ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out shadow-lg ${
                      (notifications.alerts as any)[key] ? "translate-x-6" : "translate-x-1"
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

  const renderBillingSettings = () => (
    <div className="space-y-6 sm:space-y-8">
      {/* Current Plan */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4 sm:mb-6">Current Plan</h3>
        <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-purple-400/30">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-white">Pro Plan</h4>
              <p className="text-gray-300 text-sm">Unlimited AI communications</p>
              <p className="text-purple-400 text-sm font-medium">$29.99/month</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                Active
              </span>
              <p className="text-gray-400 text-xs mt-1">Next billing: Dec 15, 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4 sm:mb-6">Payment Method</h3>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <p className="text-white font-medium">•••• •••• •••• 4242</p>
                <p className="text-gray-400 text-sm">Expires 12/25</p>
              </div>
            </div>
            <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-200">
              Edit
            </button>
          </div>
        </div>
        <button className="mt-3 text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
          + Add Payment Method
        </button>
      </div>

      {/* Billing History */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4 sm:mb-6">Billing History</h3>
        <div className="space-y-3">
          {[
            { date: "Nov 15, 2024", amount: "$29.99", status: "Paid", description: "Pro Plan - Monthly" },
            { date: "Oct 15, 2024", amount: "$29.99", status: "Paid", description: "Pro Plan - Monthly" },
            { date: "Sep 15, 2024", amount: "$29.99", status: "Paid", description: "Pro Plan - Monthly" }
          ].map((item, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/10 hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{item.description}</p>
                  <p className="text-gray-400 text-sm">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{item.amount}</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
          View All Invoices
        </button>
      </div>

      {/* Usage Analytics */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4 sm:mb-6">Usage Analytics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">1,247</p>
              <p className="text-gray-400 text-sm">AI Calls This Month</p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">89%</p>
              <p className="text-gray-400 text-sm">Success Rate</p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">$12.45</p>
              <p className="text-gray-400 text-sm">Avg Cost/Call</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6 sm:space-y-8">
      {/* Password */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4 sm:mb-6">Password & Authentication</h3>
        <div className="space-y-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Password</h4>
                <p className="text-gray-400 text-sm">Last changed 30 days ago</p>
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                Change Password
              </button>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                <p className="text-gray-400 text-sm">Add an extra layer of security</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none bg-gray-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Session Management */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4 sm:mb-6">Active Sessions</h3>
        <div className="space-y-3">
          {[
            { device: "Chrome on Windows", location: "New York, US", lastActive: "Current session", isCurrent: true },
            { device: "Safari on iPhone", location: "New York, US", lastActive: "2 hours ago", isCurrent: false },
            { device: "Firefox on Mac", location: "San Francisco, US", lastActive: "1 day ago", isCurrent: false }
          ].map((session, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${session.isCurrent ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  <div>
                    <p className="text-white font-medium">{session.device}</p>
                    <p className="text-gray-400 text-sm">{session.location} • {session.lastActive}</p>
                  </div>
                </div>
                {!session.isCurrent && (
                  <button className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200">
                    Revoke
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
          Revoke All Sessions
        </button>
      </div>

      {/* API Keys */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4 sm:mb-6">API Keys</h3>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Production API Key</h4>
              <p className="text-gray-400 text-sm">sk_live_...abc123</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-200">
                Copy
              </button>
              <button className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200">
                Regenerate
              </button>
            </div>
          </div>
        </div>
        <button className="mt-3 text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
          + Generate New API Key
        </button>
      </div>

      {/* Security Log */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4 sm:mb-6">Security Activity</h3>
        <div className="space-y-3">
          {[
            { action: "Password changed", time: "2 hours ago", ip: "192.168.1.1", location: "New York, US" },
            { action: "New login", time: "1 day ago", ip: "10.0.0.1", location: "San Francisco, US" },
            { action: "API key generated", time: "3 days ago", ip: "172.16.0.1", location: "New York, US" }
          ].map((activity, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.time} • {activity.ip} • {activity.location}</p>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Normal
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPreferencesSettings = () => (
    <div className="space-y-6 sm:space-y-8">
      {/* Language & Region */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4 sm:mb-6">Language & Region</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
            <select className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Time Zone</label>
            <select className="w-full rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200">
              <option value="est">Eastern Time (ET)</option>
              <option value="pst">Pacific Time (PT)</option>
              <option value="gmt">Greenwich Mean Time (GMT)</option>
              <option value="ist">India Standard Time (IST)</option>
            </select>
          </div>
        </div>
      </div>

      {/* AI Communication Preferences */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4 sm:mb-6">AI Communication Preferences</h3>
        <div className="space-y-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">AI Voice Type</h4>
                <p className="text-gray-400 text-sm">Choose your preferred AI voice</p>
              </div>
              <select className="rounded-lg border border-white/20 px-3 py-2 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200">
                <option value="natural">Natural</option>
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="formal">Formal</option>
              </select>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Response Speed</h4>
                <p className="text-gray-400 text-sm">Balance between speed and quality</p>
              </div>
              <select className="rounded-lg border border-white/20 px-3 py-2 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200">
                <option value="fast">Fast</option>
                <option value="balanced">Balanced</option>
                <option value="quality">High Quality</option>
              </select>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Auto-Response Length</h4>
                <p className="text-gray-400 text-sm">Preferred length of AI responses</p>
              </div>
              <select className="rounded-lg border border-white/20 px-3 py-2 text-white bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200">
                <option value="concise">Concise</option>
                <option value="detailed">Detailed</option>
                <option value="comprehensive">Comprehensive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Display Preferences */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4 sm:mb-6">Display Preferences</h3>
        <div className="space-y-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Dark Mode</h4>
                <p className="text-gray-400 text-sm">Use dark theme</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none bg-purple-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out translate-x-6" />
              </button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Compact Mode</h4>
                <p className="text-gray-400 text-sm">Reduce spacing and padding</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none bg-gray-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out translate-x-1" />
              </button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Show Analytics</h4>
                <p className="text-gray-400 text-sm">Display usage statistics</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none bg-purple-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out translate-x-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4 sm:mb-6">Data & Privacy</h3>
        <div className="space-y-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Data Collection</h4>
                <p className="text-gray-400 text-sm">Allow usage data collection for improvements</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none bg-purple-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out translate-x-6" />
              </button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Auto-Save Conversations</h4>
                <p className="text-gray-400 text-sm">Automatically save conversation history</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none bg-purple-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out translate-x-6" />
              </button>
            </div>
          </div>
        </div>
        <button className="mt-4 text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
          Download My Data
        </button>
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
        return renderBillingSettings()
      case "security":
        return renderSecuritySettings()
      case "preferences":
        return renderPreferencesSettings()
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