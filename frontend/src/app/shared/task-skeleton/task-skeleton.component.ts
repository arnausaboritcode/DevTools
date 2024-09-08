import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-skeleton.component.html',
  styleUrl: './task-skeleton.component.scss',
})
export class TaskSkeletonComponent implements OnInit {
  numberOfSkeletons: number[] = Array(5).fill(0);

  constructor() {}

  ngOnInit(): void {}
}
