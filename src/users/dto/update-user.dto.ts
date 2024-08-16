import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './index';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
