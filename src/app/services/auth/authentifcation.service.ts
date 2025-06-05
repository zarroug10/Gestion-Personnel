import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { CurrentUser } from '../../models/User';
import { Router } from '@angular/router';

interface model {
  email: string;
  password: string;
}

interface LoginResult {
  success: boolean;
  user: CurrentUser;
}

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public currentUser = signal<CurrentUser | undefined>(undefined);
  public isLoading = signal<boolean>(true); // Track loading state
  private router = inject(Router);
  public isGood = true;
  public errorMessage = signal<string | null>(null);

  constructor(private http: HttpClient) {
    // Check authentication status on service initialization
    this.checkAuthenticationStatus();
  }

  private checkAuthenticationStatus(): void {
    this.isLoading.set(true);
    this.setCurrentUserAsObservable().subscribe({
      next: (user) => {
        this.currentUser.set(user);
        this.isLoading.set(false);
      },
      error: () => {
        this.currentUser.set(undefined);
        this.isLoading.set(false);
      }
    });
  }

  login(credentials: model): Observable<LoginResult> {
    return this.http.post<model>('http://localhost:5021/api/Authentication/login', credentials,
      { withCredentials: true }).pipe(
        switchMap(() => {
          return this.setCurrentUserAsObservable();
        }),
        map((user: CurrentUser) => ({
          success: true,
          user: user
        })),
        tap(() => {
          this.router.navigateByUrl("/");
        }),
        catchError(error => {
          this.isGood = false;
          this.errorMessage.set(error.error?.message);
          return throwError(() => error);
        })
      );
  }

  private setCurrentUserAsObservable(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>('http://localhost:5021/api/User/CurrentUser', {
      withCredentials: true
    }).pipe(
      tap(response => {
        this.currentUser.set(response);
      })
    );
  }

  public setCurrentUser() {
    this.setCurrentUserAsObservable().subscribe({
      error: error => {
        console.error(error.message);
        this.currentUser.set(undefined);
      }
    });
  }

  // Method to refresh current user from API
  public refreshCurrentUser(): Observable<CurrentUser | null> {
    return this.setCurrentUserAsObservable().pipe(
      catchError(() => {
        this.currentUser.set(undefined);
        return of(null);
      })
    );
  }

  logout() {
    return this.http.post('http://localhost:5021/api/Authentication/logout', {}, {
      withCredentials: true
    }).pipe(
      map(() => {
        this.currentUser.set(undefined);
        return {
          success: true,
          message: 'Logout successful'
        };
      }),
      catchError(error =>
        of({
          success: false,
          error: error.message
        })
      )
    );
  }

  // Helper method to check if user is authenticated
  public isAuthenticated(): boolean {
    if(this.currentUser()?.isAuthenticated !== false && this.currentUser() !== undefined ){
      return true ;
    }
    return false;
  }
}