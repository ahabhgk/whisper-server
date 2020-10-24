import { Issue } from '../../issue/entities/issue.entity';
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
import { Pub } from 'src/pub/entities/pub.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Entity()
export class User {
  @PrimaryColumn()
  @OneToOne(
    () => Auth,
    auth => auth.username,
  )
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

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
