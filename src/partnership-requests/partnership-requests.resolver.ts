import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { PartnershipRequestsService } from './partnership-requests.service';
import { CreatePartnershipRequestInput } from './dto/create-partnership-request.input';
import { UpdatePartnershipRequestInput } from './dto/update-partnership-request.input';
import { PartnershipRequest } from './entities';

@Resolver(() => PartnershipRequest)
export class PartnershipRequestsResolver {
  constructor(
    private readonly partnershipRequestsService: PartnershipRequestsService,
  ) {}

  @Mutation(() => PartnershipRequest)
  createPartnershipRequest(
    @Args('createPartnershipRequestInput')
    createPartnershipRequestInput: CreatePartnershipRequestInput,
  ) {
    return this.partnershipRequestsService.create(
      createPartnershipRequestInput,
    );
  }

  @Query(() => [PartnershipRequest], { name: 'partnershipRequests' })
  findAll() {
    return this.partnershipRequestsService.findAll();
  }

  @Query(() => PartnershipRequest, { name: 'partnershipRequest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.partnershipRequestsService.findOne(id);
  }

  @Mutation(() => PartnershipRequest)
  updatePartnershipRequest(
    @Args('updatePartnershipRequestInput')
    updatePartnershipRequestInput: UpdatePartnershipRequestInput,
  ) {
    return this.partnershipRequestsService.update(
      updatePartnershipRequestInput.id,
      updatePartnershipRequestInput,
    );
  }

  @Mutation(() => PartnershipRequest)
  removePartnershipRequest(@Args('id', { type: () => Int }) id: number) {
    return this.partnershipRequestsService.remove(id);
  }
}
