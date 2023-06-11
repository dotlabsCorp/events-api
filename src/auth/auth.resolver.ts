import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInInput, SignUpInput } from './dto';
import { AuthResponse } from './types';
import { JwtAuthGuard } from './guards';
import { CurrentUser } from './decorators';
import { User } from '../users/entities';
import { ValidRoles } from './enums';

@Resolver(() => AuthResolver)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signUp' })
  signUp(@Args('signUp') signUpInput: SignUpInput): Promise<AuthResponse> {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => AuthResponse, { name: 'signIn' })
  signIn(@Args('signIn') signInInput: SignInInput): Promise<AuthResponse> {
    return this.authService.signIn(signInInput);
  }

  @Query(() => AuthResponse, { name: 'revalidate' })
  @UseGuards(JwtAuthGuard)
  revalidateToken(
    @CurrentUser([ValidRoles.USER]) user: User,
  ): Promise<AuthResponse> {
    return this.authService.revalidateToken(user.id);
  }
}
