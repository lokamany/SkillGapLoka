import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/index.css'
import { ThemeProvider } from './context/ThemeContext' // 🔥 Import this
import { AuthProvider } from './context/AuthContext'   // Assuming you have this

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider> {/* 🔥 This MUST wrap App */}
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)