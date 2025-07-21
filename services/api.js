import axios from 'axios';
import { API_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.log('❌ Error retrieving token:', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log('⚠️ Unauthorized. Token may be invalid or expired.');
          break;
        case 404:
          console.log('⚠️ Not found.');
          break;
        case 500:
          console.log('❌ Server error.');
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
