// import Cookies from 'js-cookie';
// import { ApiError } from '../utils/api';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// class ApiClient {
//   private baseURL: string;

//   constructor(baseURL: string) {
//     this.baseURL = baseURL;
//   }

//   private async request<T>(
//     endpoint: string,
//     options: RequestInit = {},
//     retryOn401 = true
//   ): Promise<T> {
//     const url = `${this.baseURL}${endpoint}`;
    
//     const headers = new Headers({
//       'Content-Type': 'application/json',
//       ...options.headers,
//     });

//     // 1. BRIDGE: Get cookie and put in Header for NestJS
//     const token = Cookies.get('access_token');
//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`);
//     }

//     const config: RequestInit = {
//       ...options,
//       headers,
//       credentials: 'include', // 2. BRIDGE: Send Refresh Token Cookie
//     };

//     try {
//       const response = await fetch(url, config);
      
//       // 3. INTERCEPTOR: Handle 401 Unauthorized
//       if (response.status === 401 && retryOn401) {
//         try {
//           // Attempt refresh
//           await this.refreshToken();
          
//           // Get the NEW token that was just set
//           const newToken = Cookies.get('access_token');
          
//           if (newToken) {
//             // Update header and retry
//             headers.set('Authorization', `Bearer ${newToken}`);
//             const retryConfig = { ...config, headers };
            
//             const retryResponse = await fetch(url, retryConfig);
            
//             if (!retryResponse.ok) {
//               const error = await retryResponse.json().catch(() => ({ message: 'Retry failed' }));
//               throw new ApiError(retryResponse.status, error.message);
//             }
            
//             // Return successful retry data
//             return await retryResponse.json();
//           }
//         } catch (refreshError) {
//           // Refresh failed (Session truly dead) -> Logout
//           Cookies.remove('access_token');
//           // Redirect to login is usually handled by AuthContext or UI, 
//           // but throwing 401 here lets the UI know.
//           throw new ApiError(401, 'Session expired. Please login again.');
//         }
//       }
      
//       // Handle standard errors
//       if (!response.ok) {
//         const error = await response.json().catch(() => ({ message: 'An error occurred' }));
//         throw new ApiError(response.status, error.message || `HTTP error! status: ${response.status}`);
//       }

//       // Handle empty response
//       const contentType = response.headers.get('content-type');
//       if (contentType && contentType.includes('application/json')) {
//         return await response.json();
//       }
      
//       return null as T;
//     } catch (error) {
//       if (error instanceof ApiError) throw error;
//       throw new ApiError(500, 'Network error occurred');
//     }
//   }

//   // --- Auth Endpoints ---

//   async login(email: string, password: string) {
//     return this.request<{ access_token: string }>('/auth/login', {
//       method: 'POST',
//       body: JSON.stringify({ email, password }),
//     });
//   }

//   async register(data: any) {
//     return this.request<{ access_token: string }>('/auth/register', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     });
//   }

//   async refreshToken() {
//     // We use fetch directly here to avoid circular logic with this.request()
//     const url = `${this.baseURL}/auth/refresh`;
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include', // Send the HttpOnly Cookie
//     });

//     if (!response.ok) {
//       throw new ApiError(401, 'Token refresh failed');
//     }

//     const data = await response.json();
    
//     // SYNC: The backend sent a Set-Cookie header (httpOnly=false for access_token).
//     // The browser automatically updates the cookie jar.
//     // However, JS-Cookie might not see it immediately in some edge cases during the same tick.
//     // Manually setting it ensures 'Cookies.get' works in the very next line of code.
//     if (data?.access_token) {
//       Cookies.set('access_token', data.access_token, {
//         expires: 1/96, // 15 mins
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'lax',
//         path: '/',
//       });
//     }
    
//     return data;
//   }

//   async logout() {
//     // We try to tell backend to clear cookies
//     try {
//       await this.request('/auth/logout', { method: 'POST' });
//     } catch (e) {
//       console.error("Logout API call failed, clearing local state anyway");
//     }
//     // Always clear local state
//     Cookies.remove('access_token', { path: '/' });
//   }

//   async getProfile() {
//     return this.request<any>('/auth/me');
//   }

//   async forgotPassword(email: string) {
//     return this.request('/auth/forgot-password', {
//       method: 'POST',
//       body: JSON.stringify({ email }),
//     });
//   }

//   // --- Admin Endpoints ---
  
//   async getUsers(page = 1, limit = 10) {
//     return this.request<{
//       users: any[];
//       total: number;
//       page: number;
//       totalPages: number;
//     }>(`/admin/users?page=${page}&limit=${limit}`);
//   }

//   async getUserById(id: string) {
//     return this.request<any>(`/admin/users/${id}`);
//   }

//   async updateUser(id: string, data: any) {
//     return this.request<any>(`/admin/users/${id}`, {
//       method: 'PATCH',
//       body: JSON.stringify(data),
//     });
//   }

//   async deleteUser(id: string) {
//     return this.request<any>(`/admin/users/${id}`, { method: 'DELETE' });
//   }

//   async createUser(data: any) {
//     return this.request<any>('/admin/users', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     });
//   }

//   async resetUserPassword(id: string, password: string) {
//     return this.request<any>(`/admin/users/${id}/reset-password`, {
//       method: 'POST',
//       body: JSON.stringify({ password }),
//     });
//   }

//   async toggleUserStatus(id: string, isActive: boolean) {
//     return this.request<any>(`/admin/users/${id}/status`, {
//       method: 'PATCH',
//       body: JSON.stringify({ isActive }),
//     });
//   }
// }

// export const apiClient = new ApiClient(API_BASE_URL);