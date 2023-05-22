import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './entity/event.entity';
import { CreateEventInput, UpdateEventInput } from './dto/inputs';

@Injectable()
export class EventService {
  private events: Event[] = [
    {
      id: '1',
      title: 'Event 1',
      speakers: [
        {
          name: 'Speaker 1',
          url: 'https://speaker1.com',
        },
      ],
      description: 'Description 1',
      date: {
        datetime: '2021-01-01T00:00:00.000Z',
        url: 'https://date1.com',
      },
      tags: ['tag1'],
      location: {
        name: 'Location 1',
        url: 'https://location1.com',
      },
    },
    {
      id: '2',
      title: 'Event 2',
      speakers: [
        {
          name: 'Speaker 2',
          url: 'https://speaker2.com',
        },
      ],
      description: 'Description 2',
      date: {
        datetime: '2021-02-02T00:00:00.000Z',
        url: 'https://date2.com',
      },
      tags: ['tag2'],
      location: {
        name: 'Location 2',
        url: 'https://location2.com',
      },
    },
    {
      id: '3',
      title: 'Event 3',
      speakers: [
        {
          name: 'Speaker 3',
        },
      ],
      description: 'Description 3',
      date: {
        datetime: '2021-03-03T00:00:00.000Z',
      },
      tags: ['tag3'],
      location: {
        name: 'Location 3',
      },
    },
  ];
  create(createEventInput: CreateEventInput): boolean {
    console.log({
      createEventInput,
    });

    const event: Event = {
      id: this.generateRandomId(),
      ...createEventInput,
    };

    this.events.push(event);

    return true;
  }

  findOne(id: string): Event {
    const event = this.events.find((event) => event.id === id);
    if (!event) throw new NotFoundException(`Event ${id} not found`);

    return event;
  }

  findAll(): Event[] {
    return this.events;
  }

  update(id: string, updateEventInput: UpdateEventInput) {
    const event = this.findOne(id);

    const updatedEvent = {
      ...event,
      ...updateEventInput,
    };

    this.events = this.events.map((event) => {
      if (event.id === id) {
        return updatedEvent;
      } else {
        return event;
      }
    });

    return true;
  }

  delete(id: string) {
    this.findOne(id);
    this.events = this.events.filter((event) => event.id !== id);

    return true;
  }

  generateRandomId(): string {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const characters = `${letters}${letters.toUpperCase()}${numbers}`;

    let id = '';
    for (let i = 0; i < 10; i++) {
      id += characters[Math.floor(Math.random() * characters.length)];
    }

    return id;
  }
}
