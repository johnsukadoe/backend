import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
    });
  }

  async upload(files: Express.Multer.File[]) {
    const uploadedFiles = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.originalname}`; // Уникальное имя файла
      const uploadParams = {
        Bucket: 'ledokol-uploader',
        Key: fileName,
        Body: file.buffer,
      };

      try {
        await this.s3Client.send(new PutObjectCommand(uploadParams));
        const fileUrl = `https://${uploadParams.Bucket}.s3.${this.configService.getOrThrow('AWS_S3_REGION')}.amazonaws.com/${fileName}`;

        const fileData = {
          url: fileUrl,
          name: file.originalname,
          type: file.mimetype,
          size: file.size,
          creatorId: null, // Установите это значение позже при создании поста
          postId: null, // Это будет установлено позже, когда мы создадим пост
        };

        uploadedFiles.push(fileData);
      } catch (error) {
        console.error(`Error uploading file ${file.originalname}:`, error);
        throw new Error(`Could not upload file ${file.originalname}`); // Можно выбросить ошибку или обработать иначе
      }
    }

    return uploadedFiles; // Возвращаем массив URL загруженных файлов
  }
}
