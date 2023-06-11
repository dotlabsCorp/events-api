import {
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ErrorCodes } from '../../types/error.type';
import { ValidRoles } from '../enums';
import { User } from 'src/users/entities';

export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;

    if (!user)
      throw new InternalServerErrorException(
        ErrorCodes.USER_NOT_IN_THE_REQUEST,
      );

    if (roles.length === 0) {
      return user;
    } else {
      for (const role of user.roles) {
        if (roles.includes(role as ValidRoles)) return user;
      }

      throw new ForbiddenException();
    }
  },
);
