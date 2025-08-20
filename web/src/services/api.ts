import axios from 'axios';
import { auth } from './firebase';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
};

export const listingsAPI = {
  getAll: (params?: any) => api.get('/listings', { params }),
  create: (data: any) => api.post('/listings', data),
  getMyListings: () => api.get('/listings/my-listings'),
};

export const reservationsAPI = {
  create: (data: any) => api.post('/reservations', data),
  getMyReservations: () => api.get('/reservations/my-reservations'),
};

export default api;