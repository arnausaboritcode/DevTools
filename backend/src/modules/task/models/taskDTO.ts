import { TaskRace } from '../enum/task_race';

export interface TaskDTO {
  id: string;
  title: string;
  description: string;
  type: TaskRace;
}
