import { IsEmail, IsNotEmpty, IsString, IsOptional, IsBoolean, IsEnum, MinLength } from 'class-validator';

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
  CLIENT = 'CLIENT'
}

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class ToggleUserStatusDto {
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}