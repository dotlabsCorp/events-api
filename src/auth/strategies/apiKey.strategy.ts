import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private authService: AuthService) {
    super(
      {
        header: 'api-key',
        prefix: 'dotlabs-',
      },
      true,
      async (apiKey: any, done: any) => {
        const checkKey = this.authService.validateApiKey(apiKey);

        if (!checkKey) {
          return done(new UnauthorizedException(), null);
        } else {
          return done(null, true);
        }
      },
    );
  }
}
