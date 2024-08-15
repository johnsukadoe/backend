import { Injectable } from '@nestjs/common';
import { users } from '../mocks/index';

@Injectable()
export class UsersService {
  getUsers() {
    return users;
  }
}
