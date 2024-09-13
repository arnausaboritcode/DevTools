import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TaskRace } from '../../../../core/enums/task-race';
import { FiltersDto } from '../../../../core/models/filtersDto';
import { AbstractToolsSectionComponent } from '../../../../shared/abstract-tools-section/abstract-tools-section.component';
import { TaskSkeletonComponent } from '../../../../shared/task-skeleton/task-skeleton.component';
import { TaskComponent } from '../../../../shared/task/task.component';

@Component({
  selector: 'app-extension-tools',
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
export class ExtensionToolsComponent extends AbstractToolsSectionComponent {
  constructor() {
    super();
  }

  override filters: FiltersDto = {
    page: 1,
    limit: 10,
    type: TaskRace.Extension,
  };

  override propertiesOptions: string[] = ['Vs Code', 'Google Chrome', 'Figma'];

  override placeholderText: string = 'Descubre extensiones...';
}
