import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Tags } from '../../common/constants/apiTags';
import { JwtAuthGuard } from '../../guards/jwt_guard';
import { CreateUserDTO } from '../users/dto';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags(Tags.api)
  @ApiResponse({ status: 201, type: CreateUserDTO })
  @Post('register')
  register(@Body() data: CreateUserDTO) {
    return this.authService.register(data);
  }

  @ApiTags(Tags.api)
  @ApiResponse({ status: 200 })
  @Post('login')
  async login(
    @Body() data: UserLoginDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    // return this.authService.login(data);
    const result = await this.authService.login(data);

    // Установка HttpOnly куки
    response.cookie('token', result.token, {
      httpOnly: true,
      secure: false, // Включить secure для продакшн-среды
      sameSite: 'strict', // Защита от CSRF
    });

    // Возврат данных пользователя без токена, так как токен теперь в куки
    const { token, ...user } = result;
    return user;
  }

  @ApiTags(Tags.api)
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async profile() {
    return true;
  }

  @ApiTags(Tags.api)
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token', {
      httpOnly: true,
      secure: false, // Включить secure для продакшн-среды
      sameSite: 'strict', // Защита от CSRF
    });

    return { message: 'Logged out successfully' };
  }
}
