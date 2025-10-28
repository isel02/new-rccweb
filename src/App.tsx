import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    // Show error page instead of redirecting
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0b1739, #152a5f)',
        color: 'white',
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🔒</h1>
          <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Access Denied</h2>
          <p style={{ fontSize: '18px', opacity: 0.8 }}>You must be logged in to access this page.</p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/admin_login_rcc" element={<Login />} />

        {/* Protected admin route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;