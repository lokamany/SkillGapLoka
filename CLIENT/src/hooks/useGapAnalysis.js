import { useState } from 'react';
import api from '../services/api';
import { useSkills } from '../context/SkillContext';

export const useGapAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { updateAnalysisData } = useSkills();

  const analyzeResume = async (file, targetRole) => {
    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('targetRole', targetRole);

    try {
      const response = await api.post('/resume/analyze', formData);
      updateAnalysisData(response.data);
      return response.data;
    } catch (error) {
      console.error("Analysis Failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { analyzeResume, isAnalyzing };
};