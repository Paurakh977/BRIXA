import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, UpdateUserDto } from '@BRIXA/api';
import { SecurityService } from '../common/services/security.service';
import { UserCacheService } from '../common/services/user-cache.service';

@Injectable()
export class AdminService {
  constructor(
    private db: DatabaseService,
    private configService: ConfigService,
    private securityService: SecurityService,
    private userCache: UserCacheService,
  ) { }

  async getUsers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.db.client.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isVerified: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.db.client.user.count(),
    ]);

    return {
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getUserById(id: string) {
    const user = await this.db.client.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(data: CreateUserDto) {
    // Check if email already exists
    const existingUser = await this.db.client.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(
      data.password,
      this.configService.get<number>('BCRYPT_ROUNDS') || 10,
    );

    // Create user
    const user = await this.db.client.user.create({
      data: {
        email: data.email,
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role as any, // Cast to any to handle enum conversion
        isVerified: true, // Admin-created users are verified by default
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto, currentUserId?: string) {
    // Check if user exists
    const existingUser = await this.db.client.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Prevent admin from changing their own role or deactivating themselves
    if (currentUserId && id === currentUserId) {
      if (data.role && data.role !== existingUser.role) {
        throw new BadRequestException('You cannot change your own role');
      }
      if (data.isActive === false) {
        throw new BadRequestException('You cannot deactivate yourself');
      }
    }

    // Prevent removing the last admin
    if (data.role && existingUser.role === 'ADMIN' && data.role !== 'ADMIN') {
      const adminCount = await this.db.client.user.count({
        where: { role: 'ADMIN', isActive: true },
      });
      if (adminCount <= 1) {
        throw new BadRequestException('Cannot change role of the last active admin');
      }
    }

    // Check if email is being changed and if it already exists
    if (data.email && data.email !== existingUser.email) {
      const emailExists = await this.db.client.user.findUnique({
        where: { email: data.email },
      });
      if (emailExists) {
        throw new BadRequestException('Email already exists');
      }
    }

    // Update user
    const updateData: any = { ...data };
    if (data.role) {
      updateData.role = data.role as any;
    }

    const user = await this.db.client.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Invalidate cache for this user
    this.userCache.invalidate(id);

    return user;
  }

  async deleteUser(id: string) {
    // Check if user exists
    const user = await this.db.client.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Prevent deleting the last admin
    if (user.role === 'ADMIN') {
      const adminCount = await this.db.client.user.count({
        where: { role: 'ADMIN', isActive: true },
      });
      if (adminCount <= 1) {
        throw new BadRequestException('Cannot delete the last active admin user');
      }
    }

    // Delete user
    await this.db.client.user.delete({
      where: { id },
    });

    // Invalidate cache for this user
    this.userCache.invalidate(id);

    return { message: 'User deleted successfully' };
  }

  async resetUserPassword(id: string, newPassword: string) {
    const user = await this.db.client.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validate password strength
    const passwordValidation = this.securityService.validatePasswordStrength(newPassword);
    if (!passwordValidation.isStrong) {
      throw new BadRequestException(passwordValidation.errors.join(', '));
    }

    // Hash the new password
    const passwordHash = await bcrypt.hash(
      newPassword,
      this.configService.get<number>('BCRYPT_ROUNDS') || 10,
    );

    await this.db.client.user.update({
      where: { id },
      data: { passwordHash },
    });

    return {
      message: 'Password reset successfully',
    };
  }

  async toggleUserStatus(id: string, isActive: boolean) {
    const user = await this.db.client.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Prevent deactivating the last admin
    if (user.role === 'ADMIN' && !isActive) {
      const activeAdminCount = await this.db.client.user.count({
        where: { role: 'ADMIN', isActive: true },
      });
      if (activeAdminCount <= 1) {
        throw new BadRequestException('Cannot deactivate the last active admin user');
      }
    }

    const updatedUser = await this.db.client.user.update({
      where: { id },
      data: { isActive },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Invalidate cache for this user
    this.userCache.invalidate(id);

    return updatedUser;
  }

  async getDashboardStats() {
    const [
      totalUsers,
      activeUsers,
      inactiveUsers,
      usersByRole,
      recentUsers,
    ] = await Promise.all([
      this.db.client.user.count(),
      this.db.client.user.count({ where: { isActive: true } }),
      this.db.client.user.count({ where: { isActive: false } }),
      this.db.client.user.groupBy({
        by: ['role'],
        _count: true,
      }),
      this.db.client.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      usersByRole: usersByRole.map(item => ({
        role: item.role,
        count: item._count,
      })),
      recentUsers,
    };
  }
}