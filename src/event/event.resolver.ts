import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateEventInput, UpdateEventInput, EventArgs } from './dto';
import { Event } from './entity/event.entity';
import { EventService } from './event.service';
import { AggregationType } from './types';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';

@Resolver()
@UseGuards(JwtAuthGuard)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  // Create -----------------------------------------------------
  @Mutation(() => Event, {
    nullable: false,
    name: 'createEvent',
    description:
      'Create one event. Returns true if successful. Otherwise, returns false.',
  })
  create(
    @Args('createEvent') createEventInput: CreateEventInput,
  ): Promise<Event> {
    return this.eventService.create(createEventInput);
  }
  // -----------------------------------------------------------

  // FindOne ---------------------------------------------------
  @Query(() => Event, {
    name: 'findOneEvent',
    description: 'Get one event',
  })
  findOne(
    @Args('id', { type: () => ID, nullable: false }, ParseUUIDPipe)
    id: string,
  ) {
    return this.eventService.findOne(id);
  }
  // -----------------------------------------------------------

  // FindAll --------------------------------------------------
  @Query(() => [Event], {
    name: 'findAllEvents',
    description: 'Get all events',
  })
  findAll(
    @Args()
    args: EventArgs,
  ): Promise<Event[]> {
    return this.eventService.findAll(args);
  }
  // -----------------------------------------------------------

  // Update ----------------------------------------------------
  @Mutation(() => Event, {
    name: 'updateEvent',
    description:
      'Update one event. Returns true if successful. Otherwise, returns false.',
  })
  update(
    @Args('id', { type: () => ID, nullable: false }, ParseUUIDPipe)
    id: string,
    @Args('updateEvent', { type: () => UpdateEventInput, nullable: false })
    createEventInput: UpdateEventInput,
  ): Promise<Event> {
    return this.eventService.update(id, createEventInput);
  }
  // -----------------------------------------------------------

  // Delete ----------------------------------------------------
  @Mutation(() => Boolean, {
    nullable: false,
    name: 'deleteEvent',
    description:
      'Delete one event. Returns true if successful. Otherwise, returns false.',
  })
  delete(
    @Args('id', { type: () => ID, nullable: false }, ParseUUIDPipe)
    id: string,
  ): Promise<boolean> {
    return this.eventService.delete(id);
  }
  // -----------------------------------------------------------

  // Agreagations ----------------------------------------------
  @Query(() => AggregationType, {
    nullable: false,
    name: 'count',
    description: 'Get the count of all events and incoming events',
  })
  async count(): Promise<AggregationType> {
    return {
      total: await this.eventService.count(),
      incoming: await this.eventService.countIncoming(),
    };
  }

  @Query(() => Int, { name: 'countAll', nullable: false })
  countAll() {
    return this.eventService.count();
  }

  @Query(() => Int, { name: 'incomingEvents', nullable: false })
  countIncoming() {
    return this.eventService.countIncoming();
  }
  // -----------------------------------------------------------
}
