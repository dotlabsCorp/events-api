import { ArgsType, Field } from '@nestjs/graphql';
import { IsDateString, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class EventArgs {
  @Field(() => String!, {
    description: 'The name of the speaker of the events to find.',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => String!, {
    description: 'The title of the events to find.',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @Field(() => String!, {
    description:
      'The date of the events to find. Returns all events after or equal to date.',
    nullable: true,
  })
  @IsDateString()
  @IsOptional()
  date?: Date;
}
