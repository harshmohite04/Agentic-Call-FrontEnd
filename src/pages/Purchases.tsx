"use client"

import { useState } from "react"
import { BoltIcon } from "../components/Icons"
import { Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
} from "chart.js"

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
)

const Purchases = () => {
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [dateRange, setDateRange] = useState("month")

  // Sample data - replace with actual data from your API
  const purchaseStats = {
    total: "₹45,250",
    thisMonth: "₹12,800",
    pending: "₹3,500",
    savings: "₹2,450"
  }

  const chartData = {
    labels: ["Peak Hours", "Off-Peak Hours", "Renewable Energy"],
    datasets: [{
      data: [45, 35, 20],
      backgroundColor: [
        "rgba(34, 197, 94, 0.8)",
        "rgba(99, 102, 241, 0.8)",
        "rgba(234, 179, 8, 0.8)"
      ],
      borderColor: [
        "rgb(34, 197, 94)",
        "rgb(99, 102, 241)",
        "rgb(234, 179, 8)"
      ],
      borderWidth: 1
    }]
  }

  const transactions = [
    {
      id: "TRX001",
      date: "2024-03-15",
      amount: "₹4,500",
      type: "Peak Hours",
      status: "completed",
      units: "450 kWh"
    },
    {
      id: "TRX002",
      date: "2024-03-14",
      amount: "₹3,200",
      type: "Off-Peak Hours",
      status: "completed",
      units: "400 kWh"
    },
    {
      id: "TRX003",
      date: "2024-03-13",
      amount: "₹2,800",
      type: "Renewable Energy",
      status: "pending",
      units: "350 kWh"
    },
    {
      id: "TRX004",
      date: "2024-03-12",
      amount: "₹3,800",
      type: "Peak Hours",
      status: "completed",
      units: "380 kWh"
    }
  ]

  const filteredTransactions = transactions.filter(tx => {
    if (filterStatus !== "all" && tx.status !== filterStatus) return false
    if (searchQuery && !tx.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "failed":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Purchases</h1>
            <p className="text-gray-500">Track and manage your energy purchases</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200">
            New Purchase
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(purchaseStats).map(([key, value]) => (
            <div
              key={key}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <span className="text-gray-500 text-sm capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <div className="mt-2 flex items-center">
                <span className="text-2xl font-bold text-gray-900">{value}</span>
                <BoltIcon className="w-4 h-4 ml-2 text-green-600" />
              </div>
            </div>
          ))}
        </div>

        {/* Chart and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
              <div className="flex items-center space-x-4">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-100">
                    <th className="pb-3 text-sm font-medium text-gray-500">Transaction ID</th>
                    <th className="pb-3 text-sm font-medium text-gray-500">Date</th>
                    <th className="pb-3 text-sm font-medium text-gray-500">Type</th>
                    <th className="pb-3 text-sm font-medium text-gray-500">Units</th>
                    <th className="pb-3 text-sm font-medium text-gray-500">Amount</th>
                    <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-4 text-sm font-medium text-gray-900">{tx.id}</td>
                      <td className="py-4 text-sm text-gray-500">{tx.date}</td>
                      <td className="py-4 text-sm text-gray-500">{tx.type}</td>
                      <td className="py-4 text-sm text-gray-500">{tx.units}</td>
                      <td className="py-4 text-sm font-medium text-gray-900">{tx.amount}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(tx.status)}`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Purchase Distribution</h3>
            <div className="h-[300px] flex items-center justify-center">
              <Doughnut
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        padding: 20
                      }
                    }
                  },
                  cutout: "60%"
                }}
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Schedule Purchase",
              description: "Set up automatic purchases for peak hours",
              action: "Schedule →"
            },
            {
              title: "Download Report",
              description: "Get detailed purchase history report",
              action: "Download →"
            },
            {
              title: "Payment Methods",
              description: "Manage your payment options",
              action: "Manage →"
            }
          ].map((action, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                {action.title}
              </h4>
              <p className="text-sm text-gray-500 mt-1">{action.description}</p>
              <span className="text-sm text-green-600 font-medium mt-4 inline-block group-hover:translate-x-2 transition-transform duration-200">
                {action.action}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Purchases

