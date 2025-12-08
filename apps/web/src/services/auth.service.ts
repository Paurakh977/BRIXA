import { httpClient } from '../lib/http-client';
import Cookies from 'js-cookie';

// Imports from Shared Package
import { 
  LoginDto, 
  RegisterDto, 
  AuthResponse, 
  UserProfile 
} from '@BRIXA/api';

export const authService = {
  // Input: LoginDto, Output: AuthResponse
  login: async (credentials: LoginDto) => {
    return httpClient.post<AuthResponse>('/auth/login', credentials);
  },

  register: async (data: RegisterDto) => {
    return httpClient.post<AuthResponse>('/auth/register', data);
  },

  refreshToken: async () => {
    return httpClient.refreshToken();
  },

  logout: async () => {
    try {
      // Let the server handle cookie clearing via Set-Cookie headers
      // This ensures cookies are cleared with the exact same options they were set with
      await httpClient.post('/auth/logout', {});
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Fallback: Also remove cookies client-side as a safety measure
      // Use the same options as when cookies are set
      const isProduction = process.env.NODE_ENV === 'production';
      Cookies.remove('access_token', { 
        path: '/',
        secure: isProduction,
        sameSite: 'lax',
      });
      // Note: brixa_refresh is HttpOnly, so we can't remove it client-side
      // It must be cleared by the server's Set-Cookie header
    }
  },

  getProfile: async () => {
    return httpClient.get<UserProfile>('/auth/me');
  },

  forgotPassword: async (email: string) => {
    return httpClient.post<{ message: string }>('/auth/forgot-password', { email });
  }
};