

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

export interface UserProfile {
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
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface UserListResponse {
  users: UserProfile[];
  total: number;
  page: number;
  totalPages: number;
}