import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray, IsOptional } from 'class-validator';

import { ValidRoles } from './../../../auth/enums/valid-roles.enum';

@ArgsType()
export class ValidRolesArgs {
  @Field(() => [ValidRoles], { nullable: true })
  @IsArray()
  @IsOptional()
  roles: ValidRoles[] = [];
}
