// User types based on the Prisma schema
export enum UserRole {
  ADMIN = 'ADMIN',
  GOVT_OFFICIAL = 'GOVT_OFFICIAL',
  CONTRACTOR = 'CONTRACTOR',
  ARCHITECT = 'ARCHITECT',
  ENGINEER = 'ENGINEER',
  AUDITOR = 'AUDITOR',
  WORKER = 'WORKER',
  MANPOWER_AGENCY = 'MANPOWER_AGENCY',
  SUPPLIER = 'SUPPLIER',
  MACHINERY_OWNER = 'MACHINERY_OWNER',
  CLIENT = 'CLIENT',
}

export enum KYCStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface User {
  id: string;
  email: string;
  phoneNumber?: string | null;
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  bio?: string | null;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  access_token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<string>;
  clearError: () => void;
}