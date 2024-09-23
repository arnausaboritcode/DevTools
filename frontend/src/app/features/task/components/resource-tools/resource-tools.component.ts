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
  selector: 'app-resource-tools',
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
export class ResourceToolsComponent extends AbstractToolsSectionComponent {
  constructor() {
    super();
  }

  override propertiesOptions: string[] = [
    'Documentación',
    'Rendimiento y Hosting',
    'Recursos gráficos',
    'Diseño y UX',
    'Herramientas de desarrollo',
  ];

  override filters: FiltersDto = {
    page: 1,
    limit: 10,
    type: TaskRace.Resource,
    query: '',
  };

  override placeholderText: string = 'Descubre recursos...';
}
