import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CreateConsultancyInput } from './create-consultancy.input';

@InputType()
export class UpdateConsultancyInput extends PartialType(
  CreateConsultancyInput,
) {
  @Field(() => String)
  @IsUUID()
  id: string;
}
