import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/users/entities';

@Entity({
  name: 'talkRequests',
})
@ObjectType()
export class TalkRequest {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String)
  @Column()
  about: string;

  @Field(() => User)
  @OneToMany((type) => User, (user) => user.id)
  user: User;
}
