import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configurations from '../configurations';
import { UsersModule } from '../modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configurations] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
