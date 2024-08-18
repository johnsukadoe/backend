import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
