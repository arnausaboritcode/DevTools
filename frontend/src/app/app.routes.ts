import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AllToolsComponent } from './features/task/components/all-tools/all-tools.component';
import { ExtensionToolsComponent } from './features/task/components/extension-tools/extension-tools.component';
import { ResourceToolsComponent } from './features/task/components/resource-tools/resource-tools.component';
import { ToolsPageComponent } from './features/task/pages/tools-page/tools-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dev-tools', pathMatch: 'full' },
      {
        path: 'dev-tools',
        component: ToolsPageComponent,
        children: [
          { path: '', component: AllToolsComponent },
          {
            path: 'extensions',
            component: ExtensionToolsComponent,
          },
          {
            path: 'resources',
            component: ResourceToolsComponent,
          },
        ],
        title: 'Tools page',
      },
    ],
  },
  { path: '**', redirectTo: 'dev-tools' },
];
