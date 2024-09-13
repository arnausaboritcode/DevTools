import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { DeleteResult } from 'typeorm';
import { FiltersDTO } from '../../models/filtersDTO';
import { TaskDTO } from '../../models/taskDTO';
import { TaskService } from '../../services/task/task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async get(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('type') type?: number,
    @Query('property') property?: string,
    @Query('query') query?: string,
  ): Promise<TaskDTO[]> {
    const filters: FiltersDTO = {
      page: page || 1,
      limit: limit || 10,
      type,
      property,
      query,
    };
    const tasks = await firstValueFrom(this.taskService.get(filters));
    return tasks;
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<TaskDTO> {
    const task = await firstValueFrom(this.taskService.getById(id));
    return task;
  }

  @Post()
  async createTask(@Body() body: TaskDTO): Promise<TaskDTO> {
    const task = await firstValueFrom(this.taskService.create(body));
    return task;
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<DeleteResult> {
    return await firstValueFrom(this.taskService.delete(id));
  }
}
