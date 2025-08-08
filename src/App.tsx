import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";
import LoginOTP from "./pages/LoginOTP.tsx";
import ProfileSetupOrg from "./pages/ProfileSetupOrg.tsx";
import ProfileSetupContact from "./pages/ProfileSetupContact.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import EnergyConsumption from "./pages/EnergyConsumption.tsx";
import Purchases from "./pages/Purchases.tsx";
import Settings from "./pages/Settings.tsx";
import Layout from "./components/Layout.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { AlertProvider } from "./contexts/AlertContext";
import "./index.css";

// Routes that should use the Layout component
const protectedRoutes = ["/dashboard", "/energy-consumption", "/purchases", "/settings"];

function App() {
  const isProtectedRoute = (path: string) => protectedRoutes.includes(path);

  return (
    <AlertProvider>
      <ErrorBoundary>
        <Router>
          <Routes>
            {/* Auth routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login-otp" element={<LoginOTP />} />
            <Route path="/profile-setup-org" element={<ProfileSetupOrg />} />
            <Route path="/profile-setup-contact" element={<ProfileSetupContact />} />

            {/* Protected routes with Layout */}
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/energy-consumption"
              element={
                <Layout>
                  <EnergyConsumption />
                </Layout>
              }
            />
            <Route
              path="/purchases"
              element={
                <Layout>
                  <Purchases />
                </Layout>
              }
            />
            <Route
              path="/settings"
              element={
                <Layout>
                  <Settings />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </ErrorBoundary>
    </AlertProvider>
  );
}

export default App;
