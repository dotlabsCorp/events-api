import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePartnershipRequestInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
