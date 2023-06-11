import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateTalkRequestInput {
  @Field(() => String)
  @IsString()
  @MinLength(5)
  title: string;

  @Field(() => String)
  @IsString()
  @MinLength(10)
  description: string;

  @Field(() => String)
  @IsString()
  @MinLength(10)
  about: string;
}
