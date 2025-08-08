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

        {/* Recommendations */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">AI Optimization Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Peak Hours Usage",
                description: "Consider scheduling AI interactions during off-peak hours for better response times",
                saving: "Potential improvement: 15% faster responses"
              },
              {
                title: "Response Optimization",
                description: "Your AI system shows signs of reduced efficiency. Consider model updates.",
                saving: "Potential improvement: 20% better accuracy"
              },
              {
                title: "Advanced Features",
                description: "Based on your usage pattern, advanced AI features could be beneficial",
                saving: "Potential improvement: 30% more capabilities"
              }
            ].map((rec, index) => (
              <div
                key={index}
                className="p-4 border border-white/20 rounded-lg hover:border-purple-400/30 transition-colors duration-200 bg-white/5 backdrop-blur-sm"
              >
                <h4 className="font-medium text-white">{rec.title}</h4>
                <p className="text-sm text-gray-300 mt-1">{rec.description}</p>
                <p className="text-sm text-purple-400 font-medium mt-2">{rec.saving}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnergyConsumption

