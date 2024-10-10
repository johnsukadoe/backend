import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt_guard';
import { CreateTierDto } from './dto/create-tier.dto';
import { UpdateTierDto } from './dto/update-tier.dto';
import { TierService } from './tier.service';

@Controller('tier')
export class TierController {
  constructor(private readonly tierService: TierService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTierDto: CreateTierDto) {
    return this.tierService.create(createTierDto);
  }

  @Get()
  findAll(@Query('creatorId') creatorId: number) {
    return this.tierService.findAll(creatorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tierService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTierDto: UpdateTierDto) {
    return this.tierService.update(+id, updateTierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tierService.remove(+id);
  }
}
