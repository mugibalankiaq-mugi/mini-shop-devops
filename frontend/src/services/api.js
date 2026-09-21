import axios from 'axios';

// Create an Axios instance configured for the backend API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for attaching auth token
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('divishopping_user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
