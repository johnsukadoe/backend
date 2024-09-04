import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateCreatorDto {
  @IsNumber()
  readonly userId: number;

  @IsOptional()
  @IsString()
  readonly bio?: string;

  @IsOptional()
  @IsUrl()
  readonly avatar_url?: string;

  @IsOptional()
  @IsArray()
  readonly social_links?: string[];
}
