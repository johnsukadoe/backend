import { Injectable, NotFoundException } from '@nestjs/common';
import { AppErrors } from '../../common/constants/errors';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';

@Injectable()
export class CreatorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCreatorDto: CreateCreatorDto) {
    try {
      const { userId, bio, social_links } = createCreatorDto;
      const creator = await this.prismaService.creator.create({
        data: {
          userId,
          bio,
          social_links,
        },
      });
      return creator;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getCreators() {
    try {
      return await this.prismaService.creator.findMany();
    } catch (e) {
      throw new Error(e);
    }
  }

  async getCreator(id: number) {
    try {
      const creator = await this.prismaService.creator.findUnique({
        where: { id },
      });

      if (!creator) {
        throw new NotFoundException(AppErrors.USER_NOT_EXIST);
      }

      return creator;
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: number, updateCreatorDto: UpdateCreatorDto) {
    try {
      const creator = await this.prismaService.creator.update({
        where: { id },
        data: updateCreatorDto,
      });
      return creator;
    } catch (e) {
      throw new Error(e);
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.creator.delete({
        where: { id },
      });
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}
