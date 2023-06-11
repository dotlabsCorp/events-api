import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsHexadecimal, IsString, MinLength } from 'class-validator';

const options = { nullable: false };

@InputType()
export class CreateUserInput {
  @Field(() => String, options)
  @IsString()
  fullName: string;

  @Field(() => String, options)
  @IsEmail()
  email: string;

  @Field(() => String, options)
  @IsString()
  @MinLength(8)
  password: string;

  @Field(() => String, options)
  @IsHexadecimal()
  @MinLength(42)
  walletAddress: `0x${string}`;
}
