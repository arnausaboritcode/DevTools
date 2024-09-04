import { TaskRace } from '../enum/task_race';
import { UserRole } from '../enum/user_role';

export interface TaskDTO {
  id: string;
  title: string;
  description: string;
  type: TaskRace;
  properties: string;
  user: UserRole;
  createdAt: Date;
}
