import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { FormPageComponent } from './features/task/pages/form-page/form-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'tools', pathMatch: 'full' },
      {
        path: 'tools',
        loadChildren: () =>
          import('./features/task/task.routes').then((m) => m.TASK_ROUTES),
        title: 'Tools page',
      },
      {
        path: 'generate',
        component: FormPageComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'tools' },
];
