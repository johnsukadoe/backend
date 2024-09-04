import { Injectable, NotFoundException } from '@nestjs/common';
import { AppErrors } from '../../common/constants/errors';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';

@Injectable()
export class CreatorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCreatorDto: CreateCreatorDto) {
    const { userId, bio, avatar_url, social_links } = createCreatorDto;
    const creator = await this.prismaService.creator.create({
      data: {
        userId,
        bio,
        avatar_url,
        social_links,
      },
    });
    return creator;
  }

  async getCreators() {
    return await this.prismaService.creator.findMany();
  }

  async getCreator(id: number) {
    const creator = await this.prismaService.creator.findUnique({
      where: { id },
    });

    if (!creator) {
      throw new NotFoundException(AppErrors.USER_NOT_EXIST);
    }

    return creator;
  }

  async update(id: number, updateCreatorDto: UpdateCreatorDto) {
    const creator = await this.prismaService.creator.update({
      where: { id },
      data: updateCreatorDto,
    });
    return creator;
  }

  async remove(id: number) {
    await this.prismaService.creator.delete({
      where: { id },
    });
    return true;
  }
}
