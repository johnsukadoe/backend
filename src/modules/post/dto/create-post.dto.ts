import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsNumber()
  readonly creatorId: number;

  @IsBoolean()
  readonly isPublic: boolean;

  @IsOptional()
  @IsNumber()
  readonly tierId?: number;

  @IsOptional()
  @IsArray()
  readonly files?: any;
}
