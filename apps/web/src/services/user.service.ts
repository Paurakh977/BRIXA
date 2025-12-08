import { httpClient } from '../lib/http-client';

// Imports from Shared Package
import { 
  UserProfile,
  UserListResponse,
  CreateUserDto,
  UpdateUserDto,
  ResetPasswordDto,
  ToggleUserStatusDto
} from '@BRIXA/api';

export const userService = {
  getUsers: async (page = 1, limit = 10) => {
    return httpClient.get<UserListResponse>(
      `/admin/users?page=${page}&limit=${limit}`
    );
  },

  getUserById: async (id: string) => {
    return httpClient.get<UserProfile>(`/admin/users/${id}`);
  },

  updateUser: async (id: string, data: UpdateUserDto) => {
    return httpClient.patch<UserProfile>(`/admin/users/${id}`, data);
  },

  deleteUser: async (id: string) => {
    return httpClient.delete<{ message: string }>(`/admin/users/${id}`);
  },

  createUser: async (data: CreateUserDto) => {
    return httpClient.post<UserProfile>('/admin/users', data);
  },

  resetUserPassword: async (id: string, password: string) => {
    // We construct the DTO object to match the backend expectation
    const payload: ResetPasswordDto = { password };
    return httpClient.post<{ message: string }>(
      `/admin/users/${id}/reset-password`, 
      payload
    );
  },

  toggleUserStatus: async (id: string, isActive: boolean) => {
    const payload: ToggleUserStatusDto = { isActive };
    return httpClient.patch<UserProfile>(
      `/admin/users/${id}/status`, 
      payload
    );
  }
};