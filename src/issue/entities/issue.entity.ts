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

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(
    () => User,
    author => author.issues,
  )
  author: User;

  @Column()
  tag: string;

  @ManyToMany(
    () => User,
    liker => liker.likeIssues,
    { cascade: true },
  )
  @JoinTable()
  likers: User[];
}
