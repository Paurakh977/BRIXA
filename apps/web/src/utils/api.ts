export class ApiError extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleApiError = (error: any): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

export const isTokenExpired = (error: any): boolean => {
  return error?.statusCode === 401 || error?.response?.status === 401;
};

export const refreshTokenIfNeeded = async (error: any): Promise<boolean> => {
  if (isTokenExpired(error)) {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        const { access_token } = await response.json();
        // Token was successfully refreshed
        return true;
      }
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);
    }
  }
  return false;
};