import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Tags } from '../../common/constants/apiTags';
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
  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() data: UpdateUserDTO) {
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
  @Delete('/:id')
  removeUser(@Param('id') id: number) {
    return this.usersService.removeUser(id);
  }
}
