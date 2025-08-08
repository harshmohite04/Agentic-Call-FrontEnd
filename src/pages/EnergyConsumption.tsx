"use client"

import { useState } from "react"
import { BoltIcon } from "../components/Icons"
import { Line, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const EnergyConsumption = () => {
  const [timeRange, setTimeRange] = useState("week")
  const [compareMode, setCompareMode] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState("consumption")
  const [callSearch, setCallSearch] = useState("")
  const [callSortBy, setCallSortBy] = useState<"date" | "number">("date")
  const [callSortDir, setCallSortDir] = useState<"asc" | "desc">("desc")
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const [showTranscript, setShowTranscript] = useState<string | null>(null)
  const [audioProgress, setAudioProgress] = useState<{ [key: string]: number }>({})
  const [audioDuration, setAudioDuration] = useState<{ [key: string]: number }>({})
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({})
  const [volume, setVolume] = useState<{ [key: string]: number }>({})

  // Sample data - replace with actual data from your API
  const consumptionData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Current Week",
        data: [120, 150, 180, 90, 160, 140, 130],
        borderColor: "rgb(147, 51, 234)",
        backgroundColor: "rgba(147, 51, 234, 0.1)",
        fill: true,
        tension: 0.4
      },
      compareMode && {
        label: "Previous Week",
        data: [100, 130, 150, 110, 140, 130, 120],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4
      }
    ].filter(Boolean)
  }

  const efficiencyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "AI Communication Efficiency",
      data: [85, 88, 92, 87, 90, 89, 91],
      backgroundColor: "rgba(147, 51, 234, 0.8)"
    }]
  }

  const metrics = [
    { value: 2450, label: "Total Interactions", change: "+5.2%", trend: "up" },
    { value: 85, label: "Success Rate %", change: "+2.1%", trend: "up" },
    { value: 1890, label: "Peak Response Time", change: "-3.4%", trend: "down" },
    { value: 12500, label: "Credits Used", change: "+1.8%", trend: "up" }
  ]

  const timeRanges = ["day", "week", "month", "year"]

  const callLogs = [
    { 
      number: "+1 (555) 010-1200", 
      date: "2025-03-21 09:45", 
      recordingUrl: "https://www.w3schools.com/html/horse.mp3",
      duration: "2:45",
      status: "completed",
      userBehavior: "positive",
      transcript: [
        { speaker: "User", message: "Hi, I need help with my account balance.", time: "00:05" },
        { speaker: "AI", message: "Hello! I'd be happy to help you check your account balance. Could you please provide your account number?", time: "00:08" },
        { speaker: "User", message: "Sure, it's 1234567890.", time: "00:15" },
        { speaker: "AI", message: "Thank you. I can see your current balance is $2,450.67. Is there anything specific you'd like to know about your account?", time: "00:20" },
        { speaker: "User", message: "That's perfect, thank you!", time: "00:25" }
      ]
    },
    { 
      number: "+1 (555) 010-3141", 
      date: "2025-03-21 10:05", 
      recordingUrl: "https://www.w3schools.com/html/horse.mp3",
      duration: "4:12",
      status: "completed",
      userBehavior: "pending",
      transcript: [
        { speaker: "User", message: "I'm having trouble with the mobile app.", time: "00:03" },
        { speaker: "AI", message: "I'm sorry to hear that. Can you describe what specific issue you're experiencing with the mobile app?", time: "00:07" },
        { speaker: "User", message: "It keeps crashing when I try to log in.", time: "00:12" },
        { speaker: "AI", message: "That sounds frustrating. Let me help you troubleshoot this. What type of device are you using?", time: "00:18" },
        { speaker: "User", message: "iPhone 12, iOS 16.2", time: "00:22" },
        { speaker: "AI", message: "Thank you. This is a known issue with iOS 16.2. I recommend updating to the latest version or reinstalling the app.", time: "00:28" }
      ]
    },
    { 
      number: "+1 (555) 010-2718", 
      date: "2025-03-21 11:20", 
      recordingUrl: "https://www.w3schools.com/html/horse.mp3",
      duration: "3:30",
      status: "completed",
      userBehavior: "negative",
      transcript: [
        { speaker: "User", message: "I want to change my password.", time: "00:04" },
        { speaker: "AI", message: "I can help you with that. For security purposes, I'll need to verify your identity first. Can you provide your account number?", time: "00:09" },
        { speaker: "User", message: "Yes, it's 9876543210.", time: "00:14" },
        { speaker: "AI", message: "Perfect. I've sent a verification code to your registered email. Please check and provide the code.", time: "00:20" },
        { speaker: "User", message: "The code is 123456.", time: "00:25" },
        { speaker: "AI", message: "Great! You can now change your password. Please visit our website or use the mobile app to set a new password.", time: "00:30" }
      ]
    }
  ]

  const filteredSortedCallLogs = callLogs
    .filter((log) => {
      const query = callSearch.trim().toLowerCase()
      if (!query) return true
      return (
        log.number.toLowerCase().includes(query) ||
        log.date.toLowerCase().includes(query)
      )
    })
    .sort((a, b) => {
      let cmp = 0
      if (callSortBy === "date") {
        cmp = new Date(a.date).getTime() - new Date(b.date).getTime()
      } else {
        cmp = a.number.localeCompare(b.number)
      }
      return callSortDir === "asc" ? cmp : -cmp
    })

  const copyNumberToClipboard = async (phoneNumber: string) => {
    try {
      await navigator.clipboard.writeText(phoneNumber)
    } catch (_) {
      // noop
    }
  }

  const downloadRecording = (url: string, phoneNumber: string) => {
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = `${phoneNumber.replace(/[^\d]/g, "")}-recording.mp3`
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAudioPlay = (phoneNumber: string) => {
    setIsPlaying(prev => ({ ...prev, [phoneNumber]: true }))
    setPlayingAudio(phoneNumber)
    setShowTranscript(phoneNumber)
  }

  const handleAudioPause = (phoneNumber: string) => {
    setIsPlaying(prev => ({ ...prev, [phoneNumber]: false }))
  }

  const handleAudioEnded = (phoneNumber: string) => {
    setIsPlaying(prev => ({ ...prev, [phoneNumber]: false }))
    setAudioProgress(prev => ({ ...prev, [phoneNumber]: 0 }))
  }

  const handleTimeUpdate = (phoneNumber: string, currentTime: number) => {
    setAudioProgress(prev => ({ ...prev, [phoneNumber]: currentTime }))
  }

  const handleLoadedMetadata = (phoneNumber: string, duration: number) => {
    setAudioDuration(prev => ({ ...prev, [phoneNumber]: duration }))
  }

  const handleSeek = (phoneNumber: string, newTime: number) => {
    setAudioProgress(prev => ({ ...prev, [phoneNumber]: newTime }))
    const audioElement = document.getElementById(`audio-${phoneNumber}`) as HTMLAudioElement
    if (audioElement) {
      audioElement.currentTime = newTime
    }
  }

  const handleVolumeChange = (phoneNumber: string, newVolume: number) => {
    setVolume(prev => ({ ...prev, [phoneNumber]: newVolume }))
    const audioElement = document.getElementById(`audio-${phoneNumber}`) as HTMLAudioElement
    if (audioElement) {
      audioElement.volume = newVolume
    }
  }

  const togglePlayPause = (phoneNumber: string) => {
    const audioElement = document.getElementById(`audio-${phoneNumber}`) as HTMLAudioElement
    if (audioElement) {
      if (isPlaying[phoneNumber]) {
        audioElement.pause()
      } else {
        audioElement.play()
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden p-6">
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

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">AI Communication Analytics</h1>
            <p className="text-gray-300">Monitor and analyze your AI communication patterns</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-300"
            >
              {timeRanges.map((range) => (
                <option key={range} value={range} className="text-gray-800">
                  Last {range.charAt(0).toUpperCase() + range.slice(1)}
                </option>
              ))}
            </select>
            <button
              onClick={() => setCompareMode(!compareMode)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                compareMode
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "bg-white/10 backdrop-blur-sm text-gray-300 hover:text-white border border-white/20"
              }`}
            >
              Compare
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">{metric.label}</span>
                <span className={`text-sm font-medium ${
                  metric.trend === "up" ? "text-green-400" : "text-red-400"
                }`}>
                  {metric.change}
                </span>
              </div>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold text-white">{metric.value}</span>
                {metric.trend === "up" ? (
                  <BoltIcon className="w-4 h-4 ml-2 text-green-400" />
                ) : (
                  <BoltIcon className="w-4 h-4 ml-2 text-red-400 transform rotate-180" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Communication Trend</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedMetric("consumption")}
                  className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                    selectedMetric === "consumption"
                      ? "bg-purple-500/20 text-purple-300 border border-purple-400/30"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Usage
                </button>
                <button
                  onClick={() => setSelectedMetric("cost")}
                  className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                    selectedMetric === "cost"
                      ? "bg-purple-500/20 text-purple-300 border border-purple-400/30"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Cost
                </button>
              </div>
            </div>
            <div className="h-[300px]">
              <Line
                data={consumptionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                      align: "end",
                      labels: {
                        color: "#e2e8f0"
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        display: false
                      },
                      ticks: {
                        color: "#e2e8f0"
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      },
                      ticks: {
                        color: "#e2e8f0"
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Efficiency Analysis</h3>
            <div className="h-[300px]">
              <Bar
                data={efficiencyData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      grid: {
                        display: false
                      },
                      ticks: {
                        color: "#e2e8f0"
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      },
                      ticks: {
                        color: "#e2e8f0"
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Enhanced Call Logs */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Call History</h3>
                <p className="text-xs text-gray-300/80">{filteredSortedCallLogs.length} of {callLogs.length} calls • Last updated 2 minutes ago</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search by number or date..."
                  value={callSearch}
                  onChange={(e) => setCallSearch(e.target.value)}
                  className="bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-64 transition-all duration-200 group-hover:border-purple-400/30"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
                <select
                  value={callSortBy}
                  onChange={(e) => setCallSortBy(e.target.value as "date" | "number")}
                  className="bg-transparent text-white border-none px-3 py-1 text-sm focus:outline-none focus:ring-0"
                >
                  <option value="date" className="text-gray-800">Date</option>
                  <option value="number" className="text-gray-800">Number</option>
                </select>
                <button
                  onClick={() => setCallSortDir(callSortDir === "asc" ? "desc" : "asc")}
                  className="p-1 text-gray-300 hover:text-purple-400 transition-colors"
                  title="Toggle sort direction"
                >
                  {callSortDir === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {filteredSortedCallLogs.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-gray-300">No calls found matching your search</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</p>
              </div>
            ) : (
              filteredSortedCallLogs.map((log, index) => (
              <div
                key={index}
                  className="group bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-400/40 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white/20"></div>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-medium">{log.number}</span>
                            <button
                              onClick={() => copyNumberToClipboard(log.number)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-purple-400 transition-all duration-200"
                              title="Copy number"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-gray-400 text-sm">{log.date}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-400 text-sm">{log.duration}</span>
                            <span className="text-gray-500">•</span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              log.userBehavior === "positive" 
                                ? "bg-green-500/20 text-green-400" 
                                : log.userBehavior === "negative"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}>
                              {log.userBehavior === "positive" ? "😊 Positive" : 
                               log.userBehavior === "negative" ? "😞 Negative" : 
                               "⏳ Pending"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {/* Audio Player Controls */}
                      <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
                        <button
                          onClick={() => togglePlayPause(log.number)}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            isPlaying[log.number]
                              ? "bg-purple-600 text-white"
                              : "bg-white/10 text-gray-300 hover:bg-purple-600 hover:text-white"
                          }`}
                          title={isPlaying[log.number] ? "Pause" : "Play"}
                        >
                          {isPlaying[log.number] ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          )}
                        </button>
                        
                        <div className="flex items-center space-x-2 min-w-[120px]">
                          <span className="text-xs text-gray-400">
                            {formatTime(audioProgress[log.number] || 0)}
                          </span>
                          <div className="flex-1 relative">
                            <input
                              type="range"
                              min="0"
                              max={audioDuration[log.number] || 100}
                              value={audioProgress[log.number] || 0}
                              onChange={(e) => handleSeek(log.number, parseFloat(e.target.value))}
                              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                              style={{
                                background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((audioProgress[log.number] || 0) / (audioDuration[log.number] || 1)) * 100}%, #4b5563 ${((audioProgress[log.number] || 0) / (audioDuration[log.number] || 1)) * 100}%, #4b5563 100%)`
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-400">
                            {formatTime(audioDuration[log.number] || 0)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                          </svg>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume[log.number] || 1}
                            onChange={(e) => handleVolumeChange(log.number, parseFloat(e.target.value))}
                            className="w-12 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          if (showTranscript === log.number) {
                            setShowTranscript(null)
                          } else {
                            setShowTranscript(log.number)
                          }
                        }}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          showTranscript === log.number
                            ? "bg-blue-600 text-white"
                            : "bg-white/10 text-gray-300 hover:bg-blue-600 hover:text-white"
                        }`}
                        title={showTranscript === log.number ? "Hide Transcript" : "Show Transcript"}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => downloadRecording(log.recordingUrl, log.number)}
                        className="p-2 bg-white/10 text-gray-300 hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white rounded-lg transition-all duration-200"
                        title="Download recording"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Hidden Audio Element */}
                  <audio
                    id={`audio-${log.number}`}
                    src={log.recordingUrl}
                    onPlay={() => handleAudioPlay(log.number)}
                    onPause={() => handleAudioPause(log.number)}
                    onEnded={() => handleAudioEnded(log.number)}
                    onTimeUpdate={(e) => handleTimeUpdate(log.number, e.currentTarget.currentTime)}
                    onLoadedMetadata={(e) => handleLoadedMetadata(log.number, e.currentTarget.duration)}
                    preload="metadata"
                  />
                  
                  {/* Enhanced Transcript Chat Interface */}
                  {showTranscript === log.number && (
                    <div className="mt-4 bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium text-white">Call Transcript</h4>
                          <span className="text-xs text-gray-400">• {log.duration} duration</span>
                        </div>
                        <button
                          onClick={() => setShowTranscript(null)}
                          className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {log.transcript.map((message, msgIndex) => (
                          <div
                            key={msgIndex}
                            className={`flex ${message.speaker === "User" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                                message.speaker === "User"
                                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white"
                                  : "bg-white/10 text-gray-200 border border-white/20"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium opacity-75 flex items-center">
                                  {message.speaker === "User" ? (
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                  ) : (
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    </svg>
                                  )}
                                  {message.speaker}
                                </span>
                                <span className="text-xs opacity-75 bg-white/10 px-2 py-1 rounded-full">{message.time}</span>
                              </div>
                              <p className="text-sm leading-relaxed">{message.message}</p>
                            </div>
              </div>
            ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnergyConsumption

