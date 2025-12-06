import Cookies from 'js-cookie';
import { ApiError } from '../utils/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...options.headers,
    });

    // Add authorization token if available
    const token = Cookies.get('access_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const config: RequestInit = {
      ...options,
      headers,
      credentials: 'include', // Include cookies for refresh token
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new ApiError(response.status, error.message || `HTTP error! status: ${response.status}`);
      }

      // Handle empty response
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return null as T;
    } catch (error) {
      console.error('API request failed:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Network error occurred');
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ access_token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
  }) {
    return this.request<{ access_token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async refreshToken() {
    return this.request<{ access_token: string }>('/auth/refresh', {
      method: 'POST',
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async forgotPassword(email: string) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async getProfile() {
    return this.request<any>('/auth/me');
  }

  async requestWithRetry<T>(
    endpoint: string,
    options: RequestInit = {},
    maxRetries = 1
  ): Promise<T> {
    try {
      return await this.request<T>(endpoint, options);
    } catch (error: any) {
      if (error.statusCode === 401 && maxRetries > 0) {
        // Token expired, try to refresh
        try {
          await this.refreshToken();
          // Retry the original request
          return await this.request<T>(endpoint, options);
        } catch (refreshError) {
          // Refresh failed, propagate the original error
          throw error;
        }
      }
      throw error;
    }
  }

  // Admin endpoints
  async getUsers(page = 1, limit = 10) {
    return this.request<{
      users: any[];
      total: number;
      page: number;
      totalPages: number;
    }>(`/admin/users?page=${page}&limit=${limit}`);
  }

  async getUserById(id: string) {
    return this.request<any>(`/admin/users/${id}`);
  }

  async updateUser(id: string, data: any) {
    return this.request<any>(`/admin/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: string) {
    return this.request<any>(`/admin/users/${id}`, {
      method: 'DELETE',
    });
  }

  async createUser(data: any) {
    return this.request<any>('/admin/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resetUserPassword(id: string) {
    return this.request<any>(`/admin/users/${id}/reset-password`, {
      method: 'POST',
    });
  }

  async toggleUserStatus(id: string, isActive: boolean) {
    return this.request<any>(`/admin/users/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ isActive }),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);