import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDTO } from './index';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @ApiPropertyOptional()
  username?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  password?: string;
}
