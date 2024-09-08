import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { TaskDto } from '../../../../core/models/taskDto';
import { SnackBarServiceService } from '../../../../core/services/common/snack-bar-service.service';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';

import { SpinnerComponent } from '../../../../shared/spinner/spinner.component';
import { TaskService } from '../../services/task-service.service';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent, RouterModule],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss',
})
export class FormPageComponent implements OnInit {
  resource: TaskDto;
  title: FormControl;
  description: FormControl;
  type: FormControl;
  properties: FormControl;
  link: FormControl;
  createResource: FormGroup;
  isValidForm: boolean | null;

  propertiesOptions: { [key: string]: string[] } = {
    '0': ['Vs Code', 'Google Chrome', 'Figma'],
    '1': [
      'Documentación',
      'Rendimiento y Optimización',
      'APIs',
      'Librería y Frameworks',
      'Assets',
      'Testing y Depuración',
    ],
  };

  spinner: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private destroy$: AutoDestroyService,
    private router: Router,
    private snackBarService: SnackBarServiceService
  ) {
    this.spinner = false;
    this.resource = new TaskDto(
      '',
      '',
      '',
      0,
      this.propertiesOptions[0][0],
      '',
      0,
      new Date()
    );
    this.isValidForm = null;
    this.title = new FormControl(this.resource.title, [
      Validators.required,
      Validators.pattern(/^[A-Za-zÀ-ÖØ-Ýà-öø-ÿ0-9\s]{1,30}$/),
    ]);
    this.description = new FormControl(this.resource.description, [
      Validators.required,
      Validators.pattern(/^[A-Za-zÀ-ÖØ-Ýà-öø-ÿ\s.,!?'"(){}[\]@#-]{1,90}$/),
    ]);
    this.type = new FormControl(this.resource.type, []);
    this.properties = new FormControl(this.resource.properties, []);
    this.link = new FormControl(this.resource.link, [
      Validators.required,
      Validators.pattern(
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/
      ),
    ]);

    this.createResource = this.formBuilder.group({
      title: this.title,
      description: this.description,
      type: this.type,
      properties: this.properties,
      link: this.link,
    });
  }
  ngOnInit(): void {
    this.taskService.spinner$
      .pipe(takeUntil(this.destroy$))
      .subscribe((spinner) => {
        this.spinner = spinner;
      });

    this.subscribeToSelectChanges();
  }

  create(): void {
    this.isValidForm = false;
    let responseOK: boolean = false;

    if (this.createResource.invalid) {
      return;
    }

    this.isValidForm = true;
    this.resource = this.createResource.value;

    this.taskService
      .createTask(this.resource)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          if (responseOK) {
            this.snackBarService.showSuccess('Recurso creado correctamente');
            this.router.navigateByUrl('/dev-tools');
          } else {
            this.snackBarService.showError('Error al crear el recurso');
          }
        })
      )
      .subscribe({
        next: () => {
          responseOK = true;
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
