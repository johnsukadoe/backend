import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from './dto';
import type { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() data: UpdateUserDTO) {
    return this.usersService.updateUser(id, data);
  }

  @Get('/:id')
  getUser(@Param('id') id: number) {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() data: CreateUserDTO) {
    return this.usersService.createUser(data);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: number) {
    return this.usersService.removeUser(id);
  }
}
