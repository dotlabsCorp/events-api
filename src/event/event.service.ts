import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './entity/event.entity';
import { CreateEventInput, UpdateEventInput, EventArgs } from './dto';

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
        datetime: '2023-05-20T05:00:00.000Z',
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
        datetime: '2023-05-22T05:00:00.000Z',
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
          name: 'Juan',
        },
      ],
      description: 'Description',
      date: {
        datetime: '2023-05-26T05:00:00.000Z',
      },
      tags: ['tag3'],
      location: {
        name: 'Location 3',
      },
    },
  ];

  get eventsLength(): number {
    return this.events.length;
  }

  get incomingEvents(): Event[] {
    const today = new Date();
    const incomingEvents: Event[] = this.events.filter(
      (event) => new Date(event.date.datetime) >= today,
    );

    return incomingEvents;
  }

  // Create -----------------------------------------------------
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
  // -----------------------------------------------------------

  // FindOne ---------------------------------------------------
  findOne(id: string): Event {
    const event = this.events.find((event) => event.id === id);
    if (!event) throw new NotFoundException(`Event ${id} not found`);

    return event;
  }
  // -----------------------------------------------------------

  // FindOAll --------------------------------------------------
  findAll(args: EventArgs): Event[] {
    console.log({ args });
    const { date, name, title } = args;

    const matchs: Event[] = [];

    if (date) {
      this.events.map((event) => {
        if (new Date(event.date.datetime) >= date) {
          if (!this.existInById(matchs, event)) matchs.push(event);
        }
      });
    }

    if (title) {
      this.events.map((event) => {
        if (event.title.includes(title)) {
          if (!this.existInById(matchs, event)) matchs.push(event);
        }
      });
    }

    if (name) {
      this.events.map((event) => {
        event.speakers.map((speaker) => {
          if (speaker.name.includes(name)) {
            if (!this.existInById(matchs, event)) matchs.push(event);
          }
        });
      });
    }

    if (matchs.length > 0) {
      return matchs;
    } else {
      return this.events;
    }
  }
  // -----------------------------------------------------------

  // Update ----------------------------------------------------
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
  // -----------------------------------------------------------

  // Delete ----------------------------------------------------
  delete(id: string) {
    this.findOne(id);
    this.events = this.events.filter((event) => event.id !== id);

    return true;
  }
  // -----------------------------------------------------------

  // get length ------------------------------------------------
  count(): number {
    return this.eventsLength;
  }

  countIncoming(): number {
    return this.incomingEvents.length;
  }
  // -----------------------------------------------------------

  private generateRandomId(): string {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const characters = `${letters}${letters.toUpperCase()}${numbers}`;

    let id = '';
    for (let i = 0; i < 10; i++) {
      id += characters[Math.floor(Math.random() * characters.length)];
    }

    return id;
  }

  private existInById(array: Event[], value: Event): boolean {
    return array.some((element) => element.id === value.id);
  }
}
