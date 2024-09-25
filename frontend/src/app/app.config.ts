import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { inject } from '@vercel/analytics';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimations(),
    provideToastr(),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        inject({
          mode: isDevMode() ? 'development' : 'production',
          debug: false,
        });
      },
    },
  ],
};
