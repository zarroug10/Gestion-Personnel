// app.config.ts (for standalone Angular apps)
import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { routes } from './app.routes';
import { AuthentificationService } from './services/auth/authentifcation.service';
import { provideToastr } from 'ngx-toastr';


function initializeAuth(authService: AuthentificationService) {
  return () => {
    // Return a promise that resolves when auth check is complete
    return firstValueFrom(authService.refreshCurrentUser()).catch(() => {
      // Handle error silently - user is just not authenticated
      return null;
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideToastr(), 
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthentificationService],
      multi: true
    }
  ]
};