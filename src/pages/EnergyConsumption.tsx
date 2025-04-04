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
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4
      },
      compareMode && {
        label: "Previous Week",
        data: [100, 130, 150, 110, 140, 130, 120],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4
      }
    ].filter(Boolean)
  }

  const efficiencyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Energy Efficiency",
      data: [85, 88, 92, 87, 90, 89, 91],
      backgroundColor: "rgba(34, 197, 94, 0.8)"
    }]
  }

  const metrics = [
    { value: 2450, label: "Total kWh", change: "+5.2%", trend: "up" },
    { value: 85, label: "Efficiency %", change: "+2.1%", trend: "up" },
    { value: 1890, label: "Peak Usage", change: "-3.4%", trend: "down" },
    { value: 12500, label: "Cost (₹)", change: "+1.8%", trend: "up" }
  ]

  const timeRanges = ["day", "week", "month", "year"]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Energy Consumption</h1>
            <p className="text-gray-500">Monitor and analyze your energy usage patterns</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {timeRanges.map((range) => (
                <option key={range} value={range}>
                  Last {range.charAt(0).toUpperCase() + range.slice(1)}
                </option>
              ))}
            </select>
            <button
              onClick={() => setCompareMode(!compareMode)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                compareMode
                  ? "bg-green-100 text-green-700"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
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
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">{metric.label}</span>
                <span className={`text-sm font-medium ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {metric.change}
                </span>
              </div>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                {metric.trend === "up" ? (
                  <BoltIcon className="w-4 h-4 ml-2 text-green-600" />
                ) : (
                  <BoltIcon className="w-4 h-4 ml-2 text-red-600 transform rotate-180" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Consumption Trend</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedMetric("consumption")}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    selectedMetric === "consumption"
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Usage
                </button>
                <button
                  onClick={() => setSelectedMetric("cost")}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    selectedMetric === "cost"
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:bg-gray-100"
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
                      align: "end"
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

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Efficiency Analysis</h3>
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
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Peak Hours Usage",
                description: "Consider shifting heavy consumption tasks to off-peak hours for better rates",
                saving: "Potential saving: ₹1,200/month"
              },
              {
                title: "Equipment Efficiency",
                description: "Your HVAC system shows signs of reduced efficiency. Schedule maintenance.",
                saving: "Potential saving: ₹800/month"
              },
              {
                title: "Solar Integration",
                description: "Based on your consumption pattern, solar integration could be beneficial",
                saving: "Potential saving: ₹2,500/month"
              }
            ].map((rec, index) => (
              <div
                key={index}
                className="p-4 border border-gray-100 rounded-lg hover:border-green-200 transition-colors duration-200"
              >
                <h4 className="font-medium text-gray-900">{rec.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                <p className="text-sm text-green-600 font-medium mt-2">{rec.saving}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnergyConsumption

