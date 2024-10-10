import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TierController } from './tier.controller';
import { TierService } from './tier.service';

@Module({
  controllers: [TierController],
  providers: [TierService, PrismaService],
})
export class TierModule {}
