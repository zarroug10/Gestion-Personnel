// app.config.ts (for standalone Angular apps)
import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { routes } from './app.routes';
import { AuthentificationService } from './services/auth/authentifcation.service';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';


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
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true, 
      progressAnimation: 'increasing', 
      extendedTimeOut: 3000,
      enableHtml: true,
      tapToDismiss: true
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthentificationService],
      multi: true
    }
  ]
};