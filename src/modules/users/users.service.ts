import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { defaultSelect } from '../../common/constants';
import { AppErrors } from '../../common/constants/errors';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const existUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    return existUser;
  }

  async getUsers() {
    const users = await this.prismaService.user.findMany({
      select: {
        ...defaultSelect,
      },
    });
    return users;
  }

  async getUser(id) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        ...defaultSelect,
      },
    });

    if (!user) {
      throw new NotFoundException(AppErrors.USER_NOT_EXIST);
    }

    return user;
  }

  async createUser(data: CreateUserDTO) {
    data.password = await this.hashPassword(data.password);
    try {
      const newUser = await this.prismaService.user.create({
        data: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        select: {
          ...defaultSelect,
        },
      });
      return newUser;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        const targetField = e.meta.target[0];

        if (targetField === 'username') {
          throw new BadRequestException(AppErrors.USER_USERNAME_EXIST);
        } else if (targetField === 'email') {
          throw new BadRequestException(AppErrors.USER_EMAIL_EXIST);
        }
      }
    }
  }

  async removeUser(id) {
    await this.prismaService.user.delete({
      where: { id },
    });
    return true;
  }

  async updateUser(id, data) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: data,
      select: {
        ...defaultSelect,
      },
    });
    return user;
  }

  async publicUsers(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        ...defaultSelect,
      },
    });

    return user;
  }
}
