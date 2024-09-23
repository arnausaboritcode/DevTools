import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { AbstractToolsSectionComponent } from '../../../../shared/components/abstract-tools-section/abstract-tools-section.component';
import { TaskSkeletonComponent } from '../../../../shared/components/task-skeleton/task-skeleton.component';
import { TaskComponent } from '../../../../shared/components/task/task.component';

@Component({
  selector: 'app-all-tools',
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
export class AllToolsComponent extends AbstractToolsSectionComponent {
  constructor() {
    super();
  }

  override propertiesOptions: string[] = [
    'Vs Code',
    'Google Chrome',
    'Documentación',
    'Rendimiento y Hosting',
    'Recursos gráficos',
    'Diseño y UX',
    'Herramientas de desarrollo',
  ];

  override placeholderText: string = 'Descubre todas las herramientas...';
}
