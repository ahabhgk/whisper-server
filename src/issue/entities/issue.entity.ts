import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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
  content: string;

  @ManyToOne(
    () => User,
    author => author.issues,
  )
  author: User;

  @Column()
  tags: string;

  @OneToMany(
    () => User,
    liker => liker.likeIssues,
    { cascade: true },
  )
  likers: User[];
}
