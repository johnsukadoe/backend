import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class PostService {
  constructor(
    private readonly uploadService: UploadService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(data) {
    const { files, title, content, creatorId, isPublic, tierId } = data;
    console.log(data);
    try {
      const uploadedFiles = files.length
        ? await this.uploadService.upload(files)
        : [];

      console.log(title, content, creatorId, isPublic);
      const newPost = await this.prismaService.post.create({
        data: {
          title,
          content,
          isPublic,
          // Подключаем Tier только если tierId передан
          ...(tierId && {
            tier: {
              connect: { id: tierId },
            },
          }),
          creator: {
            connect: { id: creatorId },
          },
          files: {
            create: uploadedFiles.map((file) => ({
              url: file.url,
              name: file.name,
              type: file.type,
              size: file.size,
              creator: {
                connect: { id: creatorId },
              },
            })),
          },
        },
      });
      // for (const file of uploadedFiles) {
      //   await this.prismaService.file.create({
      //     data: {
      //       ...file,
      //       creatorId, // Сохраняем ID создателя
      //       postId: newPost.id, // Связываем с созданным постом
      //     },
      //   });
      // }
      return newPost;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e);
    }
  }

  async findAll() {
    try {
      const allPosts = await this.prismaService.post.findMany({
        include: {
          files: true, // Включаем связанные файлы
        },
      });
      return allPosts;
    } catch (e) {
      throw new Error(e);
    }
  }
}
