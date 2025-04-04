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
    { icon: <ChartIcon />, path: "/energy-consumption", label: "Energy" },
    { icon: <DocumentIcon />, path: "/purchases", label: "Purchases" },
    { icon: <SettingsIcon />, path: "/settings", label: "Settings" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="w-20 bg-white/80 backdrop-blur-sm shadow-lg flex flex-col items-center py-6 transition-all duration-300 relative">
        <div className="mb-8 transform hover:scale-110 transition-transform duration-300">
          <BoltIcon className="w-8 h-8 text-green-600 animate-pulse" />
        </div>
        
        <div className="flex flex-col gap-6 items-center">
          {navItems.map((item) => (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setIsHovered(item.path)}
              onMouseLeave={() => setIsHovered(null)}
              className={`group relative w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-green-50 ${
                isActive(item.path) ? "bg-green-100 scale-110" : ""
              }`}
              title={item.label}
            >
              <div className={`${isActive(item.path) ? "text-green-600" : "text-gray-600"} group-hover:text-green-600 transform transition-all duration-300 ${
                isHovered === item.path ? "scale-110" : ""
              }`}>
                {item.icon}
              </div>
              {isHovered === item.path && (
                <div className="absolute right-0 translate-x-full px-2 py-1 ml-2 text-sm text-white bg-gray-800 rounded opacity-0 animate-fade-in">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          onClick={() => navigate("/")}
          className="mt-auto w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer hover:bg-red-50 transition-all duration-300 hover:scale-110"
          title="Logout"
        >
          <LogoutIcon className="text-red-500" />
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white/80 backdrop-blur-sm shadow-sm px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
            <BoltIcon className="w-6 h-6 text-green-600" />
            <span className="font-bold text-xl text-gray-800">POWERNETPRO</span>
          </div>
          <div className="text-sm text-gray-500 font-medium hover:text-green-600 transition-colors duration-300">For Better Tomorrow</div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110 relative group">
              <AlertIcon className="w-6 h-6 text-gray-600 group-hover:text-green-600 transition-colors duration-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>
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