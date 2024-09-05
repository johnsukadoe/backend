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

  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10);
    } catch (e) {
      throw new Error(e);
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const existUser = await this.prismaService.user.findUnique({
        where: { email },
      });
      return existUser;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getUsers() {
    try {
      const users = await this.prismaService.user.findMany({
        select: {
          ...defaultSelect,
        },
      });
      return users;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getUser(id) {
    try {
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
    } catch (e) {
      throw new Error(e);
    }
  }

  async createUser(data: CreateUserDTO) {
    try {
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
    } catch (e) {
      throw new Error(e);
    }
  }

  async removeUser(id): Promise<boolean> {
    try {
      await this.prismaService.user.delete({
        where: { id },
      });
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateUser(id, data) {
    try {
      const user = await this.prismaService.user.update({
        where: { id },
        data: data,
        select: {
          ...defaultSelect,
        },
      });
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async publicUsers(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
        select: {
          ...defaultSelect,
          creator: true,
        },
      });

      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
}
