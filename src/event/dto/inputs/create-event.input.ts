import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
class Link {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsUrl()
  @IsOptional()
  url?: string;
}

@InputType()
export class SpeakerInput extends Link {
  @Field(() => String!)
  @IsString()
  @IsNotEmpty()
  name: string;
}

@InputType()
export class DateInput extends Link {
  @Field(() => String!)
  @IsDateString()
  datetime: string;
}

@InputType()
export class LocationInput extends Link {
  @Field(() => String!)
  @IsString()
  @IsNotEmpty()
  name: string;
}

@InputType()
export class CreateEventInput {
  @Field(() => String!)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => [SpeakerInput!]!)
  @IsArray()
  @Type(() => SpeakerInput)
  @ValidateNested()
  speakers: SpeakerInput[];

  @Field(() => String!)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field(() => DateInput!)
  @Type(() => DateInput)
  @ValidateNested()
  date: DateInput;

  @Field(() => [String!]!)
  @IsNotEmpty()
  tags: string[];

  @Field(() => LocationInput!)
  @Type(() => LocationInput)
  @ValidateNested()
  location: LocationInput;
}