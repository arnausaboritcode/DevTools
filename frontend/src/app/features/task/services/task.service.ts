import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { TaskDto } from '../../../core/models/taskDto';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
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
}
