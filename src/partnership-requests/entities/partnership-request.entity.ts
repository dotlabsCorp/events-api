import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/users/entities';

@Entity({
  name: 'talkRequests',
})
@ObjectType()
export class PartnershipRequest {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => String)
  description: string;

  @Field(() => User)
  @OneToMany((type) => User, (user) => user.id)
  user: User;
}
