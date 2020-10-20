import { Issue } from 'src/issue/entities/issue.entity';
import { User } from 'src/user/entities/user.entity';
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
export class Pub {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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
    { cascade: true },
  )
  founder: User;

  @ManyToMany(
    () => User,
    user => user.pubs,
  )
  @JoinTable()
  users: User[];

  @ManyToMany(
    () => Issue,
    issue => issue.pubs,
  )
  @JoinTable()
  issues: Issue[];
}
