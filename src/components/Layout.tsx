import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BoltIcon, HomeIcon, ChartIcon, DocumentIcon, SettingsIcon, LogoutIcon, AlertIcon } from "./Icons";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: <HomeIcon />, path: "/dashboard", label: "Dashboard" },
    { icon: <ChartIcon />, path: "/energy-consumption", label: "Analytics" },
    { icon: <DocumentIcon />, path: "/purchases", label: "Credits" },
    { icon: <SettingsIcon />, path: "/settings", label: "Settings" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
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

      <div className="w-20 bg-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center py-6 transition-all duration-300 relative z-10 border-r border-white/20">
        <div className="mb-8 transform hover:scale-110 transition-transform duration-300">
          <div className="relative">
            <BoltIcon className="w-8 h-8 text-purple-400 animate-pulse drop-shadow-lg" />
            <div className="absolute inset-0 w-8 h-8 bg-purple-500/20 rounded-full blur-xl animate-ping"></div>
          </div>
        </div>
        
        <div className="flex flex-col gap-6 items-center">
          {navItems.map((item) => (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setIsHovered(item.path)}
              onMouseLeave={() => setIsHovered(null)}
              className={`group relative w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 backdrop-blur-sm ${
                isActive(item.path) ? "bg-gradient-to-r from-purple-500/30 to-blue-500/30 scale-110 shadow-lg" : ""
              }`}
              title={item.label}
            >
              <div className={`${isActive(item.path) ? "text-purple-300" : "text-gray-300"} group-hover:text-purple-300 transform transition-all duration-300 ${
                isHovered === item.path ? "scale-110" : ""
              }`}>
                {item.icon}
              </div>
              {isHovered === item.path && (
                <div className="absolute right-0 translate-x-full px-3 py-2 ml-2 text-sm text-white bg-gray-800/90 backdrop-blur-sm rounded-lg opacity-0 animate-fade-in shadow-lg border border-white/20">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          onClick={() => navigate("/")}
          className="mt-auto w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer hover:bg-red-500/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
          title="Logout"
        >
          <LogoutIcon className="text-white group-hover:text-red-400 transition-colors duration-200" />
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <header className="h-16 bg-white/10 backdrop-blur-xl shadow-lg px-6 flex items-center justify-between border-b border-white/20">
          <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <BoltIcon className="w-6 h-6 text-purple-400 drop-shadow-lg" />
              <div className="absolute inset-0 w-6 h-6 bg-purple-500/20 rounded-full blur-sm animate-ping"></div>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">AgenticCall</span>
          </div>
          <div className="text-sm text-gray-300 font-medium hover:text-purple-400 transition-colors duration-300">AI-Powered Communication Platform</div>
          <div className="flex items-center space-x-4">
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 