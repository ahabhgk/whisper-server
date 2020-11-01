import { Issue } from '../../issue/entities/issue.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Pub {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  private: boolean;

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.ownedPubs,
  )
  founder: User;

  @Field(() => [User])
  @ManyToMany(
    () => User,
    user => user.pubs,
  )
  @JoinTable()
  users: User[];

  @Field(() => [Issue])
  @OneToMany(
    () => Issue,
    issue => issue.pub,
  )
  issues: Issue[];
}
