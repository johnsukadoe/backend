import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatorController } from './creator.controller';
import { CreatorService } from './creator.service';

@Module({
  controllers: [CreatorController],
  providers: [CreatorService, PrismaService],
})
export class CreatorModule {}
