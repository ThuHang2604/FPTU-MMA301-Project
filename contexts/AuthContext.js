import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../services/authService';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Load user data when app starts
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await AuthService.getToken();
        if (token) {
          // Verify token and get user data
          const userData = await ProfileService.getProfile();
          setUser({ ...userData, token });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        await handleLogout(); // Clear invalid token
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Handle login
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setAuthError(null);
      
      const response = await AuthService.login(credentials);
      const userData = await ProfileService.getProfile();
      
      setUser({ ...userData, token: response.token });
      return userData;
    } catch (error) {
      setAuthError(error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      await AuthService.logout();
      setUser(null);
      // Reset API headers
      api.defaults.headers.common['Authorization'] = '';
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  // Handle token expiration (called from API interceptor)
  const handleTokenExpiration = useCallback(async () => {
    console.log('Token expired, logging out...');
    await handleLogout();
    setAuthError('Your session has expired. Please login again.');
  }, [handleLogout]);

  // Update user profile data
  const updateUserProfile = async (profileData) => {
    try {
      const updatedProfile = await ProfileService.updateProfile(profileData);
      setUser(prev => ({ ...prev, ...updatedProfile }));
      return updatedProfile;
    } catch (error) {
      if (error.response?.status === 401) {
        await handleTokenExpiration();
      }
      throw error;
    }
  };

  // Provide context value
  const contextValue = {
    user,
    isLoading,
    authError,
    isAuthenticated: !!user,
    login,
    logout: handleLogout,
    updateUserProfile,
    handleTokenExpiration
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Add token expiration handler to API interceptor
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const { handleTokenExpiration } = require('./AuthContext').default;
      await handleTokenExpiration();
    }
    return Promise.reject(error);
  }
);