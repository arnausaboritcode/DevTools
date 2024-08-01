import { switchMap, takeUntil, tap } from 'rxjs';
import { TaskDto } from '../../../../core/models/taskDto';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { TaskService } from './../../services/task.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  storedTasks: TaskDto[];

  query: string;
  searchedResults: TaskDto[];

  constructor(
    private taskService: TaskService,
    private destroy$: AutoDestroyService
  ) {
    this.storedTasks = [];
    this.query = '';
    this.searchedResults = [];
  }

  ngOnInit() {
    this.taskService
      .getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((storedTasks) => {
        this.storedTasks = storedTasks;
      });

    this.taskService.searchTerms$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (this.searchedResults = [])),
        switchMap((query: string) => this.taskService.searchTasks(query))
      )
      .subscribe((results) => {
        console.dir(results);
        this.searchedResults = results;
        console.dir(this.searchedResults);
      });
  }

  subscribeToInputChanges(): void {
    this.taskService.setQueryString(this.query);
  }
}
