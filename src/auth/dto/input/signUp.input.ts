import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsHexadecimal,
} from 'class-validator';

@InputType()
export class SignUpInput {
  @Field(() => String)
  @IsHexadecimal()
  walletAddress: `0x${string}`;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Field(() => String)
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
