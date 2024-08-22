import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { TaskComponent } from './features/task/components/task/task.component';
import { MainPageComponent } from './features/task/pages/main-page/main-page.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './core/layout/layout.component';
import { ToolsPageComponent } from './features/task/pages/tools-page/tools-page.component';
import { AllToolsComponent } from './features/task/components/all-tools/all-tools.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MainPageComponent,
    TaskComponent,
    ToolsPageComponent,
    AllToolsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
