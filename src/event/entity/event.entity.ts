import { Field, ObjectType } from '@nestjs/graphql';

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

@ObjectType()
export class Event {
  @Field(() => String!)
  id: string;
  @Field(() => String!)
  title: string;
  @Field(() => [SpeakerObject!]!)
  speakers: SpeakerObject[];
  @Field(() => String!)
  description: string;
  @Field(() => DateObject!)
  date: DateObject;
  @Field(() => [String!]!)
  tags: string[];
  @Field(() => LocationObject!)
  location: LocationObject;
}
