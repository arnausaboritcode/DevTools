import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult } from 'typeorm';
import { FiltersDTO } from '../../models/filtersDTO';
import { TaskDTO } from '../../models/taskDTO';
import { TaskRepositoryService } from '../../repository/task-repository/task-repository.service';

@Injectable()
export class TaskService {
  constructor(private readonly repository: TaskRepositoryService) {}

  get(filters: FiltersDTO): Observable<TaskDTO[]> {
    return this.repository.get(filters);
  }

  getById(id: string): Observable<TaskDTO> {
    return this.repository.getById(id);
  }

  create(body: TaskDTO): Observable<TaskDTO> {
    return this.repository.create(body);
  }

  delete(id: string): Observable<DeleteResult> {
    return this.repository.delete(id);
  }
}
