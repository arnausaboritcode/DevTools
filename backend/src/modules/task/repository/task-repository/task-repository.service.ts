import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { BaseRepository } from 'src/core/models/base_repository';
import { DeleteResult, Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';

@Injectable()
export class TaskRepositoryService implements BaseRepository<Task> {
  constructor(
    @InjectRepository(Task) private readonly repository: Repository<Task>,
  ) {}

  get(page: number, limit: number): Observable<Task[]> {
    const offset = (page - 1) * limit;
    return from(
      this.repository.find({
        skip: offset,
        take: limit,
      }),
    );
  }

  getById(id: string): Observable<Task> {
    return from(this.repository.findOneBy({ id }));
  }

  create(body: Task): Observable<Task> {
    return from(this.repository.save(body));
  }

  delete(id: string): Observable<DeleteResult> {
    return from(this.repository.delete(id));
  }

  search(query: string): Observable<Task[]> {
    return from(
      this.repository
        .createQueryBuilder('task')
        .where('LOWER(task.title) LIKE LOWER(:query)', { query: `%${query}%` })
        .getMany(),
    );
  }
}
