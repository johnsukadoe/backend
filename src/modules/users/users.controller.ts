import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tags } from '../../common/constants/apiTags';
import { JwtAuthGuard } from '../../guards/jwt_guard';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags(Tags.crud_users)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @ApiTags(Tags.crud_users)
  @ApiResponse({ status: 200, type: UpdateUserDTO })
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUser(@Body() data: UpdateUserDTO, @Req() request) {
    const id = request.user.id;
    return this.usersService.updateUser(id, data);
  }

  @ApiTags(Tags.crud_users)
  @Get('/:id')
  getUser(@Param('id') id: number) {
    return this.usersService.getUser(id);
  }

  // @Post()
  // createUser(@Body() data: CreateUserDTO) {
  //   return this.usersService.createUser(data);
  // }

  @ApiTags(Tags.crud_users)
  @UseGuards(JwtAuthGuard)
  @Delete()
  removeUser(@Req() request) {
    return this.usersService.removeUser(request.user.id);
  }
}
