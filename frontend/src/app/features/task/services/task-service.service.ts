import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { TaskDto } from '../../../core/models/taskDto';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private searchTerms: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  searchTerms$: Observable<string> = this.searchTerms.asObservable();

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(`${environment.BASE_API_URL_BACKEND}/task`);
  }

  createTask(task: TaskDto): Observable<TaskDto> {
    return this.http.post<TaskDto>(
      `${environment.BASE_API_URL_BACKEND}/task`,
      task
    );
  }

  searchTasks(query: string): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(
      `${environment.BASE_API_URL_BACKEND}/task/search?query=${query}`
    );
  }

  setQueryString(query: string) {
    this.searchTerms.next(query);
  }
}
