import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Pub } from '../../pub/entities/pub.entity';

@ObjectType()
@Entity()
export class Issue {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column('text')
  content: string;

  @Field(() => User)
  @ManyToOne(
    () => User,
    author => author.issues,
  )
  author: User;

  @Field()
  @Column()
  tag: string;

  @Field(() => Pub)
  @ManyToOne(
    () => Pub,
    pub => pub.issues,
  )
  pub: Pub;

  @Field(() => [User])
  @ManyToMany(
    () => User,
    liker => liker.likeIssues,
  )
  @JoinTable()
  likers: User[];
}
