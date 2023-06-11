import { CreateTalkRequestInput } from './create-talk-request.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTalkRequestInput extends PartialType(
  CreateTalkRequestInput,
) {
  @Field(() => String)
  id: string;
}
