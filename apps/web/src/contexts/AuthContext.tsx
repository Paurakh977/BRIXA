'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { apiClient } from '../services/api';
import { handleApiError, refreshTokenIfNeeded } from '../utils/api';
import type { AuthContextType, AuthState, LoginCredentials, RegisterCredentials, User } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get('access_token');
      if (token) {
        try {
          const user = await apiClient.getProfile();
          setState({
            user,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          Cookies.remove('access_token');
          setState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          });
        }
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await apiClient.login(credentials.email, credentials.password);
      
      // Store the access token
      Cookies.set('access_token', response.access_token, {
        expires: 1/96, // 15 minutes
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      
      // Fetch user profile
      const user = await apiClient.getProfile();
      
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
      
      router.push('/dashboard');
    } catch (error) {
      const errorMessage = handleApiError(error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await apiClient.register(credentials);
      
      // Store the access token
      Cookies.set('access_token', response.access_token, {
        expires: 1/96, // 15 minutes
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      
      // Fetch user profile
      const user = await apiClient.getProfile();
      
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
      
      router.push('/dashboard');
    } catch (error) {
      const errorMessage = handleApiError(error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      Cookies.remove('access_token');
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
      router.push('/login');
    }
  };

  const refreshToken = async () => {
    try {
      const response = await apiClient.refreshToken();
      Cookies.set('access_token', response.access_token, {
        expires: 1/96, // 15 minutes
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      return response.access_token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      await logout();
      throw error;
    }
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshToken,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};