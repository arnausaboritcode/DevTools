import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, switchMap } from 'rxjs';
import { BaseRepository } from 'src/core/models/base_repository';
import { DeleteResult, Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { FiltersDTO } from '../../models/filtersDTO';

@Injectable()
export class TaskRepositoryService implements BaseRepository<Task> {
  constructor(
    @InjectRepository(Task) private readonly repository: Repository<Task>,
  ) {}

  get(filters: FiltersDTO): Observable<Task[]> {
    const offset = (filters.page - 1) * filters.limit;

    const queryBuilder = this.repository
      .createQueryBuilder('task')
      .where('LOWER(task.title) LIKE LOWER(:query)', {
        query: `%${filters.query}%`,
      })
      .skip(offset)
      .take(filters.limit);

    if (filters.type) {
      queryBuilder.andWhere('task.type = :type', { type: filters.type });
    }

    if (filters.property) {
      queryBuilder.andWhere('task.properties = :properties', {
        properties: filters.property,
      });
    }

    return from(queryBuilder.getMany());
  }

  getById(id: string): Observable<Task> {
    return from(this.repository.findOneBy({ id }));
  }

  create(body: Task): Observable<Task> {
    return from(
      this.repository.findOne({
        where: [
          { title: body.title },
          { description: body.description },
          { link: body.link },
        ],
      }),
    ).pipe(
      switchMap((existingTask) => {
        if (existingTask) {
          throw new HttpException(
            'Herramienta con el mismo título, descripción o enlace ya existe',
            HttpStatus.BAD_REQUEST,
          );
        }
        return this.repository.save(body);
      }),
    );
  }

  delete(id: string): Observable<DeleteResult> {
    return from(this.repository.delete(id));
  }
}
