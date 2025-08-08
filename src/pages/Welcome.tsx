import { Link } from "react-router-dom"
import { BoltIcon } from "../components/Icons"

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
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

      <div className="flex flex-col items-center mb-8 relative z-10">
        <div className="relative">
          <BoltIcon className="w-20 h-20 text-purple-400 animate-pulse mb-4 drop-shadow-lg" />
          <div className="absolute inset-0 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-ping"></div>
        </div>
        <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent flex items-center">
          AgenticCall
        </div>
        <div className="text-sm mt-2 text-gray-300 font-medium">AI-Powered Communication Platform</div>
      </div>

      <h1 className="text-3xl font-bold my-8 text-white relative z-10">WELCOME</h1>

      <Link
        to="/login"
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl w-full max-w-[250px] text-center mb-4 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl relative z-10"
      >
        LOGIN AS CLIENT
      </Link>

      <Link 
        to="/signup" 
        className="bg-white/10 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-xl w-full max-w-[250px] text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl relative z-10"
      >
        SignUp
      </Link>

      <div className="mt-8 text-sm text-gray-300 cursor-pointer hover:text-white transition-colors duration-200 relative z-10">Privacy Policy</div>
    </div>
  )
}

export default Welcome

