import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppErrors } from '../../common/constants/errors';
import { TokenService } from '../token/token.service';
import { CreateUserDTO } from '../users/dto';
import { UsersService } from '../users/users.service';
import { UserLoginDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async register(data: CreateUserDTO) {
    return await this.userService.createUser(data);
  }

  async login(data: UserLoginDTO) {
    const existUser = await this.userService.findUserByEmail(data.email);
    if (!existUser) throw new BadRequestException(AppErrors.USER_NOT_EXIST);

    const validatePassword = await bcrypt.compare(
      data.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppErrors.WRONG_DATA);

    const user = await this.userService.publicUsers(existUser.email);

    const token = await this.tokenService.generateJwtToken(user);
    return { ...user, token };
  }
}
