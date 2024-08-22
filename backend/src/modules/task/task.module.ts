import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './controllers/task/task.controller';
import { Task } from './entities/task.entity';
import { TaskRepositoryService } from './repository/task-repository/task-repository.service';
import { TaskService } from './services/task/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ScheduleModule.forRoot()],
  controllers: [TaskController],
  providers: [TaskService, TaskRepositoryService],
})
export class TaskModule {}
