'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { authService } from '../services/auth.service';
import { handleApiError } from '../utils/api';

import type { 
  AuthContextType, 
  AuthState 
} from '../types/auth';

import type { 
  LoginDto, 
  RegisterDto, 
} from '@BRIXA/api';

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
    user: null, // Type is UserProfile | null
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  // --- 1. INITIALIZATION: Check Session on App Load ---
  useEffect(() => {
    const initializeAuth = async () => {
      // We read the cookie just to see if we should attempt a fetch
      const token = Cookies.get('access_token');
      
      if (token) {
        // CASE A: Access Token Exists -> Verify it by fetching profile
        try {
          const user = await authService.getProfile();
          setState({
            user,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          // Token exists but might be expired/invalid. Try to refresh.
          try {
            // Server response will update the cookie automatically
            const refreshResponse = await authService.refreshToken();
            if (refreshResponse) {
              const user = await authService.getProfile();
              setState({
                user,
                isLoading: false,
                isAuthenticated: true,
                error: null,
              });
            } else {
              throw new Error('Refresh failed');
            }
          } catch (refreshError) {
            // Truly logged out - Clean up client state
            Cookies.remove('access_token', { path: '/' }); 
            setState({
              user: null,
              isLoading: false,
              isAuthenticated: false,
              error: null,
            });
          }
        }
      } else {
        // CASE B: No Access Token -> Check if we can silent refresh (HttpOnly cookie)
        try {
          // Server response will set access_token cookie if successful
          const refreshResponse = await authService.refreshToken();
          if (refreshResponse) {
            // Success! We are logged in.
            const user = await authService.getProfile();
            setState({
              user,
              isLoading: false,
              isAuthenticated: true,
              error: null,
            });
          } else {
            setState(prev => ({ ...prev, isLoading: false }));
          }
        } catch (error) {
          // No valid session found
          setState(prev => ({ ...prev, isLoading: false }));
        }
      }
    };

    initializeAuth();
  }, []);

  // --- 2. PROACTIVE REFRESH: Keep Token Fresh ---
  useEffect(() => {
    const handleProactiveRefresh = async () => {
      if (typeof window === 'undefined') return;

      const token = Cookies.get('access_token');
      
      // We DO NOT check for 'brixa_refresh' cookie here because 
      // it is HttpOnly and JS cannot see it. We rely on the API call failing if it's missing.
      if (!token) return;

      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))) as { exp?: number };
          const expirationTime = payload.exp ? payload.exp * 1000 : 0;
          const currentTime = Date.now();
          const bufferTime = 60 * 1000; // 1 minute buffer

          // If token expires in < 1 minute, refresh it
          if (currentTime >= expirationTime - bufferTime) {
            try {
              // Call API -> Server sends "Set-Cookie" -> Browser updates cookie automatically
              await authService.refreshToken();
              console.log('Token refreshed proactively');
            } catch (error) {
              console.error('Proactive token refresh failed:', error);
            }
          }
        }
      } catch (error) {
        console.error('Token decode error:', error);
      }
    };

    // Check immediately and then every 2 minutes
    handleProactiveRefresh();
    const interval = setInterval(handleProactiveRefresh, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // --- 3. AUTH ACTIONS ---

  const login = async (credentials: LoginDto) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // 1. Call API. Server returns JSON *AND* sets the "access_token" cookie in headers
      await authService.login(credentials);
      
      // ❌ REMOVED: Cookies.set(...) 
      // The browser already updated the cookie from the response header.
      
      // 2. Fetch Profile (uses the new cookie automatically)
      const user = await authService.getProfile();
      
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
      
      // Use setTimeout to allow state to settle before redirect
      setTimeout(() => {
        router.push('/dashboard');
      }, 0);
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

  const register = async (credentials: RegisterDto) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // 1. Call API. Server sets cookie.
      await authService.register(credentials);
      
      // ❌ REMOVED: Cookies.set(...)
      
      // 2. Fetch Profile
      const user = await authService.getProfile();
      
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 0);
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
      // 1. Call Server Logout. 
      // Server sends "Set-Cookie: access_token=; Max-Age=0" to properly delete it.
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // 2. Fallback Cleanup (Client-Side)
      // Just in case the network failed, we remove the UI state.
      // We use the same options as the server to increase chance of success if server call failed.
      const isProduction = process.env.NODE_ENV === 'production';
      Cookies.remove('access_token', { 
        path: '/',
        secure: isProduction,
        sameSite: 'lax',
      });

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
      // Server sets the new cookie
      const response = await authService.refreshToken();
      // ❌ REMOVED: Cookies.set(...)
      return response.access_token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      Cookies.remove('access_token', { path: '/' });
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
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