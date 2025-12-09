
import { 
  UserProfile, 
  LoginDto, 
  RegisterDto
} from '@BRIXA/api'; 

export interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}


export interface AuthContextType extends AuthState {
  // We use the DTOs from the API as types for the function arguments
  login: (credentials: LoginDto) => Promise<void>;
  register: (credentials: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<string>;
  clearError: () => void;
}