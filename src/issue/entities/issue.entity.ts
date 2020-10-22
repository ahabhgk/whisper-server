import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pub } from 'src/pub/entities/pub.entity';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(
    () => User,
    author => author.issues,
    { cascade: true },
  )
  author: User;

  @Column()
  tag: string;

  @ManyToOne(
    () => Pub,
    pub => pub.issues,
    { cascade: true },
  )
  pub: Pub;

  @ManyToMany(
    () => User,
    liker => liker.likeIssues,
  )
  likers: User[];
}
