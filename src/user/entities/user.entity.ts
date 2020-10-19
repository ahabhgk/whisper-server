import { Issue } from '../../issue/entities/issue.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(
    () => Issue,
    issue => issue.author,
    { cascade: true },
  )
  issues: Issue[];

  @ManyToMany(
    () => Issue,
    issue => issue.author,
  )
  @JoinTable()
  likeIssues: Issue[];
}
