import { InputType, Field, PartialType } from '@nestjs/graphql';

import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { ValidRoles } from 'src/auth/enums';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  @IsUUID()
  id: string;

  @Field(() => [ValidRoles], { nullable: true })
  @IsArray()
  @IsOptional()
  roles?: ValidRoles[];

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  isBlocked?: boolean;
}
