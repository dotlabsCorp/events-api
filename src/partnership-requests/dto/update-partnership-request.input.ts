import { CreatePartnershipRequestInput } from './create-partnership-request.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePartnershipRequestInput extends PartialType(CreatePartnershipRequestInput) {
  @Field(() => Int)
  id: number;
}
