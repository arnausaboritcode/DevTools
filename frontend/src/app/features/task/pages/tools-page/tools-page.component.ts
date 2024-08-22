import { Component, OnInit } from '@angular/core';
import { switchMap, takeUntil, tap } from 'rxjs';
import { TaskDto } from '../../../../core/models/taskDto';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tools-page',
  templateUrl: './tools-page.component.html',
  styleUrl: './tools-page.component.scss',
})
export class ToolsPageComponent implements OnInit {
  query: string;
  searchedResults: TaskDto[];
  storedTasks: TaskDto[];

  constructor(
    private taskService: TaskService,
    private destroy$: AutoDestroyService
  ) {
    this.storedTasks = [];
    this.query = '';
    this.searchedResults = [];
  }

  ngOnInit(): void {
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
