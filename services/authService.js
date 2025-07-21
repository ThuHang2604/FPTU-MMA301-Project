import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "token";

const AuthService = {
  // Sign up
  // userData - { username, password, email, phoneNumber, address }
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Login
  // credentials - { username, password }
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token } = response.data;
      if (token) {
        await AsyncStorage.setItem(TOKEN_KEY, token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Logout
  logout: async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },

  // get token from AsyncStorage
  getToken: async () => {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  // Check login
  isLoggedIn: async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return !!token;
  },
};

export default AuthService;
