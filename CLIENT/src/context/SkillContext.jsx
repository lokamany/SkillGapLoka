import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const SkillContext = createContext(null);

export const SkillProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [readinessScore, setReadinessScore] = useState(0);
  const [userSkills, setUserSkills] = useState([]);
  const [auditData, setAuditData] = useState(null);

  const analyzeResume = async (resumeFile, linkedinUrl, certFile) => {
    if (!user?.token) return alert("Please login.");
    
    setLoading(true);
    const formData = new FormData();
    if (resumeFile) formData.append('resume', resumeFile);
    if (linkedinUrl) formData.append('linkedinUrl', linkedinUrl);
    if (certFile) formData.append('certificate', certFile);

    try {
      const { data } = await axios.post('http://localhost:5000/api/resume/analyze', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}` 
        },
        timeout: 60000 // 🔥 SET TIMEOUT TO 60 SECONDS
      });

      setReadinessScore(data.readinessScore || 0);
      setUserSkills(data.skillMatrix || []);
      setAuditData({
        resume: data.resumeAudit,
        linkedin: data.linkedinAudit
      });
      
    } catch (error) {
      console.error("Scan Error:", error);
      if (error.code === 'ECONNABORTED') {
        alert("The AI is taking a long time to read your files. Please try again in a moment.");
      } else {
        alert(error.response?.data?.message || "Connection error. Please check your server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SkillContext.Provider value={{ analyzeResume, loading, readinessScore, userSkills, auditData }}>
      {children}
    </SkillContext.Provider>
  );
};

export const useSkills = () => useContext(SkillContext);