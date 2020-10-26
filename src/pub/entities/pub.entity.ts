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

@Entity()
export class Pub {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  private: boolean;

  @ManyToOne(
    () => User,
    user => user.ownedPubs,
  )
  founder: User;

  @ManyToMany(
    () => User,
    user => user.pubs,
  )
  @JoinTable()
  users: User[];

  @OneToMany(
    () => Issue,
    issue => issue.pub,
  )
  issues: Issue[];
}
