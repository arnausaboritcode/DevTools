import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskRace } from '../enum/task_race';

@Entity('Task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ type: 'enum', enum: TaskRace, default: TaskRace.FRONTEND })
  type: TaskRace;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
