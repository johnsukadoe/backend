import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tags } from '../../common/constants/apiTags';
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
  login(@Body() data: UserLoginDTO) {
    return this.authService.login(data);
  }
}
