import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Issue } from '../../issue/entities/issue.entity';
import { Pub } from '../../pub/entities/pub.entity';
import { Auth } from '../../auth/entities/auth.entity';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryColumn()
  @OneToOne(
    () => Auth,
    auth => auth.username,
  )
  username: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column({ default: '' })
  avatar: string;

  @Field()
  @Column({ default: '' })
  description: string;

  @Field(() => [Pub])
  @ManyToMany(
    () => Pub,
    pub => pub.users,
  )
  pubs: Pub[];

  @Field(() => [Pub])
  @OneToMany(
    () => Pub,
    pub => pub.founder,
  )
  ownedPubs: Pub[];

  @Field(() => [Issue])
  @OneToMany(
    () => Issue,
    issue => issue.author,
  )
  issues: Issue[];

  @Field(() => [Issue])
  @ManyToMany(
    () => Issue,
    issue => issue.author,
  )
  @JoinTable()
  likeIssues: Issue[];
}
