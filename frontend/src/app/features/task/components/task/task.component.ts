import { Component, Input, OnInit } from '@angular/core';
import { TaskDto } from '../../../../core/models/taskDto';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  @Input() task!: TaskDto;

  constructor() {}

  ngOnInit(): void {}
}
