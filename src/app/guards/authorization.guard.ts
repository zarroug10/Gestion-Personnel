import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationService } from '../services/auth/authentifcation.service';
import { catchError, map, of } from 'rxjs';

export const AuthorizationGuard: CanActivateFn = () => {
  const authService = inject(AuthentificationService);
  const router = inject(Router);

  // Check if we're still loading the initial auth state
  if (authService.isLoading()) {
    // Wait for loading to complete, then check authentication
    return authService.refreshCurrentUser().pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        router.navigate(['/login']);
        return of(false);
      })
    );
  }

  // If not loading, check current user state
  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};