import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TaskRepositoryService } from '../../repository/task-repository/task-repository.service';

@Injectable()
export class TaskSchedulerService {
  constructor(private readonly repository: TaskRepositoryService) {}

  @Cron('0 * * * *')
  async handleCron() {
    const taskCount = await this.repository.count().toPromise();

    if ((await taskCount) >= 50) {
      const tasksToDelete = await this.repository
        .findOldestTasks(10)
        .toPromise();

      if ((await tasksToDelete).length > 0) {
        await this.repository.removeTasks(await tasksToDelete);
      }
    }
  }
}
