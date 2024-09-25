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
import {
  BehaviorSubject,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { FiltersDto } from '../../../core/models/filtersDto';
import { TaskDto } from '../../../core/models/taskDto';
import { AutoDestroyService } from '../../../core/services/utils/auto-destroy.service';
import { TaskService } from '../../../features/task/services/task-service.service';
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
  results: TaskDto[];
  filters: FiltersDto;
  onFilterChange$!: BehaviorSubject<FiltersDto>;

  skeleton: boolean;
  hasMoreTasks: boolean;
  windowScrolled: boolean;

  placeholderText: string;

  propertiesForm: FormGroup;
  property: FormControl;

  propertiesOptions: string[];

  protected readonly taskService: TaskService = inject(TaskService);
  protected readonly destroy$: AutoDestroyService = inject(AutoDestroyService);
  protected readonly formBuilder: FormBuilder = inject(FormBuilder);
  protected readonly router: Router = inject(Router);

  constructor() {
    this.results = [];
    this.filters = {
      page: 1,
      limit: 10,
      query: '',
    };
    this.hasMoreTasks = true;
    this.skeleton = false;
    this.windowScrolled = false;

    this.placeholderText = '';

    this.property = new FormControl('', []);

    this.propertiesForm = this.formBuilder.group({
      property: this.property,
    });

    this.propertiesOptions = [];
  }

  ngOnInit(): void {
    this.onFilterChange$ = new BehaviorSubject<FiltersDto>({
      ...this.filters,
    });

    this.taskService.searchTerms$
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((query: string) => {
        this.filters.page = 1;
        this.onFilterChange$.next({
          ...this.filters,
          query: query,
        });
      });

    this.subscribeToInputChanges();

    this.subscribeToFormChanges();

    this.subscribeToFiltersChanges();

    this.taskService.skeleton$
      .pipe(takeUntil(this.destroy$))
      .subscribe((skeleton) => {
        this.skeleton = skeleton;
      });

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        const element = document.getElementById('search');
        if (element) {
          const rect = element.getBoundingClientRect();
          this.windowScrolled = rect.bottom <= 0;
        }
      });
    }
  }

  subscribeToInputChanges(): void {
    this.taskService.setQueryString(this.filters.query!);
  }

  subscribeToFormChanges(): void {
    this.propertiesForm.valueChanges
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe(() => {
        const property = this.propertiesForm.controls['property'].value;
        if (property) {
          this.filters.page = 1;
          this.onFilterChange$.next({
            ...this.filters,
            property: property,
          });

          this.hasMoreTasks = this.results.length >= this.filters.limit;
        }
      });
  }

  resetFilters(): void {
    this.propertiesForm.controls['property'].setValue('');
    this.filters.page = 1;
    this.onFilterChange$.next({
      ...this.filters,
    });

    this.hasMoreTasks = true;
  }

  subscribeToFiltersChanges(): void {
    this.onFilterChange$
      .pipe(
        distinctUntilChanged(),
        tap(() => {
          this.results = [];
        }),
        switchMap((filters: FiltersDto) => this.taskService.getTasks(filters)),
        takeUntil(this.destroy$)
      )
      .subscribe((results) => {
        this.results = results;
        this.hasMoreTasks = this.results.length >= this.filters.limit;
      });
  }

  onScroll(): void {
    if (!this.hasMoreTasks) {
      return;
    }

    this.filters.page++;

    this.taskService
      .getTasks(this.filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe((newResults: TaskDto[]) => {
        if (newResults.length === 0) {
          this.hasMoreTasks = false;
          return;
        }

        this.hasMoreTasks = newResults.length >= this.filters.limit;

        this.results = [...this.results, ...newResults];
      });
  }

  trackByTaskId(index: number, task: TaskDto): number {
    return +task.id!;
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
