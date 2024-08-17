import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AppErrors } from '../../common/errors';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async getUsers() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async getUser(id) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async createUser(data: CreateUserDTO) {
    data.password = await this.hashPassword(data.password);
    try {
      await this.prismaService.user.create({
        data: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      });
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
    const deletedUser = await this.prismaService.user.delete({
      where: { id },
    });
    return deletedUser;
  }

  updateUser(id, data) {
    return this.prismaService.user.update({
      where: { id },
      data: data,
    });
  }
}
