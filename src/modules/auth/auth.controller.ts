import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../users/dto';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: CreateUserDTO) {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: UserLoginDTO) {
    return this.authService.login(data);
  }
}
