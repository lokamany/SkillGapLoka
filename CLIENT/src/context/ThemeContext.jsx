import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('app-theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('app-theme', isDarkMode ? 'dark' : 'light');
    // We apply a class to the body tag so global CSS can target it
    if (isDarkMode) {
      document.body.classList.add('dark');
      document.body.style.backgroundColor = '#0e1621';
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '#f4f4f7';
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);