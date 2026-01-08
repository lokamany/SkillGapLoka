import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const analyzeResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  const response = await API.post('/analyze', formData);
  return response.data;
};

export const getRoadmap = async (userId) => {
  const response = await API.get(`/roadmap/${userId}`);
  return response.data;
};