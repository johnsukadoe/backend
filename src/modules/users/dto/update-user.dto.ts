import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateUserDTO } from './index';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CREATOR = 'CREATOR',
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @ApiPropertyOptional({
    description: 'Username of the user',
    example: 'john_doe',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ enum: UserRole })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
