import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsMobilePhone, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateConsultancyInput {
  @Field(() => String, { nullable: false })
  @IsString()
  @MinLength(10)
  fullName: string;

  @Field(() => String, { nullable: false })
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: false })
  @IsMobilePhone()
  phoneNumber: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @MinLength(20)
  description: string;
}
