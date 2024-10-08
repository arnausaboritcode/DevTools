import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, finalize, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { FiltersDto } from '../../../core/models/filtersDto';
import { TaskDto } from '../../../core/models/taskDto';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private searchTerms: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  searchTerms$: Observable<string> = this.searchTerms.asObservable();

  private skeleton: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  skeleton$: Observable<boolean> = this.skeleton.asObservable();

  private spinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  spinner$: Observable<boolean> = this.spinner.asObservable();

  constructor(private http: HttpClient) {}

  getTasks(filters: FiltersDto): Observable<TaskDto[]> {
    const params = new HttpParams({
      fromObject: { ...filters },
    });
    this.skeleton.next(true);
    return this.http
      .get<TaskDto[]>(`${environment.BASE_API_URL_BACKEND}/task`, { params })
      .pipe(
        delay(500),
        finalize(() => {
          this.skeleton.next(false);
        })
      );
  }

  createTask(task: TaskDto): Observable<TaskDto> {
    this.spinner.next(true);
    return this.http
      .post<TaskDto>(`${environment.BASE_API_URL_BACKEND}/task`, task)
      .pipe(
        delay(1000),
        finalize(() => {
          this.spinner.next(false);
        })
      );
  }

  setQueryString(query: string) {
    this.searchTerms.next(query);
  }
}
