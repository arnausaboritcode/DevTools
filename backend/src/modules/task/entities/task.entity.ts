import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskRace } from '../enum/task_race';
import { UserRole } from '../enum/user_role';

@Entity('Task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ type: 'enum', enum: TaskRace, default: TaskRace.Resource })
  type: TaskRace;
  @Column({ nullable: true })
  properties: string;
  @Column({ type: 'enum', enum: UserRole, default: UserRole.Anonymous })
  user: UserRole;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
