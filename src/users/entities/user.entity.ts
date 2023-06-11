import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsHexadecimal } from 'class-validator';
import { ValidRoles } from 'src/auth/enums';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: false })
  @Column()
  fullName: string;

  @Column()
  @Field(() => String, { nullable: false })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'text',
    array: true,
    default: ['user'],
  })
  @Field(() => [ValidRoles])
  roles: ValidRoles[];

  @Column({
    type: 'text',
  })
  @Field(() => String)
  @IsHexadecimal()
  walletAddress: `0x${string}`;

  @Column({
    type: 'boolean',
    default: false,
  })
  @Field(() => Boolean)
  isBlocked: boolean;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.lastUpdatedBy, {
    nullable: true,
    lazy: true,
  })
  @JoinColumn({ name: 'lastUpdatedBy' })
  lastUpdatedBy?: User;
}
