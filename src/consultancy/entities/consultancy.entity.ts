import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'consultancies',
})
@ObjectType()
export class Consultancy {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar' })
  @Field(() => String, { nullable: false })
  fullName: string;

  @Column({ type: 'varchar' })
  @Field(() => String, { nullable: false })
  email: string;

  @Column({ type: 'varchar' })
  @Field(() => String, { nullable: false })
  phoneNumber: string;

  @Column({ type: 'varchar' })
  @Field(() => String, { nullable: false })
  description: string;
}
