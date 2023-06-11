import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from './../users/users.service';
import { SignUpInput, SignInInput } from './dto';
import { AuthResponse } from './types';
import { ErrorCodes } from '../types/error.type';
import { User } from 'src/users/entities';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private ipCache = {}; // @todo implement a rate limit

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private apiKey = this.configService.get('WEB_API_KEY');

  async signUp(signUpInput: SignUpInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signUpInput);
    const token = this.getJwt(user.id);

    return {
      user,
      token,
    };
  }

  async signIn(signInInput: SignInInput): Promise<AuthResponse> {
    const user = await this.usersService.findOneByEmail(signInInput.email);
    this.validatePassword(signInInput.password, user.password);

    const token = this.getJwt(user.id);

    return {
      user,
      token,
    };
  }

  async revalidateToken(id: string): Promise<AuthResponse> {
    const user = await this.usersService.findOneById(id);
    delete user.password;

    if (user.isBlocked) throw new UnauthorizedException();

    const token = this.getJwt(user.id);

    return {
      token,
      user,
    };
  }

  private getJwt(id: string): string {
    return this.jwtService.sign({ id });
  }

  private validatePassword(
    incomingPassword: string,
    savedPassword: string,
  ): void {
    const passwordMatches = bcrypt.compareSync(incomingPassword, savedPassword);

    if (!passwordMatches) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, 403);
    }
  }

  validateApiKey(apiKey: string) {
    return apiKey === this.apiKey;
  }
}
