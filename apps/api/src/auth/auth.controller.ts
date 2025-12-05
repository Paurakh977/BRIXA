import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '@BRIXA/api';
import { Response, Request } from 'express';
import { Public } from '../common/decorators/public.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '@BRIXA/database';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  signup(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  signin(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    // passthrough: true allows to modify response (cookies) but return JSON normally
    return this.authService.login(dto, res);
  }

  @Public()
  @Post('refresh')
  refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refresh(req, res);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  // For Protected Route
  @Get('me')
  getProfile(@GetUser() user: User) {
    return user;
  }
}