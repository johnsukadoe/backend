import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Tags } from '../../common/constants/apiTags';
import { JwtAuthGuard } from '../../guards/jwt_guard';
import { CreatorService } from './creator.service';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';

@Controller('creator')
export class CreatorController {
  constructor(private readonly creatorService: CreatorService) {}

  @ApiTags(Tags.crud_creators)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCreatorDto: CreateCreatorDto) {
    return this.creatorService.create(createCreatorDto);
  }

  @ApiTags(Tags.crud_creators)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.creatorService.getCreators();
  }

  @ApiTags(Tags.crud_creators)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creatorService.getCreator(+id);
  }

  @ApiTags(Tags.crud_creators)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCreatorDto: UpdateCreatorDto) {
    return this.creatorService.update(+id, updateCreatorDto);
  }

  @ApiTags(Tags.crud_creators)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.creatorService.remove(id);
  }
}
