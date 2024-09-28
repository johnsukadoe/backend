import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CustomFileValidator } from '../../common/CustomFilaValidator';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  @UsePipes(new CustomFileValidator())
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    await this.uploadService.upload(files);
  }
}
