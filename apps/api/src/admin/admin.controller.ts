import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from '../common/decorators/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '@BRIXA/database';
import { CreateUserDto, UpdateUserDto, ToggleUserStatusDto } from './dto/admin.dto';

@Controller('admin')
@Roles('ADMIN')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('dashboard')
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('users')
  async getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.adminService.getUsers(page, limit);
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string) {
    return this.adminService.getUserById(id);
  }

  @Post('users')
  async createUser(
    @Body() data: CreateUserDto,
    @GetUser() currentUser: User,
  ) {
    // Log the admin who created the user
    console.log(`Admin ${currentUser.email} created user ${data.email}`);
    return this.adminService.createUser(data);
  }

  @Patch('users/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
    @GetUser() currentUser: User,
  ) {
    // Log the admin who updated the user
    console.log(`Admin ${currentUser.email} updated user ${id}`);
    return this.adminService.updateUser(id, data);
  }

  @Delete('users/:id')
  async deleteUser(
    @Param('id') id: string,
    @GetUser() currentUser: User,
  ) {
    // Log the admin who deleted the user
    console.log(`Admin ${currentUser.email} deleted user ${id}`);
    return this.adminService.deleteUser(id);
  }

  @Post('users/:id/reset-password')
  async resetUserPassword(
    @Param('id') id: string,
    @GetUser() currentUser: User,
  ) {
    // Log the admin who reset the password
    console.log(`Admin ${currentUser.email} reset password for user ${id}`);
    return this.adminService.resetUserPassword(id);
  }

  @Patch('users/:id/status')
  async toggleUserStatus(
    @Param('id') id: string,
    @Body() data: ToggleUserStatusDto,
    @GetUser() currentUser: User,
  ) {
    // Log the admin who changed the user status
    console.log(`Admin ${currentUser.email} ${data.isActive ? 'activated' : 'deactivated'} user ${id}`);
    return this.adminService.toggleUserStatus(id, data.isActive);
  }
}