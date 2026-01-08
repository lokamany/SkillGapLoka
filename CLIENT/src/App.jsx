import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login'; 
import Roadmap from './components/dashboard/Roadmap';
import MarketOverview from './components/dashboard/MarketOverview';
import Sidebar from './components/layout/sidebar'; 
import { useAuth } from './context/AuthContext';
import SettingsPage from './pages/Settings';
import ProfilePage from './pages/Profile'; 
import CommCoach from './components/dashboard/CommCoach';
;

function App() {
  const { user } = useAuth();

  // Helper component to wrap protected pages with the Sidebar
  // Added ml-0 or adjusted margins to prevent double-sidebar issues
  const ProtectedLayout = ({ children }) => (
    <div className="flex bg-[#050816] min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-72 overflow-y-auto">
        {children}
      </main>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={user ? <ProtectedLayout><CommCoach></CommCoach></ProtectedLayout> : <Navigate to="/login" />} 
        />
        <Route 
          path="/roadmap" 
          element={user ? <ProtectedLayout><Roadmap /></ProtectedLayout> : <Navigate to="/login" />} 
        />
        <Route 
          path="/market" 
          element={user ? <ProtectedLayout><MarketOverview /></ProtectedLayout> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={user ? <ProtectedLayout><ProfilePage /></ProtectedLayout> : <Navigate to="/login" />} 
        />
        <Route 
          path="/settings" 
          element={user ? <ProtectedLayout><SettingsPage /></ProtectedLayout> : <Navigate to="/login" />} 
        />
        
        {/* 🔥 FIXED: Added ProtectedLayout and corrected the path to match sidebar */}
        <Route 
         
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;