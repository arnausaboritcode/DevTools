import { TaskRace } from '../enums/task-race';
import { UserRole } from '../enums/user-role';

export class TaskDto {
  id?: string;
  title: string;
  description: string;
  type: TaskRace;
  properties: string;
  user: UserRole;
  createdAt?: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    type: TaskRace,
    properties: string,
    user: UserRole,
    createdAt: Date
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.type = type;
    this.properties = properties;
    this.user = user;
    this.createdAt = createdAt;
  }
}
