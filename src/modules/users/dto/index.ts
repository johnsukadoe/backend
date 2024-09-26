import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters.' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      'Username can only contain letters, numbers, underscores, and hyphens.',
  })
  username: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty.' })
  @Length(8, undefined, {
    message: 'Password must be at least 8 characters long.',
  })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
    message:
      'Password must contain uppercase, lowercase, number, and special character.',
  })
  password: string;
}
