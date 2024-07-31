import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './controllers/task/task.controller';
import { Task } from './entities/task.entity';
import { TaskRepositoryService } from './repository/task-repository/task-repository.service';
import { TaskCreatorService } from './services/task-creator/task-creator.service';
import { TaskSchedulerService } from './services/task-scheduler/task-scheduler.service';
import { TaskService } from './services/task/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ScheduleModule.forRoot()],
  controllers: [TaskController],
  providers: [
    TaskService,
    TaskRepositoryService,
    TaskSchedulerService,
    TaskCreatorService,
  ],
})
export class TaskModule {}
