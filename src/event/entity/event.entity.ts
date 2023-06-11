import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
class LinkObject {
  @Field(() => String, {
    nullable: true,
  })
  url?: string;
}

@ObjectType()
export class SpeakerObject extends LinkObject {
  @Field(() => String!)
  name: string;
}

@ObjectType()
export class DateObject extends LinkObject {
  @Field(() => String!)
  datetime: string;
}

@ObjectType()
export class LocationObject extends LinkObject {
  @Field(() => String!)
  name: string;
}

export enum EventType {
  WOKRSHOP = 'Workshop',
  TERTULIA = 'Tertulia',
}
registerEnumType(EventType, {
  name: 'EventType',
});

@ObjectType()
@Entity({ name: 'events' })
export class Event {
  @Field(() => ID!)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String!)
  @Column('varchar')
  title: string;

  @Field(() => [SpeakerObject!]!)
  @Column('jsonb')
  speakers: SpeakerObject[];

  @Field(() => String!)
  @Column('varchar')
  description: string;

  @Field(() => DateObject!)
  @Column('jsonb')
  date: DateObject;

  @Field(() => [String!]!)
  @Column('varchar', { array: true })
  tags: string[];

  @Field(() => LocationObject!)
  @Column('jsonb')
  location: LocationObject;

  @Field(() => EventType!)
  @Column('enum', { enum: EventType })
  type: EventType;

  @Field(() => String, { nullable: true })
  @Column('varchar')
  imageUrl: string;
}
