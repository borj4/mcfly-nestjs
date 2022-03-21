import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      secretOrKey: 'supersecret', 
    });
  }

  async validate(payload: any): Promise<any> { 
    if (!payload) {
      throw new HttpException('Token incorrecto', HttpStatus.UNAUTHORIZED);
    }
    return payload;
  }
}