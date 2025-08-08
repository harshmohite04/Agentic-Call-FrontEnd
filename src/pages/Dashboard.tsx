"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BoltIcon } from "../components/Icons"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  Title,
  Tooltip,
  Legend,
  Filler
)

const Dashboard = () => {
  const navigate = useNavigate()
  const [selectedPeriod, setSelectedPeriod] = useState("today")
  const [contextFiles, setContextFiles] = useState([
    {
      name: "Company_Policies.pdf",
      size: "2.4 MB",
      uploaded: "2 hours ago",
      status: "active",
      isActive: true
    },
    {
      name: "FAQ_Database.xlsx",
      size: "1.8 MB",
      uploaded: "1 day ago",
      status: "active",
      isActive: false
    },
    {
      name: "Training_Materials.docx",
      size: "3.2 MB",
      uploaded: "3 days ago",
      status: "active",
      isActive: true
    }
  ])

  const quickStats = [
    {
      title: "Active Calls",
      value: "24",
      change: "+12%",
      trend: "up",
      color: "green"
    },
    {
      title: "Avg Response Time",
      value: "0.8s",
      change: "-3%",
      trend: "down",
      color: "green"
    },
    {
      title: "Customer Satisfaction",
      value: "94%",
      change: "+1%",
      trend: "up",
      color: "green"
    },
    {
      title: "AI Accuracy",
      value: "97%",
      change: "0%",
      trend: "neutral",
      color: "gray"
    }
  ]

  const realtimeData = {
    labels: ["12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30"],
    datasets: [
      {
        label: "Call Volume",
        data: [21, 23, 25, 20, 24, 22, 24],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4
      }
    ]
  }

  const alerts = [
    {
      type: "warning",
      message: "High call volume detected",
      time: "2 mins ago"
    },
    {
      type: "success",
      message: "AI response quality optimal",
      time: "5 mins ago"
    },
    {
      type: "info",
      message: "New customer feedback available",
      time: "10 mins ago"
    }
  ]

  const quickActions = [
    {
      title: "Call Analytics",
      description: "View detailed call performance metrics",
      icon: "📊",
      action: () => navigate("/energy-consumption")
    },
    {
      title: "Call History",
      description: "Review past calls and transcripts",
      icon: "📞",
      action: () => navigate("/purchases")
    },
    {
      title: "Settings",
      description: "Configure AI agent preferences",
      icon: "⚙️",
      action: () => navigate("/settings")
    }
  ]

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
          <div className="flex items-center space-x-4">
            <div className="bg-purple-500/20 backdrop-blur-sm p-3 rounded-xl border border-purple-500/30">
              <BoltIcon className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome Back!</h1>
              <p className="text-gray-300">Here's your AI call center overview</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-300"
            >
              <option value="today" className="text-gray-800">Today</option>
              <option value="week" className="text-gray-800">This Week</option>
              <option value="month" className="text-gray-800">This Month</option>
            </select>
            <button 
              onClick={() => {}} 
              className="p-2 text-gray-300 hover:text-white focus:outline-none transition-colors duration-200"
            >
              🔄
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">{stat.title}</span>
                <span className={`text-sm font-medium ${
                  stat.color === 'green' ? 'text-green-400' : 
                  stat.color === 'red' ? 'text-red-400' : 
                  'text-gray-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className={`ml-2 ${
                  stat.color === 'green' ? 'text-green-400' : 
                  stat.color === 'red' ? 'text-red-400' : 
                  'text-gray-400'
                }`}>
                  {stat.trend === "up" ? "↑" : stat.trend === "down" ? "↓" : "→"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Real-time Chart */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Real-time Call Volume Analytics</h3>
            <div className="h-[300px]">
              <Line
                data={realtimeData}
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
                      grid: {
                        display: false
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Context Section */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Context</h3>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm transition-colors duration-200">
                ➕ Add
              </button>
            </div>
            <div className="space-y-3">
              {contextFiles.map((file, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div>
                        <p className="text-sm text-white font-medium">{file.name}</p>
                        <p className="text-xs text-gray-400">{file.size} • {file.uploaded}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={file.isActive}
                        onChange={() => {
                          const updatedFiles = [...contextFiles]
                          updatedFiles[index].isActive = !updatedFiles[index].isActive
                          setContextFiles(updatedFiles)
                        }}
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={action.action}
              className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer group border border-white/20"
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                  {action.icon}
                </span>
                <div>
                  <h4 className="font-medium text-white group-hover:text-purple-400 transition-colors duration-200">
                    {action.title}
                  </h4>
                  <p className="text-sm text-gray-300 mt-1">{action.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <h4 className="text-lg font-semibold mb-2">Monthly Performance</h4>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">98%</span>
              <span className="ml-2 text-purple-200">success rate</span>
            </div>
            <div className="mt-4 text-sm text-purple-200">
              15% improvement in call resolution efficiency
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <h4 className="text-lg font-semibold mb-2">AI Response Time</h4>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">0.8s</span>
              <span className="ml-2 text-indigo-200">average</span>
            </div>
            <div className="mt-4 text-sm text-indigo-200">
              Lightning-fast AI responses
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

