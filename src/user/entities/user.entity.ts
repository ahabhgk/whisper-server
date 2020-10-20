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
import { Pub } from 'src/pub/entities/pub.entity';

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

  @Column({ default: '' })
  description: string;

  @ManyToMany(
    () => Pub,
    pub => pub.users,
  )
  pubs: Pub[];

  @OneToMany(
    () => Pub,
    pub => pub.founder,
  )
  ownedPubs: Pub[];

  @OneToMany(
    () => Issue,
    issue => issue.author,
  )
  issues: Issue[];

  @ManyToMany(
    () => Issue,
    issue => issue.author,
  )
  @JoinTable()
  likeIssues: Issue[];
}
