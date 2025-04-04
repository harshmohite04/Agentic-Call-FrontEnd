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

  const quickStats = [
    {
      title: "Active Power",
      value: "2.4 kW",
      change: "+12%",
      trend: "up",
      color: "green"
    },
    {
      title: "Energy Today",
      value: "45 kWh",
      change: "-3%",
      trend: "down",
      color: "red"
    },
    {
      title: "Power Factor",
      value: "0.92",
      change: "+1%",
      trend: "up",
      color: "green"
    },
    {
      title: "Peak Demand",
      value: "3.8 kW",
      change: "0%",
      trend: "neutral",
      color: "gray"
    }
  ]

  const realtimeData = {
    labels: ["12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30"],
    datasets: [
      {
        label: "Power Consumption",
        data: [2.1, 2.3, 2.5, 2.0, 2.4, 2.2, 2.4],
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
      message: "Peak demand approaching limit",
      time: "2 mins ago"
    },
    {
      type: "success",
      message: "Solar generation optimal",
      time: "5 mins ago"
    },
    {
      type: "info",
      message: "New energy saving tip available",
      time: "10 mins ago"
    }
  ]

  const quickActions = [
    {
      title: "Energy Consumption",
      description: "View detailed consumption analytics",
      icon: "📊",
      action: () => navigate("/energy-consumption")
    },
    {
      title: "Purchase Energy",
      description: "Buy energy credits or view history",
      icon: "💳",
      action: () => navigate("/purchases")
    },
    {
      title: "Settings",
      description: "Configure your preferences",
      icon: "⚙️",
      action: () => navigate("/settings")
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <BoltIcon className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
              <p className="text-gray-500">Here's your energy overview</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <button 
              onClick={() => {}} 
              className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
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
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">{stat.title}</span>
                <span className={`text-sm font-medium text-${stat.color}-600`}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className={`ml-2 text-${stat.color}-600`}>
                  {stat.trend === "up" ? "↑" : stat.trend === "down" ? "↓" : "→"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Real-time Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time Power Consumption</h3>
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

          {/* Alerts */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    alert.type === "warning"
                      ? "bg-yellow-50 border-l-4 border-yellow-400"
                      : alert.type === "success"
                      ? "bg-green-50 border-l-4 border-green-400"
                      : "bg-blue-50 border-l-4 border-blue-400"
                  }`}
                >
                  <div className="flex justify-between">
                    <p className={`text-sm ${
                      alert.type === "warning"
                        ? "text-yellow-700"
                        : alert.type === "success"
                        ? "text-green-700"
                        : "text-blue-700"
                    }`}>
                      {alert.message}
                    </p>
                    <span className="text-xs text-gray-500">{alert.time}</span>
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
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                  {action.icon}
                </span>
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                    {action.title}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <h4 className="text-lg font-semibold mb-2">Monthly Savings</h4>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">₹2,450</span>
              <span className="ml-2 text-green-100">vs last month</span>
            </div>
            <div className="mt-4 text-sm text-green-100">
              15% improvement in energy efficiency
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h4 className="text-lg font-semibold mb-2">Carbon Footprint</h4>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">-120kg</span>
              <span className="ml-2 text-blue-100">CO₂ this month</span>
            </div>
            <div className="mt-4 text-sm text-blue-100">
              Equivalent to planting 8 trees
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

