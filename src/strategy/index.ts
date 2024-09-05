import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJwtFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('secret_jwt'),
    });
  }

  private static extractJwtFromCookie(req: Request): string | null {
    console.log(req.cookies);
    return req.cookies['token'] || null;
  }

  async validate(payload: any) {
    return { ...payload.user };
  }
}
