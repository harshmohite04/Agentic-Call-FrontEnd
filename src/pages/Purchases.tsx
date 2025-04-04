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
  const [isNewPurchaseModalOpen, setIsNewPurchaseModalOpen] = useState(false)
  const [purchaseForm, setPurchaseForm] = useState({
    type: "peak",
    units: "",
    startDate: "",
    startTime: "",
    duration: "1",
    paymentMethod: "wallet",
    isRecurring: false,
    recurringFrequency: "daily"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handlePurchaseFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setPurchaseForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handlePurchaseSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Add new transaction to the list
      const newTransaction = {
        id: `TRX${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        amount: `₹${(parseFloat(purchaseForm.units) * 10).toFixed(2)}`,
        type: purchaseForm.type === "peak" ? "Peak Hours" : 
              purchaseForm.type === "offpeak" ? "Off-Peak Hours" : "Renewable Energy",
        status: "pending",
        units: `${purchaseForm.units} kWh`
      }

      transactions.unshift(newTransaction)
      setIsNewPurchaseModalOpen(false)
      setPurchaseForm({
        type: "peak",
        units: "",
        startDate: "",
        startTime: "",
        duration: "1",
        paymentMethod: "wallet",
        isRecurring: false,
        recurringFrequency: "daily"
      })
    } catch (error) {
      console.error("Error creating purchase:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

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

  const calculateEstimatedCost = () => {
    const baseRate = purchaseForm.type === "peak" ? 10 : 
                    purchaseForm.type === "offpeak" ? 8 : 12
    const units = parseFloat(purchaseForm.units) || 0
    return (baseRate * units).toFixed(2)
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
          <button 
            onClick={() => setIsNewPurchaseModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
          >
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

        {/* New Purchase Modal */}
        {isNewPurchaseModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">New Energy Purchase</h2>
                  <button
                    onClick={() => setIsNewPurchaseModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handlePurchaseSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Energy Type
                    </label>
                    <select
                      name="type"
                      value={purchaseForm.type}
                      onChange={handlePurchaseFormChange}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-green-500"
                    >
                      <option value="peak">Peak Hours</option>
                      <option value="offpeak">Off-Peak Hours</option>
                      <option value="renewable">Renewable Energy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Units (kWh)
                    </label>
                    <input
                      type="number"
                      name="units"
                      value={purchaseForm.units}
                      onChange={handlePurchaseFormChange}
                      placeholder="Enter units"
                      className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={purchaseForm.startDate}
                        onChange={handlePurchaseFormChange}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        name="startTime"
                        value={purchaseForm.startTime}
                        onChange={handlePurchaseFormChange}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (hours)
                    </label>
                    <select
                      name="duration"
                      value={purchaseForm.duration}
                      onChange={handlePurchaseFormChange}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-green-500"
                    >
                      {[1, 2, 4, 8, 12, 24].map(hours => (
                        <option key={hours} value={hours}>{hours} hour{hours > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Method
                    </label>
                    <select
                      name="paymentMethod"
                      value={purchaseForm.paymentMethod}
                      onChange={handlePurchaseFormChange}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-green-500"
                    >
                      <option value="wallet">Wallet Balance</option>
                      <option value="card">Credit/Debit Card</option>
                      <option value="upi">UPI</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="isRecurring"
                      checked={purchaseForm.isRecurring}
                      onChange={handlePurchaseFormChange}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <label className="text-sm text-gray-700">Make this a recurring purchase</label>
                  </div>

                  {purchaseForm.isRecurring && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Recurring Frequency
                      </label>
                      <select
                        name="recurringFrequency"
                        value={purchaseForm.recurringFrequency}
                        onChange={handlePurchaseFormChange}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-green-500"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  )}

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Estimated Cost:</span>
                      <span className="font-medium text-gray-900">₹{calculateEstimatedCost()}</span>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsNewPurchaseModalOpen(false)}
                      className="px-4 py-2 text-gray-700 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Processing..." : "Confirm Purchase"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Purchases

