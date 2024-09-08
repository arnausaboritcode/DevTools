import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TaskDto } from '../../../../core/models/taskDto';
import { AbstractToolsSectionComponent } from '../../../../shared/abstract-tools-section/abstract-tools-section.component';
import { TaskSkeletonComponent } from '../../../../shared/task-skeleton/task-skeleton.component';
import { TaskComponent } from '../../../../shared/task/task.component';

@Component({
  selector: 'app-all-tools',
  standalone: true,
  imports: [
    TaskComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskSkeletonComponent,
    InfiniteScrollModule,
  ],
  templateUrl:
    '../../../../shared/abstract-tools-section/abstract-tools-section.component.html',
  styleUrl:
    '../../../../shared/abstract-tools-section/abstract-tools-section.component.scss',
})
export class AllToolsComponent extends AbstractToolsSectionComponent {
  constructor() {
    super();
  }

  protected filterTasks(tasks: TaskDto[]): TaskDto[] {
    return tasks;
  }

  override propertiesOptions: string[] = [
    'Vs Code',
    'Google Chrome',
    'Figma',
    'Documentación',
    'Rendimiento y Optimización',
    'APIs',
    'Librería y Frameworks',
    'Assets',
    'Testing y Depuración',
  ];

  override placeholderText: string = 'Descubre todas las herramientas...';
}
