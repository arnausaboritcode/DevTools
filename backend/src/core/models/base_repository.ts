import { Observable } from 'rxjs';
import { DeleteResult } from 'typeorm';

export interface BaseRepository<T> {
  get(): Observable<T[]>;
  getById(id: string): Observable<T>;
  create(body: T): Observable<T>;
  delete(id: string): Observable<DeleteResult>;
  search(query: string): Observable<T[]>;
}
