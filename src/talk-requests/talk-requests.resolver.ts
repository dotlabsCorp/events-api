import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TalkRequestsService } from './talk-requests.service';
import { TalkRequest } from './entities/talk-request.entity';
import { CreateTalkRequestInput } from './dto/create-talk-request.input';
import { UpdateTalkRequestInput } from './dto/update-talk-request.input';

@Resolver(() => TalkRequest)
export class TalkRequestsResolver {
  constructor(private readonly talkRequestsService: TalkRequestsService) {}

  @Mutation(() => Boolean)
  createTalkRequest(
    @Args('createTalkRequestInput')
    createTalkRequestInput: CreateTalkRequestInput,
  ): Promise<Boolean> {
    return this.talkRequestsService.create(createTalkRequestInput);
  }

  @Query(() => [TalkRequest], { name: 'talkRequests' })
  findAll() {
    return this.talkRequestsService.findAll();
  }

  @Query(() => TalkRequest, { name: 'talkRequest' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.talkRequestsService.findOne(id);
  }

  @Mutation(() => TalkRequest)
  updateTalkRequest(
    @Args('updateTalkRequestInput')
    updateTalkRequestInput: UpdateTalkRequestInput,
  ) {
    return this.talkRequestsService.update(
      updateTalkRequestInput.id,
      updateTalkRequestInput,
    );
  }

  @Mutation(() => TalkRequest)
  removeTalkRequest(@Args('id', { type: () => Int }) id: string) {
    return this.talkRequestsService.remove(id);
  }
}
