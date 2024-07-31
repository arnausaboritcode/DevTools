import { takeUntil } from 'rxjs';
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

  constructor(
    private taskService: TaskService,
    private destroy$: AutoDestroyService
  ) {
    this.storedTasks = [];
  }

  ngOnInit() {
    this.taskService
      .getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((storedTasks) => {
        this.storedTasks = storedTasks;
      });
  }
}
