import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskRace } from '../../../../core/enums/task-race';
import { TaskDto } from '../../../../core/models/taskDto';
import { AbstractToolsSectionComponent } from '../../../../shared/abstract-tools-section/abstract-tools-section.component';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-resource-tools',
  standalone: true,
  imports: [TaskComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl:
    '../../../../shared/abstract-tools-section/abstract-tools-section.component.html',
  styleUrl:
    '../../../../shared/abstract-tools-section/abstract-tools-section.component.scss',
})
export class ResourceToolsComponent extends AbstractToolsSectionComponent {
  constructor() {
    super();
  }

  protected filterTasks(tasks: TaskDto[]): TaskDto[] {
    return tasks.filter((task) => task.type === TaskRace.Resource);
  }

  override propertiesOptions: string[] = ['Optimization', 'Styling', 'Testing'];

  override placeholderText: string = 'Descubre recursos...';
}
