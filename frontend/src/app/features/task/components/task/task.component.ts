import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { taskRaceLabels } from '../../../../core/enums/task-race';
import { userRolesValues } from '../../../../core/enums/user-role';
import { TaskDto } from '../../../../core/models/taskDto';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  @Input() task!: TaskDto;
  taskRaceLabels = taskRaceLabels;
  userRolesValues = userRolesValues;

  constructor() {}

  ngOnInit(): void {}
}
