import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { TaskDto } from '../../../../core/models/taskDto';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-all-tools',
  templateUrl: './all-tools.component.html',
  styleUrl: './all-tools.component.scss',
})
export class AllToolsComponent implements OnInit {
  storedTasks: TaskDto[];
  constructor(
    private taskService: TaskService,
    private destroy$: AutoDestroyService
  ) {
    this.storedTasks = [];
  }

  ngOnInit(): void {
    this.taskService
      .getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((storedTasks) => {
        this.storedTasks = storedTasks;
      });
  }
}
