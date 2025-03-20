
import axios from 'axios';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Registration API calls
export const registerPregnancy = async (data: any) => {
  try {
    const response = await api.post('/register', data);
    return response.data;
  } catch (error) {
    console.error('Error registering pregnancy:', error);
    throw error;
  }
};

// ASHA Workers API calls
export const getAshaWorkers = async (district?: string, state?: string) => {
  try {
    const params = new URLSearchParams();
    if (district) params.append('district', district);
    if (state) params.append('state', state);
    
    const url = district || state ? `/asha-workers/location?${params.toString()}` : '/asha-workers';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching ASHA workers:', error);
    throw error;
  }
};

// Chat API calls
export const getChatResponse = async (message: string, language: string = 'en') => {
  try {
    const response = await api.post('/chat/response', { message, language });
    return response.data;
  } catch (error) {
    console.error('Error getting chat response:', error);
    throw error;
  }
};

// Health Schemes API calls
export const getHealthSchemes = async (category?: string) => {
  try {
    const url = category ? `/health-schemes/category?category=${category}` : '/health-schemes';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching health schemes:', error);
    throw error;
  }
};

export default api;
