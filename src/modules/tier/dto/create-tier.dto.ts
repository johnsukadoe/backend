import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateTierDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsArray()
  benefits: string[];

  @IsNumber()
  creatorId: number;
}
