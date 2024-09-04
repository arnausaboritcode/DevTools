import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { TaskDto } from '../../../../core/models/taskDto';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { TaskComponent } from '../../components/task/task.component';
import { TaskService } from '../../services/task-service.service';

@Component({
  selector: 'app-tools-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterModule,
    TaskComponent,
    ReactiveFormsModule,
  ],

  templateUrl: './tools-page.component.html',
  styleUrl: './tools-page.component.scss',
})
export class ToolsPageComponent implements OnInit {
  storedTasks: TaskDto[];

  toggle: boolean;

  resource: TaskDto;
  title: FormControl;
  description: FormControl;
  type: FormControl;
  properties: FormControl;
  createResource: FormGroup;
  isValidForm: boolean | null;

  propertiesOptions: { [key: string]: string[] } = {
    '0': ['VsCode', 'Google Chrome'],
    '1': ['Optimization', 'Styling', 'Testing'],
  };

  constructor(
    private taskService: TaskService,
    private destroy$: AutoDestroyService,
    private formBuilder: FormBuilder
  ) {
    this.storedTasks = [];
    this.toggle = false;

    this.resource = new TaskDto(
      '',
      '',
      '',
      0,
      this.propertiesOptions[0][0],
      0,
      new Date()
    );
    this.isValidForm = null;
    this.title = new FormControl(this.resource.title, [
      Validators.required,
      Validators.pattern(/^[A-Za-z]{1,10}$/),
    ]);
    this.description = new FormControl(this.resource.description, [
      Validators.required,
      Validators.pattern(/^[A-Za-z\s\W]{1,50}$/),
    ]);
    this.type = new FormControl(this.resource.type, []);
    this.properties = new FormControl(this.resource.properties, []);

    this.createResource = this.formBuilder.group({
      title: this.title,
      description: this.description,
      type: this.type,
      properties: this.properties,
    });
  }

  ngOnInit(): void {
    this.taskService
      .getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((storedTasks) => {
        this.storedTasks = storedTasks;
      });

    this.subscribeToSelectChanges();
  }

  showHideForm(): void {
    this.toggle = !this.toggle;
  }

  create(): void {
    this.isValidForm = false;
    let responseOK: boolean = false;

    if (this.createResource.invalid) {
      return;
    }

    this.isValidForm = true;
    console.log('Here is the form');
    this.resource = this.createResource.value;
    console.dir(this.resource);

    this.taskService
      .createTask(this.resource)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          if (responseOK) {
            this.toggle = false;
          } else {
          }
        })
      )
      .subscribe({
        next: () => {
          responseOK = true;
          console.log('Task created');
        },
        error: (error) => {
          responseOK = false;
          console.error(error);
        },
      });
  }

  subscribeToSelectChanges(): void {
    this.createResource.get('type')?.valueChanges.subscribe((value) => {
      this.createResource
        .get('properties')
        ?.setValue(this.propertiesOptions[value][0]);
    });
  }
}
