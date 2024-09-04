import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configurations from '../configurations';
import { AuthModule } from '../modules/auth/auth.module';
import { CreatorModule } from '../modules/creator/creator.module';
import { TokenModule } from '../modules/token/token.module';
import { UsersModule } from '../modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configurations] }),
    AuthModule,
    TokenModule,
    CreatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
