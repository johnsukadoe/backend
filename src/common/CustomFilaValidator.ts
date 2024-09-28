import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CustomFileValidator implements PipeTransform {
  private readonly MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 МБ
  private readonly ALLOWED_MIME_TYPES = ['image/', 'video/', 'audio/']; // Допустимые типы файлов

  transform(files: Express.Multer.File[], metadata: ArgumentMetadata) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const imageFiles = files.filter((file) =>
      file.mimetype.startsWith('image/'),
    );
    const videoFiles = files.filter((file) =>
      file.mimetype.startsWith('video/'),
    );
    const audioFiles = files.filter((file) =>
      file.mimetype.startsWith('audio/'),
    );

    // Проверка размера каждого файла
    for (const file of files) {
      if (file.size > this.MAX_FILE_SIZE) {
        throw new BadRequestException(
          `File ${file.originalname} exceeds the maximum size of 50MB`,
        );
      }
    }

    // Проверка на неподходящие типы файлов
    const invalidFiles = files.filter((file) => {
      return !this.ALLOWED_MIME_TYPES.some((type) =>
        file.mimetype.startsWith(type),
      );
    });

    if (invalidFiles.length > 0) {
      throw new BadRequestException(
        `Invalid file types: ${invalidFiles.map((file) => file.originalname).join(', ')}`,
      );
    }

    // Проверка для изображений
    if (imageFiles.length > 5) {
      throw new BadRequestException(
        'You can upload a maximum of 5 image files',
      );
    }

    // Проверка для других типов файлов
    if (videoFiles.length + audioFiles.length + imageFiles.length > 6) {
      throw new BadRequestException(
        'You can upload a maximum of 6 files total (5 images and 1 of other types)',
      );
    }

    return files; // Возвращаем файлы, если все проверки пройдены
  }
}
