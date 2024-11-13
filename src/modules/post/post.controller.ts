import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../guards/jwt_guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @UsePipes(new CustomFileValidator())
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(AnyFilesInterceptor()) // Для обработки нескольких файлов
  createPost(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any,
  ) {
    const createPostDto: CreatePostDto = JSON.parse(body.post);

    console.log('Received DTO:', createPostDto);
    console.log('Received files:', files);
    return this.postService.create({
      ...createPostDto, // Данные из формы
      files, // Добавляем файлы
    });
  }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // findCreatorPost(@Query('creatorId') creatorId: number) {
  //   return this.postService.findCreatorPost(creatorId);
  // }

  @UseGuards()
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.postService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTierDto: UpdateTierDto) {
  //   return this.postService.update(+id, updateTierDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postService.remove(+id);
  // }
}
