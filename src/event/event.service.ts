import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository, MoreThanOrEqual, EqualOperator } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Event } from './entity/event.entity';
import { CreateEventInput, UpdateEventInput, EventArgs } from './dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  get eventsLength(): Promise<number> {
    return this.eventsRepository.count();
  }

  get incomingEvents(): Promise<Event[]> {
    const today = new Date();

    const incomingEvents = this.eventsRepository.find({
      where: {
        date: MoreThanOrEqual(today),
      },
    });

    return incomingEvents;
  }

  // Create -----------------------------------------------------
  async create(createEventInput: CreateEventInput): Promise<boolean> {
    const newEvent = this.eventsRepository.create(createEventInput);
    const saveOp = await this.saveEvent(newEvent);

    if (saveOp instanceof Error) {
      throw new InternalServerErrorException(saveOp);
    } else {
      return saveOp;
    }
  }

  private async saveEvent(event: Event): Promise<boolean | Error> {
    try {
      await this.eventsRepository.save(event);
    } catch (error) {
      return new Error(error);
    }

    return true;
  }
  // -----------------------------------------------------------

  // FindOne ---------------------------------------------------
  async findOne(id: string): Promise<Event> {
    const event = await this.eventsRepository.findOne({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    } else {
      return event;
    }
  }
  // -----------------------------------------------------------

  // FindOAll --------------------------------------------------
  // @todo use query builder to make this more efficient
  async findAll(args: EventArgs): Promise<Event[]> {
    const { date, name, title } = args;
    let events: Event[] = [];

    if (date) {
      const foundEvents = await this.eventsRepository.find({
        where: { date: MoreThanOrEqual(date) },
      });

      if (foundEvents) {
        events = foundEvents;
      }
    } else if (name) {
      const foundEvents = await this.eventsRepository.find({
        where: {
          speakers: {
            name,
          },
        },
      });

      if (foundEvents) {
        events = foundEvents;
      }
    } else if (title) {
      const foundEvents = await this.eventsRepository.find({
        where: { title },
      });

      if (foundEvents) {
        events = foundEvents;
      }
    }

    if (events.length === 0) {
      return await this.eventsRepository.find();
    } else {
      return events;
    }
  }
  // -----------------------------------------------------------

  // Update ----------------------------------------------------
  async update(
    id: string,
    updateEventInput: UpdateEventInput,
  ): Promise<boolean> {
    const event = await this.findOne(id);

    if (!event) {
      throw new NotFoundException();
    } else {
      const updateOp = await this.updateEvent(id, updateEventInput);

      if (updateOp instanceof Error) {
        throw new InternalServerErrorException(updateOp);
      } else {
        return updateOp;
      }
    }
  }

  private async updateEvent(
    id: string,
    updateEventInput: UpdateEventInput,
  ): Promise<boolean | Error> {
    try {
      await this.eventsRepository.update(id, updateEventInput);
    } catch (error) {
      return new Error(error);
    }

    return true;
  }
  // -----------------------------------------------------------

  // Delete ----------------------------------------------------
  async delete(id: string): Promise<boolean> {
    const event = await this.findOne(id);

    if (!event) {
      throw new NotFoundException();
    } else {
      const deleteOp = await this.deleteEvent(id);

      if (deleteOp instanceof Error) {
        throw new InternalServerErrorException(deleteOp);
      } else {
        return deleteOp;
      }
    }
  }

  private async deleteEvent(id: string): Promise<boolean | Error> {
    try {
      await this.eventsRepository.delete(id);
    } catch (error) {
      return new Error(error);
    }

    return true;
  }
  // -----------------------------------------------------------

  // get length ------------------------------------------------
  async count(): Promise<number> {
    return await this.eventsLength;
  }

  async countIncoming(): Promise<number> {
    return (await this.incomingEvents).length;
  }
  // -----------------------------------------------------------
  private isExistById(array: Event[], event: Event, id: string): boolean {
    return array.some((event) => event.id === id);
  }
}
