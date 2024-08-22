import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AllToolsComponent } from './features/task/components/all-tools/all-tools.component';
import { MainPageComponent } from './features/task/pages/main-page/main-page.component';
import { ToolsPageComponent } from './features/task/pages/tools-page/tools-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: MainPageComponent, title: 'Main page' },
      {
        path: 'dev-tools',
        component: ToolsPageComponent,
        children: [{ path: '', component: AllToolsComponent }],
        title: 'Tools page',
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableViewTransitions: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
