import Cookies from 'js-cookie';
import { ApiError } from '../utils/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // CHANGED: Changed from 'private' to 'public' so services can use it
  public async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryOn401 = true
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...options.headers,
    });

    const token = Cookies.get('access_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const config: RequestInit = {
      ...options,
      headers,
      credentials: 'include',
    };

    try {
      const response = await fetch(url, config);
      
      if (response.status === 401 && retryOn401) {
        try {
          await this.refreshToken();
          const newToken = Cookies.get('access_token');
          
          if (newToken) {
            headers.set('Authorization', `Bearer ${newToken}`);
            const retryConfig = { ...config, headers };
            const retryResponse = await fetch(url, retryConfig);
            
            if (!retryResponse.ok) {
              const error = await retryResponse.json().catch(() => ({ message: 'Retry failed' }));
              throw new ApiError(retryResponse.status, error.message);
            }
            return await retryResponse.json();
          }
        } catch (refreshError) {
          Cookies.remove('access_token');
          throw new ApiError(401, 'Session expired. Please login again.');
        }
      }
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new ApiError(response.status, error.message || `HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return null as T;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Network error occurred');
    }
  }

  // Kept this here because the interceptor (above) needs it internally
  public async refreshToken() {
    const url = `${this.baseURL}/auth/refresh`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new ApiError(401, 'Token refresh failed');
    }

    const data = await response.json();
    
    if (data?.access_token) {
      Cookies.set('access_token', data.access_token, {
        expires: 1/96,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
    }
    
    return data;
  }

  // --- NEW: Helper Methods for cleaner Service files ---

  public get<T>(url: string, headers?: HeadersInit) {
    return this.request<T>(url, { method: 'GET', headers });
  }

  public post<T>(url: string, body: any, headers?: HeadersInit) {
    return this.request<T>(url, { method: 'POST', body: JSON.stringify(body), headers });
  }

  public patch<T>(url: string, body: any) {
    return this.request<T>(url, { method: 'PATCH', body: JSON.stringify(body) });
  }

  public delete<T>(url: string) {
    return this.request<T>(url, { method: 'DELETE' });
  }
}

export const httpClient = new HttpClient(API_BASE_URL);