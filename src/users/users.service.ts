import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  getUsers() {
    return this.prismaService.user.findMany();
  }

  getUser(id) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: CreateUserDTO) {
    data.password = await this.hashPassword(data.password);
    const newUser = this.prismaService.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
    return newUser;
  }

  removeUser(id) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }

  updateUser(id, data) {
    return this.prismaService.user.update({
      where: { id },
      data: data,
    });
  }
}
