"use client"

import { useState, useEffect } from "react"
import { BoltIcon } from "../components/Icons"
import { Doughnut } from "react-chartjs-2"
import { useAlert } from "../contexts/AlertContext"
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
  const { showAlert } = useAlert()
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
    labels: ["Premium Credits", "Standard Credits", "Basic Credits"],
    datasets: [{
      data: [45, 35, 20],
      backgroundColor: [
        "rgba(147, 51, 234, 0.8)",
        "rgba(59, 130, 246, 0.8)",
        "rgba(16, 185, 129, 0.8)"
      ],
      borderColor: [
        "rgb(147, 51, 234)",
        "rgb(59, 130, 246)",
        "rgb(16, 185, 129)"
      ],
      borderWidth: 1
    }]
  }

  const transactions = [
    {
      id: "TRX001",
      date: "2024-03-15",
      amount: "₹4,500",
      type: "Premium Credits",
      status: "completed",
      units: "450 Credits"
    },
    {
      id: "TRX002",
      date: "2024-03-14",
      amount: "₹3,200",
      type: "Standard Credits",
      status: "completed",
      units: "400 Credits"
    },
    {
      id: "TRX003",
      date: "2024-03-13",
      amount: "₹2,800",
      type: "Basic Credits",
      status: "pending",
      units: "350 Credits"
    },
    {
      id: "TRX004",
      date: "2024-03-12",
      amount: "₹3,800",
      type: "Premium Credits",
      status: "completed",
      units: "380 Credits"
    }
  ]

  // Simulate system alerts
  useEffect(() => {
    // Simulate load increase alert
    const loadTimer = setInterval(() => {
      const randomLoad = Math.floor(Math.random() * 30) + 70 // Random load between 70-100%
      if (randomLoad > 90) {
        showAlert(`High Load Alert: System load at ${randomLoad}%`, "warning")
      }
    }, 2000) // Check every 3 seconds

    // Simulate energy sharing status
    const sharingTimer = setInterval(() => {
      const isSharing = Math.random() > 0.7
      if (!isSharing) {
        showAlert("AI Communication Interrupted: Network connectivity issues", "error")
      }
    }, 60000) // Check every minute

    // Simulate power meter status
    const meterTimer = setInterval(() => {
      const meterStatus = Math.random() > 0.8
      if (!meterStatus) {
        showAlert("AI System Alert: Communication lost with AI service", "error")
      }
    }, 50000) // Check every 50 seconds

    // Simulate communication status
    const commTimer = setInterval(() => {
      const commStatus = Math.random() > 0.85
      if (!commStatus) {
        showAlert("Communication Error: Unable to establish connection with AI platform", "warning")
      }
    }, 40000) // Check every 40 seconds

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(loadTimer)
      clearInterval(sharingTimer)
      clearInterval(meterTimer)
      clearInterval(commTimer)
    }
  }, [showAlert])

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
      // Validate form
      if (!purchaseForm.units || !purchaseForm.startDate || !purchaseForm.startTime) {
        showAlert("Please fill in all required fields", "error")
        return
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Add new transaction to the list
      const newTransaction = {
        id: `TRX${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        amount: `₹${(parseFloat(purchaseForm.units) * 10).toFixed(2)}`,
        type: purchaseForm.type === "peak" ? "Premium Credits" : 
              purchaseForm.type === "offpeak" ? "Standard Credits" : "Basic Credits",
        status: "pending",
        units: `${purchaseForm.units} Credits`
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

      showAlert("Credit purchase created successfully!", "success")

      // Show recurring purchase confirmation if enabled
      if (purchaseForm.isRecurring) {
        showAlert(`Recurring credit purchase scheduled ${purchaseForm.recurringFrequency}`, "info")
      }
    } catch (error) {
      console.error("Error creating purchase:", error)
      showAlert("Failed to create purchase. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuickAction = (action) => {
    switch (action) {
      case "Schedule →":
        showAlert("Scheduling feature will be available soon!", "info")
        break
      case "Download →":
        showAlert("Preparing your report for download...", "info")
        setTimeout(() => {
          showAlert("Report downloaded successfully!", "success")
        }, 2000)
        break
      case "Manage →":
        showAlert("Payment methods management coming soon!", "info")
        break
      default:
        break
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
        return "bg-green-500/20 text-green-400 border border-green-400/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border border-red-400/30"
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-400/30"
    }
  }

  const calculateEstimatedCost = () => {
    const baseRate = purchaseForm.type === "peak" ? 10 : 
                    purchaseForm.type === "offpeak" ? 8 : 12
    const units = parseFloat(purchaseForm.units) || 0
    return (baseRate * units).toFixed(2)
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
            <h1 className="text-2xl font-bold text-white">AI Communication Credits</h1>
            <p className="text-gray-300">Purchase credits and manage your AI communication transactions</p>
          </div>
          <button 
            onClick={() => setIsNewPurchaseModalOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
          >
            New Purchase
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(purchaseStats).map(([key, value]) => (
            <div
              key={key}
              className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20"
            >
              <span className="text-gray-300 text-sm capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <div className="mt-2 flex items-center">
                <span className="text-2xl font-bold text-white">{value}</span>
                <BoltIcon className="w-4 h-4 ml-2 text-purple-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Chart and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Transaction History</h3>
              <div className="flex items-center space-x-4">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-300"
                >
                  <option value="week" className="text-gray-800">This Week</option>
                  <option value="month" className="text-gray-800">This Month</option>
                  <option value="year" className="text-gray-800">This Year</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-300"
                >
                  <option value="all" className="text-gray-800">All Status</option>
                  <option value="completed" className="text-gray-800">Completed</option>
                  <option value="pending" className="text-gray-800">Pending</option>
                  <option value="failed" className="text-gray-800">Failed</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-white/20">
                    <th className="pb-3 text-sm font-medium text-gray-300">Transaction ID</th>
                    <th className="pb-3 text-sm font-medium text-gray-300">Date</th>
                    <th className="pb-3 text-sm font-medium text-gray-300">Type</th>
                    <th className="pb-3 text-sm font-medium text-gray-300">Units</th>
                    <th className="pb-3 text-sm font-medium text-gray-300">Amount</th>
                    <th className="pb-3 text-sm font-medium text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200"
                    >
                      <td className="py-4 text-sm font-medium text-white">{tx.id}</td>
                      <td className="py-4 text-sm text-gray-300">{tx.date}</td>
                      <td className="py-4 text-sm text-gray-300">{tx.type}</td>
                      <td className="py-4 text-sm text-gray-300">{tx.units}</td>
                      <td className="py-4 text-sm font-medium text-white">{tx.amount}</td>
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

          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-6">Credit Distribution</h3>
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
                        padding: 20,
                        color: "#e2e8f0"
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
              description: "Set up automatic credit purchases",
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
              onClick={() => handleQuickAction(action.action)}
              className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer group border border-white/20"
            >
              <h4 className="font-medium text-white group-hover:text-purple-400 transition-colors duration-200">
                {action.title}
              </h4>
              <p className="text-sm text-gray-300 mt-1">{action.description}</p>
              <span className="text-sm text-purple-400 font-medium mt-4 inline-block group-hover:translate-x-2 transition-transform duration-200">
                {action.action}
              </span>
            </div>
          ))}
        </div>

        {/* New Purchase Modal */}
        {isNewPurchaseModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">New Credit Purchase</h2>
                  <button
                    onClick={() => setIsNewPurchaseModalOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handlePurchaseSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Credit Type
                    </label>
                    <select
                      name="type"
                      value={purchaseForm.type}
                      onChange={handlePurchaseFormChange}
                      className="w-full rounded-lg border border-white/20 px-4 py-2 focus:ring-2 focus:ring-purple-500 bg-white/10 backdrop-blur-sm text-white"
                    >
                      <option value="peak" className="text-gray-800">Premium Credits</option>
                      <option value="offpeak" className="text-gray-800">Standard Credits</option>
                      <option value="renewable" className="text-gray-800">Basic Credits</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Credits
                    </label>
                    <input
                      type="number"
                      name="units"
                      value={purchaseForm.units}
                      onChange={handlePurchaseFormChange}
                      placeholder="Enter credits"
                      className="w-full rounded-lg border border-white/20 px-4 py-2 focus:ring-2 focus:ring-purple-500 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={purchaseForm.startDate}
                        onChange={handlePurchaseFormChange}
                        className="w-full rounded-lg border border-white/20 px-4 py-2 focus:ring-2 focus:ring-purple-500 bg-white/10 backdrop-blur-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        name="startTime"
                        value={purchaseForm.startTime}
                        onChange={handlePurchaseFormChange}
                        className="w-full rounded-lg border border-white/20 px-4 py-2 focus:ring-2 focus:ring-purple-500 bg-white/10 backdrop-blur-sm text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Duration (hours)
                    </label>
                    <select
                      name="duration"
                      value={purchaseForm.duration}
                      onChange={handlePurchaseFormChange}
                      className="w-full rounded-lg border border-white/20 px-4 py-2 focus:ring-2 focus:ring-purple-500 bg-white/10 backdrop-blur-sm text-white"
                    >
                      {[1, 2, 4, 8, 12, 24].map(hours => (
                        <option key={hours} value={hours} className="text-gray-800">{hours} hour{hours > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Payment Method
                    </label>
                    <select
                      name="paymentMethod"
                      value={purchaseForm.paymentMethod}
                      onChange={handlePurchaseFormChange}
                      className="w-full rounded-lg border border-white/20 px-4 py-2 focus:ring-2 focus:ring-purple-500 bg-white/10 backdrop-blur-sm text-white"
                    >
                      <option value="wallet" className="text-gray-800">Wallet Balance</option>
                      <option value="card" className="text-gray-800">Credit/Debit Card</option>
                      <option value="upi" className="text-gray-800">UPI</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="isRecurring"
                      checked={purchaseForm.isRecurring}
                      onChange={handlePurchaseFormChange}
                      className="rounded border-white/20 text-purple-600 focus:ring-purple-500 bg-white/10"
                    />
                    <label className="text-sm text-gray-300">Make this a recurring purchase</label>
                  </div>

                  {purchaseForm.isRecurring && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Recurring Frequency
                      </label>
                      <select
                        name="recurringFrequency"
                        value={purchaseForm.recurringFrequency}
                        onChange={handlePurchaseFormChange}
                        className="w-full rounded-lg border border-white/20 px-4 py-2 focus:ring-2 focus:ring-purple-500 bg-white/10 backdrop-blur-sm text-white"
                      >
                        <option value="daily" className="text-gray-800">Daily</option>
                        <option value="weekly" className="text-gray-800">Weekly</option>
                        <option value="monthly" className="text-gray-800">Monthly</option>
                      </select>
                    </div>
                  )}

                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">Estimated Cost:</span>
                      <span className="font-medium text-white">₹{calculateEstimatedCost()}</span>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsNewPurchaseModalOpen(false)}
                      className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
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

