import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Event } from './entity/event.entity';
import { EventService } from './event.service';
import { CreateEventInput, UpdateEventInput } from './dto/inputs';

@Resolver()
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Mutation(() => Boolean!, {
    name: 'createEvent',
    description:
      'Create one event. Returns true if successful. Otherwise, returns false.',
  })
  create(@Args('createEvent') createEventInput: CreateEventInput) {
    return this.eventService.create(createEventInput);
  }

  @Query(() => Event, {
    name: 'findOneEvent',
    description: 'Get one event',
  })
  findOne(
    @Args('id', { type: () => String!, name: 'id' })
    id: string,
  ) {
    return this.eventService.findOne(id);
  }

  @Query(() => [Event], {
    name: 'findAllEvents',
    description: 'Get all events',
  })
  findAll(): Event[] {
    return this.eventService.findAll();
  }

  @Mutation(() => Boolean!, {
    name: 'updateEvent',
    description:
      'Update one event. Returns true if successful. Otherwise, returns false.',
  })
  update(
    @Args('id', { type: () => String!, name: 'id' })
    id: string,
    @Args('updateEvent')
    createEventInput: UpdateEventInput,
  ) {
    return this.eventService.update(id, createEventInput);
  }

  @Mutation(() => Boolean!, {
    name: 'deleteEvent',
    description:
      'Delete one event. Returns true if successful. Otherwise, returns false.',
  })
  delete(@Args('id', { type: () => String!, name: 'id' }) id: string) {
    return this.eventService.delete(id);
  }
}
