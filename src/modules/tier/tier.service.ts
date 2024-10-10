import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTierDto } from './dto/create-tier.dto';
import { UpdateTierDto } from './dto/update-tier.dto';

@Injectable()
export class TierService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTierDto: CreateTierDto) {
    try {
      const tier = await this.prismaService.tier.create({
        data: createTierDto,
      });
      return tier;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAll(id) {
    try {
      const tiers = await this.prismaService.tier.findMany({
        where: { creatorId: id },
      });

      return tiers;
    } catch (e) {
      throw new Error(e);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} tier`;
  }

  update(id: number, updateTierDto: UpdateTierDto) {
    return `This action updates a #${id} tier`;
  }

  remove(id: number) {
    return `This action removes a #${id} tier`;
  }
}
