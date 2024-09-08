import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { switchMap, takeUntil, tap } from 'rxjs';
import { TaskDto } from '../../core/models/taskDto';
import { AutoDestroyService } from '../../core/services/utils/auto-destroy.service';
import { TaskService } from '../../features/task/services/task-service.service';
import { TaskSkeletonComponent } from '../task-skeleton/task-skeleton.component';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-abstract-tools-section',
  standalone: true,
  imports: [
    TaskComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskSkeletonComponent,
    InfiniteScrollModule,
  ],
  templateUrl: './abstract-tools-section.component.html',
  styleUrl: './abstract-tools-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class AbstractToolsSectionComponent implements OnInit {
  storedTasks: TaskDto[];

  query: string;
  searchedResults: TaskDto[];
  originalTasks: TaskDto[];

  propertiesOptions: string[] = [];

  propertiesForm: FormGroup;
  property: FormControl;

  placeholderText: string = '';

  skeleton: boolean;

  currentPage: number = 1;
  limit: number = 10;
  hasMoreTasks: boolean = true;

  protected readonly taskService: TaskService = inject(TaskService);
  protected readonly destroy$: AutoDestroyService = inject(AutoDestroyService);
  protected readonly formBuilder: FormBuilder = inject(FormBuilder);
  protected readonly router: Router = inject(Router);

  constructor() {
    this.storedTasks = [];
    this.query = '';
    this.searchedResults = [];
    this.originalTasks = [];

    this.property = new FormControl('', []);

    this.propertiesForm = this.formBuilder.group({
      property: this.property,
    });

    this.skeleton = false;
  }

  ngOnInit(): void {
    this.taskService
      .getTasks(this.currentPage, this.limit)
      .pipe(takeUntil(this.destroy$))
      .subscribe((storedTasks: TaskDto[]) => {
        this.storedTasks = this.filterTasks(storedTasks);
        console.dir(this.storedTasks);
        this.searchedResults = [...this.storedTasks];
        console.dir(this.searchedResults);
        this.originalTasks = [...this.storedTasks];
      });

    this.taskService.searchTerms$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (this.searchedResults = [])),
        switchMap((query: string) => {
          if (query.trim() === '') {
            return this.taskService.getTasks(this.currentPage, this.limit);
          } else {
            return this.taskService.searchTasks(query);
          }
        })
      )
      .subscribe((results) => {
        this.searchedResults = this.filterTasks(results);
        this.originalTasks = [...this.searchedResults];
        if (this.propertiesForm.get('property')?.value) {
          this.applyFilter(this.propertiesForm.get('property')?.value);
        }
      });

    this.taskService.skeleton$
      .pipe(takeUntil(this.destroy$))
      .subscribe((skeleton) => {
        this.skeleton = skeleton;
      });

    this.subscribeToInputChanges();

    this.subscribeToFormChanges();
  }

  protected abstract filterTasks(tasks: TaskDto[]): TaskDto[];

  subscribeToInputChanges(): void {
    this.taskService.setQueryString(this.query);
  }

  subscribeToFormChanges(): void {
    this.propertiesForm
      .get('property')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.searchedResults = [...this.originalTasks];
        this.applyFilter(value);
      });
  }

  applyFilter(value: string) {
    this.searchedResults = this.searchedResults.filter((task) =>
      value.includes(task.properties)
    );
  }

  resetFilters(): void {
    this.propertiesForm.get('property')?.setValue('');
    this.searchedResults = [...this.originalTasks];
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  onScroll(): void {
    if (!this.hasMoreTasks) {
      return;
    }
    this.currentPage++;
    this.taskService
      .getTasks(this.currentPage, this.limit)
      .pipe(takeUntil(this.destroy$))
      .subscribe((storedTasks: TaskDto[]) => {
        if (this.filterTasks(storedTasks).length === 0) {
          this.hasMoreTasks = false;
          return;
        }
        this.storedTasks = [
          ...this.storedTasks,
          ...this.filterTasks(storedTasks),
        ];
        this.searchedResults = [...this.storedTasks];
        this.originalTasks = [...this.storedTasks];
      });
  }
}
