import { Routes } from '@angular/router';
import { AllToolsComponent } from './components/all-tools/all-tools.component';
import { ExtensionToolsComponent } from './components/extension-tools/extension-tools.component';
import { ResourceToolsComponent } from './components/resource-tools/resource-tools.component';
import { ToolsPageComponent } from './pages/tools-page/tools-page.component';

export const TASK_ROUTES: Routes = [
  {
    path: '',
    component: ToolsPageComponent,
    children: [
      {
        path: '',
        component: AllToolsComponent,
        title: 'DevHunt - Herramientas',
      },
      {
        path: 'extensions',
        component: ExtensionToolsComponent,
        title: 'DevHunt - Extensiones',
      },
      {
        path: 'resources',
        component: ResourceToolsComponent,
        title: 'DevHunt - Recursos',
      },
    ],
  },
];
