import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TaskRepositoryService } from '../../repository/task-repository/task-repository.service';

@Injectable()
export class TaskCreatorService {
  constructor(private readonly repository: TaskRepositoryService) {}

  @Cron('0 * * * *')
  async handleCron() {
    try {
      await this.repository.generateAndCreateTasks();
    } catch (error) {
      console.error('Error generating tasks:', error);
    }
  }
}
