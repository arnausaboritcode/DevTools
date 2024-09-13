import { Observable } from 'rxjs';
import { FiltersDTO } from 'src/modules/task/models/filtersDTO';
import { DeleteResult } from 'typeorm';

export interface BaseRepository<T> {
  get(filters: FiltersDTO): Observable<T[]>;
  getById(id: string): Observable<T>;
  create(body: T): Observable<T>;
  delete(id: string): Observable<DeleteResult>;
}
