import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TaskRace } from '../../../../core/enums/task-race';
import { FiltersDto } from '../../../../core/models/filtersDto';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { AbstractToolsSectionComponent } from '../../../../shared/components/abstract-tools-section/abstract-tools-section.component';
import { TaskSkeletonComponent } from '../../../../shared/components/task-skeleton/task-skeleton.component';
import { TaskComponent } from '../../../../shared/components/task/task.component';

@Component({
  selector: 'app-extension-tools',
  standalone: true,
  providers: [AutoDestroyService],
  imports: [
    TaskComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskSkeletonComponent,
    InfiniteScrollModule,
  ],
  templateUrl:
    '../../../../shared/components/abstract-tools-section/abstract-tools-section.component.html',
  styleUrl:
    '../../../../shared/components/abstract-tools-section/abstract-tools-section.component.scss',
})
export class ExtensionToolsComponent extends AbstractToolsSectionComponent {
  constructor() {
    super();
  }

  override filters: FiltersDto = {
    page: 1,
    limit: 10,
    type: TaskRace.Extension,
    query: '',
  };

  override propertiesOptions: string[] = ['Vs Code', 'Google Chrome'];

  override placeholderText: string = 'Descubre extensiones...';
}
