import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AppErrors } from '../../common/constants/errors';
import { CreateUserDTO } from '../users/dto';
import { UsersService } from '../users/users.service';
import { UserLoginDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async register(data: CreateUserDTO) {
    return await this.userService.createUser(data);
  }

  async login(data: UserLoginDTO): Promise<User | null> {
    const existUser = await this.userService.findUserByEmail(data.email);
    if (!existUser) throw new BadRequestException(AppErrors.USER_NOT_EXIST);

    const validatePassword = await bcrypt.compare(
      data.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppErrors.WRONG_DATA);

    return existUser;
  }
}
