import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Direct initialization from storage to prevent "static" data flicker
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [loading, setLoading] = useState(true);

  // --- GAMIFICATION ---
  const [userStats, setUserStats] = useState({
    coins: Number(localStorage.getItem('readyai_coins')) || 0,
    streak: Number(localStorage.getItem('readyai_streak')) || 0,
    lastClaim: localStorage.getItem('readyai_last_claim') || ""
  });

  // CRITICAL: Watch for ANY change to user object and sync to storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    setLoading(false);
  }, [user]);

  const login = (userData) => setUser(userData);
  
  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const updateStats = (newCoins, newStreak, claimDate) => {
    setUserStats({ coins: newCoins, streak: newStreak, lastClaim: claimDate });
    localStorage.setItem('readyai_coins', newCoins);
    localStorage.setItem('readyai_streak', newStreak);
    localStorage.setItem('readyai_last_claim', claimDate);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, userStats, updateStats, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);